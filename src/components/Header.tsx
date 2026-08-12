import type { Component } from 'solid-js'
import { Show } from 'solid-js'
import { cartStore } from '../store/cart'

const DominoMark: Component = () => (
  <svg class="brand-mark" viewBox="0 0 64 64" aria-hidden="true">
    <rect width="64" height="64" rx="8" fill="#fff" />
    <rect
      x="10"
      y="10"
      width="44"
      height="44"
      rx="3"
      fill="#006491"
      transform="rotate(45 32 32)"
    />
    <circle cx="24" cy="24" r="5.5" fill="#E31837" />
    <circle cx="40" cy="40" r="5.5" fill="#E31837" />
  </svg>
)

export const Header: Component = () => {
  const { orderType, setOrderType, address, store, itemCount, setCartOpen } = cartStore

  return (
    <header class="site-header">
      <div class="header-inner">
        <a class="brand" href="#top" aria-label="Domino's home">
          <DominoMark />
          <div class="brand-name">
            Domino<span>'s</span>
          </div>
        </a>

        <div class="order-switch">
          <div class="order-tabs" role="tablist" aria-label="Order type">
            <button
              type="button"
              class="order-tab"
              classList={{ active: orderType() === 'delivery' }}
              role="tab"
              aria-selected={orderType() === 'delivery'}
              onClick={() => setOrderType('delivery')}
            >
              Delivery
            </button>
            <button
              type="button"
              class="order-tab"
              classList={{ active: orderType() === 'carryout' }}
              role="tab"
              aria-selected={orderType() === 'carryout'}
              onClick={() => setOrderType('carryout')}
            >
              Carryout
            </button>
          </div>
          <div class="location-chip">
            <Show
              when={orderType() === 'delivery'}
              fallback={<>Store: {store()}</>}
            >
              Deliver to: {address()}
            </Show>
          </div>
        </div>

        <div class="header-actions">
          <button
            type="button"
            class="cart-btn"
            aria-label={`Open cart, ${itemCount()} items`}
            onClick={() => setCartOpen(true)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M6 6h15l-1.5 9h-12z" />
              <circle cx="9" cy="20" r="1.5" fill="currentColor" stroke="none" />
              <circle cx="18" cy="20" r="1.5" fill="currentColor" stroke="none" />
              <path d="M6 6 5 3H2" />
            </svg>
            <Show when={itemCount() > 0}>
              <span class="cart-badge">{itemCount()}</span>
            </Show>
          </button>
        </div>
      </div>
    </header>
  )
}
