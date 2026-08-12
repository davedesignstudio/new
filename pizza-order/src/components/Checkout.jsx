import { createSignal, Show } from 'solid-js';
import {
  cart,
  cartTotal,
  cartCount,
  orderInfo,
  setOrderInfo,
  clearCart,
  setCurrentStep,
} from '../stores/orderStore';

export default function Checkout() {
  const [submitted, setSubmitted] = createSignal(false);
  const [errors, setErrors] = createSignal({});

  const deliveryFee = () => (cartCount() > 0 ? 3.99 : 0);
  const orderTotal = () => cartTotal() + deliveryFee();

  const validate = () => {
    const info = orderInfo();
    const newErrors = {};
    if (!info.name.trim()) newErrors.name = 'Name is required';
    if (!info.phone.trim()) newErrors.phone = 'Phone is required';
    if (info.deliveryType === 'delivery' && !info.address.trim()) {
      newErrors.address = 'Address is required for delivery';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cart().length === 0) return;
    if (!validate()) return;
    setSubmitted(true);
    clearCart();
  };

  return (
    <Show
      when={submitted()}
      fallback={
        <section class="checkout-section">
          <div class="section-header">
            <h1>Checkout</h1>
            <p>Review your order and complete delivery details</p>
          </div>

          {cart().length === 0 ? (
            <div class="checkout-empty">
              <p>Your cart is empty. Add some delicious items first!</p>
              <button type="button" class="btn-primary" onClick={() => setCurrentStep('pizzas')}>
                Browse Pizzas
              </button>
            </div>
          ) : (
            <form class="checkout-form" onSubmit={handleSubmit}>
          <div class="checkout-grid">
            <div class="checkout-details">
              <h2>Delivery Details</h2>

              <div class="delivery-type">
                <button
                  type="button"
                  class={`delivery-btn ${orderInfo().deliveryType === 'delivery' ? 'selected' : ''}`}
                  onClick={() => setOrderInfo((prev) => ({ ...prev, deliveryType: 'delivery' }))}
                >
                  🚗 Delivery
                </button>
                <button
                  type="button"
                  class={`delivery-btn ${orderInfo().deliveryType === 'carryout' ? 'selected' : ''}`}
                  onClick={() => setOrderInfo((prev) => ({ ...prev, deliveryType: 'carryout' }))}
                >
                  🏪 Carryout
                </button>
              </div>

              <div class="form-group">
                <label for="name">Full Name</label>
                <input
                  id="name"
                  type="text"
                  value={orderInfo().name}
                  onInput={(e) => setOrderInfo((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="John Smith"
                />
                {errors().name && <span class="error">{errors().name}</span>}
              </div>

              <div class="form-group">
                <label for="phone">Phone Number</label>
                <input
                  id="phone"
                  type="tel"
                  value={orderInfo().phone}
                  onInput={(e) => setOrderInfo((prev) => ({ ...prev, phone: e.target.value }))}
                  placeholder="(555) 123-4567"
                />
                {errors().phone && <span class="error">{errors().phone}</span>}
              </div>

              {orderInfo().deliveryType === 'delivery' && (
                <div class="form-group">
                  <label for="address">Delivery Address</label>
                  <textarea
                    id="address"
                    rows="3"
                    value={orderInfo().address}
                    onInput={(e) => setOrderInfo((prev) => ({ ...prev, address: e.target.value }))}
                    placeholder="123 Main St, Apt 4, City, State 12345"
                  />
                  {errors().address && <span class="error">{errors().address}</span>}
                </div>
              )}
            </div>

            <div class="checkout-summary">
              <h2>Order Summary</h2>
              <ul class="checkout-items">
                {cart().map((item) => (
                  <li key={item.id}>
                    <span class="checkout-item-name">
                      {item.quantity}x {item.name}
                    </span>
                    <span class="checkout-item-price">
                      ${(item.totalPrice * item.quantity).toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>
              <div class="summary-row">
                <span>Subtotal</span>
                <span>${cartTotal().toFixed(2)}</span>
              </div>
              <div class="summary-row">
                <span>{orderInfo().deliveryType === 'delivery' ? 'Delivery Fee' : 'Carryout'}</span>
                <span>
                  {orderInfo().deliveryType === 'delivery'
                    ? `$${deliveryFee().toFixed(2)}`
                    : 'Free'}
                </span>
              </div>
              <div class="summary-row total-row">
                <span>Total</span>
                <span>${orderTotal().toFixed(2)}</span>
              </div>

              <button type="submit" class="btn-primary btn-lg place-order-btn">
                Place Order — ${orderTotal().toFixed(2)}
              </button>
            </div>
          </div>
            </form>
          )}
        </section>
      }
    >
      <section class="checkout-section success-section">
        <div class="success-card">
          <span class="success-icon">✓</span>
          <h1>Order Placed!</h1>
          <p>Thanks for ordering with Domino's. Your pizza is on its way!</p>
          <p class="success-estimate">Estimated delivery: 25–35 minutes</p>
          <button
            type="button"
            class="btn-primary"
            onClick={() => {
              setSubmitted(false);
              setCurrentStep('pizzas');
              setOrderInfo({ name: '', phone: '', address: '', deliveryType: 'delivery' });
            }}
          >
            Order Again
          </button>
        </div>
      </section>
    </Show>
  );
}
