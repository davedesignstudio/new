import { For, Show } from 'solid-js'
import { useCart } from '../store/cart'
import { toppings } from '../data/menu'
import './CartDrawer.css'

function toppingNames(ids) {
  return (ids || [])
    .map((id) => toppings.find((t) => t.id === id)?.label)
    .filter(Boolean)
    .join(', ')
}

export default function CartDrawer() {
  const cart = useCart()

  return (
    <div class="cart-drawer" classList={{ open: cart.cartOpen() }}>
      <button
        type="button"
        class="cart-drawer__backdrop"
        aria-label="Close cart"
        onClick={() => cart.setCartOpen(false)}
      />

      <aside class="cart-drawer__panel" aria-label="Your order">
        <header class="cart-drawer__header">
          <div>
            <p class="cart-drawer__eyebrow">Your Order</p>
            <h2>
              {cart.orderType() === 'delivery' ? 'Delivery' : 'Carryout'}
            </h2>
          </div>
          <button
            type="button"
            class="cart-drawer__close"
            onClick={() => cart.setCartOpen(false)}
            aria-label="Close"
          >
            ×
          </button>
        </header>

        <Show
          when={!cart.checkoutDone()}
          fallback={
            <div class="cart-success">
              <div class="cart-success__mark" aria-hidden="true">✓</div>
              <h3>Order placed!</h3>
              <p>Your pizza is fired up and on the way. Track it in the app — or just wait for the doorbell.</p>
            </div>
          }
        >
          <Show
            when={cart.cart.length > 0}
            fallback={
              <div class="cart-empty">
                <p>Your cart is empty.</p>
                <button type="button" onClick={() => cart.setCartOpen(false)}>
                  Browse the menu
                </button>
              </div>
            }
          >
            <ul class="cart-list">
              <For each={cart.cart}>
                {(item) => (
                  <li class="cart-line">
                    <img src={item.image} alt="" />
                    <div class="cart-line__body">
                      <div class="cart-line__top">
                        <strong>{item.name}</strong>
                        <span>${cart.calcLinePrice(item).toFixed(2)}</span>
                      </div>
                      <Show when={item.sizeLabel}>
                        <p class="cart-line__meta">
                          {item.sizeLabel} · {item.crust} · {item.sauce}
                        </p>
                      </Show>
                      <Show when={item.toppings?.length}>
                        <p class="cart-line__meta">{toppingNames(item.toppings)}</p>
                      </Show>
                      <div class="cart-line__qty">
                        <button
                          type="button"
                          aria-label="Decrease quantity"
                          onClick={() => cart.updateQty(item.cartId, item.qty - 1)}
                        >
                          −
                        </button>
                        <span>{item.qty}</span>
                        <button
                          type="button"
                          aria-label="Increase quantity"
                          onClick={() => cart.updateQty(item.cartId, item.qty + 1)}
                        >
                          +
                        </button>
                        <button
                          type="button"
                          class="cart-line__remove"
                          onClick={() => cart.removeItem(item.cartId)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                )}
              </For>
            </ul>

            <div class="cart-summary">
              <div>
                <span>Subtotal</span>
                <span>${cart.subtotal().toFixed(2)}</span>
              </div>
              <div>
                <span>Tax</span>
                <span>${cart.tax().toFixed(2)}</span>
              </div>
              <Show when={cart.deliveryFee() > 0}>
                <div>
                  <span>Delivery fee</span>
                  <span>${cart.deliveryFee().toFixed(2)}</span>
                </div>
              </Show>
              <div class="cart-summary__total">
                <span>Total</span>
                <span>${cart.total().toFixed(2)}</span>
              </div>
              <button type="button" class="cart-checkout" onClick={() => cart.placeOrder()}>
                Place Order
              </button>
            </div>
          </Show>
        </Show>
      </aside>
    </div>
  )
}
