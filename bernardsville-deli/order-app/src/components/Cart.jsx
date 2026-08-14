import { For, Show } from 'solid-js';
import { formatPrice } from '../data/menu';
import { SCENE_VARIANTS, getItemVariantById } from '../data/images';
import { useCart } from '../store/cart';
import FrescoArt from '../art/FrescoArt';

function formatOptions(options) {
  if (!options) return null;
  const parts = [];
  if (options.size) parts.push(options.size);
  if (options.crust) parts.push(options.crust.replace(/-/g, ' '));
  if (options.cheese && options.cheese !== 'normale') parts.push(`cheese ${options.cheese}`);
  return parts.join(' · ');
}

export default function Cart() {
  const cart = useCart();
  const tax = () => cart.subtotal() * 0.06625;
  const total = () => cart.subtotal() + tax();

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
          <span class="cart-order-thumb fresco-frame fresco-frame--round">
            <FrescoArt
              class="cart-order-art"
              variant={cart.orderType() === 'delivery' ? SCENE_VARIANTS.delivery : SCENE_VARIANTS.carryout}
              type="scene"
            />
          </span>
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
                <div class="cart-empty-art fresco-frame">
                  <FrescoArt
                    class="cart-empty-illustration"
                    variant={SCENE_VARIANTS.emptyCart}
                    type="food"
                  />
                </div>
                <p>Your cart is empty. Build a stone-oven pizza!</p>
              </div>
            }
          >
            <For each={cart.items()}>
              {(line) => (
                <div class="cart-item">
                  <span class="cart-item-thumb fresco-frame">
                    <FrescoArt
                      class="cart-item-art"
                      variant={getItemVariantById(line.itemId)}
                      type="food"
                      label={line.name}
                    />
                  </span>
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
