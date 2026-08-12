import { For, Show, createMemo, createSignal } from 'solid-js'
import {
  crusts,
  formatPrice,
  sauces,
  sizes,
  toppings,
  type CheeseAmount,
} from '../data/menu'
import {
  addPizzaToCart,
  builderConfig,
  builderOpen,
  closeBuilder,
  pizzaUnitPrice,
  setBuilderConfig,
  toggleBuilderTopping,
} from '../store/cart'
import { Button, IconClose } from './ui'

const cheeseAmounts = [
  { id: 'none' as CheeseAmount, name: 'None' },
  { id: 'light' as CheeseAmount, name: 'Light' },
  { id: 'normal' as CheeseAmount, name: 'Normal' },
  { id: 'extra' as CheeseAmount, name: 'Extra' },
]

type BuilderTab =
  | 'crust'
  | 'size'
  | 'sauce'
  | 'cheese'
  | 'meats'
  | 'veggies'

const tabs: { id: BuilderTab; label: string }[] = [
  { id: 'crust', label: 'Crust' },
  { id: 'size', label: 'Size' },
  { id: 'sauce', label: 'Sauce' },
  { id: 'cheese', label: 'Cheese' },
  { id: 'meats', label: 'Meats' },
  { id: 'veggies', label: 'Veggies' },
]

