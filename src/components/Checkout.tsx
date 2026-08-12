import { Show, createSignal, onMount } from 'solid-js'
import { money } from '../data/menu'
import { store } from '../store/cart'
import './Checkout.css'

export default function Checkout() {
  const [entered, setEntered] = createSignal(false)
  const [name, setName] = createSignal('')
  const [phone, setPhone] = createSignal('')
  const [address, setAddress] = createSignal(store.storeAddress())
  const [note, setNote] = createSignal('')
  const [error, setError] = createSignal('')

  onMount(() => requestAnimationFrame(() => setEntered(true)))

  const submit = (e: Event) => {
    e.preventDefault()
    if (!name().trim() || !phone().trim()) {
      setError('Add your name and phone so we can confirm the order.')
      return
    }
    if (store.orderType() === 'delivery' && !address().trim()) {
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
            <input value={name()} onInput={(e) => setName(e.currentTarget.value)} placeholder="Alex Rivera" autocomplete="name" />
          </label>
          <label>
            Phone
            <input value={phone()} onInput={(e) => setPhone(e.currentTarget.value)} placeholder="(555) 010-4820" autocomplete="tel" />
          </label>
          <Show when={store.orderType() === 'delivery'}>
            <label>
              Delivery address
              <input
                value={address()}
                onInput={(e) => setAddress(e.currentTarget.value)}
                placeholder="Street, city, ZIP"
                autocomplete="street-address"
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
              value={note()}
              onInput={(e) => setNote(e.currentTarget.value)}
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
