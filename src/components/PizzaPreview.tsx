import { For, Show, createMemo } from 'solid-js'
import type { PizzaConfig } from '../store/cart'
import { SIZES } from '../data/menu'
import './PizzaPreview.css'

const TOPPING_COLORS: Record<string, string> = {
  pepperoni: '#c62828',
  sausage: '#8d6e63',
  bacon: '#a1887f',
  ham: '#ef9a9a',
  beef: '#6d4c41',
  chicken: '#ffcc80',
  philly: '#795548',
  mushrooms: '#bcaaa4',
  onions: '#f5f5f5',
  peppers: '#66bb6a',
  olives: '#212121',
  tomatoes: '#e53935',
  jalapenos: '#43a047',
  spinach: '#2e7d32',
  pineapple: '#ffee58',
  'banana-peppers': '#fdd835',
}

const POSITIONS = [
  [32, 28], [55, 30], [42, 45], [28, 52], [60, 50],
  [48, 62], [35, 38], [58, 40], [40, 55], [52, 35],
  [30, 42], [65, 45], [45, 28], [38, 65], [55, 58],
]

export default function PizzaPreview(props: { config: PizzaConfig; hue: number }) {
  const sizeScale = createMemo(() => {
    const id = props.config.sizeId
    if (id === 'small') return 0.82
    if (id === 'medium') return 0.92
    return 1
  })

  const sizeLabel = createMemo(() => SIZES.find((s) => s.id === props.config.sizeId)?.label ?? '')

  const sauceColor = createMemo(() => {
    switch (props.config.sauceId) {
      case 'bbq': return '#6d4c41'
      case 'alfredo': return '#fff3e0'
      case 'ranch': return '#f1f8e9'
      case 'none': return '#ffe082'
      case 'hearty': return '#b71c1c'
      default: return '#c62828'
    }
  })

  const cheeseOpacity = createMemo(() => {
    switch (props.config.cheeseId) {
      case 'none': return 0
      case 'light': return 0.45
      case 'extra': return 1
      default: return 0.75
    }
  })

  return (
    <div class="pizza-preview">
      <div
        class="pizza-preview__stage"
        style={{ transform: `scale(${sizeScale()})` }}
      >
        <div
          class="pizza-preview__crust"
          classList={{
            'is-thin': props.config.crustId === 'thin',
            'is-pan': props.config.crustId === 'handmade-pan',
            'is-stuffed': props.config.crustId === 'stuffed',
          }}
        />
        <div class="pizza-preview__sauce" style={{ background: sauceColor() }} />
        <div class="pizza-preview__cheese" style={{ opacity: String(cheeseOpacity()) }} />
        <For each={props.config.toppingIds}>
          {(id, i) => {
            const pos = POSITIONS[i() % POSITIONS.length]
            return (
              <span
                class="pizza-preview__topping"
                style={{
                  left: `${pos[0]}%`,
                  top: `${pos[1]}%`,
                  background: TOPPING_COLORS[id] ?? `hsl(${props.hue}, 65%, 45%)`,
                  'animation-delay': `${i() * 40}ms`,
                }}
              />
            )
          }}
        </For>
      </div>
      <p class="pizza-preview__caption">
        {sizeLabel()}
        <Show when={props.config.toppingIds.length === 0}> · Cheese pizza</Show>
        <Show when={props.config.toppingIds.length > 0}>
          {' '}· {props.config.toppingIds.length} topping{props.config.toppingIds.length === 1 ? '' : 's'}
        </Show>
      </p>
    </div>
  )
}
