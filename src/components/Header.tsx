import {
  fulfillment,
  setFulfillment,
  cartCount,
  setCartOpen,
  setActiveCategory,
} from '../store'
import './Header.css'

export default function Header() {
  return (
    <header class="site-header">
      <div class="site-header__inner">
        <a href="#top" class="brand" aria-label="Domino's home">
          <span class="brand__diamond" aria-hidden="true">
            <span class="brand__dot" />
          </span>
          <span class="brand__text">
            Domino<span class="brand__apostrophe">’</span>s
          </span>
        </a>

        <div class="fulfillment" role="group" aria-label="Order type">
          <button
            type="button"
            class={`fulfillment__btn ${fulfillment() === 'delivery' ? 'is-active' : ''}`}
            onClick={() => setFulfillment('delivery')}
          >
            Delivery
          </button>
          <button
            type="button"
            class={`fulfillment__btn ${fulfillment() === 'carryout' ? 'is-active' : ''}`}
            onClick={() => setFulfillment('carryout')}
          >
            Carryout
          </button>
        </div>

        <nav class="header-nav" aria-label="Primary">
          <button type="button" onClick={() => setActiveCategory('deals')}>
            Deals
          </button>
          <a href="#menu">Menu</a>
          <a href="#tracker">Tracker</a>
        </nav>

        <button
          type="button"
          class="cart-btn"
          onClick={() => setCartOpen(true)}
          aria-label={`Open cart, ${cartCount()} items`}
        >
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
            <path
              fill="currentColor"
              d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM7.2 14h9.5c.8 0 1.5-.5 1.7-1.2l2.4-6.6A1 1 0 0 0 19.9 5H6.2L5.3 2.6A1 1 0 0 0 4.4 2H2v2h1.6l3.6 9.6-.9 1.6c-.3.6-.1 1.4.5 1.7.2.1.4.1.6.1H19v-2H8.4l.6-1.2z"
            />
          </svg>
          <span class="cart-btn__label">Cart</span>
          {cartCount() > 0 && <span class="cart-btn__badge">{cartCount()}</span>}
        </button>
      </div>
    </header>
  )
}
