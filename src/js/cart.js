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

function cartItemKey(item) {
  return [item.id, item.size, item.customization || ''].join('|');
}

function addCustomPizza(item) {
  const cart = getCart();
  const key = cartItemKey(item);
  const existing = cart.find((c) => cartItemKey(c) === key);

  if (existing) {
    existing.quantity += item.quantity;
  } else {
    cart.push(item);
  }

  saveCart(cart);
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
        (item.customization
          ? '<span class="cart-item-custom">' + item.customization + '</span>'
          : '<span class="cart-item-size">' + item.size.charAt(0).toUpperCase() + item.size.slice(1) + '</span>') +
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

    const orderSummary = cart.map((item) => {
      const detail = item.customization || item.size;
      return item.quantity + 'x ' + item.name + ' (' + detail + ') — ' + formatPrice(item.price * item.quantity);
    }).join('\n');

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

  if (document.querySelector('.order-page')) {
    initOrderPage();
  }
}

export { initCart, addCustomPizza, showToast, getCart, getCartCount };
