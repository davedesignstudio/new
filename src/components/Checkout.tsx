import { Show, createSignal, onMount } from 'solid-js'
import { money } from '../data/menu'
import { store } from '../store/cart'
import './Checkout.css'

export default function Checkout() {
  const [entered, setEntered] = createSignal(false)
  const [error, setError] = createSignal('')

  onMount(() => requestAnimationFrame(() => setEntered(true)))

  const submit = (e: Event) => {
    e.preventDefault()
    const form = e.currentTarget as HTMLFormElement
    const data = new FormData(form)
    const name = String(data.get('name') ?? '').trim()
    const phone = String(data.get('phone') ?? '').trim()
    const address = String(data.get('address') ?? '').trim()

    if (!name || !phone) {
      setError('Add your name and phone so we can confirm the order.')
      return
    }
    if (store.orderType() === 'delivery' && !address) {
      setError('Delivery needs a street address.')
      return
    }
    setError('')
    store.placeOrder()
  }

  return (
    <div class="checkout-overlay" classList={{ 'is-open': entered() }} role="dialog" aria-modal="true" aria-label="Checkout">
      <button
        type="button"
        class="checkout-overlay__backdrop"
        aria-label="Close checkout"
        onClick={() => store.setCheckoutOpen(false)}
      />
      <div class="checkout">
        <header class="checkout__header">
          <h2>Checkout</h2>
          <p>
            {store.orderType() === 'delivery' ? 'Delivery' : 'Carryout'} · {store.itemCount()} item
            {store.itemCount() === 1 ? '' : 's'} · {money(store.total())}
          </p>
        </header>

        <form class="checkout__form" onSubmit={submit}>
          <label>
            Name
            <input name="name" placeholder="Alex Rivera" autocomplete="name" required />
          </label>
          <label>
            Phone
            <input name="phone" placeholder="(555) 010-4820" autocomplete="tel" required />
          </label>
          <Show when={store.orderType() === 'delivery'}>
            <label>
              Delivery address
              <input
                name="address"
                value={store.storeAddress()}
                onInput={(e) => store.setStoreAddress(e.currentTarget.value)}
                placeholder="Street, city, ZIP"
                autocomplete="street-address"
                required
              />
            </label>
          </Show>
          <Show when={store.orderType() === 'carryout'}>
            <div class="checkout__pickup">
              <strong>Pickup store</strong>
              <p>{store.storeAddress()}</p>
            </div>
          </Show>
          <label>
            Order notes
            <textarea
              name="note"
              placeholder="Gate code, extra napkins, well-done crust…"
              rows={3}
            />
          </label>

          <Show when={error()}>
            <p class="checkout__error" role="alert">{error()}</p>
          </Show>

          <div class="checkout__actions">
            <button type="button" class="btn btn--ghost-dark" onClick={() => store.setCheckoutOpen(false)}>
              Back
            </button>
            <button type="submit" class="btn btn--red">
              Place order
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
