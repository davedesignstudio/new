import { For, Show } from 'solid-js'
import { formatPrice } from '../data/menu'
import {
  cart,
  cartOpen,
  setCartOpen,
  cartSubtotal,
  updateQty,
  removeLine,
  placeOrder,
  fulfillment,
} from '../store'
import './CartDrawer.css'

export default function CartDrawer() {
  const tax = () => cartSubtotal() * 0.08
  const deliveryFee = () =>
    fulfillment() === 'delivery' && cartSubtotal() > 0 ? 3.99 : 0
  const total = () => cartSubtotal() + tax() + deliveryFee()

  return (
    <Show when={cartOpen()}>
      <div class="cart-overlay" role="dialog" aria-modal="true" aria-labelledby="cart-title">
        <button
          type="button"
          class="cart-overlay__backdrop"
          aria-label="Close cart"
          onClick={() => setCartOpen(false)}
        />
        <aside class="cart-drawer">
          <header class="cart-drawer__header">
            <h2 id="cart-title">Your Order</h2>
            <button type="button" onClick={() => setCartOpen(false)} aria-label="Close">
              ×
            </button>
          </header>

          <p class="cart-drawer__meta">
            {fulfillment() === 'delivery' ? 'Delivery' : 'Carryout'} · Est. 25–35 min
          </p>

          <Show
            when={cart().length > 0}
            fallback={<p class="cart-drawer__empty">Your cart is empty. Add a pizza to get started.</p>}
          >
            <ul class="cart-lines">
              <For each={cart()}>
                {(line) => (
                  <li class="cart-line">
                    <img src={line.image} alt="" />
                    <div class="cart-line__body">
                      <div class="cart-line__top">
                        <strong>{line.name}</strong>
                        <span>{formatPrice(line.unitPrice * line.quantity)}</span>
                      </div>
                      <Show when={line.details.length}>
                        <ul>
                          <For each={line.details}>{(d) => <li>{d}</li>}</For>
                        </ul>
                      </Show>
                      <div class="cart-line__actions">
                        <div class="qty qty--sm">
                          <button type="button" onClick={() => updateQty(line.id, -1)} aria-label="Decrease">
                            −
                          </button>
                          <span>{line.quantity}</span>
                          <button type="button" onClick={() => updateQty(line.id, 1)} aria-label="Increase">
                            +
                          </button>
                        </div>
                        <button type="button" class="linkish" onClick={() => removeLine(line.id)}>
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                )}
              </For>
            </ul>

            <div class="cart-totals">
              <div><span>Subtotal</span><span>{formatPrice(cartSubtotal())}</span></div>
              <Show when={deliveryFee() > 0}>
                <div><span>Delivery Fee</span><span>{formatPrice(deliveryFee())}</span></div>
              </Show>
              <div><span>Tax</span><span>{formatPrice(tax())}</span></div>
              <div class="cart-totals__grand"><span>Total</span><span>{formatPrice(total())}</span></div>
            </div>

            <button type="button" class="btn btn--red cart-drawer__checkout" onClick={placeOrder}>
              Place Order · {formatPrice(total())}
            </button>
          </Show>
        </aside>
      </div>
    </Show>
  )
}
