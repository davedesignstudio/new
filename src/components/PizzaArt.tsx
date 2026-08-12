import { For, Show, createMemo } from 'solid-js'
import { getTopping } from '../data/menu'

interface Props {
  sauce: string
  cheeses: string[]
  meats: string[]
  veggies: string[]
  large?: boolean
}

/** Layered CSS/SVG pizza preview that updates with toppings */
export function PizzaArt(props: Props) {
  const sauceColor = createMemo(() => getTopping(props.sauce)?.color ?? '#c62828')

  const pepperoni = createMemo(() => props.meats.includes('pepperoni'))
  const otherMeats = createMemo(() => props.meats.filter((m) => m !== 'pepperoni'))
  const veggies = createMemo(() => props.veggies)

  const pepPositions = [
    [32, 28],
    [58, 30],
    [45, 48],
    [28, 55],
    [62, 55],
    [40, 70],
    [55, 68],
    [70, 42],
    [22, 40],
  ]

  return (
    <div class={`pizza-art${props.large ? ' large' : ''}`} aria-hidden="true">
      <svg viewBox="0 0 100 100" class="pizza-svg">
        <defs>
          <radialGradient id="crustGrad" cx="50%" cy="45%" r="55%">
            <stop offset="0%" stop-color="#f0c27a" />
            <stop offset="70%" stop-color="#d4a056" />
            <stop offset="100%" stop-color="#b8863d" />
          </radialGradient>
          <filter id="soft">
            <feGaussianBlur stdDeviation="0.4" />
          </filter>
        </defs>
        <circle cx="50" cy="50" r="48" fill="url(#crustGrad)" />
        <circle cx="50" cy="50" r="41" fill={sauceColor()} opacity="0.95" />
        <circle cx="50" cy="50" r="39" fill="#fff8e7" opacity="0.55" />
        <Show when={props.cheeses.length}>
          <circle cx="50" cy="50" r="37" fill="#fffde7" opacity="0.85" />
          <For each={[0, 1, 2, 3, 4, 5]}>
            {(i) => (
              <ellipse
                cx={38 + (i % 3) * 12}
                cy={36 + Math.floor(i / 3) * 18}
                rx="10"
                ry="7"
                fill="#fff9c4"
                opacity="0.5"
                transform={`rotate(${i * 25} 50 50)`}
              />
            )}
          </For>
        </Show>

        <Show when={pepperoni()}>
          <For each={pepPositions}>
            {([x, y]) => (
              <g>
                <circle cx={x} cy={y} r="5.2" fill="#c62828" />
                <circle cx={x - 1.2} cy={y - 1} r="1.2" fill="#ef9a9a" opacity="0.5" />
              </g>
            )}
          </For>
        </Show>

        <For each={otherMeats()}>
          {(meat, i) => {
            const t = getTopping(meat)
            const angle = i() * 47
            const rad = ((angle % 360) * Math.PI) / 180
            const cx = 50 + Math.cos(rad) * 18
            const cy = 50 + Math.sin(rad) * 18
            return (
              <rect
                x={cx - 4}
                y={cy - 2.5}
                width="8"
                height="5"
                rx="1.5"
                fill={t?.color ?? '#8d6e63'}
                transform={`rotate(${angle} ${cx} ${cy})`}
              />
            )
          }}
        </For>

        <For each={veggies()}>
          {(veg, i) => {
            const t = getTopping(veg)
            const angle = 20 + i() * 40
            const rad = (angle * Math.PI) / 180
            const cx = 50 + Math.cos(rad) * (14 + (i() % 3) * 6)
            const cy = 50 + Math.sin(rad) * (14 + (i() % 3) * 6)
            if (veg === 'mushrooms') {
              return (
                <g fill={t?.color ?? '#bcaaa4'}>
                  <ellipse cx={cx} cy={cy} rx="4" ry="2.5" />
                  <rect x={cx - 1} y={cy} width="2" height="3" />
                </g>
              )
            }
            if (veg === 'green-peppers' || veg === 'jalapenos' || veg === 'banana-peppers') {
              return (
                <path
                  d={`M ${cx - 5} ${cy} Q ${cx} ${cy - 4} ${cx + 5} ${cy}`}
                  stroke={t?.color ?? '#66bb6a'}
                  stroke-width="2"
                  fill="none"
                  stroke-linecap="round"
                />
              )
            }
            if (veg === 'black-olives') {
              return (
                <circle cx={cx} cy={cy} r="3" fill="#263238" stroke="#90a4ae" stroke-width="1.2" />
              )
            }
            if (veg === 'pineapple') {
              return <polygon points={`${cx},${cy - 4} ${cx + 3},${cy + 3} ${cx - 3},${cy + 3}`} fill="#ffee58" />
            }
            return <circle cx={cx} cy={cy} r="2.8" fill={t?.color ?? '#66bb6a'} />
          }}
        </For>

        {/* cut lines */}
        <g stroke="#000" stroke-opacity="0.08" stroke-width="0.6">
          <line x1="50" y1="10" x2="50" y2="90" />
          <line x1="10" y1="50" x2="90" y2="50" />
          <line x1="22" y1="22" x2="78" y2="78" />
          <line x1="78" y1="22" x2="22" y2="78" />
        </g>
      </svg>
    </div>
  )
}
