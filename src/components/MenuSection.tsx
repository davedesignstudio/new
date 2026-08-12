import { For, Show } from 'solid-js'
import { CATEGORIES, DEALS, MENU, money, type CategoryId, type MenuItem } from '../data/menu'
import { store } from '../store/cart'
import './MenuSection.css'

function PizzaArt(props: { hue: number; name: string }) {
  return (
    <div class="menu-card__art" style={{ '--hue': String(props.hue) }} aria-hidden="true">
      <div class="menu-card__pizza">
        <span class="menu-card__slice" />
        <span class="menu-card__slice" />
        <span class="menu-card__slice" />
      </div>
    </div>
  )
}

function SideArt(props: { hue: number }) {
  return (
    <div class="menu-card__art menu-card__art--side" style={{ '--hue': String(props.hue) }} aria-hidden="true">
      <div class="menu-card__side-shape" />
    </div>
  )
}

export default function MenuSection() {
  const itemsFor = (cat: CategoryId) => MENU.filter((m) => m.category === cat)

  const onSelect = (item: MenuItem) => {
    if (!store.orderType()) {
      store.setOrderType('delivery')
    }
    if (item.isPizza) {
      store.openBuilder(item)
    } else {
      store.addSimple(item)
    }
  }

  return (
    <section class="menu-section" id="menu">
      <div class="menu-section__inner">
        <div class="menu-section__head">
          <h2>Menu</h2>
          <p>Specialty pies, sides, drinks, and desserts — customize every pizza.</p>
        </div>

        <div class="category-tabs" role="tablist" aria-label="Menu categories">
          <For each={CATEGORIES}>
            {(cat) => (
              <button
                type="button"
                role="tab"
                class="category-tabs__btn"
                classList={{ 'is-active': store.activeCategory() === cat.id }}
                aria-selected={store.activeCategory() === cat.id}
                onClick={() => {
                  store.setActiveCategory(cat.id)
                  document.getElementById(`cat-${cat.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }}
              >
                {cat.label}
              </button>
            )}
          </For>
        </div>

        <div class="deals" id="deals">
          <div class="deals__head" id="cat-deals">
            <h3>Deals</h3>
            <p>Limited-time offers for delivery or carryout.</p>
          </div>
          <div class="deals__grid">
            <For each={DEALS}>
              {(deal) => (
                <article class={`deal deal--${deal.accent}`}>
                  <h4>{deal.title}</h4>
                  <p class="deal__sub">{deal.subtitle}</p>
                  <p class="deal__detail">{deal.detail}</p>
                  <button
                    type="button"
                    class="btn btn--ghost"
                    onClick={() => {
                      store.setActiveCategory('pizza')
                      document.getElementById('cat-pizza')?.scrollIntoView({ behavior: 'smooth' })
                    }}
                  >
                    Order now
                  </button>
                </article>
              )}
            </For>
          </div>
        </div>

        <For each={CATEGORIES.filter((c) => c.id !== 'deals')}>
          {(cat) => (
            <div class="menu-block" id={`cat-${cat.id}`}>
              <div class="menu-block__head">
                <h3>{cat.label}</h3>
              </div>
              <div class="menu-grid">
                <For each={itemsFor(cat.id)}>
                  {(item) => (
                    <article class="menu-card">
                      <Show when={item.badge}>
                        <span class="menu-card__badge">{item.badge}</span>
                      </Show>
                      <Show
                        when={item.isPizza}
                        fallback={<SideArt hue={item.imageHue} />}
                      >
                        <PizzaArt hue={item.imageHue} name={item.name} />
                      </Show>
                      <div class="menu-card__body">
                        <h4>{item.name}</h4>
                        <p>{item.description}</p>
                        <div class="menu-card__row">
                          <span class="menu-card__price">
                            {item.isPizza ? `From ${money(item.price)}` : money(item.price)}
                          </span>
                          <button type="button" class="btn btn--red btn--sm" onClick={() => onSelect(item)}>
                            {item.isPizza ? 'Customize' : 'Add'}
                          </button>
                        </div>
                      </div>
                    </article>
                  )}
                </For>
              </div>
            </div>
          )}
        </For>
      </div>
    </section>
  )
}
