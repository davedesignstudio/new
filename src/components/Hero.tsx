import { Show } from 'solid-js'
import { openBuilder, serviceMethod } from '../store/cart'
import { Button } from './ui'

export function Hero() {
  return (
    <section class="hero" id="top" aria-label="Order pizza online">
      <div class="hero-media" aria-hidden="true">
        <img
          src="https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=1800&q=80"
          alt=""
        />
        <div class="hero-scrim" />
      </div>

      <div class="hero-content">
        <p class="hero-brand">NINO'S</p>
        <h1>
          Hot pizza.
          <br />
          Tracked to your door.
        </h1>
        <p class="hero-lede">
          <Show
            when={serviceMethod() === 'delivery'}
            fallback="Carryout in as little as 15 minutes — skip the line, grab and go."
          >
            Delivery in 30 minutes or less from your local store. Build it your way.
          </Show>
        </p>
        <div class="hero-ctas">
          <Button onClick={() => openBuilder()}>Build Your Own</Button>
          <Button variant="secondary" onClick={() => document.getElementById('specialty')?.scrollIntoView({ behavior: 'smooth' })}>
            View Menu
          </Button>
        </div>
      </div>
    </section>
  )
}
