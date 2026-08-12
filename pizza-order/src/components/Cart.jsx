import {
  cart,
  cartTotal,
  cartCount,
  currentStep,
  setCurrentStep,
  updateQuantity,
  removeFromCart,
} from '../stores/orderStore';

export default function Cart() {
  const deliveryFee = () => (cartCount() > 0 ? 3.99 : 0);
  const orderTotal = () => cartTotal() + deliveryFee();

  const goToCheckout = () => setCurrentStep('checkout');

  return (
    <aside class="cart-panel" aria-label="Your order">
      <div class="cart-header">
        <h2>Your Order</h2>
        <span class="cart-item-count">{cartCount()} items</span>
      </div>

      <div class="cart-items">
        {cart().length === 0 ? (
          <div class="cart-empty">
            <span class="empty-icon">🍕</span>
            <p>Your cart is empty</p>
            <p class="empty-hint">Add pizzas, sides, or drinks to get started</p>
          </div>
        ) : (
          cart().map((item) => (
            <div class="cart-item" key={item.id}>
              <div class="cart-item-details">
                <h3>{item.name}</h3>
                {item.description && <p class="cart-item-desc">{item.description}</p>}
                <span class="cart-item-price">${(item.totalPrice * item.quantity).toFixed(2)}</span>
              </div>
              <div class="cart-item-actions">
                <div class="quantity-control qty-sm">
                  <button
                    type="button"
                    class="qty-btn"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span class="qty-value">{item.quantity}</span>
                  <button
                    type="button"
                    class="qty-btn"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
                <button
                  type="button"
                  class="remove-btn"
                  onClick={() => removeFromCart(item.id)}
                  aria-label="Remove item"
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {cart().length > 0 && (
        <div class="cart-summary">
          <div class="summary-row">
            <span>Subtotal</span>
            <span>${cartTotal().toFixed(2)}</span>
          </div>
          <div class="summary-row">
            <span>Delivery Fee</span>
            <span>${deliveryFee().toFixed(2)}</span>
          </div>
          <div class="summary-row total-row">
            <span>Total</span>
            <span>${orderTotal().toFixed(2)}</span>
          </div>

          {currentStep() !== 'checkout' && (
            <button type="button" class="btn-primary btn-lg checkout-btn" onClick={goToCheckout}>
              Checkout
            </button>
          )}
        </div>
      )}
    </aside>
  );
}
