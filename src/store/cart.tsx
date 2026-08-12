import { createContext, useContext } from 'solid-js'
import type { ParentComponent } from 'solid-js'
import { createStore, produce } from 'solid-js/store'
import type { CrustId, SizeId, ToppingId } from '../data/menu'
import { CRUSTS, SIZES, getTopping, SPECIALTY_PIZZAS } from '../data/menu'

export type OrderType = 'delivery' | 'carryout' | null

export interface PizzaConfig {
  name: string
  specialtyId?: string
  crust: CrustId
  size: SizeId
  seasoning: ToppingId
  sauce: ToppingId
  cheeses: ToppingId[]
  meats: ToppingId[]
  veggies: ToppingId[]
  dips: ToppingId[]
  quantity: number
}

export interface CartLine {
  id: string
  kind: 'pizza' | 'side'
  name: string
  unitPrice: number
  quantity: number
  summary: string
  config?: PizzaConfig
}

interface AppState {
  orderType: OrderType
  address: string
  storeName: string
  cart: CartLine[]
  cartOpen: boolean
  builderOpen: boolean
  builder: PizzaConfig
}

function uid() {
  return Math.random().toString(36).slice(2, 10)
}

export function defaultBuilder(overrides: Partial<PizzaConfig> = {}): PizzaConfig {
  return {
    name: 'Build Your Own Pizza',
    crust: 'hand-tossed',
    size: 'medium',
    seasoning: 'garlic-seasoning',
    sauce: 'robust-sauce',
    cheeses: ['mozzarella'],
    meats: [],
    veggies: [],
    dips: [],
    quantity: 1,
    ...overrides,
  }
}

export function calcPizzaPrice(config: PizzaConfig): number {
  const specialty = config.specialtyId
    ? SPECIALTY_PIZZAS.find((p) => p.id === config.specialtyId)
    : undefined
  const size = SIZES.find((s) => s.id === config.size)!
  const crust = CRUSTS.find((c) => c.id === config.crust)!
  const base = specialty ? specialty.basePrice : 9.99

  const included = new Set(specialty?.defaultToppings ?? ['robust-sauce', 'mozzarella'])
  const extras = [
    ...config.cheeses,
    ...config.meats,
    ...config.veggies,
  ].filter((id) => !included.has(id))

  const toppingCost = extras.reduce((sum, id) => sum + (getTopping(id)?.price ?? 0), 0)
  const dipCost = config.dips.reduce((sum, id) => sum + (getTopping(id)?.price ?? 0), 0)

  const unit = (base + crust.priceAdd + toppingCost) * size.multiplier + dipCost
  return Math.round(unit * 100) / 100
}

export function pizzaSummary(config: PizzaConfig): string {
  const size = SIZES.find((s) => s.id === config.size)?.name
  const crust = CRUSTS.find((c) => c.id === config.crust)?.name
  const tops = [...config.meats, ...config.veggies, ...config.cheeses]
    .map((id) => getTopping(id)?.name)
    .filter(Boolean)
    .slice(0, 4)
  const more = [...config.meats, ...config.veggies, ...config.cheeses].length - tops.length
  return `${size} ${crust}${tops.length ? ` · ${tops.join(', ')}` : ''}${more > 0 ? ` +${more}` : ''}`
}

type StoreApi = {
  state: AppState
  setOrderType: (type: Exclude<OrderType, null>, address?: string) => void
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
  openBuilder: (config?: Partial<PizzaConfig>) => void
  closeBuilder: () => void
  updateBuilder: (patch: Partial<PizzaConfig>) => void
  toggleBuilderList: (
    field: 'cheeses' | 'meats' | 'veggies' | 'dips',
    id: ToppingId,
    exclusive?: boolean,
  ) => void
  addBuilderToCart: () => void
  addSideToCart: (name: string, price: number, summary?: string) => void
  updateQty: (id: string, delta: number) => void
  removeLine: (id: string) => void
  cartCount: () => number
  cartTotal: () => number
}

const CartContext = createContext<StoreApi>()

export const CartProvider: ParentComponent = (props) => {
  const [state, setState] = createStore<AppState>({
    orderType: null,
    address: '',
    storeName: 'Downtown PieDash · 214 Main St',
    cart: [],
    cartOpen: false,
    builderOpen: false,
    builder: defaultBuilder(),
  })

  const api: StoreApi = {
    state,
    setOrderType(type, address = '') {
      setState({
        orderType: type,
        address:
          type === 'delivery'
            ? address || '1247 Oak Avenue, Apt 4B'
            : 'Carryout · Downtown PieDash',
      })
    },
    openCart() {
      setState('cartOpen', true)
    },
    closeCart() {
      setState('cartOpen', false)
    },
    toggleCart() {
      setState('cartOpen', !state.cartOpen)
    },
    openBuilder(config) {
      setState({
        builderOpen: true,
        builder: defaultBuilder(config),
      })
    },
    closeBuilder() {
      setState('builderOpen', false)
    },
    updateBuilder(patch) {
      setState(
        produce((s) => {
          Object.assign(s.builder, patch)
          // Ensure size is valid for crust
          const crust = CRUSTS.find((c) => c.id === s.builder.crust)
          if (crust && !crust.sizes.includes(s.builder.size)) {
            s.builder.size = crust.sizes[0]
          }
        }),
      )
    },
    toggleBuilderList(field, id, exclusive = false) {
      setState(
        produce((s) => {
          const list = s.builder[field]
          if (exclusive) {
            s.builder[field] = [id]
            return
          }
          const idx = list.indexOf(id)
          if (idx >= 0) list.splice(idx, 1)
          else list.push(id)
        }),
      )
    },
    addBuilderToCart() {
      const config = { ...state.builder, cheeses: [...state.builder.cheeses], meats: [...state.builder.meats], veggies: [...state.builder.veggies], dips: [...state.builder.dips] }
      const unitPrice = calcPizzaPrice(config)
      setState(
        produce((s) => {
          s.cart.push({
            id: uid(),
            kind: 'pizza',
            name: config.name,
            unitPrice,
            quantity: config.quantity,
            summary: pizzaSummary(config),
            config,
          })
          s.builderOpen = false
          s.cartOpen = true
          s.builder = defaultBuilder()
        }),
      )
    },
    addSideToCart(name, price, summary = 'Regular') {
      setState(
        produce((s) => {
          const existing = s.cart.find((l) => l.kind === 'side' && l.name === name)
          if (existing) {
            existing.quantity += 1
          } else {
            s.cart.push({
              id: uid(),
              kind: 'side',
              name,
              unitPrice: price,
              quantity: 1,
              summary,
            })
          }
          s.cartOpen = true
        }),
      )
    },
    updateQty(id, delta) {
      setState(
        produce((s) => {
          const line = s.cart.find((l) => l.id === id)
          if (!line) return
          line.quantity += delta
          if (line.quantity <= 0) {
            s.cart = s.cart.filter((l) => l.id !== id)
          }
        }),
      )
    },
    removeLine(id) {
      setState(
        produce((s) => {
          s.cart = s.cart.filter((l) => l.id !== id)
        }),
      )
    },
    cartCount() {
      return state.cart.reduce((n, l) => n + l.quantity, 0)
    },
    cartTotal() {
      const sub = state.cart.reduce((n, l) => n + l.unitPrice * l.quantity, 0)
      return Math.round(sub * 100) / 100
    },
  }

  return <CartContext.Provider value={api}>{props.children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
