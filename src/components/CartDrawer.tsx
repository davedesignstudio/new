import { For, Show, createSignal, onMount } from 'solid-js'
import { money } from '../data/menu'
import { store } from '../store/cart'
import './CartDrawer.css'

export default function CartDrawer() {
  const [entered, setEntered] = createSignal(false)
  onMount(() => requestAnimationFrame(() => setEntered(true)))

  const close = () => store.setCartOpen(false)

  return (
    <div class="cart-overlay" classList={{ 'is-open': entered() }} role="dialog" aria-modal="true" aria-label="Your order">
      <button type="button" class="cart-overlay__backdrop" aria-label="Close cart" onClick={close} />
      <aside class="cart-drawer">
        <header class="cart-drawer__header">
          <h2>Your Order</h2>
          <button type="button" class="cart-drawer__close" onClick={close} aria-label="Close">
            ×
          </button>
        </header>

        <Show
          when={store.cart().length > 0}
          fallback={
            <div class="cart-drawer__empty">
              <p>Your bag is empty.</p>
              <button type="button" class="btn btn--blue" onClick={close}>
                Browse menu
              </button>
            </div>
          }
        >
          <ul class="cart-list">
            <For each={store.cart()}>
              {(line) => (
                <li class="cart-line">
                  <div class="cart-line__info">
                    <strong>{line.name}</strong>
                    <Show when={line.summary}>
                      <p>{line.summary}</p>
                    </Show>
                    <span>{money(line.unitPrice)} each</span>
                  </div>
                  <div class="cart-line__controls">
                    <div class="stepper stepper--sm">
                      <button type="button" onClick={() => store.updateQty(line.key, line.qty - 1)} aria-label="Decrease">
                        −
                      </button>
                      <strong>{line.qty}</strong>
                      <button type="button" onClick={() => store.updateQty(line.key, line.qty + 1)} aria-label="Increase">
                        +
                      </button>
                    </div>
                    <strong class="cart-line__total">{money(line.unitPrice * line.qty)}</strong>
                    <button type="button" class="cart-line__remove" onClick={() => store.removeLine(line.key)}>
                      Remove
                    </button>
                  </div>
                </li>
              )}
            </For>
          </ul>

          <footer class="cart-drawer__footer">
            <div class="cart-totals">
              <div><span>Subtotal</span><span>{money(store.subtotal())}</span></div>
              <Show when={store.orderType() === 'delivery'}>
                <div><span>Delivery</span><span>{money(store.deliveryFee())}</span></div>
              </Show>
              <div><span>Tax</span><span>{money(store.tax())}</span></div>
              <div class="cart-totals__grand"><span>Total</span><span>{money(store.total())}</span></div>
            </div>
            <button
              type="button"
              class="btn btn--red btn--wide"
              onClick={() => {
                store.setCartOpen(false)
                store.setCheckoutOpen(true)
              }}
            >
              Checkout · {money(store.total())}
            </button>
          </footer>
        </Show>
      </aside>
    </div>
  )
}
