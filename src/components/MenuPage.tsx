import { For, createMemo } from 'solid-js'
import { useCart } from '../store/cart'
import type { PizzaConfig } from '../store/cart'
import { DEALS, SPECIALTY_PIZZAS, SIDES, CATEGORIES, type CategoryId } from '../data/menu'
import { PizzaArt } from './PizzaArt'

interface Props {
  category: CategoryId
  onCategory: (id: CategoryId) => void
}

export function MenuPage(props: Props) {
  const cart = useCart()

  const sides = createMemo(() => {
    const cat = props.category
    if (cat === 'sides' || cat === 'chicken' || cat === 'desserts' || cat === 'drinks') {
      return SIDES.filter((s) => s.category === cat)
    }
    return []
  })

  function openSpecialty(id: string) {
    const pizza = SPECIALTY_PIZZAS.find((p) => p.id === id)!
    const sauces = pizza.defaultToppings.filter((t) =>
      ['robust-sauce', 'hearty-marinara', 'bbq-sauce', 'garlic-parm', 'alfredo'].includes(t),
    )
    const cheeses = pizza.defaultToppings.filter((t) =>
      ['mozzarella', 'cheddar', 'parmesan', 'feta', 'provolone'].includes(t),
    )
    const meats = pizza.defaultToppings.filter((t) =>
      ['pepperoni', 'italian-sausage', 'beef', 'ham', 'bacon', 'chicken', 'philly-steak'].includes(t),
    )
    const veggies = pizza.defaultToppings.filter((t) =>
      [
        'mushrooms',
        'onions',
        'green-peppers',
        'black-olives',
        'spinach',
        'pineapple',
        'jalapenos',
        'tomatoes',
        'banana-peppers',
      ].includes(t),
    )
    const config: Partial<PizzaConfig> = {
      name: pizza.name,
      specialtyId: pizza.id,
      sauce: sauces[0] ?? 'robust-sauce',
      cheeses: cheeses.length ? cheeses : ['mozzarella'],
      meats,
      veggies,
    }
    cart.openBuilder(config)
  }

  return (
    <main class="menu-page" id="menu">
      <section class="hero-strip" aria-label="Start ordering">
        <div class="hero-copy">
          <p class="hero-kicker">
            {cart.state.orderType === 'delivery' ? 'Delivering to' : 'Carryout from'}{' '}
            <strong>{cart.state.address}</strong>
          </p>
          <h2 class="hero-title">Build it your way</h2>
          <p class="hero-sub">Specialty pies, 34 million+ combinations, and deals that actually slap.</p>
          <div class="hero-ctas">
            <button type="button" class="primary-btn" onClick={() => cart.openBuilder()}>
              Build Your Own
            </button>
            <button
              type="button"
              class="secondary-btn"
              onClick={() => {
                props.onCategory('pizza')
                document.getElementById('specialty')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Specialty Pizzas
            </button>
          </div>
        </div>
        <div class="hero-visual" aria-hidden="true">
          <PizzaArt
            sauce="robust-sauce"
            cheeses={['mozzarella']}
            meats={['pepperoni']}
            veggies={['mushrooms', 'green-peppers']}
            large
          />
        </div>
      </section>

      <nav class="menu-tabs" aria-label="Menu categories">
        <For each={CATEGORIES}>
          {(cat) => (
            <button
              type="button"
              class={`menu-tab${props.category === cat.id ? ' active' : ''}`}
              onClick={() => {
                props.onCategory(cat.id)
                const map: Record<string, string> = {
                  deals: 'deals',
                  pizza: 'specialty',
                  build: 'build-cta',
                  sides: 'sides-grid',
                  chicken: 'sides-grid',
                  desserts: 'sides-grid',
                  drinks: 'sides-grid',
                }
                document.getElementById(map[cat.id])?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                if (cat.id === 'build') cart.openBuilder()
              }}
            >
              {cat.label}
            </button>
          )}
        </For>
      </nav>

      <section class="deals-section" id="deals">
        <header class="section-head">
          <h2>Featured deals</h2>
          <p>Lock in savings before you customize.</p>
        </header>
        <div class="deals-rail">
          <For each={DEALS}>
            {(deal) => (
              <article class="deal-tile" style={{ '--deal-accent': deal.accent }}>
                <p class="deal-price">{deal.priceLabel}</p>
                <h3>{deal.title}</h3>
                <p>{deal.subtitle}</p>
                <button
                  type="button"
                  class="text-btn"
                  onClick={() => {
                    props.onCategory('pizza')
                    document.getElementById('specialty')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  Add deal →
                </button>
              </article>
            )}
          </For>
        </div>
      </section>

      <section class="specialty-section" id="specialty">
        <header class="section-head">
          <h2>Specialty pizzas</h2>
          <p>Our bestsellers — customize every topping.</p>
        </header>
        <div class="product-grid">
          <For each={SPECIALTY_PIZZAS}>
            {(pizza) => (
              <article class="product-tile">
                <div class="product-art" style={{ '--hue': `${pizza.imageHue}` }}>
                  <PizzaArt
                    sauce={pizza.defaultToppings.find((t) => t.includes('sauce') || t === 'alfredo' || t === 'garlic-parm') ?? 'robust-sauce'}
                    cheeses={pizza.defaultToppings.filter((t) =>
                      ['mozzarella', 'cheddar', 'parmesan', 'feta', 'provolone'].includes(t),
                    )}
                    meats={pizza.defaultToppings.filter((t) =>
                      ['pepperoni', 'italian-sausage', 'beef', 'ham', 'bacon', 'chicken', 'philly-steak'].includes(t),
                    )}
                    veggies={pizza.defaultToppings.filter((t) =>
                      [
                        'mushrooms',
                        'onions',
                        'green-peppers',
                        'black-olives',
                        'spinach',
                        'pineapple',
                        'jalapenos',
                        'tomatoes',
                        'banana-peppers',
                      ].includes(t),
                    )}
                  />
                  {pizza.badge && <span class="product-badge">{pizza.badge}</span>}
                </div>
                <div class="product-body">
                  <h3>{pizza.name}</h3>
                  <p>{pizza.description}</p>
                  <div class="product-meta">
                    <span class="price">from ${pizza.basePrice.toFixed(2)}</span>
                    <button type="button" class="primary-btn sm" onClick={() => openSpecialty(pizza.id)}>
                      Customize
                    </button>
                  </div>
                </div>
              </article>
            )}
          </For>
        </div>
      </section>

      <section class="build-cta" id="build-cta">
        <div class="build-cta-inner">
          <h2>Build Your Own Pizza</h2>
          <p>Choose crust, size, sauce, cheese, and toppings — over 34 million ways.</p>
          <button type="button" class="primary-btn" onClick={() => cart.openBuilder()}>
            Start building
          </button>
        </div>
      </section>

      <section class="sides-section" id="sides-grid">
        <header class="section-head">
          <h2>
            {props.category === 'chicken'
              ? 'Chicken'
              : props.category === 'desserts'
                ? 'Desserts'
                : props.category === 'drinks'
                  ? 'Drinks'
                  : 'Breads & sides'}
          </h2>
          <p>Round out the order.</p>
        </header>
        <div class="product-grid compact">
          <For
            each={
              sides().length
                ? sides()
                : SIDES.filter((s) => s.category === 'sides')
            }
          >
            {(item) => (
              <article class="product-tile side">
                <div class="side-swatch" style={{ '--hue': `${item.imageHue}` }} aria-hidden="true" />
                <div class="product-body">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <div class="product-meta">
                    <span class="price">${item.price.toFixed(2)}</span>
                    <button
                      type="button"
                      class="primary-btn sm"
                      onClick={() => cart.addSideToCart(item.name, item.price)}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </article>
            )}
          </For>
        </div>
      </section>
    </main>
  )
}
