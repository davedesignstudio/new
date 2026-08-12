import { Show } from 'solid-js'
import Header from './components/Header'
import StartOrder from './components/StartOrder'
import MenuSection from './components/MenuSection'
import PizzaBuilder from './components/PizzaBuilder'
import CartDrawer from './components/CartDrawer'
import Checkout from './components/Checkout'
import { store } from './store/cart'
import './App.css'

function OrderSuccess() {
  return (
    <div class="success" role="status">
      <div class="success__card">
        <div class="success__badge" aria-hidden="true">✓</div>
        <h2>Order placed</h2>
        <p>
          Hotbox is firing up your pie. You’ll get a text when it’s{' '}
          {store.orderType() === 'carryout' ? 'ready for pickup' : 'on the way'}.
        </p>
        <div class="success__tracker" aria-hidden="true">
          <span class="is-done">Received</span>
          <span class="is-active">Prep</span>
          <span>Bake</span>
          <span>{store.orderType() === 'carryout' ? 'Ready' : 'Deliver'}</span>
        </div>
        <button type="button" class="btn btn--blue" onClick={() => store.resetOrder()}>
          Start a new order
        </button>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <div class="app">
      <Header />
      <main>
        <StartOrder />
        <MenuSection />
      </main>
      <footer class="site-footer">
        <div class="site-footer__inner">
          <strong>HOTBOX</strong>
          <span>Domino’s-style ordering demo · Built with SolidJS</span>
        </div>
      </footer>

      <Show when={store.builderItem()}>
        {(item) => <PizzaBuilder item={item()} />}
      </Show>
      <Show when={store.cartOpen()}>
        <CartDrawer />
      </Show>
      <Show when={store.checkoutOpen()}>
        <Checkout />
      </Show>
      <Show when={store.orderPlaced()}>
        <OrderSuccess />
      </Show>
    </div>
  )
}
