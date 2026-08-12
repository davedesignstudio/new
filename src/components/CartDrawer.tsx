import { For, Show } from 'solid-js'
import { useCart } from '../store/cart'

export function CartDrawer() {
  const cart = useCart()
  const tax = () => Math.round(cart.cartTotal() * 0.0875 * 100) / 100
  const deliveryFee = () => (cart.state.orderType === 'delivery' && cart.cartTotal() > 0 ? 3.99 : 0)
  const grand = () => Math.round((cart.cartTotal() + tax() + deliveryFee()) * 100) / 100

  return (
    <Show when={cart.state.cartOpen}>
      <div class="cart-overlay" role="dialog" aria-modal="true" aria-labelledby="cart-title">
        <button type="button" class="cart-backdrop" aria-label="Close cart" onClick={() => cart.closeCart()} />
        <aside class="cart-drawer">
          <header class="cart-header">
            <h2 id="cart-title">Your Order</h2>
            <button type="button" class="icon-close" aria-label="Close" onClick={() => cart.closeCart()}>
              ×
            </button>
          </header>

          <Show
            when={cart.state.cart.length > 0}
            fallback={
              <div class="cart-empty">
                <p>Your cart is empty.</p>
                <button type="button" class="primary-btn" onClick={() => { cart.closeCart(); cart.openBuilder() }}>
                  Build a pizza
                </button>
              </div>
            }
          >
            <ul class="cart-lines">
              <For each={cart.state.cart}>
                {(line) => (
                  <li class="cart-line">
                    <div class="cart-line-info">
                      <strong>{line.name}</strong>
                      <span>{line.summary}</span>
                      <span class="cart-line-price">${(line.unitPrice * line.quantity).toFixed(2)}</span>
                    </div>
                    <div class="qty-control">
                      <button type="button" onClick={() => cart.updateQty(line.id, -1)} aria-label="Decrease">
                        −
                      </button>
                      <span>{line.quantity}</span>
                      <button type="button" onClick={() => cart.updateQty(line.id, 1)} aria-label="Increase">
                        +
                      </button>
                    </div>
                    <button type="button" class="remove-btn" onClick={() => cart.removeLine(line.id)}>
                      Remove
                    </button>
                  </li>
                )}
              </For>
            </ul>

            <footer class="cart-footer">
              <div class="totals">
                <div>
                  <span>Subtotal</span>
                  <span>${cart.cartTotal().toFixed(2)}</span>
                </div>
                <Show when={deliveryFee() > 0}>
                  <div>
                    <span>Delivery</span>
                    <span>${deliveryFee().toFixed(2)}</span>
                  </div>
                </Show>
                <div>
                  <span>Tax</span>
                  <span>${tax().toFixed(2)}</span>
                </div>
                <div class="grand">
                  <span>Total</span>
                  <span>${grand().toFixed(2)}</span>
                </div>
              </div>
              <button
                type="button"
                class="primary-btn block"
                onClick={() => {
                  alert(`Order placed! Total $${grand().toFixed(2)}. Pizza tracker coming soon.`)
                  cart.closeCart()
                }}
              >
                Place order · ${grand().toFixed(2)}
              </button>
            </footer>
          </Show>
        </aside>
      </div>
    </Show>
  )
}
