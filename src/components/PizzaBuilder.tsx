import { createMemo, createSignal, For, Show, type Component } from 'solid-js'
import {
  crusts,
  sauces,
  sizes,
  toppings,
  type CheeseAmount,
  type CrustId,
  type SauceId,
  type SizeId,
} from '../data/menu'
import { cartStore } from '../store/cart'

const cheeseOptions: { id: CheeseAmount; label: string }[] = [
  { id: 'none', label: 'No Cheese' },
  { id: 'light', label: 'Light' },
  { id: 'normal', label: 'Normal' },
  { id: 'extra', label: 'Extra (+$1.50)' },
]

type Step = 'crust' | 'sauce' | 'cheese' | 'toppings'

export const PizzaBuilder: Component = () => {
  const { builderItem, closeBuilder, addPizza } = cartStore
  const item = () => builderItem()!

  const [step, setStep] = createSignal<Step>('crust')
  const [size, setSize] = createSignal<SizeId>('medium')
  const [crust, setCrust] = createSignal<CrustId>('hand-tossed')
  const [sauce, setSauce] = createSignal<SauceId>('robust')
  const [cheese, setCheese] = createSignal<CheeseAmount>('normal')
  const [selectedToppings, setSelectedToppings] = createSignal<string[]>(
    item().defaultToppings ?? [],
  )
  const [notes, setNotes] = createSignal('')

  const availableCrusts = createMemo(() =>
    crusts.filter((c) => c.sizes.includes(size()) || c.sizes.length === 0),
  )

  const availableSizes = createMemo(() => {
    const crustOpt = crusts.find((c) => c.id === crust())
    if (!crustOpt) return sizes
    return sizes.filter((s) => crustOpt.sizes.includes(s.id))
  })

  // Keep size/crust compatible
  function selectSize(id: SizeId) {
    setSize(id)
    const crustOpt = crusts.find((c) => c.id === crust())
    if (crustOpt && !crustOpt.sizes.includes(id)) {
      const fallback = crusts.find((c) => c.sizes.includes(id))
      if (fallback) setCrust(fallback.id)
    }
  }

  function selectCrust(id: CrustId) {
    setCrust(id)
    const crustOpt = crusts.find((c) => c.id === id)!
    if (!crustOpt.sizes.includes(size())) {
      setSize(crustOpt.sizes[0])
    }
  }

  function toggleTopping(id: string) {
    setSelectedToppings((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id],
    )
  }

  const livePrice = createMemo(() => {
    const sizeOpt = sizes.find((s) => s.id === size())!
    const crustOpt = crusts.find((c) => c.id === crust())!
    const cheeseExtra = cheese() === 'extra' ? 1.5 : 0
    const toppingTotal = selectedToppings().reduce((sum, id) => {
      const t = toppings.find((x) => x.id === id)
      return sum + (t?.price ?? 0)
    }, 0)
    return item().price + sizeOpt.priceMod + crustOpt.priceMod + cheeseExtra + toppingTotal
  })

  const steps: { id: Step; label: string }[] = [
    { id: 'crust', label: 'Size & Crust' },
    { id: 'sauce', label: 'Sauce' },
    { id: 'cheese', label: 'Cheese' },
    { id: 'toppings', label: 'Toppings' },
  ]

  function submit() {
    addPizza({
      item: item(),
      size: size(),
      crust: crust(),
      sauce: sauce(),
      cheese: cheese(),
      toppingIds: selectedToppings(),
      notes: notes(),
    })
  }

  return (
    <div
      class="overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="builder-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeBuilder()
      }}
    >
      <div class="builder">
        <div class="builder-header">
          <h2 id="builder-title">Customize Your Pizza</h2>
          <button type="button" class="icon-btn" aria-label="Close" onClick={closeBuilder}>
            ✕
          </button>
        </div>

        <div class="builder-body">
          <div class="builder-preview">
            <img src={item().image} alt="" />
            <div class="builder-preview-meta">
              <h3>{item().name}</h3>
              <p>
                {sizes.find((s) => s.id === size())?.label} ·{' '}
                {crusts.find((c) => c.id === crust())?.label} ·{' '}
                {sauces.find((s) => s.id === sauce())?.label}
              </p>
            </div>
          </div>

          <div class="builder-form">
            <div class="step-tabs" role="tablist">
              <For each={steps}>
                {(s) => (
                  <button
                    type="button"
                    class="step-tab"
                    classList={{ active: step() === s.id }}
                    role="tab"
                    aria-selected={step() === s.id}
                    onClick={() => setStep(s.id)}
                  >
                    {s.label}
                  </button>
                )}
              </For>
            </div>

            <Show when={step() === 'crust'}>
              <label class="field-label">Choose your size</label>
              <div class="option-grid">
                <For each={availableSizes()}>
                  {(s) => (
                    <button
                      type="button"
                      class="option-card"
                      classList={{ selected: size() === s.id }}
                      onClick={() => selectSize(s.id)}
                    >
                      <strong>
                        {s.label} ({s.inches})
                      </strong>
                      <span>{s.priceMod === 0 ? 'Base price' : `+$${s.priceMod.toFixed(2)}`}</span>
                    </button>
                  )}
                </For>
              </div>

              <label class="field-label">Choose your crust</label>
              <div class="option-grid">
                <For each={availableCrusts()}>
                  {(c) => (
                    <button
                      type="button"
                      class="option-card"
                      classList={{ selected: crust() === c.id }}
                      onClick={() => selectCrust(c.id)}
                    >
                      <strong>{c.label}</strong>
                      <span>
                        {c.description}
                        {c.priceMod > 0 ? ` · +$${c.priceMod.toFixed(2)}` : ''}
                      </span>
                    </button>
                  )}
                </For>
              </div>
            </Show>

            <Show when={step() === 'sauce'}>
              <label class="field-label">Choose your sauce</label>
              <div class="chip-row">
                <For each={sauces}>
                  {(s) => (
                    <button
                      type="button"
                      class="chip"
                      classList={{ selected: sauce() === s.id }}
                      onClick={() => setSauce(s.id)}
                    >
                      {s.label}
                    </button>
                  )}
                </For>
              </div>
            </Show>

            <Show when={step() === 'cheese'}>
              <label class="field-label">Cheese amount</label>
              <div class="chip-row">
                <For each={cheeseOptions}>
                  {(c) => (
                    <button
                      type="button"
                      class="chip"
                      classList={{ selected: cheese() === c.id }}
                      onClick={() => setCheese(c.id)}
                    >
                      {c.label}
                    </button>
                  )}
                </For>
              </div>
            </Show>

            <Show when={step() === 'toppings'}>
              <For each={['meats', 'veggies', 'cheese'] as const}>
                {(group) => (
                  <div class="topping-group">
                    <h4>{group}</h4>
                    <div class="chip-row">
                      <For each={toppings.filter((t) => t.group === group)}>
                        {(t) => (
                          <button
                            type="button"
                            class="chip"
                            classList={{ selected: selectedToppings().includes(t.id) }}
                            onClick={() => toggleTopping(t.id)}
                          >
                            {t.label} · ${t.price.toFixed(2)}
                          </button>
                        )}
                      </For>
                    </div>
                  </div>
                )}
              </For>

              <label class="field-label" for="pizza-notes">
                Special instructions
              </label>
              <input
                id="pizza-notes"
                class="notes-input"
                placeholder="e.g. Well done, light cut, extra sauce…"
                value={notes()}
                onInput={(e) => setNotes(e.currentTarget.value)}
              />
            </Show>
          </div>
        </div>

        <div class="builder-footer">
          <div class="builder-total">
            <span>Your pizza</span>
            <strong>${livePrice().toFixed(2)}</strong>
          </div>
          <button type="button" class="btn btn-primary" onClick={submit}>
            Add to Order
          </button>
        </div>
      </div>
    </div>
  )
}
