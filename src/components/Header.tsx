import { Show } from 'solid-js'
import { store } from '../store/cart'
import './Header.css'

export default function Header() {
  return (
    <header class="site-header">
      <div class="site-header__inner">
        <a class="brand" href="#top" aria-label="HOTBOX home">
          <span class="brand__mark" aria-hidden="true">
            <span class="brand__dot brand__dot--red" />
            <span class="brand__dot brand__dot--blue" />
          </span>
          <span class="brand__text">HOTBOX</span>
        </a>

        <Show when={store.orderType()}>
          <button
            type="button"
            class="order-chip"
            onClick={() => store.setOrderType(null)}
          >
            <span class="order-chip__type">
              {store.orderType() === 'delivery' ? 'Delivery' : 'Carryout'}
            </span>
            <span class="order-chip__addr">{store.storeAddress()}</span>
            <span class="order-chip__edit">Change</span>
          </button>
        </Show>

        <nav class="header-nav" aria-label="Primary">
          <a href="#menu">Menu</a>
          <a href="#deals">Deals</a>
          <button
            type="button"
            class="cart-btn"
            onClick={() => store.setCartOpen(true)}
            aria-label={`Cart, ${store.itemCount()} items`}
          >
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
              <path
                fill="currentColor"
                d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM7.2 14h9.5c.8 0 1.5-.5 1.7-1.2l2.4-6.5A1 1 0 0 0 19.9 5H6.2L5.3 2.6A1 1 0 0 0 4.4 2H2v2h1.6l3.6 9.6-.9 1.7c-.4.8.2 1.7 1.1 1.7H19v-2H7.4l.8-1.5z"
              />
            </svg>
            <Show when={store.itemCount() > 0}>
              <span class="cart-btn__count">{store.itemCount()}</span>
            </Show>
          </button>
        </nav>
      </div>
    </header>
  )
}