export function PizzaBuilder() {
  const [tab, setTab] = createSignal<BuilderTab>('crust')
  const price = createMemo(() => pizzaUnitPrice(builderConfig()))
  const selectedToppingIds = createMemo(() =>
    new Set(builderConfig().toppings.map((t) => t.id)),
  )

  return (
    <Show when={builderOpen()}>
      <div class="builder-layer" role="dialog" aria-modal="true" aria-label="Pizza builder">
        <button type="button" class="builder-backdrop" aria-label="Close builder" onClick={closeBuilder} />
        <div class="builder-panel">
          <header class="builder-header">
            <div>
              <p class="eyebrow">Pizza Builder</p>
              <h2>{builderConfig().name}</h2>
            </div>
            <button type="button" class="icon-btn" aria-label="Close" onClick={closeBuilder}>
              <IconClose />
            </button>
          </header>

          <div class="builder-layout">
            <aside class="builder-preview">
              <div class="preview-pizza">
                <img src={builderConfig().image} alt="" />
                <div class="preview-spin" aria-hidden="true" />
              </div>
              <div class="preview-summary">
                <p class="preview-price">{formatPrice(price())}</p>
                <p>
                  {sizes.find((s) => s.id === builderConfig().size)?.name} ·{' '}
                  {crusts.find((c) => c.id === builderConfig().crust)?.name}
                </p>
                <p class="muted">
                  {sauces.find((s) => s.id === builderConfig().sauce)?.name} ·{' '}
                  {builderConfig().cheese} cheese
                </p>
                <p class="muted">
                  {builderConfig().toppings.length
                    ? `${builderConfig().toppings.length} toppings`
                    : 'No extra toppings'}
                </p>
              </div>
            </aside>

            <div class="builder-main">
              <div class="builder-tabs" role="tablist" aria-label="Customize sections">
                <For each={tabs}>
                  {(t) => (
                    <button
                      type="button"
                      role="tab"
                      classList={{ active: tab() === t.id }}
                      aria-selected={tab() === t.id}
                      onClick={() => setTab(t.id)}
                    >
                      {t.label}
                    </button>
                  )}
                </For>
              </div>

              <div class="builder-options">
                <Show when={tab() === 'crust'}>
                  <For each={crusts}>
                    {(crust) => (
                      <label class="option-card" classList={{ selected: builderConfig().crust === crust.id }}>
                        <input
                          type="radio"
                          name="crust"
                          checked={builderConfig().crust === crust.id}
                          onChange={() => setBuilderConfig({ ...builderConfig(), crust: crust.id })}
                        />
                        <span class="option-title">{crust.name}</span>
                        <span class="option-desc">{crust.description}</span>
                        <Show when={crust.priceMod > 0}>
                          <span class="option-price">+{formatPrice(crust.priceMod)}</span>
                        </Show>
                      </label>
                    )}
                  </For>
                </Show>

                <Show when={tab() === 'size'}>
                  <For each={sizes}>
                    {(size) => (
                      <label class="option-card" classList={{ selected: builderConfig().size === size.id }}>
                        <input
                          type="radio"
                          name="size"
                          checked={builderConfig().size === size.id}
                          onChange={() => setBuilderConfig({ ...builderConfig(), size: size.id })}
                        />
                        <span class="option-title">
                          {size.name}{' '}
                          <span class="option-meta">
                            {size.slices} slices · feeds {size.feeds}
                          </span>
                        </span>
                        <Show when={size.priceMod > 0}>
                          <span class="option-price">+{formatPrice(size.priceMod)}</span>
                        </Show>
                      </label>
                    )}
                  </For>
                </Show>

                <Show when={tab() === 'sauce'}>
                  <For each={sauces}>
                    {(sauce) => (
                      <label class="option-card" classList={{ selected: builderConfig().sauce === sauce.id }}>
                        <input
                          type="radio"
                          name="sauce"
                          checked={builderConfig().sauce === sauce.id}
                          onChange={() => setBuilderConfig({ ...builderConfig(), sauce: sauce.id })}
                        />
                        <span class="option-title">{sauce.name}</span>
                      </label>
                    )}
                  </For>
                </Show>

                <Show when={tab() === 'cheese'}>
                  <For each={cheeseAmounts}>
                    {(amount) => (
                      <label
                        class="option-card"
                        classList={{ selected: builderConfig().cheese === amount.id }}
                      >
                        <input
                          type="radio"
                          name="cheese"
                          checked={builderConfig().cheese === amount.id}
                          onChange={() =>
                            setBuilderConfig({ ...builderConfig(), cheese: amount.id })
                          }
                        />
                        <span class="option-title">{amount.name}</span>
                        <Show when={amount.id === 'extra'}>
                          <span class="option-price">+{formatPrice(1.5)}</span>
                        </Show>
                      </label>
                    )}
                  </For>
                </Show>

                <Show when={tab() === 'meats'}>
                  <div class="topping-grid">
                    <For each={toppings.filter((t) => t.category === 'meat')}>
                      {(topping) => (
                        <label
                          class="topping-chip"
                          classList={{ selected: selectedToppingIds().has(topping.id) }}
                        >
                          <input
                            type="checkbox"
                            checked={selectedToppingIds().has(topping.id)}
                            onChange={() => toggleBuilderTopping(topping.id)}
                          />
                          <span>{topping.name}</span>
                          <span class="option-price">+{formatPrice(topping.price)}</span>
                        </label>
                      )}
                    </For>
                  </div>
                </Show>

                <Show when={tab() === 'veggies'}>
                  <div class="topping-grid">
                    <For each={toppings.filter((t) => t.category === 'veggie' || t.category === 'cheese')}>
                      {(topping) => (
                        <label
                          class="topping-chip"
                          classList={{ selected: selectedToppingIds().has(topping.id) }}
                        >
                          <input
                            type="checkbox"
                            checked={selectedToppingIds().has(topping.id)}
                            onChange={() => toggleBuilderTopping(topping.id)}
                          />
                          <span>{topping.name}</span>
                          <span class="option-price">+{formatPrice(topping.price)}</span>
                        </label>
                      )}
                    </For>
                  </div>
                </Show>
              </div>
            </div>
          </div>

          <footer class="builder-footer">
            <div class="qty-stepper">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() =>
                  setBuilderConfig({
                    ...builderConfig(),
                    quantity: Math.max(1, builderConfig().quantity - 1),
                  })
                }
              >
                −
              </button>
              <span>{builderConfig().quantity}</span>
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() =>
                  setBuilderConfig({
                    ...builderConfig(),
                    quantity: builderConfig().quantity + 1,
                  })
                }
              >
                +
              </button>
            </div>
            <Button
              class="add-pizza-btn"
              onClick={() => addPizzaToCart(builderConfig())}
            >
              Add to Order · {formatPrice(price() * builderConfig().quantity)}
            </Button>
          </footer>
        </div>
      </div>
    </Show>
  )
}
