import { createSignal, For, Show, onMount } from 'solid-js';
import { formatPrice } from '../data/menu';
import { FALLBACK_FOOD_PHOTO, STONE_OVEN_PHOTO, resolveLinePhoto } from '../data/photos';
import { useCart } from '../store/cart';
import { cartLinesToPayload, fetchWooStatus, placeOrder } from '../api/checkout';

function formatOptions(options) {
  if (!options) return null;
  const parts = [];
  if (options.size) parts.push(options.size);
  if (options.crust) parts.push(options.crust.replace(/-/g, ' '));
  if (options.cheese && options.cheese !== 'normale') parts.push(`cheese ${options.cheese}`);
  return parts.join(' · ');
}

function FoodPhoto(props) {
  return (
    <img
      class={props.class}
      src={props.src}
      alt={props.alt ?? ''}
      width={props.width}
      height={props.height}
      onError={(event) => {
        event.currentTarget.src = FALLBACK_FOOD_PHOTO;
      }}
    />
  );
}

export default function Cart() {
  const cart = useCart();
  const tax = () => cart.subtotal() * 0.06625;
  const total = () => cart.subtotal() + tax();
  const lastLine = () => {
    const items = cart.items();
    return items.length ? items[items.length - 1] : null;
  };
  const heroFood = () => {
    const line = lastLine();
    return line ? resolveLinePhoto(line) : FALLBACK_FOOD_PHOTO;
  };
  const heroAlt = () => lastLine()?.name ?? 'Stone-oven pizza';

  const [name, setName] = createSignal('');
  const [phone, setPhone] = createSignal('');
  const [email, setEmail] = createSignal('');
  const [notes, setNotes] = createSignal('');
  const [wooConnected, setWooConnected] = createSignal(false);
  const [submitting, setSubmitting] = createSignal(false);
  const [error, setError] = createSignal('');
  const [receipt, setReceipt] = createSignal(null);

  onMount(async () => {
    try {
      const status = await fetchWooStatus();
      setWooConnected(Boolean(status.connected));
    } catch {
      setWooConnected(false);
    }
  });

  const submitOrder = async (event) => {
    event.preventDefault();
    if (submitting() || cart.items().length === 0) return;
    setError('');
    setSubmitting(true);
    try {
      const result = await placeOrder({
        customer: {
          name: name().trim(),
          phone: phone().trim(),
          email: email().trim(),
          address: cart.address(),
        },
        fulfillment: cart.orderType() === 'delivery' ? 'delivery' : 'pickup',
        orderType: cart.orderType(),
        address: cart.address(),
        notes: notes().trim(),
        payment_method: 'auto',
        items: cartLinesToPayload(cart.items()),
      });

      if (result.payment_url) {
        cart.clearCart();
        window.location.assign(result.payment_url);
        return;
      }

      setReceipt({
        orderId: result.order_id,
        total: result.order?.totals?.total,
        payOnline: false,
        message: wooConnected()
          ? 'Order saved. WooCommerce payment link was not returned — pay at pickup/delivery.'
          : 'Order placed. Pay at pickup or delivery. Connect WooCommerce to take card payments.',
      });
      cart.clearCart();
    } catch (err) {
      setError(err.errors?.join(' ') || err.message || 'Checkout failed.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Show when={cart.cartOpen()}>
        <div
          class="cart-overlay"
          onClick={() => cart.setCartOpen(false)}
          role="presentation"
        />
      </Show>

      <aside
        class="cart-panel"
        classList={{ open: cart.cartOpen() }}
        aria-label="Cart"
      >
        <div class="cart-oven-hero">
          <FoodPhoto
            class="cart-oven-hero-bg"
            src={STONE_OVEN_PHOTO}
            alt="Wood-fired stone pizza oven"
            width={800}
            height={460}
          />
          <FoodPhoto
            class="cart-oven-hero-food"
            src={heroFood()}
            alt={heroAlt()}
            width={224}
            height={224}
          />
          <p class="cart-oven-hero-caption">
            {lastLine() ? lastLine().name : 'From the stone oven'}
          </p>
        </div>

        <div class="cart-header">
          <span class="cart-ornament" aria-hidden="true">❧</span>
          <h2>Your Order</h2>
          <button
            type="button"
            class="btn-close"
            onClick={() => cart.setCartOpen(false)}
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        <div class="cart-order-type">
          <FoodPhoto
            class="cart-order-photo"
            src={STONE_OVEN_PHOTO}
            alt=""
            width={56}
            height={56}
          />
          <span class={`order-badge ${cart.orderType()}`}>
            {cart.orderType() === 'delivery' ? 'Delivery' : 'Pickup'}
          </span>
          <Show when={cart.address()}>
            <span class="cart-address">{cart.address()}</span>
          </Show>
        </div>

        <Show when={receipt()}>
          <div class="cart-receipt" role="status">
            <p class="cart-receipt-title">Order {receipt().orderId}</p>
            <p>{receipt().message}</p>
            <Show when={receipt().total}>
              <p class="cart-receipt-total">Total ${receipt().total}</p>
            </Show>
            <button
              type="button"
              class="btn-clear"
              onClick={() => {
                setReceipt(null);
                cart.setCartOpen(false);
              }}
            >
              Close
            </button>
          </div>
        </Show>

        <div class="cart-items">
          <Show
            when={cart.items().length > 0}
            fallback={
              <Show when={!receipt()}>
                <div class="cart-empty">
                  <FoodPhoto
                    class="cart-empty-photo"
                    src={FALLBACK_FOOD_PHOTO}
                    alt="Stone-oven pizza"
                    width={400}
                    height={280}
                  />
                  <p>Your cart is empty. Build a stone-oven pizza!</p>
                </div>
              </Show>
            }
          >
            <For each={cart.items()}>
              {(line) => (
                <div class="cart-item">
                  <FoodPhoto
                    class="cart-item-photo"
                    src={resolveLinePhoto(line)}
                    alt={line.name}
                    width={160}
                    height={160}
                  />
                  <div class="cart-item-body">
                    <div class="cart-item-info">
                      <h4>{line.name}</h4>
                      <Show when={line.options}>
                        <p class="cart-item-options">{formatOptions(line.options)}</p>
                      </Show>
                      <span class="cart-item-price">{formatPrice(line.price)}</span>
                    </div>
                    <div class="cart-item-actions">
                      <div class="qty-control">
                        <button
                          type="button"
                          aria-label="Decrease quantity"
                          onClick={() => cart.updateQuantity(line.cartId, -1)}
                        >
                          −
                        </button>
                        <span>{line.quantity}</span>
                        <button
                          type="button"
                          aria-label="Increase quantity"
                          onClick={() => cart.updateQuantity(line.cartId, 1)}
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        class="btn-remove"
                        onClick={() => cart.removeItem(line.cartId)}
                        aria-label={`Remove ${line.name}`}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </For>
          </Show>
        </div>

        <Show when={cart.items().length > 0}>
          <div class="cart-summary">
            <div class="summary-row">
              <span>Subtotal</span>
              <span>{formatPrice(cart.subtotal())}</span>
            </div>
            <div class="summary-row">
              <span>NJ tax (6.625%)</span>
              <span>{formatPrice(tax())}</span>
            </div>
            <div class="summary-row total">
              <span>Total</span>
              <span>{formatPrice(total())}</span>
            </div>
          </div>

          <form class="cart-checkout" onSubmit={submitOrder}>
            <p class="cart-pay-note">
              {wooConnected()
                ? 'WooCommerce connected — you will pay securely online after placing the order.'
                : 'Pay at pickup/delivery. Connect WooCommerce (WC_STORE_URL + API keys) for card checkout.'}
            </p>
            <label class="cart-field">
              <span>Name</span>
              <input
                type="text"
                name="name"
                required
                autocomplete="name"
                value={name()}
                onInput={(e) => setName(e.currentTarget.value)}
              />
            </label>
            <label class="cart-field">
              <span>Phone</span>
              <input
                type="tel"
                name="phone"
                required
                autocomplete="tel"
                value={phone()}
                onInput={(e) => setPhone(e.currentTarget.value)}
              />
            </label>
            <label class="cart-field">
              <span>Email</span>
              <input
                type="email"
                name="email"
                autocomplete="email"
                value={email()}
                onInput={(e) => setEmail(e.currentTarget.value)}
              />
            </label>
            <Show when={cart.orderType() === 'delivery'}>
              <label class="cart-field">
                <span>Delivery address</span>
                <input
                  type="text"
                  name="address"
                  required
                  autocomplete="street-address"
                  value={cart.address()}
                  onInput={(e) => cart.setAddress(e.currentTarget.value)}
                />
              </label>
            </Show>
            <label class="cart-field">
              <span>Notes</span>
              <textarea
                name="notes"
                rows="2"
                value={notes()}
                onInput={(e) => setNotes(e.currentTarget.value)}
              />
            </label>

            <Show when={error()}>
              <p class="cart-error" role="alert">{error()}</p>
            </Show>

            <div class="cart-footer">
              <button type="submit" class="btn-checkout" disabled={submitting()}>
                {submitting()
                  ? 'Placing order…'
                  : wooConnected()
                    ? `Pay with WooCommerce — ${formatPrice(total())}`
                    : `Place order — ${formatPrice(total())}`}
              </button>
              <button type="button" class="btn-clear" onClick={() => cart.clearCart()}>
                Clear cart
              </button>
            </div>
          </form>
        </Show>
      </aside>
    </>
  );
}
