import type { Component } from 'solid-js'
import { cartStore } from '../store/cart'
import { menuItems } from '../data/menu'

export const Hero: Component = () => {
  const { openBuilder, setOrderType } = cartStore
  const byo = menuItems.find((i) => i.id === 'byo')!

  return (
    <section class="hero" id="top" aria-label="Start your order">
      <div class="hero-media" aria-hidden="true" />
      <div class="hero-content">
        <h1 class="hero-brand">
          Domino<em>'s</em>
        </h1>
        <p class="hero-copy">
          Hot pizza, chicken, sides & more — customized your way and tracked to
          your door.
        </p>
        <div class="hero-ctas">
          <button type="button" class="btn btn-primary" onClick={() => openBuilder(byo)}>
            Build Your Own Pizza
          </button>
          <button
            type="button"
            class="btn btn-ghost"
            onClick={() => {
              setOrderType('carryout')
              document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            Start Carryout Order
          </button>
        </div>
      </div>
    </section>
  )
}
