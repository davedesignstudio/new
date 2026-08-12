import { createSignal, For, Show } from 'solid-js';
import { useCart } from '../store/cart';
import { formatPrice } from '../data/menu';

export default function Cart() {
  const cart = useCart();
  const [couponCode, setCouponCode] = createSignal('');
  const [couponMessage, setCouponMessage] = createSignal('');
  const [showCheckout, setShowCheckout] = createSignal(false);
  const [orderPlaced, setOrderPlaced] = createSignal(false);

  function handleApplyCoupon() {
    const result = cart.applyCoupon(couponCode());
    setCouponMessage(result.message);
  }

  function handlePlaceOrder() {
    setOrderPlaced(true);
    setTimeout(() => {
      cart.clearCart();
      cart.setIsOpen(false);
      setShowCheckout(false);
      setOrderPlaced(false);
    }, 3000);
  }

  return (
    <>
      <div
        class={`cart-overlay ${cart.isOpen() ? 'open' : ''}`}
        onClick={() => cart.setIsOpen(false)}
      />

      <aside class={`cart-panel ${cart.isOpen() ? 'open' : ''}`}>
        <div class="cart-header">
          <h2 class="cart-title">Your Order</h2>
          <button class="cart-close" onClick={() => cart.setIsOpen(false)} aria-label="Close cart">
            ✕
          </button>
        </div>

        <div class="cart-order-type">
          <span class={`cart-type-badge ${cart.orderType()}`}>
            {cart.orderType() === 'delivery' ? '🚗 Delivery' : '🏪 Carryout'}
          </span>
        </div>

        <Show
          when={cart.items().length > 0}
          fallback={
            <div class="cart-empty">
              <span class="cart-empty-icon">🍕</span>
              <p>Your cart is empty</p>
              <p class="cart-empty-hint">Add some delicious items to get started!</p>
            </div>
          }
        >
          <ul class="cart-items">
            <For each={cart.items()}>
              {(item) => (
                <li class="cart-item">
                  <img src={item.image} alt={item.name} class="cart-item-image" />
                  <div class="cart-item-details">
                    <h4 class="cart-item-name">{item.name}</h4>
                    <Show when={item.customizations}>
                      <ul class="cart-item-customizations">
                        <Show when={item.customizations.size}>
                          <li>{item.customizations.size}</li>
                        </Show>
                        <Show when={item.customizations.crust}>
                          <li>{item.customizations.crust}</li>
                        </Show>
                        <Show when={item.customizations.toppings?.length > 0}>
                          <li>{item.customizations.toppings.join(', ')}</li>
                        </Show>
                      </ul>
                    </Show>
                    <div class="cart-item-actions">
                      <div class="quantity-control small">
                        <button onClick={() => cart.updateQuantity(item.id, item.quantity - 1)}>
                          −
                        </button>
                        <span>{item.quantity}</span>
                        <button onClick={() => cart.updateQuantity(item.id, item.quantity + 1)}>
                          +
                        </button>
                      </div>
                      <span class="cart-item-price">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  </div>
                  <button
                    class="cart-item-remove"
                    onClick={() => cart.removeItem(item.id)}
                    aria-label="Remove item"
                  >
                    🗑️
                  </button>
                </li>
              )}
            </For>
          </ul>

          <div class="coupon-section">
            <div class="coupon-input-row">
              <input
                type="text"
                placeholder="Enter coupon code"
                value={couponCode()}
                onInput={(e) => setCouponCode(e.target.value)}
                class="coupon-input"
              />
              <button class="coupon-btn" onClick={handleApplyCoupon}>
                Apply
              </button>
            </div>
            <Show when={couponMessage()}>
              <p class={`coupon-message ${cart.appliedCoupon() ? 'success' : 'error'}`}>
                {couponMessage()}
              </p>
            </Show>
            <p class="coupon-hint">Try: PIZZA50, FREEDRINK, WINGS10</p>
          </div>

          <div class="cart-summary">
            <div class="summary-row">
              <span>Subtotal</span>
              <span>{formatPrice(cart.subtotal())}</span>
            </div>
            <Show when={cart.discount() > 0}>
              <div class="summary-row discount">
                <span>Discount</span>
                <span>−{formatPrice(cart.discount())}</span>
              </div>
            </Show>
            <Show when={cart.deliveryFee() > 0}>
              <div class="summary-row">
                <span>Delivery Fee</span>
                <span>{formatPrice(cart.deliveryFee())}</span>
              </div>
            </Show>
            <div class="summary-row">
              <span>Tax</span>
              <span>{formatPrice(cart.tax())}</span>
            </div>
            <div class="summary-row total">
              <span>Total</span>
              <span>{formatPrice(cart.total())}</span>
            </div>
          </div>

          <button class="btn-primary btn-full checkout-btn" onClick={() => setShowCheckout(true)}>
            Checkout — {formatPrice(cart.total())}
          </button>
        </Show>
      </aside>

      <Show when={showCheckout()}>
        <div class="modal-overlay" onClick={() => !orderPlaced() && setShowCheckout(false)}>
          <div class="modal checkout-modal" onClick={(e) => e.stopPropagation()}>
            <Show
              when={!orderPlaced()}
              fallback={
                <div class="order-success">
                  <span class="success-icon">✅</span>
                  <h2>Order Placed!</h2>
                  <p>
                    Your order is being prepared.
                    {cart.orderType() === 'delivery'
                      ? ' Estimated delivery: 30-45 minutes.'
                      : ' Ready for pickup in 15-20 minutes.'}
                  </p>
                </div>
              }
            >
              <h2 class="checkout-title">Complete Your Order</h2>

              <form class="checkout-form" onSubmit={(e) => { e.preventDefault(); handlePlaceOrder(); }}>
                <Show when={cart.orderType() === 'delivery'}>
                  <div class="form-group">
                    <label>Delivery Address</label>
                    <input type="text" defaultValue={cart.storeAddress()} required />
                  </div>
                  <div class="form-group">
                    <label>Apartment / Suite (optional)</label>
                    <input type="text" placeholder="Apt 4B" />
                  </div>
                </Show>

                <div class="form-row">
                  <div class="form-group">
                    <label>First Name</label>
                    <input type="text" required />
                  </div>
                  <div class="form-group">
                    <label>Last Name</label>
                    <input type="text" required />
                  </div>
                </div>

                <div class="form-group">
                  <label>Phone Number</label>
                  <input type="tel" placeholder="(555) 123-4567" required />
                </div>

                <div class="form-group">
                  <label>Email</label>
                  <input type="email" placeholder="you@email.com" required />
                </div>

                <div class="form-group">
                  <label>Payment Method</label>
                  <div class="payment-options">
                    <label class="payment-option">
                      <input type="radio" name="payment" value="card" checked />
                      <span>💳 Credit / Debit Card</span>
                    </label>
                    <label class="payment-option">
                      <input type="radio" name="payment" value="cash" />
                      <span>💵 Cash {cart.orderType() === 'delivery' ? 'on Delivery' : 'at Pickup'}</span>
                    </label>
                  </div>
                </div>

                <div class="checkout-total">
                  <span>Order Total</span>
                  <span class="checkout-total-price">{formatPrice(cart.total())}</span>
                </div>

                <button type="submit" class="btn-primary btn-full">
                  Place Order — {formatPrice(cart.total())}
                </button>
              </form>
            </Show>
          </div>
        </div>
      </Show>
    </>
  );
}
