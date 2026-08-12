import { createSignal, Show } from 'solid-js'
import { useCart } from '../store/cart'
import type { OrderType } from '../store/cart'

export function OrderStart() {
  const cart = useCart()
  const [step, setStep] = createSignal<'choose' | 'address'>('choose')
  const [pending, setPending] = createSignal<Exclude<OrderType, null>>('delivery')
  const [address, setAddress] = createSignal('1247 Oak Avenue, Apt 4B')

  function pick(type: Exclude<OrderType, null>) {
    setPending(type)
    if (type === 'delivery') {
      setStep('address')
    } else {
      cart.setOrderType('carryout')
    }
  }

  return (
    <Show when={!cart.state.orderType}>
      <div class="order-start" role="dialog" aria-labelledby="start-title">
        <div class="order-start-bg" aria-hidden="true" />
        <div class="order-start-panel">
          <div class="order-start-brand">
            <span class="brand-mark large" aria-hidden="true">
              <span class="dot" />
              <span class="dot" />
            </span>
            <h1 id="start-title" class="order-start-title">
              PieDash
            </h1>
          </div>
          <p class="order-start-sub">Pizza delivery & carryout — start your order</p>

          <Show
            when={step() === 'choose'}
            fallback={
              <form
                class="address-form"
                onSubmit={(e) => {
                  e.preventDefault()
                  cart.setOrderType(pending(), address())
                }}
              >
                <label for="addr">Delivery address</label>
                <input
                  id="addr"
                  type="text"
                  value={address()}
                  onInput={(e) => setAddress(e.currentTarget.value)}
                  placeholder="Street, city, apt"
                  required
                />
                <div class="address-actions">
                  <button type="button" class="ghost-btn dark" onClick={() => setStep('choose')}>
                    Back
                  </button>
                  <button type="submit" class="primary-btn">
                    Find stores
                  </button>
                </div>
              </form>
            }
          >
            <div class="order-type-grid">
              <button type="button" class="order-type-card delivery" onClick={() => pick('delivery')}>
                <span class="ot-icon" aria-hidden="true">
                  <svg viewBox="0 0 48 48" width="40" height="40">
                    <path fill="currentColor" d="M8 34h4l2-6h16l3 6h5l-4-12H14l-2-6H6v4h4l4 14zm8-16 3 8h10l2-8H16z" />
                    <circle fill="currentColor" cx="16" cy="38" r="3" />
                    <circle fill="currentColor" cx="34" cy="38" r="3" />
                  </svg>
                </span>
                <span class="ot-label">Delivery</span>
                <span class="ot-hint">Hot to your door</span>
              </button>
              <button type="button" class="order-type-card carryout" onClick={() => pick('carryout')}>
                <span class="ot-icon" aria-hidden="true">
                  <svg viewBox="0 0 48 48" width="40" height="40">
                    <path fill="currentColor" d="M10 18h28v4H10zm2 6h24l-2 14H14L12 24zm8-12h8l2 4H18l2-4z" />
                  </svg>
                </span>
                <span class="ot-label">Carryout</span>
                <span class="ot-hint">Skip the wait — pick up</span>
              </button>
            </div>
          </Show>
        </div>
      </div>
    </Show>
  )
}
