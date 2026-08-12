import { Show } from 'solid-js'
import { CartDrawer } from './components/CartDrawer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { MenuSections } from './components/MenuSections'
import { PizzaBuilder } from './components/PizzaBuilder'
import { Button } from './components/ui'
import { orderPlaced, setOrderPlaced } from './store/cart'
import './App.css'

export default function App() {
  return (
    <div class="app">
      <Header />
      <main>
        <Hero />
        <section class="deals" aria-label="Current deals">
          <div class="deal-strip">
            <article class="deal">
              <p class="deal-kicker">Mix & Match</p>
              <h2>2 or more $7.99 each</h2>
              <p>Choose medium 2-topping pizzas, bread twists, or oven-baked pastas.</p>
            </article>
            <article class="deal">
              <p class="deal-kicker">Carryout Special</p>
              <h2>$7.99 medium 1-topping</h2>
              <p>Skip the tip — pick up hot and ready at your local Nino's.</p>
            </article>
            <article class="deal">
              <p class="deal-kicker">Late Night</p>
              <h2>Free garlic dips</h2>
              <p>On any large specialty pizza ordered after 9pm.</p>
            </article>
          </div>
        </section>
        <MenuSections />
      </main>

      <footer class="site-footer">
        <div class="footer-brand">NINO'S</div>
        <p>Inspired by classic pizza ordering UX. Demo app built with SolidJS.</p>
      </footer>

      <PizzaBuilder />
      <CartDrawer />

      <Show when={orderPlaced()}>
        <div class="toast-layer" role="status">
          <div class="toast">
            <h3>Order placed!</h3>
            <p>Your pizza is on the make line. Track it from the app.</p>
            <Button onClick={() => setOrderPlaced(false)}>Keep Ordering</Button>
          </div>
        </div>
      </Show>
    </div>
  )
}
