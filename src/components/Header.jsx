import { Show } from 'solid-js'
import { useCart } from '../store/cart'
import './Header.css'

export default function Header(props) {
  const cart = useCart()

  return (
    <header class="site-header" classList={{ scrolled: props.scrolled }}>
      <div class="site-header__inner">
        <a href="#" class="logo" aria-label="Dommino's home">
          <span class="logo__mark" aria-hidden="true">
            <span class="logo__dot" />
            <span class="logo__dot" />
          </span>
          <span class="logo__text">
            Domm<span>ino</span>'s
          </span>
        </a>

        <nav class="site-header__nav" aria-label="Primary">
          <button type="button" onClick={() => props.onNavigate('deals')}>
            Deals
          </button>
          <button type="button" onClick={() => props.onNavigate('pizza')}>
            Menu
          </button>
          <button type="button" onClick={() => props.onNavigate('wings')}>
            Wings
          </button>
        </nav>

        <div class="site-header__actions">
          <div class="order-toggle" role="group" aria-label="Order type">
            <button
              type="button"
              classList={{ active: cart.orderType() === 'delivery' }}
              onClick={() => cart.setOrderType('delivery')}
            >
              Delivery
            </button>
            <button
              type="button"
              classList={{ active: cart.orderType() === 'carryout' }}
              onClick={() => cart.setOrderType('carryout')}
            >
              Carryout
            </button>
          </div>

          <button type="button" class="cart-btn" onClick={props.onOpenCart}>
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path
                fill="currentColor"
                d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM7.2 14h9.5c.8 0 1.5-.5 1.8-1.2l3.3-7.5A1 1 0 0 0 20.9 4H5.2L4.3 2H1v2h2l3.6 7.6L5.2 14c-.2.4-.2.9 0 1.3.3.5.8.7 1.3.7H19v-2H7.4l.8-1.5z"
              />
            </svg>
            <span>Cart</span>
            <Show when={cart.itemCount() > 0}>
              <span class="cart-btn__badge">{cart.itemCount()}</span>
            </Show>
          </button>
        </div>
      </div>
    </header>
  )
}
