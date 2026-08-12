import { For, Show } from 'solid-js'
import { formatPrice } from '../data/menu'
import {
  cart,
  cartOpen,
  cartSubtotal,
  changeQty,
  placeOrder,
  removeLine,
  serviceMethod,
  setCartOpen,
} from '../store/cart'
import { Button, IconClose } from './ui'

export function CartDrawer() {
  const tax = () => cartSubtotal() * 0.0825
  const deliveryFee = () =>
    serviceMethod() === 'delivery' && cartSubtotal() > 0 ? 3.99 : 0
  const total = () => cartSubtotal() + tax() + deliveryFee()

  return (
    <Show when={cartOpen()}>
      <div class="cart-layer" role="dialog" aria-modal="true" aria-label="Your order">
        <button type="button" class="cart-backdrop" aria-label="Close cart" onClick={() => setCartOpen(false)} />
        <aside class="cart-drawer">
          <header class="cart-header">
            <div>
              <p class="eyebrow">Your Order</p>
              <h2>{serviceMethod() === 'delivery' ? 'Delivery' : 'Carryout'}</h2>
            </div>
            <button type="button" class="icon-btn" aria-label="Close cart" onClick={() => setCartOpen(false)}>
              <IconClose />
            </button>
          </header>

          <Show
            when={cart.lines.length > 0}
            fallback={
              <div class="cart-empty">
                <p>Your cart is empty.</p>
                <p class="muted">Add a specialty pizza or build your own.</p>
                <Button variant="secondary" onClick={() => setCartOpen(false)}>
                  Browse Menu
                </Button>
              </div>
            }
          >
            <ul class="cart-lines">
              <For each={cart.lines}>
                {(line) => (
                  <li class="cart-line">
                    <img src={line.image} alt="" />
                    <div class="cart-line-body">
                      <div class="cart-line-top">
                        <h3>{line.name}</h3>
                        <button
                          type="button"
                          class="text-btn"
                          onClick={() => removeLine(line.id)}
                        >
                          Remove
                        </button>
                      </div>
                      <p class="muted">{line.details}</p>
                      <div class="cart-line-bottom">
                        <div class="qty-stepper sm">
                          <button type="button" aria-label="Decrease" onClick={() => changeQty(line.id, -1)}>
                            −
                          </button>
                          <span>{line.quantity}</span>
                          <button type="button" aria-label="Increase" onClick={() => changeQty(line.id, 1)}>
                            +
                          </button>
                        </div>
                        <strong>{formatPrice(line.unitPrice * line.quantity)}</strong>
                      </div>
                    </div>
                  </li>
                )}
              </For>
            </ul>

            <div class="cart-totals">
              <div>
                <span>Subtotal</span>
                <span>{formatPrice(cartSubtotal())}</span>
              </div>
              <Show when={deliveryFee() > 0}>
                <div>
                  <span>Delivery fee</span>
                  <span>{formatPrice(deliveryFee())}</span>
                </div>
              </Show>
              <div>
                <span>Tax</span>
                <span>{formatPrice(tax())}</span>
              </div>
              <div class="grand">
                <span>Total</span>
                <span>{formatPrice(total())}</span>
              </div>
            </div>

            <Button class="checkout-btn" onClick={placeOrder}>
              Place Order · {formatPrice(total())}
            </Button>
          </Show>
        </aside>
      </div>
    </Show>
  )
}
