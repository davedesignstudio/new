import { For, Show } from 'solid-js';
import { formatPrice } from '../data/menu';
import { FALLBACK_FOOD_PHOTO, STONE_OVEN_PHOTO, resolveLinePhoto } from '../data/photos';
import { useCart } from '../store/cart';

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

        <div class="cart-items">
          <Show
            when={cart.items().length > 0}
            fallback={
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

          <div class="cart-footer">
            <button type="button" class="btn-checkout">
              Place order — {formatPrice(total())}
            </button>
            <button type="button" class="btn-clear" onClick={() => cart.clearCart()}>
              Clear cart
            </button>
          </div>
        </Show>
      </aside>
    </>
  );
}
