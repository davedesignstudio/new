import { createSignal, Show } from 'solid-js'
import { CartProvider, useCart } from './store/cart'
import { Header } from './components/Header'
import { OrderStart } from './components/OrderStart'
import { MenuPage } from './components/MenuPage'
import { PizzaBuilder } from './components/PizzaBuilder'
import { CartDrawer } from './components/CartDrawer'
import type { CategoryId } from './data/menu'
import './App.css'

function Shell() {
  const cart = useCart()
  const [category, setCategory] = createSignal<CategoryId>('pizza')

  return (
    <>
      <OrderStart />
      <Show when={cart.state.orderType}>
        <Header />
        <MenuPage category={category()} onCategory={setCategory} />
        <footer class="site-footer">
          <div class="brand-mark small" aria-hidden="true">
            <span class="dot" />
            <span class="dot" />
          </div>
          <p>
            <strong>PieDash</strong> — demo pizza ordering UI inspired by Domino’s digital flow. Not affiliated with
            Domino’s Pizza.
          </p>
        </footer>
      </Show>
      <PizzaBuilder />
      <CartDrawer />
    </>
  )
}

export default function App() {
  return (
    <CartProvider>
      <Shell />
    </CartProvider>
  )
}
