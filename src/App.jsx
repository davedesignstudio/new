import { createSignal, For, Show, onMount } from 'solid-js'
import { useCart } from './store/cart'
import {
  categories,
  deals,
  pizzas,
  wings,
  sides,
  desserts,
  drinks,
} from './data/menu'
import Header from './components/Header'
import Hero from './components/Hero'
import CategoryNav from './components/CategoryNav'
import DealCard from './components/DealCard'
import MenuCard from './components/MenuCard'
import PizzaBuilder from './components/PizzaBuilder'
import CartDrawer from './components/CartDrawer'
import Footer from './components/Footer'
import './App.css'

function App() {
  const cart = useCart()
  const [activeCategory, setActiveCategory] = createSignal('pizza')
  const [scrolled, setScrolled] = createSignal(false)

  onMount(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  })

  function scrollToCategory(id) {
    setActiveCategory(id)
    const el = document.getElementById(`section-${id}`)
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 120
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  function openPizza(pizza) {
    cart.setBuilderItem(pizza)
  }

  function addSimple(item) {
    cart.addItem({
      name: item.name,
      basePrice: item.basePrice,
      sizePrice: 0,
      sizeLabel: null,
      crust: null,
      sauce: null,
      toppings: [],
      image: item.image,
      qty: 1,
    })
  }

  return (
    <div class="app" classList={{ 'cart-open': cart.cartOpen() }}>
      <Header
        scrolled={scrolled()}
        onOpenCart={() => cart.setCartOpen(true)}
        onNavigate={scrollToCategory}
      />

      <main>
        <Hero
          orderType={cart.orderType()}
          onOrderType={cart.setOrderType}
          onStart={() => scrollToCategory('pizza')}
        />

        <CategoryNav
          categories={categories}
          active={activeCategory()}
          onSelect={scrollToCategory}
        />

        <section id="section-deals" class="section deals-section">
          <div class="section-inner">
            <header class="section-head">
              <h2>Hot Deals</h2>
              <p>Limited-time savings made for sharing — or not.</p>
            </header>
            <div class="deals-grid">
              <For each={deals}>{(deal) => <DealCard deal={deal} />}</For>
            </div>
          </div>
        </section>

        <section id="section-pizza" class="section">
          <div class="section-inner">
            <header class="section-head">
              <h2>Pizza</h2>
              <p>Build it your way or pick a classic favorite.</p>
            </header>
            <button
              type="button"
              class="build-own"
              onClick={() =>
                openPizza({
                  id: 'byo',
                  name: 'Build Your Own',
                  desc: 'Start with cheese and make it yours',
                  basePrice: 10.99,
                  image:
                    'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
                  defaultToppings: [],
                  tags: [],
                })
              }
            >
              <span class="build-own__icon" aria-hidden="true">+</span>
              <span>
                <strong>Build Your Own Pizza</strong>
                <em>Choose size, crust, sauce & toppings</em>
              </span>
            </button>
            <div class="menu-grid">
              <For each={pizzas}>
                {(pizza) => (
                  <MenuCard
                    item={pizza}
                    cta="Customize"
                    onAction={() => openPizza(pizza)}
                  />
                )}
              </For>
            </div>
          </div>
        </section>

        <section id="section-wings" class="section section--alt">
          <div class="section-inner">
            <header class="section-head">
              <h2>Wings & More</h2>
              <p>Crispy, saucy, ready for the table.</p>
            </header>
            <div class="menu-grid">
              <For each={wings}>
                {(item) => (
                  <MenuCard item={item} cta="Add to Order" onAction={() => addSimple(item)} />
                )}
              </For>
            </div>
          </div>
        </section>

        <section id="section-sides" class="section">
          <div class="section-inner">
            <header class="section-head">
              <h2>Sides</h2>
              <p>The supporting cast your pizza deserves.</p>
            </header>
            <div class="menu-grid">
              <For each={sides}>
                {(item) => (
                  <MenuCard item={item} cta="Add to Order" onAction={() => addSimple(item)} />
                )}
              </For>
            </div>
          </div>
        </section>

        <section id="section-desserts" class="section section--alt">
          <div class="section-inner">
            <header class="section-head">
              <h2>Desserts</h2>
              <p>Save room — or don't.</p>
            </header>
            <div class="menu-grid">
              <For each={desserts}>
                {(item) => (
                  <MenuCard item={item} cta="Add to Order" onAction={() => addSimple(item)} />
                )}
              </For>
            </div>
          </div>
        </section>

        <section id="section-drinks" class="section">
          <div class="section-inner">
            <header class="section-head">
              <h2>Drinks</h2>
              <p>Ice-cold companions for every slice.</p>
            </header>
            <div class="menu-grid menu-grid--narrow">
              <For each={drinks}>
                {(item) => (
                  <MenuCard item={item} cta="Add to Order" onAction={() => addSimple(item)} />
                )}
              </For>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <Show when={cart.builderItem()}>
        <PizzaBuilder
          pizza={cart.builderItem()}
          onClose={() => cart.setBuilderItem(null)}
          onAdd={(configured) => {
            cart.addItem(configured)
            cart.setBuilderItem(null)
          }}
        />
      </Show>

      <CartDrawer />

      <button
        type="button"
        class="fab-cart"
        classList={{ pulse: cart.flyPulse() }}
        onClick={() => cart.setCartOpen(true)}
        aria-label="Open cart"
      >
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
          <path
            fill="currentColor"
            d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM7.2 14h9.5c.8 0 1.5-.5 1.8-1.2l3.3-7.5A1 1 0 0 0 20.9 4H5.2L4.3 2H1v2h2l3.6 7.6L5.2 14c-.2.4-.2.9 0 1.3.3.5.8.7 1.3.7H19v-2H7.4l.8-1.5z"
          />
        </svg>
        <Show when={cart.itemCount() > 0}>
          <span class="fab-cart__count">{cart.itemCount()}</span>
        </Show>
      </button>
    </div>
  )
}

export default App
