const CART_KEY = 'slice-heaven-cart';

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}

function formatPrice(amount) {
  return '$' + amount.toFixed(2);
}

function getCartCount() {
  return getCart().reduce((sum, item) => sum + item.quantity, 0);
}

function getCartSubtotal() {
  return getCart().reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function updateCartBadge() {
  const count = getCartCount();
  document.querySelectorAll('#sidebar-cart-count, #hero-cart-count').forEach((el) => {
    el.textContent = count;
    el.style.display = count > 0 ? 'inline-block' : 'none';
  });
}

function addToCart(id, name, emoji, size, price, quantity) {
  const cart = getCart();
  const existing = cart.find((item) => item.id === id && item.size === size);

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ id, name, emoji, size, price, quantity });
  }

  saveCart(cart);
  showToast(name + ' (' + size + ') added to cart!');
}

function removeFromCart(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  renderOrderPage();
}

function updateCartQuantity(index, delta) {
  const cart = getCart();
  cart[index].quantity += delta;

  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }

  saveCart(cart);
  renderOrderPage();
}

function showToast(message) {
  let toast = document.getElementById('cart-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'cart-toast';
    toast.className = 'cart-toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('visible');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('visible'), 2500);
}

function initMenuPage() {
  document.querySelectorAll('.pizza-card').forEach((card) => {
    const qtyValue = card.querySelector('.qty-value');
    let qty = 1;

    card.querySelector('.qty-minus').addEventListener('click', () => {
      if (qty > 1) {
        qty -= 1;
        qtyValue.textContent = qty;
      }
    });

    card.querySelector('.qty-plus').addEventListener('click', () => {
      qty += 1;
      qtyValue.textContent = qty;
    });

    card.querySelector('.add-to-cart-btn').addEventListener('click', () => {
      const btn = card.querySelector('.add-to-cart-btn');
      const select = card.querySelector('.size-select');
      const option = select.options[select.selectedIndex];

      addToCart(
        btn.dataset.id,
        btn.dataset.name,
        btn.dataset.emoji,
        option.value,
        parseFloat(option.dataset.price),
        qty
      );

      qty = 1;
      qtyValue.textContent = qty;
    });
  });
}

function renderOrderPage() {
  const cart = getCart();
  const emptyEl = document.getElementById('cart-empty');
  const itemsEl = document.getElementById('cart-items');
  const summaryEl = document.getElementById('cart-summary');

  if (!itemsEl) return;

  if (cart.length === 0) {
    emptyEl.hidden = false;
    summaryEl.hidden = true;
    itemsEl.innerHTML = '';
    return;
  }

  emptyEl.hidden = true;
  summaryEl.hidden = false;

  itemsEl.innerHTML = cart.map((item, index) => (
    '<div class="cart-item">' +
      '<span class="cart-item-emoji">' + item.emoji + '</span>' +
      '<div class="cart-item-info">' +
        '<strong>' + item.name + '</strong>' +
        '<span class="cart-item-size">' + item.size.charAt(0).toUpperCase() + item.size.slice(1) + '</span>' +
      '</div>' +
      '<div class="cart-item-qty">' +
        '<button type="button" class="qty-btn qty-minus" data-index="' + index + '">−</button>' +
        '<span>' + item.quantity + '</span>' +
        '<button type="button" class="qty-btn qty-plus" data-index="' + index + '">+</button>' +
      '</div>' +
      '<span class="cart-item-price">' + formatPrice(item.price * item.quantity) + '</span>' +
      '<button type="button" class="cart-item-remove" data-index="' + index + '" aria-label="Remove item">×</button>' +
    '</div>'
  )).join('');

  const subtotal = getCartSubtotal();
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  document.getElementById('cart-subtotal').textContent = formatPrice(subtotal);
  document.getElementById('cart-tax').textContent = formatPrice(tax);
  document.getElementById('cart-total').textContent = formatPrice(total);

  itemsEl.querySelectorAll('.qty-minus').forEach((btn) => {
    btn.addEventListener('click', () => updateCartQuantity(parseInt(btn.dataset.index, 10), -1));
  });

  itemsEl.querySelectorAll('.qty-plus').forEach((btn) => {
    btn.addEventListener('click', () => updateCartQuantity(parseInt(btn.dataset.index, 10), 1));
  });

  itemsEl.querySelectorAll('.cart-item-remove').forEach((btn) => {
    btn.addEventListener('click', () => removeFromCart(parseInt(btn.dataset.index, 10)));
  });
}

function initOrderPage() {
  renderOrderPage();

  const form = document.getElementById('order-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const cart = getCart();
    if (cart.length === 0) return;

    const formData = new FormData(form);
    const subtotal = getCartSubtotal();
    const tax = subtotal * 0.08;
    const total = subtotal + tax;

    const orderSummary = cart.map((item) =>
      item.quantity + 'x ' + item.name + ' (' + item.size + ') — ' + formatPrice(item.price * item.quantity)
    ).join('\n');

    document.getElementById('order-details').value = orderSummary + '\nTotal: ' + formatPrice(total);

    const name = formData.get('name');
    const delivery = formData.get('delivery');

    document.getElementById('cart-summary').hidden = true;
    document.getElementById('cart-items').hidden = true;
    document.getElementById('order-success').hidden = false;
    document.getElementById('order-confirmation-details').textContent =
      'Hi ' + name + '! Your ' + delivery + ' order of ' + formatPrice(total) + ' has been received.';

    localStorage.removeItem(CART_KEY);
    updateCartBadge();
  });
}

function initCart() {
  updateCartBadge();

  if (document.querySelector('.pizza-menu')) {
    initMenuPage();
  }

  if (document.querySelector('.order-page')) {
    initOrderPage();
  }
}

export { initCart, getCart, getCartCount };
