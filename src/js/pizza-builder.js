import toppingsData from './toppings-data';
import { addCustomPizza, showToast } from './cart';

let builderState = null;

function formatPrice(amount) {
  return '$' + amount.toFixed(2);
}

function findItem(category, id) {
  return (toppingsData[category] || []).find((item) => item.id === id);
}

function createDefaultState(card) {
  const sizes = JSON.parse(card.dataset.sizes);
  const defaultToppings = JSON.parse(card.dataset.defaultToppings || '[]');

  return {
    id: card.dataset.pizzaId,
    name: card.dataset.name,
    emoji: card.dataset.emoji,
    description: card.dataset.description,
    sizes: sizes,
    size: Object.keys(sizes)[1] || Object.keys(sizes)[0],
    crust: 'classic',
    sauce: card.dataset.defaultSauce || 'marinara',
    cheese: card.dataset.defaultCheese || 'mozzarella',
    cheeseAmount: 'normal',
    extraSauce: false,
    toppings: defaultToppings.slice(),
    notes: '',
    quantity: 1
  };
}

function getBasePrice(state) {
  return state.sizes[state.size] || 0;
}

function getCrustPrice(state) {
  const crust = findItem('crusts', state.crust);
  return crust ? crust.price : 0;
}

function getToppingsPrice(state) {
  const defaultToppings = getDefaultToppingsForPizza(state.id);
  let total = 0;

  state.toppings.forEach((id) => {
    if (defaultToppings.indexOf(id) !== -1) return;
    const item = findItem('meats', id) || findItem('veggies', id);
    if (item) total += item.price;
  });

  return total;
}

function getExtrasPrice(state) {
  let total = 0;
  if (state.extraSauce) total += 0.75;
  if (state.cheeseAmount === 'extra') total += 1.50;
  return total;
}

function getUnitPrice(state) {
  return getBasePrice(state) + getCrustPrice(state) + getToppingsPrice(state) + getExtrasPrice(state);
}

function getDefaultToppingsForPizza(pizzaId) {
  const card = document.querySelector('[data-pizza-id="' + pizzaId + '"]');
  if (!card) return [];
  return JSON.parse(card.dataset.defaultToppings || '[]');
}

function renderPills(container, items, selectedId, onSelect, showPrice) {
  container.innerHTML = items.map((item) => {
    const priceLabel = showPrice && item.price > 0 ? ' +' + formatPrice(item.price) : '';
    return '<button type="button" class="pill' + (item.id === selectedId ? ' active' : '') + '" data-id="' + item.id + '">' +
      item.name + priceLabel + '</button>';
  }).join('');

  container.querySelectorAll('.pill').forEach((btn) => {
    btn.addEventListener('click', () => onSelect(btn.dataset.id));
  });
}

function renderToppingGrid(container, items, selectedIds, onToggle) {
  container.innerHTML = items.map((item) => {
    const isSelected = selectedIds.indexOf(item.id) !== -1;
    return '<button type="button" class="topping-card' + (isSelected ? ' selected' : '') + '" data-id="' + item.id + '">' +
      '<img src="' + item.image + '" alt="' + item.name + '">' +
      '<span class="topping-name">' + item.name + '</span>' +
      (item.price > 0 ? '<span class="topping-price">+' + formatPrice(item.price) + '</span>' : '<span class="topping-price">Included</span>') +
      '<span class="topping-check">' + (isSelected ? '✓' : '+') + '</span>' +
    '</button>';
  }).join('');

  container.querySelectorAll('.topping-card').forEach((card) => {
    card.addEventListener('click', () => onToggle(card.dataset.id));
  });
}

function updatePreview(state) {
  const sauce = findItem('sauces', state.sauce);
  const sauceEl = document.getElementById('preview-sauce');
  if (sauceEl && sauce) {
    sauceEl.style.background = sauce.color;
    sauceEl.style.opacity = state.extraSauce ? '1' : '0.85';
  }

  const cheeseEl = document.getElementById('preview-cheese');
  if (cheeseEl) {
    const opacity = state.cheeseAmount === 'light' ? 0.5 : state.cheeseAmount === 'extra' ? 1 : 0.75;
    cheeseEl.style.opacity = opacity;
  }

  const toppingsEl = document.getElementById('preview-toppings');
  if (!toppingsEl) return;

  const allToppingIds = state.toppings.slice();
  const positions = [
    { top: '18%', left: '30%' }, { top: '22%', left: '58%' },
    { top: '38%', left: '20%' }, { top: '35%', left: '48%' }, { top: '40%', left: '72%' },
    { top: '55%', left: '28%' }, { top: '52%', left: '55%' }, { top: '58%', left: '75%' },
    { top: '68%', left: '38%' }, { top: '65%', left: '62%' }
  ];

  toppingsEl.innerHTML = allToppingIds.map((id, i) => {
    const item = findItem('meats', id) || findItem('veggies', id);
    if (!item) return '';
    const pos = positions[i % positions.length];
    return '<img src="' + item.image + '" class="preview-topping" style="top:' + pos.top + ';left:' + pos.left + '" alt="' + item.name + '">';
  }).join('');

  const cheese = findItem('cheeses', state.cheese);
  const label = document.getElementById('preview-label');
  if (label) {
    const parts = [state.size, state.crust !== 'classic' ? findItem('crusts', state.crust).name : null, cheese ? cheese.name : null];
    label.textContent = parts.filter(Boolean).join(' · ');
  }
}

