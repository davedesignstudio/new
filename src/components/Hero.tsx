import { fulfillment, setActiveCategory } from '../store'
import './Hero.css'

export default function Hero() {
  return (
    <section class="hero" id="top" aria-labelledby="hero-title">
      <div class="hero__media" aria-hidden="true">
        <img
          src="https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=1600&q=80"
          alt=""
        />
        <div class="hero__scrim" />
      </div>

      <div class="hero__content">
        <p class="hero__eyebrow">Order {fulfillment()} near you</p>
        <h1 id="hero-title" class="hero__brand">
          Domino<span>’</span>s
        </h1>
        <p class="hero__lede">
          Fresh from the oven — build your pizza, grab a deal, and track every bite.
        </p>
        <div class="hero__actions">
          <a
            class="btn btn--red"
            href="#menu"
            onClick={() => setActiveCategory('pizza')}
          >
            Start Your Order
          </a>
          <a
            class="btn btn--ghost"
            href="#menu"
            onClick={() => setActiveCategory('deals')}
          >
            View Deals
          </a>
        </div>
      </div>
    </section>
  )
}
