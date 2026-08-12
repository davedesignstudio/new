import { For, createMemo } from 'solid-js'
import { orderPlaced, cartCount } from '../store'
import './Tracker.css'

const stages = [
  { id: 'placed', label: 'Order Placed' },
  { id: 'prep', label: 'Prep' },
  { id: 'bake', label: 'Bake' },
  { id: 'quality', label: 'Quality Check' },
  { id: 'out', label: 'Out for Delivery' },
]

export default function Tracker() {
  const activeIndex = createMemo(() => {
    if (orderPlaced()) return 4
    if (cartCount() > 0) return 0
    return -1
  })

  return (
    <section class="tracker" id="tracker" aria-labelledby="tracker-heading">
      <div class="tracker__inner">
        <div class="tracker__copy">
          <p class="tracker__eyebrow">Pizza Tracker®</p>
          <h2 id="tracker-heading">Follow every step</h2>
          <p>
            {orderPlaced()
              ? 'Your order is on the way. Sit back — hot pizza is almost there.'
              : 'Place an order to light up the tracker from prep to delivery.'}
          </p>
        </div>

        <ol class="tracker__stages">
          <For each={stages}>
            {(stage, i) => {
              const state = () => {
                const active = activeIndex()
                if (active < 0) return ''
                if (i() < active) return 'is-done'
                if (i() === active) return 'is-active'
                return ''
              }
              return (
                <li class={`tracker__stage ${state()}`}>
                  <span class="tracker__dot" aria-hidden="true" />
                  <span class="tracker__label">{stage.label}</span>
                </li>
              )
            }}
          </For>
        </ol>
      </div>
    </section>
  )
}
