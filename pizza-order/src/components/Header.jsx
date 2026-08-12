import { useCart } from '../store/cart';

export default function Header() {
  const cart = useCart();

  return (
    <header class="header">
      <div class="header-top">
        <div class="container header-top-inner">
          <div class="logo">
            <span class="logo-icon">🍕</span>
            <div class="logo-text">
              <span class="logo-name">Domino's</span>
              <span class="logo-tagline">Pizza</span>
            </div>
          </div>

          <div class="header-actions">
            <button
              class={`order-type-btn ${cart.orderType() === 'delivery' ? 'active' : ''}`}
              onClick={() => cart.setOrderType('delivery')}
            >
              <span class="order-type-icon">🚗</span>
              Delivery
            </button>
            <button
              class={`order-type-btn ${cart.orderType() === 'carryout' ? 'active' : ''}`}
              onClick={() => cart.setOrderType('carryout')}
            >
              <span class="order-type-icon">🏪</span>
              Carryout
            </button>
          </div>

          <button class="cart-toggle" onClick={() => cart.setIsOpen(!cart.isOpen())}>
            <span class="cart-icon">🛒</span>
            <span class="cart-label">Cart</span>
            {cart.itemCount() > 0 && (
              <span class="cart-badge">{cart.itemCount()}</span>
            )}
          </button>
        </div>
      </div>

      <div class="store-bar">
        <div class="container store-bar-inner">
          <div class="store-info">
            <span class="store-label">
              {cart.orderType() === 'delivery' ? 'Delivering to:' : 'Pickup from:'}
            </span>
            <span class="store-address">{cart.storeAddress()}</span>
          </div>
          <button class="change-store-btn">Change</button>
        </div>
      </div>
    </header>
  );
}
