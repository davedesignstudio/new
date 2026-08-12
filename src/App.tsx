import { Show } from 'solid-js'
import Header from './components/Header'
import Hero from './components/Hero'
import MenuSection from './components/MenuSection'
import Tracker from './components/Tracker'
import Footer from './components/Footer'
import PizzaBuilder from './components/PizzaBuilder'
import CartDrawer from './components/CartDrawer'
import { showConfirmation, setShowConfirmation } from './store'
import './App.css'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <MenuSection />
        <Tracker />
      </main>
      <Footer />
      <PizzaBuilder />
      <CartDrawer />
      <Show when={showConfirmation()}>
        <div class="toast" role="status">
          <div class="toast__card">
            <h2>Order confirmed!</h2>
            <p>Your pizza is in the oven. Check the tracker for live updates.</p>
            <button type="button" class="btn btn--blue" onClick={() => setShowConfirmation(false)}>
              Keep Browsing
            </button>
          </div>
        </div>
      </Show>
    </>
  )
}
