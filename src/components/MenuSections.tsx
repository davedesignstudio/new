import { For, Show } from 'solid-js'
import {
  categories,
  formatPrice,
  sidesAndMore,
  specialtyPizzas,
  type MenuItem,
} from '../data/menu'
import { addItemToCart, openBuilder } from '../store/cart'
import { Button, SectionHeading } from './ui'

function SpecialtyCard(props: {
  id: string
  name: string
  description: string
  image: string
  basePrice: number
  badge?: string
}) {
  return (
    <article class="menu-item">
      <button type="button" class="menu-item-media" onClick={() => openBuilder(props.id)}>
        <img src={props.image} alt={props.name} loading="lazy" />
        <Show when={props.badge}>
          <span class="menu-badge">{props.badge}</span>
        </Show>
      </button>
      <div class="menu-item-body">
        <div class="menu-item-top">
          <h3>{props.name}</h3>
          <span class="price">{formatPrice(props.basePrice)}</span>
        </div>
        <p>{props.description}</p>
        <Button class="menu-add" onClick={() => openBuilder(props.id)}>
          Customize
        </Button>
      </div>
    </article>
  )
}

function SimpleCard(props: { item: MenuItem }) {
  return (
    <article class="menu-item compact">
      <div class="menu-item-media static">
        <img src={props.item.image} alt={props.item.name} loading="lazy" />
      </div>
      <div class="menu-item-body">
        <div class="menu-item-top">
          <h3>{props.item.name}</h3>
          <span class="price">{formatPrice(props.item.price)}</span>
        </div>
        <p>{props.item.description}</p>
        <Button class="menu-add" onClick={() => addItemToCart(props.item)}>
          Add to Order
        </Button>
      </div>
    </article>
  )
}

export function MenuSections() {
  return (
    <div class="menu-page">
      <nav class="menu-rail" aria-label="Jump to category">
        <For each={categories}>
          {(cat) => (
            <a href={`#${cat.id}`}>{cat.label}</a>
          )}
        </For>
      </nav>

      <section class="menu-section" id="specialty">
        <SectionHeading
          eyebrow="Menu"
          title="Specialty Pizzas"
          subtitle="Our most-ordered pies — customize any topping before you check out."
        />
        <div class="menu-grid">
          <For each={specialtyPizzas}>{(pizza) => <SpecialtyCard {...pizza} />}</For>
        </div>
      </section>

      <section class="menu-section build-section" id="build">
        <div class="build-banner">
          <div>
            <SectionHeading
              eyebrow="Make it yours"
              title="Build Your Own Pizza"
              subtitle="Start with crust & sauce, then pile on meats, veggies, and cheese."
            />
            <Button onClick={() => openBuilder()}>Start Building</Button>
          </div>
          <div class="build-visual" aria-hidden="true">
            <div class="pizza-orb">
              <span class="ring" />
              <span class="ring delay" />
              <img
                src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=700&q=80"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>

      <section class="menu-section" id="sides">
        <SectionHeading title="Sides" subtitle="Bread bites, wings, and shareable extras." />
        <div class="menu-grid three">
          <For each={sidesAndMore.filter((i) => i.category === 'sides')}>
            {(item) => <SimpleCard item={item} />}
          </For>
        </div>
      </section>

      <section class="menu-section" id="drinks">
        <SectionHeading title="Drinks" subtitle="Ice-cold bottles to go with every order." />
        <div class="menu-grid three">
          <For each={sidesAndMore.filter((i) => i.category === 'drinks')}>
            {(item) => <SimpleCard item={item} />}
          </For>
        </div>
      </section>

      <section class="menu-section" id="desserts">
        <SectionHeading title="Desserts" subtitle="Finish sweet — warm cakes, twists, and brownies." />
        <div class="menu-grid three">
          <For each={sidesAndMore.filter((i) => i.category === 'desserts')}>
            {(item) => <SimpleCard item={item} />}
          </For>
        </div>
      </section>
    </div>
  )
}
