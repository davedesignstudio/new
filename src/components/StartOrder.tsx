import { store } from '../store/cart'
import type { OrderType } from '../data/menu'
import './StartOrder.css'

export default function StartOrder() {
  const start = (type: OrderType) => {
    store.setOrderType(type)
    store.setStoreAddress(
      type === 'delivery' ? '214 Main St · Downtown' : 'HOTBOX #482 · 88 Oak Ave',
    )
    requestAnimationFrame(() => {
      document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })
    })
  }

  return (
    <section class="start-order" id="top">
      <div class="start-order__bg" aria-hidden="true" />
      <div class="start-order__content">
        <p class="start-order__eyebrow">Online ordering</p>
        <h1 class="start-order__brand">HOTBOX</h1>
        <p class="start-order__tagline">
          Build it your way — crust, size, toppings — then track it to your door.
        </p>
        <div class="start-order__actions">
          <button type="button" class="btn btn--red" onClick={() => start('delivery')}>
            Delivery
          </button>
          <button type="button" class="btn btn--blue" onClick={() => start('carryout')}>
            Carryout
          </button>
        </div>
      </div>
      <div class="start-order__visual" aria-hidden="true">
        <div class="pizza-hero">
          <div class="pizza-hero__crust" />
          <div class="pizza-hero__cheese" />
          <span class="pizza-hero__topping pizza-hero__topping--1" />
          <span class="pizza-hero__topping pizza-hero__topping--2" />
          <span class="pizza-hero__topping pizza-hero__topping--3" />
          <span class="pizza-hero__topping pizza-hero__topping--4" />
          <span class="pizza-hero__topping pizza-hero__topping--5" />
        </div>
      </div>
    </section>
  )
}
