import { For, Show, createMemo } from 'solid-js'
import { categories, menuItems, formatPrice, type MenuItem } from '../data/menu'
import {
  activeCategory,
  setActiveCategory,
  openBuilder,
  addSimpleToCart,
} from '../store'
import './MenuSection.css'

function MenuCard(props: { item: MenuItem; index: number }) {
  const order = () => {
    if (props.item.customizable) openBuilder(props.item)
    else addSimpleToCart(props.item)
  }

  return (
    <article
      class="menu-card"
      style={{ 'animation-delay': `${Math.min(props.index, 8) * 0.05}s` }}
    >
      <div class="menu-card__media">
        <img src={props.item.image} alt={props.item.name} loading="lazy" />
        <Show when={props.item.badge}>
          <span class="menu-card__badge">{props.item.badge}</span>
        </Show>
      </div>
      <div class="menu-card__body">
        <div class="menu-card__top">
          <h3>{props.item.name}</h3>
          <span class="menu-card__price">{formatPrice(props.item.basePrice)}</span>
        </div>
        <p>{props.item.description}</p>
        <button type="button" class="btn btn--red menu-card__cta" onClick={order}>
          {props.item.customizable ? 'Customize' : 'Add to Order'}
        </button>
      </div>
    </article>
  )
}

export default function MenuSection() {
  const items = createMemo(() =>
    menuItems.filter((item) => item.category === activeCategory()),
  )

  const heading = createMemo(
    () => categories.find((c) => c.id === activeCategory())?.label ?? 'Menu',
  )

  return (
    <section class="menu" id="menu" aria-labelledby="menu-heading">
      <div class="menu__inner">
        <div class="menu__intro">
          <p class="menu__eyebrow">Menu</p>
          <h2 id="menu-heading">{heading()}</h2>
          <p class="menu__sub">
            Same flow as Domino’s — pick a category, customize your pizza, add to cart.
          </p>
        </div>

        <div class="menu__tabs" role="tablist" aria-label="Menu categories">
          <For each={categories}>
            {(cat) => (
              <button
                type="button"
                role="tab"
                aria-selected={activeCategory() === cat.id}
                class={`menu__tab ${activeCategory() === cat.id ? 'is-active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
              </button>
            )}
          </For>
        </div>

        <div class="menu__grid">
          <For each={items()}>
            {(item, i) => <MenuCard item={item} index={i()} />}
          </For>
        </div>
      </div>
    </section>
  )
}
