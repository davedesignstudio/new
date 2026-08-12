import { Show } from 'solid-js';
import { useCart } from '../store/cart';

export default function CheckoutModal() {
  const cart = useCart();

  const grandTotal = () =>
    cart.cartTotal() + 3.99 + cart.cartTotal() * 0.08;

  return (
    <Show when={cart.showCheckout()}>
      <div
        class="modal-overlay"
        role="dialog"
        aria-modal="true"
        aria-labelledby="checkout-title"
        onClick={(e) => {
          if (e.target === e.currentTarget) cart.setShowCheckout(false);
        }}
      >
        <div class="modal">
          <button
            type="button"
            class="modal-close"
            aria-label="Close checkout"
            onClick={() => cart.setShowCheckout(false)}
          >
            ✕
          </button>

          <h2 id="checkout-title">Complete Your Order</h2>

          <form
            class="checkout-form"
            onSubmit={(e) => {
              e.preventDefault();
              cart.placeOrder();
            }}
          >
            <fieldset>
              <legend>Contact Info</legend>
              <label>
                Name
                <input type="text" required placeholder="John Doe" />
              </label>
              <label>
                Phone
                <input type="tel" required placeholder="(555) 123-4567" />
              </label>
            </fieldset>

            <fieldset>
              <legend>Payment</legend>
              <label class="radio-label">
                <input type="radio" name="payment" value="card" checked />
                Credit / Debit Card
              </label>
              <label class="radio-label">
                <input type="radio" name="payment" value="cash" />
                Cash on Delivery
              </label>
            </fieldset>

            <div class="checkout-total">
              <span>Order Total</span>
              <strong>${grandTotal().toFixed(2)}</strong>
            </div>

            <button type="submit" class="btn btn-primary btn-full">
              Place Order
            </button>
          </form>
        </div>
      </div>
    </Show>
  );
}
