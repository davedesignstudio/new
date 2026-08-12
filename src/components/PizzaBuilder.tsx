import { For, Show, createMemo, createSignal, onMount } from 'solid-js'
import {
  CHEESES,
  CRUSTS,
  MEATS,
  SAUCES,
  SIZES,
  VEGGIES,
  money,
  type MenuItem,
} from '../data/menu'
import { calcPizzaUnitPrice, defaultConfig, store, type PizzaConfig } from '../store/cart'
import PizzaPreview from './PizzaPreview'
import './PizzaBuilder.css'

type Step = 'crust' | 'size' | 'sauce' | 'cheese' | 'toppings'

const STEPS: { id: Step; label: string }[] = [
  { id: 'crust', label: 'Crust' },
  { id: 'size', label: 'Size' },
  { id: 'sauce', label: 'Sauce' },
  { id: 'cheese', label: 'Cheese' },
  { id: 'toppings', label: 'Toppings' },
]

export default function PizzaBuilder(props: { item: MenuItem }) {
  const [config, setConfig] = createSignal<PizzaConfig>(defaultConfig(props.item))
  const [step, setStep] = createSignal<Step>('crust')
  const [entered, setEntered] = createSignal(false)

  onMount(() => requestAnimationFrame(() => setEntered(true)))

  const unit = createMemo(() => calcPizzaUnitPrice(props.item.price, config()))
  const lineTotal = createMemo(() => unit() * config().qty)

  const toggleTopping = (id: string) => {
    setConfig((c) => {
      const has = c.toppingIds.includes(id)
      if (has) return { ...c, toppingIds: c.toppingIds.filter((t) => t !== id) }
      if (c.toppingIds.length >= 7) return c
      return { ...c, toppingIds: [...c.toppingIds, id] }
    })
  }

  const close = () => store.closeBuilder()

  return (
    <div class="builder-overlay" classList={{ 'is-open': entered() }} role="dialog" aria-modal="true" aria-label={`Customize ${props.item.name}`}>
      <button type="button" class="builder-overlay__backdrop" aria-label="Close" onClick={close} />
      <div class="builder">
        <header class="builder__header">
          <button type="button" class="builder__back" onClick={close}>
            ← Menu
          </button>
          <div>
            <h2>{props.item.name}</h2>
            <p>Customize your pizza</p>
          </div>
          <div class="builder__price">{money(lineTotal())}</div>
        </header>

        <div class="builder__layout">
          <aside class="builder__preview">
            <PizzaPreview config={config()} hue={props.item.imageHue} />
            <div class="builder__qty">
              <span>Quantity</span>
              <div class="stepper">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() => setConfig((c) => ({ ...c, qty: Math.max(1, c.qty - 1) }))}
                >
                  −
                </button>
                <strong>{config().qty}</strong>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() => setConfig((c) => ({ ...c, qty: Math.min(20, c.qty + 1) }))}
                >
                  +
                </button>
              </div>
            </div>
          </aside>

          <div class="builder__main">
            <nav class="builder-steps" aria-label="Builder steps">
              <For each={STEPS}>
                {(s) => (
                  <button
                    type="button"
                    class="builder-steps__btn"
                    classList={{ 'is-active': step() === s.id }}
                    onClick={() => setStep(s.id)}
                  >
                    {s.label}
                  </button>
                )}
              </For>
            </nav>

            <div class="builder__panel">
              <Show when={step() === 'crust'}>
                <h3>Choose your crust</h3>
                <div class="option-grid">
                  <For each={CRUSTS}>
                    {(opt) => (
                      <button
                        type="button"
                        class="option"
                        classList={{ 'is-selected': config().crustId === opt.id }}
                        onClick={() => setConfig((c) => ({ ...c, crustId: opt.id }))}
                      >
                        <strong>{opt.label}</strong>
                        <span>{opt.description}</span>
                        <em>{opt.price ? `+${money(opt.price)}` : 'Included'}</em>
                      </button>
                    )}
                  </For>
                </div>
              </Show>

              <Show when={step() === 'size'}>
                <h3>Choose your size</h3>
                <div class="option-grid option-grid--3">
                  <For each={SIZES}>
                    {(opt) => (
                      <button
                        type="button"
                        class="option option--size"
                        classList={{ 'is-selected': config().sizeId === opt.id }}
                        onClick={() => setConfig((c) => ({ ...c, sizeId: opt.id }))}
                      >
                        <strong>{opt.label}</strong>
                        <span>{opt.description}</span>
                        <em>{opt.price ? `+${money(opt.price)}` : 'Base'}</em>
                      </button>
                    )}
                  </For>
                </div>
              </Show>

              <Show when={step() === 'sauce'}>
                <h3>Choose your sauce</h3>
                <div class="option-grid">
                  <For each={SAUCES}>
                    {(opt) => (
                      <button
                        type="button"
                        class="option"
                        classList={{ 'is-selected': config().sauceId === opt.id }}
                        onClick={() => setConfig((c) => ({ ...c, sauceId: opt.id }))}
                      >
                        <strong>{opt.label}</strong>
                        <em>{opt.price ? `+${money(opt.price)}` : 'Included'}</em>
                      </button>
                    )}
                  </For>
                </div>
              </Show>

              <Show when={step() === 'cheese'}>
                <h3>Cheese amount</h3>
                <div class="option-grid option-grid--2">
                  <For each={CHEESES}>
                    {(opt) => (
                      <button
                        type="button"
                        class="option"
                        classList={{ 'is-selected': config().cheeseId === opt.id }}
                        onClick={() => setConfig((c) => ({ ...c, cheeseId: opt.id }))}
                      >
                        <strong>{opt.label}</strong>
                        <em>{opt.price ? `+${money(opt.price)}` : 'Included'}</em>
                      </button>
                    )}
                  </For>
                </div>
              </Show>

              <Show when={step() === 'toppings'}>
                <h3>Toppings <span>({config().toppingIds.length}/7)</span></h3>
                <p class="builder__hint">Tap to add. Up to 7 toppings.</p>
                <h4 class="topping-group__title">Meats</h4>
                <div class="topping-grid">
                  <For each={MEATS}>
                    {(opt) => (
                      <button
                        type="button"
                        class="topping"
                        classList={{ 'is-selected': config().toppingIds.includes(opt.id) }}
                        onClick={() => toggleTopping(opt.id)}
                      >
                        <span>{opt.label}</span>
                        <em>+{money(opt.price ?? 0)}</em>
                      </button>
                    )}
                  </For>
                </div>
                <h4 class="topping-group__title">Veggies</h4>
                <div class="topping-grid">
                  <For each={VEGGIES}>
                    {(opt) => (
                      <button
                        type="button"
                        class="topping"
                        classList={{ 'is-selected': config().toppingIds.includes(opt.id) }}
                        onClick={() => toggleTopping(opt.id)}
                      >
                        <span>{opt.label}</span>
                        <em>+{money(opt.price ?? 0)}</em>
                      </button>
                    )}
                  </For>
                </div>
              </Show>
            </div>

            <footer class="builder__footer">
              <div class="builder__nav-steps">
                <Show when={STEPS.findIndex((s) => s.id === step()) > 0}>
                  <button
                    type="button"
                    class="btn btn--ghost-dark"
                    onClick={() => {
                      const i = STEPS.findIndex((s) => s.id === step())
                      setStep(STEPS[i - 1].id)
                    }}
                  >
                    Back
                  </button>
                </Show>
                <Show when={STEPS.findIndex((s) => s.id === step()) < STEPS.length - 1}>
                  <button
                    type="button"
                    class="btn btn--blue"
                    onClick={() => {
                      const i = STEPS.findIndex((s) => s.id === step())
                      setStep(STEPS[i + 1].id)
                    }}
                  >
                    Next
                  </button>
                </Show>
              </div>
              <button
                type="button"
                class="btn btn--red btn--wide"
                onClick={() => store.addPizza(props.item, config())}
              >
                Add to order · {money(lineTotal())}
              </button>
            </footer>
          </div>
        </div>
      </div>
    </div>
  )
}
