import { For, Show } from 'solid-js';
import { useCart } from '../store/cart';

export default function OrderSummary() {
  const cart = useCart();

  return (
    <aside class="order-summary" aria-label="Your order">
      <div class="order-summary-header">
        <h2>Your Order</h2>
        <Show when={cart.cartCount() > 0}>
          <span class="item-count">{cart.cartCount()} items</span>
        </Show>
      </div>

      <Show
        when={cart.items().length > 0}
        fallback={
          <div class="order-empty">
            <span class="order-empty-icon" aria-hidden="true">🍕</span>
            <p>Your cart is empty</p>
            <p class="order-empty-hint">Add a pizza or side to get started</p>
          </div>
        }
      >
        <ul class="order-items">
          <For each={cart.items()}>
            {(item) => (
              <li class="order-item">
                <div class="order-item-info">
                  <strong>{item.name}</strong>
                  <Show when={item.description}>
                    <p class="order-item-desc">{item.description}</p>
                  </Show>
                  <span class="order-item-price">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
                <div class="order-item-actions">
                  <button
                    type="button"
                    class="qty-btn"
                    aria-label="Decrease quantity"
                    onClick={() => cart.updateQuantity(item.id, -1)}
                  >
                    −
                  </button>
                  <span class="qty-value">{item.quantity}</span>
                  <button
                    type="button"
                    class="qty-btn"
                    aria-label="Increase quantity"
                    onClick={() => cart.updateQuantity(item.id, 1)}
                  >
                    +
                  </button>
                  <button
                    type="button"
                    class="remove-btn"
                    aria-label="Remove item"
                    onClick={() => cart.removeItem(item.id)}
                  >
                    ✕
                  </button>
                </div>
              </li>
            )}
          </For>
        </ul>
      </Show>

      <div class="order-totals">
        <div class="total-row">
          <span>Subtotal</span>
          <span>${cart.cartTotal().toFixed(2)}</span>
        </div>
        <div class="total-row">
          <span>Delivery fee</span>
          <span>$3.99</span>
        </div>
        <div class="total-row">
          <span>Tax</span>
          <span>${(cart.cartTotal() * 0.08).toFixed(2)}</span>
        </div>
        <div class="total-row total-grand">
          <span>Total</span>
          <span>${(cart.cartTotal() + 3.99 + cart.cartTotal() * 0.08).toFixed(2)}</span>
        </div>
      </div>

      <button
        type="button"
        class="btn btn-primary btn-checkout"
        disabled={cart.items().length === 0}
        onClick={() => cart.setShowCheckout(true)}
      >
        Checkout
      </button>
    </aside>
  );
}
