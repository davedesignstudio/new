import { For, Show, createSignal, createMemo } from 'solid-js'
import { useCart, calcPizzaPrice, pizzaSummary } from '../store/cart'
import {
  CRUSTS,
  SIZES,
  toppingsByGroup,
  type CrustId,
  type SizeId,
  type ToppingId,
} from '../data/menu'
import { PizzaArt } from './PizzaArt'

type BuilderTab =
  | 'quantity'
  | 'crust'
  | 'size'
  | 'seasoning'
  | 'sauce'
  | 'cheese'
  | 'meats'
  | 'veggies'
  | 'dips'

const TABS: { id: BuilderTab; label: string }[] = [
  { id: 'quantity', label: 'Quantity' },
  { id: 'crust', label: 'Crusts' },
  { id: 'size', label: 'Size' },
  { id: 'seasoning', label: 'Crust Seasoning' },
  { id: 'sauce', label: 'Sauce' },
  { id: 'cheese', label: 'Cheese' },
  { id: 'meats', label: 'Meats' },
  { id: 'veggies', label: 'Veggies & More' },
  { id: 'dips', label: 'Dipping Cups' },
]

export function PizzaBuilder() {
  const cart = useCart()
  const [tab, setTab] = createSignal<BuilderTab>('crust')
  const b = () => cart.state.builder
  const price = createMemo(() => calcPizzaPrice(b()))
  const summary = createMemo(() => pizzaSummary(b()))

  const availableSizes = createMemo(() => {
    const crust = CRUSTS.find((c) => c.id === b().crust)!
    return SIZES.filter((s) => crust.sizes.includes(s.id))
  })

  return (
    <Show when={cart.state.builderOpen}>
      <div class="builder-overlay" role="dialog" aria-modal="true" aria-labelledby="builder-title">
        <button type="button" class="builder-backdrop" aria-label="Close" onClick={() => cart.closeBuilder()} />
        <div class="builder-panel">
          <header class="builder-header">
            <div>
              <p class="builder-eyebrow">Customize</p>
              <h2 id="builder-title">{b().name}</h2>
            </div>
            <button type="button" class="icon-close" aria-label="Close builder" onClick={() => cart.closeBuilder()}>
              ×
            </button>
          </header>

          <div class="builder-layout">
            <aside class="builder-tabs" aria-label="Builder steps">
              <For each={TABS}>
                {(t) => (
                  <button
                    type="button"
                    class={`builder-tab${tab() === t.id ? ' active' : ''}`}
                    onClick={() => setTab(t.id)}
                  >
                    {t.label}
                  </button>
                )}
              </For>
            </aside>

            <div class="builder-main">
              <Show when={tab() === 'quantity'}>
                <h3>Select quantity</h3>
                <div class="qty-control large">
                  <button
                    type="button"
                    onClick={() => cart.updateBuilder({ quantity: Math.max(1, b().quantity - 1) })}
                    aria-label="Decrease"
                  >
                    −
                  </button>
                  <span>{b().quantity}</span>
                  <button
                    type="button"
                    onClick={() => cart.updateBuilder({ quantity: Math.min(20, b().quantity + 1) })}
                    aria-label="Increase"
                  >
                    +
                  </button>
                </div>
              </Show>

              <Show when={tab() === 'crust'}>
                <h3>Choose your crust</h3>
                <div class="option-grid">
                  <For each={CRUSTS}>
                    {(crust) => (
                      <button
                        type="button"
                        class={`option-tile${b().crust === crust.id ? ' selected' : ''}`}
                        onClick={() => cart.updateBuilder({ crust: crust.id as CrustId })}
                      >
                        <strong>{crust.name}</strong>
                        <span>{crust.description}</span>
                        <em>{crust.priceAdd > 0 ? `+$${crust.priceAdd.toFixed(2)}` : 'Included'}</em>
                      </button>
                    )}
                  </For>
                </div>
              </Show>

              <Show when={tab() === 'size'}>
                <h3>Choose your size</h3>
                <div class="option-grid sizes">
                  <For each={availableSizes()}>
                    {(size) => (
                      <button
                        type="button"
                        class={`option-tile size${b().size === size.id ? ' selected' : ''}`}
                        onClick={() => cart.updateBuilder({ size: size.id as SizeId })}
                      >
                        <strong>{size.name}</strong>
                        <span class="inches">{size.inches}</span>
                        <span>Feeds {size.feeds}</span>
                      </button>
                    )}
                  </For>
                </div>
              </Show>

              <Show when={tab() === 'seasoning'}>
                <h3>Crust seasoning</h3>
                <div class="option-grid">
                  <For each={toppingsByGroup('seasoning')}>
                    {(item) => (
                      <button
                        type="button"
                        class={`option-tile${b().seasoning === item.id ? ' selected' : ''}`}
                        onClick={() => cart.updateBuilder({ seasoning: item.id })}
                      >
                        <strong>{item.name}</strong>
                      </button>
                    )}
                  </For>
                </div>
              </Show>

              <Show when={tab() === 'sauce'}>
                <h3>Choose your sauce</h3>
                <div class="option-grid">
                  <For each={toppingsByGroup('sauce')}>
                    {(item) => (
                      <button
                        type="button"
                        class={`option-tile${b().sauce === item.id ? ' selected' : ''}`}
                        onClick={() => cart.updateBuilder({ sauce: item.id })}
                      >
                        <span class="swatch" style={{ background: item.color }} />
                        <strong>{item.name}</strong>
                      </button>
                    )}
                  </For>
                </div>
              </Show>

              <Show when={tab() === 'cheese'}>
                <h3>Cheese</h3>
                <p class="hint">Tap to add or remove. Mozzarella recommended.</p>
                <div class="option-grid">
                  <For each={toppingsByGroup('cheese')}>
                    {(item) => (
                      <button
                        type="button"
                        class={`option-tile${b().cheeses.includes(item.id) ? ' selected' : ''}`}
                        onClick={() => cart.toggleBuilderList('cheeses', item.id as ToppingId)}
                      >
                        <span class="swatch" style={{ background: item.color }} />
                        <strong>{item.name}</strong>
                        <em>{item.price > 0 ? `+$${item.price.toFixed(2)}` : 'Included'}</em>
                      </button>
                    )}
                  </For>
                </div>
              </Show>

              <Show when={tab() === 'meats'}>
                <h3>Meats</h3>
                <div class="option-grid">
                  <For each={toppingsByGroup('meat')}>
                    {(item) => (
                      <button
                        type="button"
                        class={`option-tile${b().meats.includes(item.id) ? ' selected' : ''}`}
                        onClick={() => cart.toggleBuilderList('meats', item.id as ToppingId)}
                      >
                        <span class="swatch" style={{ background: item.color }} />
                        <strong>{item.name}</strong>
                        <em>+${item.price.toFixed(2)}</em>
                      </button>
                    )}
                  </For>
                </div>
              </Show>

              <Show when={tab() === 'veggies'}>
                <h3>Veggies & more</h3>
                <div class="option-grid">
                  <For each={toppingsByGroup('veggie')}>
                    {(item) => (
                      <button
                        type="button"
                        class={`option-tile${b().veggies.includes(item.id) ? ' selected' : ''}`}
                        onClick={() => cart.toggleBuilderList('veggies', item.id as ToppingId)}
                      >
                        <span class="swatch" style={{ background: item.color }} />
                        <strong>{item.name}</strong>
                        <em>+${item.price.toFixed(2)}</em>
                      </button>
                    )}
                  </For>
                </div>
              </Show>

              <Show when={tab() === 'dips'}>
                <h3>Add dipping cups</h3>
                <div class="option-grid">
                  <For each={toppingsByGroup('dip')}>
                    {(item) => (
                      <button
                        type="button"
                        class={`option-tile${b().dips.includes(item.id) ? ' selected' : ''}`}
                        onClick={() => cart.toggleBuilderList('dips', item.id as ToppingId)}
                      >
                        <span class="swatch" style={{ background: item.color }} />
                        <strong>{item.name}</strong>
                        <em>+${item.price.toFixed(2)}</em>
                      </button>
                    )}
                  </For>
                </div>
              </Show>
            </div>

            <aside class="builder-summary">
              <div class="summary-preview">
                <PizzaArt
                  sauce={b().sauce}
                  cheeses={b().cheeses}
                  meats={b().meats}
                  veggies={b().veggies}
                  large
                />
              </div>
              <div class="summary-body">
                <h3>Your pizza summary</h3>
                <p class="summary-line">{summary()}</p>
                <ul class="summary-list">
                  <li>
                    <span>Qty</span>
                    <strong>{b().quantity}</strong>
                  </li>
                  <li>
                    <span>Crust</span>
                    <strong>{CRUSTS.find((c) => c.id === b().crust)?.name}</strong>
                  </li>
                  <li>
                    <span>Size</span>
                    <strong>{SIZES.find((s) => s.id === b().size)?.name}</strong>
                  </li>
                  <li>
                    <span>Sauce</span>
                    <strong>{b().sauce.replace(/-/g, ' ')}</strong>
                  </li>
                </ul>
                <p class="summary-price">
                  ${(price() * b().quantity).toFixed(2)}
                  <small> · ${price().toFixed(2)} each</small>
                </p>
                <button type="button" class="primary-btn block" onClick={() => cart.addBuilderToCart()}>
                  Add to order
                </button>
              </div>
            </aside>
          </div>

          <div class="builder-mobile-bar">
            <span class="mobile-price">${(price() * b().quantity).toFixed(2)}</span>
            <button type="button" class="primary-btn" onClick={() => cart.addBuilderToCart()}>
              Add to order
            </button>
          </div>
        </div>
      </div>
    </Show>
  )
}
