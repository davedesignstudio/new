import { createSignal, createMemo, For, Show, onCleanup, onMount } from 'solid-js'
import { sizes, crusts, sauces, toppings } from '../data/menu'
import './PizzaBuilder.css'

export default function PizzaBuilder(props) {
  const pizza = () => props.pizza
  const [sizeId, setSizeId] = createSignal('medium')
  const [crustId, setCrustId] = createSignal('hand')
  const [sauceId, setSauceId] = createSignal('robust')
  const [selectedToppings, setSelectedToppings] = createSignal([
    ...(pizza().defaultToppings || []),
  ])
  const [step, setStep] = createSignal(0)
  const [entered, setEntered] = createSignal(false)

  onMount(() => {
    requestAnimationFrame(() => setEntered(true))
    const onKey = (e) => {
      if (e.key === 'Escape') props.onClose()
    }
    window.addEventListener('keydown', onKey)
    onCleanup(() => window.removeEventListener('keydown', onKey))
  })

  const size = createMemo(() => sizes.find((s) => s.id === sizeId()))
  const crust = createMemo(() => crusts.find((c) => c.id === crustId()))
  const sauce = createMemo(() => sauces.find((s) => s.id === sauceId()))

  const price = createMemo(() => {
    const toppingCost = selectedToppings().reduce((sum, id) => {
      const t = toppings.find((x) => x.id === id)
      return sum + (t?.price || 0)
    }, 0)
    return pizza().basePrice + (size()?.price || 0) + toppingCost
  })

  function toggleTopping(id) {
    setSelectedToppings((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id],
    )
  }

  function addToOrder() {
    props.onAdd({
      name: pizza().name,
      basePrice: pizza().basePrice,
      sizePrice: size().price,
      sizeLabel: `${size().label} (${size().inches})`,
      crust: crust().label,
      sauce: sauce().label,
      toppings: selectedToppings(),
      image: pizza().image,
      qty: 1,
    })
  }

  const steps = ['Size & Crust', 'Sauce', 'Toppings']

  return (
    <div
      class="builder"
      classList={{ open: entered() }}
      role="dialog"
      aria-modal="true"
      aria-label={`Customize ${pizza().name}`}
    >
      <button type="button" class="builder__backdrop" aria-label="Close" onClick={props.onClose} />

      <div class="builder__panel">
        <header class="builder__header">
          <div>
            <p class="builder__eyebrow">Customize</p>
            <h2>{pizza().name}</h2>
          </div>
          <button type="button" class="builder__close" onClick={props.onClose} aria-label="Close">
            ×
          </button>
        </header>

        <div class="builder__layout">
          <div class="builder__preview">
            <img src={pizza().image} alt="" />
            <div class="builder__preview-meta">
              <span>{size()?.label}</span>
              <span>{crust()?.label}</span>
              <span>{sauce()?.label}</span>
            </div>
          </div>

          <div class="builder__controls">
            <div class="builder__steps" role="tablist">
              <For each={steps}>
                {(label, i) => (
                  <button
                    type="button"
                    role="tab"
                    classList={{ active: step() === i() }}
                    aria-selected={step() === i()}
                    onClick={() => setStep(i())}
                  >
                    {label}
                  </button>
                )}
              </For>
            </div>

            <Show when={step() === 0}>
              <div class="builder__block">
                <h3>Size</h3>
                <div class="option-grid">
                  <For each={sizes}>
                    {(s) => (
                      <button
                        type="button"
                        class="option"
                        classList={{ active: sizeId() === s.id }}
                        onClick={() => setSizeId(s.id)}
                      >
                        <strong>{s.label}</strong>
                        <span>{s.inches}</span>
                        <em>{s.price === 0 ? 'Included' : `+$${s.price.toFixed(2)}`}</em>
                      </button>
                    )}
                  </For>
                </div>
              </div>
              <div class="builder__block">
                <h3>Crust</h3>
                <div class="option-list">
                  <For each={crusts}>
                    {(c) => (
                      <button
                        type="button"
                        class="option option--wide"
                        classList={{ active: crustId() === c.id }}
                        onClick={() => setCrustId(c.id)}
                      >
                        <strong>{c.label}</strong>
                        <span>{c.desc}</span>
                      </button>
                    )}
                  </For>
                </div>
              </div>
            </Show>

            <Show when={step() === 1}>
              <div class="builder__block">
                <h3>Sauce</h3>
                <div class="option-list">
                  <For each={sauces}>
                    {(s) => (
                      <button
                        type="button"
                        class="option option--wide"
                        classList={{ active: sauceId() === s.id }}
                        onClick={() => setSauceId(s.id)}
                      >
                        <strong>{s.label}</strong>
                      </button>
                    )}
                  </For>
                </div>
              </div>
            </Show>

            <Show when={step() === 2}>
              <div class="builder__block">
                <h3>Meats</h3>
                <div class="topping-grid">
                  <For each={toppings.filter((t) => t.group === 'meat')}>
                    {(t) => (
                      <button
                        type="button"
                        class="topping"
                        classList={{ active: selectedToppings().includes(t.id) }}
                        onClick={() => toggleTopping(t.id)}
                      >
                        <span>{t.label}</span>
                        <em>+${t.price.toFixed(2)}</em>
                      </button>
                    )}
                  </For>
                </div>
              </div>
              <div class="builder__block">
                <h3>Veggies</h3>
                <div class="topping-grid">
                  <For each={toppings.filter((t) => t.group === 'veg')}>
                    {(t) => (
                      <button
                        type="button"
                        class="topping"
                        classList={{ active: selectedToppings().includes(t.id) }}
                        onClick={() => toggleTopping(t.id)}
                      >
                        <span>{t.label}</span>
                        <em>+${t.price.toFixed(2)}</em>
                      </button>
                    )}
                  </For>
                </div>
              </div>
              <div class="builder__block">
                <h3>Cheese</h3>
                <div class="topping-grid">
                  <For each={toppings.filter((t) => t.group === 'cheese')}>
                    {(t) => (
                      <button
                        type="button"
                        class="topping"
                        classList={{ active: selectedToppings().includes(t.id) }}
                        onClick={() => toggleTopping(t.id)}
                      >
                        <span>{t.label}</span>
                        <em>+${t.price.toFixed(2)}</em>
                      </button>
                    )}
                  </For>
                </div>
              </div>
            </Show>
          </div>
        </div>

        <footer class="builder__footer">
          <div class="builder__nav">
            <button
              type="button"
              class="ghost"
              disabled={step() === 0}
              onClick={() => setStep((s) => Math.max(0, s - 1))}
            >
              Back
            </button>
            <Show when={step() < 2}>
              <button type="button" class="ghost" onClick={() => setStep((s) => s + 1)}>
                Next
              </button>
            </Show>
          </div>
          <button type="button" class="builder__add" onClick={addToOrder}>
            Add to Order · ${price().toFixed(2)}
          </button>
        </footer>
      </div>
    </div>
  )
}
