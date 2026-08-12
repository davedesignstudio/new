import { Show } from 'solid-js';
import { useCart } from '../store/cart';

export default function OrderConfirmation() {
  const cart = useCart();

  return (
    <Show when={cart.orderPlaced()}>
      <div class="toast" role="status">
        <span class="toast-icon" aria-hidden="true">✓</span>
        <div>
          <strong>Order placed!</strong>
          <p>Your pizza is on its way. Est. delivery 25–35 min.</p>
        </div>
        <button
          type="button"
          class="toast-close"
          aria-label="Dismiss"
          onClick={() => cart.setOrderPlaced(false)}
        >
          ✕
        </button>
      </div>
    </Show>
  );
}
