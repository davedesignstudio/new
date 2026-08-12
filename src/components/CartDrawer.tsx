import { For, Show, type Component } from 'solid-js'
import { crusts, sauces, sizes, toppings } from '../data/menu'
import { cartStore, type CartLine } from '../store/cart'

function lineDetails(line: CartLine) {
  if (!line.isPizza) return null
  const bits: string[] = []
  if (line.size) bits.push(sizes.find((s) => s.id === line.size)?.label ?? line.size)
  if (line.crust) bits.push(crusts.find((c) => c.id === line.crust)?.label ?? line.crust)
  if (line.sauce) bits.push(sauces.find((s) => s.id === line.sauce)?.label ?? line.sauce)
  if (line.toppingIds?.length) {
    bits.push(
      line.toppingIds
        .map((id) => toppings.find((t) => t.id === id)?.label ?? id)
        .join(', '),
    )
  }
  if (line.notes) bits.push(line.notes)
  return bits.join(' · ')
}

export const CartDrawer: Component = () => {
  const {
    cart,
    cartOpen,
    setCartOpen,
    updateQty,
    removeLine,
    clearCart,
    orderType,
    subtotal,
    tax,
    deliveryFee,
    total,
  } = cartStore

  return (
    <Show when={cartOpen()}>
      <div
        class="overlay cart-overlay"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        onClick={(e) => {
          if (e.target === e.currentTarget) setCartOpen(false)
        }}
      >
        <aside class="cart-drawer">
          <div class="cart-header">
            <h2 id="cart-title">Your Order</h2>
            <button
              type="button"
              class="icon-btn"
              aria-label="Close cart"
              onClick={() => setCartOpen(false)}
            >
              ✕
            </button>
          </div>

          <div class="cart-body">
            <Show
              when={cart().length > 0}
              fallback={
                <div class="cart-empty">
                  <p>Your cart is empty.</p>
                  <p>Add a pizza or deal to get started.</p>
                </div>
              }
            >
              <For each={cart()}>
                {(line) => (
                  <div class="cart-line">
                    <img src={line.image} alt="" />
                    <div>
                      <h4>{line.name}</h4>
                      <Show when={lineDetails(line)}>
                        {(details) => <p class="cart-line-meta">{details()}</p>}
                      </Show>
                      <div class="qty-controls">
                        <button
                          type="button"
                          aria-label="Decrease quantity"
                          onClick={() => updateQty(line.id, -1)}
                        >
                          −
                        </button>
                        <span>{line.quantity}</span>
                        <button
                          type="button"
                          aria-label="Increase quantity"
                          onClick={() => updateQty(line.id, 1)}
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        class="remove-btn"
                        onClick={() => removeLine(line.id)}
                      >
                        Remove
                      </button>
                    </div>
                    <div class="line-price">
                      ${(line.unitPrice * line.quantity).toFixed(2)}
                    </div>
                  </div>
                )}
              </For>
            </Show>
          </div>

          <Show when={cart().length > 0}>
            <div class="cart-footer">
              <div class="totals-row">
                <span>Subtotal</span>
                <span>${subtotal().toFixed(2)}</span>
              </div>
              <div class="totals-row">
                <span>Tax</span>
                <span>${tax().toFixed(2)}</span>
              </div>
              <Show when={orderType() === 'delivery'}>
                <div class="totals-row">
                  <span>Delivery</span>
                  <span>${deliveryFee().toFixed(2)}</span>
                </div>
              </Show>
              <div class="totals-row grand">
                <span>Total</span>
                <span>${total().toFixed(2)}</span>
              </div>
              <button type="button" class="btn btn-primary btn-block">
                Checkout — {orderType() === 'delivery' ? 'Delivery' : 'Carryout'}
              </button>
              <button
                type="button"
                class="btn btn-outline btn-block"
                style={{ 'margin-top': '0.5rem' }}
                onClick={clearCart}
              >
                Clear Cart
              </button>
            </div>
          </Show>
        </aside>
      </div>
    </Show>
  )
}
