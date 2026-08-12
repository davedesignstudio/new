import type { Component } from 'solid-js'
import { For } from 'solid-js'
import { deals, menuItems } from '../data/menu'
import { cartStore } from '../store/cart'

export const DealsSection: Component = () => {
  const { openBuilder, setOrderType } = cartStore
  const byo = menuItems.find((i) => i.id === 'byo')!

  function handleDeal(id: string) {
    if (id === 'carryout') {
      setOrderType('carryout')
      document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })
      return
    }
    openBuilder(byo)
  }

  return (
    <section class="section" id="deals" aria-labelledby="deals-title">
      <div class="section-head">
        <div>
          <h2 class="section-title" id="deals-title">
            Featured Deals
          </h2>
          <p class="section-sub">Limited-time offers to stack with your favorites.</p>
        </div>
      </div>
      <div class="deals-track">
        <For each={deals}>
          {(deal) => (
            <button type="button" class="deal" onClick={() => handleDeal(deal.id)}>
              <span class="deal-kicker">Offer</span>
              <h3>{deal.title}</h3>
              <p>{deal.subtitle}</p>
              <span class="deal-cta">{deal.cta}</span>
            </button>
          )}
        </For>
      </div>
    </section>
  )
}
