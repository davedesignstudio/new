import { Show } from 'solid-js'
import { useCart } from '../store/cart'

export function Header() {
  const cart = useCart()

  return (
    <header class="site-header">
      <div class="header-inner">
        <a href="#menu" class="brand" aria-label="PieDash home">
          <span class="brand-mark" aria-hidden="true">
            <span class="dot" />
            <span class="dot" />
          </span>
          <span class="brand-text">
            <span class="brand-name">PieDash</span>
            <span class="brand-tag">Pizza · Fast</span>
          </span>
        </a>

        <Show when={cart.state.orderType}>
          <button
            type="button"
            class="order-chip"
            onClick={() => cart.setOrderType(cart.state.orderType === 'delivery' ? 'carryout' : 'delivery')}
          >
            <span class="order-chip-type">
              {cart.state.orderType === 'delivery' ? 'Delivery' : 'Carryout'}
            </span>
            <span class="order-chip-addr">{cart.state.address}</span>
          </button>
        </Show>

        <nav class="header-actions">
          <button type="button" class="ghost-btn" onClick={() => document.getElementById('deals')?.scrollIntoView({ behavior: 'smooth' })}>
            Deals
          </button>
          <button type="button" class="cart-btn" onClick={() => cart.toggleCart()} aria-label="Open cart">
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path
                fill="currentColor"
                d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM7.2 14h9.9c.8 0 1.5-.5 1.7-1.2l2.4-7.2A1 1 0 0 0 20.3 4H5.2L4.3 1.5A1 1 0 0 0 3.4 1H1v2h1.6l3.6 10.6A2 2 0 0 0 8.1 15H19v-2H8.1l-.9-1z"
              />
            </svg>
            <Show when={cart.cartCount() > 0}>
              <span class="cart-count">{cart.cartCount()}</span>
            </Show>
            <span class="cart-total">${cart.cartTotal().toFixed(2)}</span>
          </button>
        </nav>
      </div>
    </header>
  )
}
