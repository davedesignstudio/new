import type { Component } from 'solid-js'
import { For, Show } from 'solid-js'
import type { CategoryId, MenuItem } from '../data/menu'
import { cartStore } from '../store/cart'

interface Props {
  items: MenuItem[]
  category: CategoryId
}

function formatPrice(n: number) {
  return `$${n.toFixed(2)}`
}

export const MenuGrid: Component<Props> = (props) => {
  const { openBuilder, addSimpleItem } = cartStore

  function orderItem(item: MenuItem) {
    if (item.isPizza) {
      openBuilder(item)
    } else {
      addSimpleItem(item)
    }
  }

  const title = () => {
    if (props.category === 'deals') return 'Pizza'
    return props.category.charAt(0).toUpperCase() + props.category.slice(1)
  }

  return (
    <section class="section" id="menu" aria-labelledby="menu-title">
      <div class="section-head">
        <div>
          <h2 class="section-title" id="menu-title">
            {title()}
          </h2>
          <p class="section-sub">
            <Show
              when={props.category === 'pizza' || props.category === 'deals'}
              fallback="Add sides, sweets, and drinks to round out your order."
            >
              Customize size, crust, sauce, and toppings — just like the Domino's builder.
            </Show>
          </p>
        </div>
      </div>

      <div class="menu-grid">
        <For each={props.items}>
          {(item, i) => (
            <article
              class="product"
              style={{ 'animation-delay': `${Math.min(i() * 0.05, 0.35)}s` }}
            >
              <div class="product-media">
                <img src={item.image} alt={item.name} loading="lazy" />
                <Show when={item.badge}>
                  <span class="product-badge">{item.badge}</span>
                </Show>
              </div>
              <div class="product-body">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <div class="product-foot">
                  <div class="price">
                    {formatPrice(item.price)}
                    <Show when={item.isPizza}>
                      <small> starting</small>
                    </Show>
                  </div>
                  <button
                    type="button"
                    class="btn btn-primary"
                    onClick={() => orderItem(item)}
                  >
                    {item.isPizza ? 'Customize' : 'Add'}
                  </button>
                </div>
              </div>
            </article>
          )}
        </For>
      </div>
    </section>
  )
}
