import { useCart } from '../store/cart';

export default function Header() {
  const cart = useCart();

  return (
    <header class="site-header">
      <div class="header-top">
        <div class="container header-top-inner">
          <div class="logo">
            <span class="logo-dots" aria-hidden="true">
              <span class="dot" />
              <span class="dot" />
            </span>
            <span class="logo-text">Domino's</span>
          </div>

          <nav class="header-nav" aria-label="Main">
            <a href="#" class="nav-link active">Order Online</a>
            <a href="#" class="nav-link">Track Order</a>
            <a href="#" class="nav-link">Coupons</a>
          </nav>

          <button
            type="button"
            class="cart-button"
            onClick={() => cart.setShowCheckout(true)}
            aria-label={`View cart, ${cart.cartCount()} items`}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1 1 0 0020 4H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"
                fill="currentColor"
              />
            </svg>
            <span class="cart-label">Cart</span>
            {cart.cartCount() > 0 && (
              <span class="cart-badge">{cart.cartCount()}</span>
            )}
          </button>
        </div>
      </div>

      <div class="delivery-bar">
        <div class="container delivery-bar-inner">
          <div class="delivery-info">
            <span class="delivery-icon" aria-hidden="true">📍</span>
            <div>
              <strong>Delivery to:</strong>
              <span> 123 Main St, Springfield</span>
            </div>
          </div>
          <div class="delivery-meta">
            <span class="eta">Est. 25–35 min</span>
            <button type="button" class="link-btn">Change</button>
          </div>
        </div>
      </div>
    </header>
  );
}
