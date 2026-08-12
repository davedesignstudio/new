import { cartCount } from '../stores/orderStore';

export default function Header() {
  return (
    <header class="header">
      <div class="header-inner">
        <div class="logo">
          <span class="logo-icon">🍕</span>
          <div class="logo-text">
            <span class="logo-name">Domino's</span>
            <span class="logo-tag">Pizza Order</span>
          </div>
        </div>

        <div class="header-promo">
          <span class="promo-badge">DEAL</span>
          <span>2 or more Medium 2-Topping Pizzas — $6.99 each</span>
        </div>

        <div class="header-cart-badge" aria-label={`${cartCount()} items in cart`}>
          <span class="cart-icon">🛒</span>
          <span class="cart-count">{cartCount()}</span>
        </div>
      </div>
    </header>
  );
}