function updatePrices(state) {
  const unitPrice = getUnitPrice(state);
  const total = unitPrice * state.quantity;

  document.getElementById('builder-total-price').textContent = formatPrice(total);
  document.getElementById('builder-add-price').textContent = formatPrice(total);
}

function renderBuilder(state) {
  document.getElementById('builder-pizza-name').textContent = state.name;
  document.getElementById('builder-pizza-desc').textContent = state.description;
  document.getElementById('builder-qty').textContent = state.quantity;
  document.getElementById('builder-notes').value = state.notes;

  const sizeItems = Object.keys(state.sizes).map((key) => ({
    id: key,
    name: key.charAt(0).toUpperCase() + key.slice(1) + ' ' + formatPrice(state.sizes[key]),
    price: state.sizes[key]
  }));

  renderPills(document.getElementById('builder-sizes'), sizeItems, state.size, (id) => {
    state.size = id;
    renderBuilder(state);
  });

  renderPills(document.getElementById('builder-crusts'), toppingsData.crusts, state.crust, (id) => {
    state.crust = id;
    renderBuilder(state);
  }, true);

  renderToppingGrid(document.getElementById('builder-sauces'), toppingsData.sauces, [state.sauce], (id) => {
    state.sauce = id;
    renderBuilder(state);
  });

  renderToppingGrid(document.getElementById('builder-cheeses'), toppingsData.cheeses, [state.cheese], (id) => {
    state.cheese = id;
    renderBuilder(state);
  });

  renderToppingGrid(document.getElementById('builder-meats'), toppingsData.meats, state.toppings, (id) => {
    toggleTopping(state, id);
    renderBuilder(state);
  });

  renderToppingGrid(document.getElementById('builder-veggies'), toppingsData.veggies, state.toppings, (id) => {
    toggleTopping(state, id);
    renderBuilder(state);
  });

  document.getElementById('extra-sauce-toggle').checked = state.extraSauce;

  document.querySelectorAll('#cheese-amount .pill').forEach((pill) => {
    pill.classList.toggle('active', pill.dataset.amount === state.cheeseAmount);
  });

  updatePreview(state);
  updatePrices(state);
}

function toggleTopping(state, id) {
  const idx = state.toppings.indexOf(id);
  if (idx === -1) {
    state.toppings.push(id);
  } else {
    state.toppings.splice(idx, 1);
  }
}

function openBuilder(card) {
  builderState = createDefaultState(card);
  document.getElementById('pizza-builder').hidden = false;
  document.body.classList.add('builder-open');
  renderBuilder(builderState);
}

function closeBuilder() {
  document.getElementById('pizza-builder').hidden = true;
  document.body.classList.remove('builder-open');
  builderState = null;
}

function buildCustomizationSummary(state) {
  const parts = [];
  parts.push(state.size.charAt(0).toUpperCase() + state.size.slice(1));

  const crust = findItem('crusts', state.crust);
  if (crust && state.crust !== 'classic') parts.push(crust.name);

  const sauce = findItem('sauces', state.sauce);
  if (sauce) parts.push(sauce.name + (state.extraSauce ? ' (extra)' : ''));

  const cheese = findItem('cheeses', state.cheese);
  if (cheese) parts.push(cheese.name + ' (' + state.cheeseAmount + ')');

  state.toppings.forEach((id) => {
    const item = findItem('meats', id) || findItem('veggies', id);
    if (item) parts.push(item.name);
  });

  if (state.notes) parts.push('Note: ' + state.notes);

  return parts.join(', ');
}

function initPizzaBuilder() {
  document.querySelectorAll('.customize-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      openBuilder(btn.closest('.pizza-card'));
    });
  });

  document.querySelector('.builder-close').addEventListener('click', closeBuilder);
  document.querySelector('.builder-overlay').addEventListener('click', closeBuilder);

  document.getElementById('extra-sauce-toggle').addEventListener('change', (e) => {
    if (!builderState) return;
    builderState.extraSauce = e.target.checked;
    renderBuilder(builderState);
  });

  document.querySelectorAll('#cheese-amount .pill').forEach((pill) => {
    pill.addEventListener('click', () => {
      if (!builderState) return;
      builderState.cheeseAmount = pill.dataset.amount;
      renderBuilder(builderState);
    });
  });

  document.querySelector('.builder-qty-minus').addEventListener('click', () => {
    if (!builderState || builderState.quantity <= 1) return;
    builderState.quantity -= 1;
    renderBuilder(builderState);
  });

  document.querySelector('.builder-qty-plus').addEventListener('click', () => {
    if (!builderState) return;
    builderState.quantity += 1;
    renderBuilder(builderState);
  });

  document.getElementById('builder-notes').addEventListener('input', (e) => {
    if (!builderState) return;
    builderState.notes = e.target.value;
  });

  document.getElementById('builder-add-btn').addEventListener('click', () => {
    if (!builderState) return;

    const unitPrice = getUnitPrice(builderState);
    const summary = buildCustomizationSummary(builderState);

    addCustomPizza({
      id: builderState.id,
      name: builderState.name,
      emoji: builderState.emoji,
      size: builderState.size,
      price: unitPrice,
      quantity: builderState.quantity,
      customization: summary,
      crust: builderState.crust,
      sauce: builderState.sauce,
      cheese: builderState.cheese,
      cheeseAmount: builderState.cheeseAmount,
      extraSauce: builderState.extraSauce,
      toppings: builderState.toppings.slice(),
      notes: builderState.notes
    });

    showToast(builderState.name + ' added to cart!');
    closeBuilder();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && builderState) closeBuilder();
  });
}

export { initPizzaBuilder };
