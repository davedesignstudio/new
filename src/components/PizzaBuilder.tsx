import { For, Show, createSignal, createMemo, createEffect } from 'solid-js'
import {
  crusts,
  sizes,
  sauces,
  cheeseAmounts,
  toppings,
  formatPrice,
} from '../data/menu'
import {
  builderItem,
  closeBuilder,
  addPizzaToCart,
  calcPizzaPrice,
  type PizzaBuild,
} from '../store'
import './PizzaBuilder.css'

type Step = 'crust' | 'size' | 'sauce' | 'cheese' | 'toppings'

const steps: { id: Step; label: string }[] = [
  { id: 'crust', label: 'Crust' },
  { id: 'size', label: 'Size' },
  { id: 'sauce', label: 'Sauce' },
  { id: 'cheese', label: 'Cheese' },
  { id: 'toppings', label: 'Toppings' },
]

export default function PizzaBuilder() {
  const [step, setStep] = createSignal<Step>('crust')
  const [crustId, setCrustId] = createSignal('hand')
  const [sizeId, setSizeId] = createSignal('medium')
  const [sauceId, setSauceId] = createSignal('robust')
  const [cheeseId, setCheeseId] = createSignal('normal')
  const [toppingIds, setToppingIds] = createSignal<string[]>([])
  const [quantity, setQuantity] = createSignal(1)

  createEffect(() => {
    const item = builderItem()
    if (!item) return
    setStep('crust')
    setCrustId('hand')
    setSizeId('medium')
    setSauceId(item.id === 'buffalo-chicken' ? 'ranch' : 'robust')
    setCheeseId('normal')
    setToppingIds([...(item.toppings ?? [])])
    setQuantity(1)
  })

  const build = createMemo<PizzaBuild | null>(() => {
    const item = builderItem()
    if (!item) return null
    return {
      item,
      crustId: crustId(),
      sizeId: sizeId(),
      sauceId: sauceId(),
      cheeseId: cheeseId(),
      toppingIds: toppingIds(),
      quantity: quantity(),
    }
  })

  const unitPrice = createMemo(() => {
    const b = build()
    return b ? calcPizzaPrice(b) : 0
  })

  const toggleTopping = (id: string) => {
    setToppingIds((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id],
    )
  }

  const meats = () => toppings.filter((t) => t.kind === 'meat')
  const veggies = () => toppings.filter((t) => t.kind === 'veggie')
  const cheeses = () => toppings.filter((t) => t.kind === 'cheese')

  return (
    <Show when={builderItem()}>
      {(item) => (
        <div class="builder-overlay" role="dialog" aria-modal="true" aria-labelledby="builder-title">
          <button type="button" class="builder-overlay__backdrop" aria-label="Close" onClick={closeBuilder} />
          <div class="builder">
            <header class="builder__header">
              <div>
                <p class="builder__eyebrow">Pizza Builder</p>
                <h2 id="builder-title">{item().name}</h2>
              </div>
              <button type="button" class="builder__close" onClick={closeBuilder} aria-label="Close builder">
                ×
              </button>
            </header>

            <div class="builder__layout">
              <aside class="builder__preview">
                <div class="builder__pizza">
                  <img src={item().image} alt="" />
                </div>
                <div class="builder__summary">
                  <h3>Your Pizza</h3>
                  <ul>
                    <li>{sizes.find((s) => s.id === sizeId())?.name} · {crusts.find((c) => c.id === crustId())?.name}</li>
                    <li>Sauce: {sauces.find((s) => s.id === sauceId())?.name}</li>
                    <li>Cheese: {cheeseAmounts.find((c) => c.id === cheeseId())?.name}</li>
                    <li>
                      Toppings:{' '}
                      {toppingIds().length
                        ? toppingIds()
                            .map((id) => toppings.find((t) => t.id === id)?.name)
                            .join(', ')
                        : 'None'}
                    </li>
                  </ul>
                  <p class="builder__price">{formatPrice(unitPrice() * quantity())}</p>
                </div>
              </aside>

              <div class="builder__main">
                <nav class="builder__steps" aria-label="Builder steps">
                  <For each={steps}>
                    {(s) => (
                      <button
                        type="button"
                        class={`builder__step ${step() === s.id ? 'is-active' : ''}`}
                        onClick={() => setStep(s.id)}
                      >
                        {s.label}
                      </button>
                    )}
                  </For>
                </nav>

                <div class="builder__panel">
                  <Show when={step() === 'crust'}>
                    <div class="option-grid">
                      <For each={crusts}>
                        {(c) => (
                          <button
                            type="button"
                            class={`option-card ${crustId() === c.id ? 'is-selected' : ''}`}
                            onClick={() => setCrustId(c.id)}
                          >
                            <strong>{c.name}</strong>
                            <span>{c.description}</span>
                            <em>{c.price === 0 ? 'Included' : `+${formatPrice(c.price)}`}</em>
                          </button>
                        )}
                      </For>
                    </div>
                  </Show>

                  <Show when={step() === 'size'}>
                    <div class="option-grid option-grid--sizes">
                      <For each={sizes}>
                        {(s) => (
                          <button
                            type="button"
                            class={`option-card ${sizeId() === s.id ? 'is-selected' : ''}`}
                            onClick={() => setSizeId(s.id)}
                          >
                            <strong>{s.name}</strong>
                            <span>Feeds {s.feeds}</span>
                          </button>
                        )}
                      </For>
                    </div>
                  </Show>

                  <Show when={step() === 'sauce'}>
                    <div class="option-grid option-grid--chips">
                      <For each={sauces}>
                        {(s) => (
                          <button
                            type="button"
                            class={`chip ${sauceId() === s.id ? 'is-selected' : ''}`}
                            onClick={() => setSauceId(s.id)}
                          >
                            {s.name}
                          </button>
                        )}
                      </For>
                    </div>
                  </Show>

                  <Show when={step() === 'cheese'}>
                    <div class="option-grid option-grid--chips">
                      <For each={cheeseAmounts}>
                        {(c) => (
                          <button
                            type="button"
                            class={`chip ${cheeseId() === c.id ? 'is-selected' : ''}`}
                            onClick={() => setCheeseId(c.id)}
                          >
                            {c.name}
                            {c.id === 'extra' ? ' (+$1.50)' : ''}
                          </button>
                        )}
                      </For>
                    </div>
                  </Show>

                  <Show when={step() === 'toppings'}>
                    <div class="topping-groups">
                      <section>
                        <h4>Meats</h4>
                        <div class="option-grid option-grid--chips">
                          <For each={meats()}>
                            {(t) => (
                              <button
                                type="button"
                                class={`chip ${toppingIds().includes(t.id) ? 'is-selected' : ''}`}
                                onClick={() => toggleTopping(t.id)}
                              >
                                {t.name} · +{formatPrice(t.price)}
                              </button>
                            )}
                          </For>
                        </div>
                      </section>
                      <section>
                        <h4>Veggies & More</h4>
                        <div class="option-grid option-grid--chips">
                          <For each={veggies()}>
                            {(t) => (
                              <button
                                type="button"
                                class={`chip ${toppingIds().includes(t.id) ? 'is-selected' : ''}`}
                                onClick={() => toggleTopping(t.id)}
                              >
                                {t.name} · +{formatPrice(t.price)}
                              </button>
                            )}
                          </For>
                        </div>
                      </section>
                      <section>
                        <h4>Specialty Cheese</h4>
                        <div class="option-grid option-grid--chips">
                          <For each={cheeses()}>
                            {(t) => (
                              <button
                                type="button"
                                class={`chip ${toppingIds().includes(t.id) ? 'is-selected' : ''}`}
                                onClick={() => toggleTopping(t.id)}
                              >
                                {t.name} · +{formatPrice(t.price)}
                              </button>
                            )}
                          </For>
                        </div>
                      </section>
                    </div>
                  </Show>
                </div>

                <footer class="builder__footer">
                  <div class="qty">
                    <button type="button" onClick={() => setQuantity((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">
                      −
                    </button>
                    <span>{quantity()}</span>
                    <button type="button" onClick={() => setQuantity((q) => q + 1)} aria-label="Increase quantity">
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    class="btn btn--red builder__add"
                    onClick={() => {
                      const b = build()
                      if (b) addPizzaToCart(b)
                    }}
                  >
                    Add to Order · {formatPrice(unitPrice() * quantity())}
                  </button>
                </footer>
              </div>
            </div>
          </div>
        </div>
      )}
    </Show>
  )
}
