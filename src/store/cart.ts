import { createStore, produce } from 'solid-js/store'
import { createSignal } from 'solid-js'
import {
  type CheeseAmount,
  type CrustId,
  type SauceId,
  type SizeId,
  type SpecialtyPizza,
  crusts,
  getTopping,
  sizes,
  specialtyPizzas,
} from '../data/menu'

export type ServiceMethod = 'delivery' | 'carryout'

export interface SelectedTopping {
  id: string
  side: 'whole' | 'left' | 'right'
}

export interface PizzaConfig {
  name: string
  specialtyId?: string
  image: string
  basePrice: number
  crust: CrustId
  size: SizeId
  sauce: SauceId
  cheese: CheeseAmount
  toppings: SelectedTopping[]
  quantity: number
}

export interface CartLine {
  id: string
  kind: 'pizza' | 'item'
  name: string
  image: string
  unitPrice: number
  quantity: number
  details: string
}

export function createDefaultPizza(specialty?: SpecialtyPizza): PizzaConfig {
  const pizza = specialty ?? {
    id: 'byo',
    name: 'Build Your Own',
    description: '',
    image:
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80',
    basePrice: 9.99,
    defaultToppings: [],
    defaultCrust: 'handtossed' as CrustId,
    defaultSauce: 'robust-tomato' as SauceId,
  }

  return {
    name: pizza.name,
    specialtyId: specialty?.id,
    image: pizza.image,
    basePrice: pizza.basePrice,
    crust: pizza.defaultCrust,
    size: 'large',
    sauce: pizza.defaultSauce,
    cheese: 'normal',
    toppings: pizza.defaultToppings.map((id) => ({ id, side: 'whole' as const })),
    quantity: 1,
  }
}

export function pizzaUnitPrice(config: PizzaConfig) {
  const crust = crusts.find((c) => c.id === config.crust)?.priceMod ?? 0
  const size = sizes.find((s) => s.id === config.size)?.priceMod ?? 0
  const cheeseExtra = config.cheese === 'extra' ? 1.5 : 0
  const toppingTotal = config.toppings.reduce((sum, t) => {
    const price = getTopping(t.id)?.price ?? 0
    return sum + (t.side === 'whole' ? price : price * 0.5)
  }, 0)
  return config.basePrice + crust + size + cheeseExtra + toppingTotal
}

export function pizzaDetails(config: PizzaConfig) {
  const size = sizes.find((s) => s.id === config.size)?.name ?? config.size
  const crust = crusts.find((c) => c.id === config.crust)?.name ?? config.crust
  const toppingNames = config.toppings
    .map((t) => getTopping(t.id)?.name)
    .filter(Boolean)
    .slice(0, 4)
  const more =
    config.toppings.length > 4 ? ` +${config.toppings.length - 4} more` : ''
  return `${size} · ${crust}${toppingNames.length ? ` · ${toppingNames.join(', ')}${more}` : ''}`
}

const [serviceMethod, setServiceMethod] = createSignal<ServiceMethod>('delivery')
const [cartOpen, setCartOpen] = createSignal(false)
const [builderOpen, setBuilderOpen] = createSignal(false)
const [builderConfig, setBuilderConfig] = createSignal<PizzaConfig>(createDefaultPizza())
const [orderPlaced, setOrderPlaced] = createSignal(false)

const [cart, setCart] = createStore<{ lines: CartLine[] }>({ lines: [] })

function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

export function openBuilder(specialtyId?: string) {
  const specialty = specialtyId
    ? specialtyPizzas.find((p) => p.id === specialtyId)
    : undefined
  setBuilderConfig(createDefaultPizza(specialty))
  setBuilderOpen(true)
  setOrderPlaced(false)
}

export function closeBuilder() {
  setBuilderOpen(false)
}

export function updateBuilder(partial: Partial<PizzaConfig>) {
  setBuilderConfig({ ...builderConfig(), ...partial })
}

export function toggleBuilderTopping(id: string) {
  const current = builderConfig()
  const exists = current.toppings.find((t) => t.id === id)
  const toppings = exists
    ? current.toppings.filter((t) => t.id !== id)
    : [...current.toppings, { id, side: 'whole' as const }]
  setBuilderConfig({ ...current, toppings })
}

export function addPizzaToCart(config: PizzaConfig) {
  const unitPrice = pizzaUnitPrice(config)
  setCart(
    produce((state) => {
      state.lines.push({
        id: uid(),
        kind: 'pizza',
        name: config.name,
        image: config.image,
        unitPrice,
        quantity: config.quantity,
        details: pizzaDetails(config),
      })
    }),
  )
  setBuilderOpen(false)
  setCartOpen(true)
}

export function addItemToCart(item: {
  id: string
  name: string
  image: string
  price: number
  description: string
}) {
  setCart(
    produce((state) => {
      const existing = state.lines.find((l) => l.kind === 'item' && l.name === item.name)
      if (existing) {
        existing.quantity += 1
      } else {
        state.lines.push({
          id: uid(),
          kind: 'item',
          name: item.name,
          image: item.image,
          unitPrice: item.price,
          quantity: 1,
          details: item.description,
        })
      }
    }),
  )
  setCartOpen(true)
}

export function changeQty(id: string, delta: number) {
  setCart(
    produce((state) => {
      const line = state.lines.find((l) => l.id === id)
      if (!line) return
      line.quantity += delta
      if (line.quantity <= 0) {
        state.lines = state.lines.filter((l) => l.id !== id)
      }
    }),
  )
}

export function removeLine(id: string) {
  setCart(
    produce((state) => {
      state.lines = state.lines.filter((l) => l.id !== id)
    }),
  )
}

export function clearCart() {
  setCart({ lines: [] })
}

export function cartCount() {
  return cart.lines.reduce((n, l) => n + l.quantity, 0)
}

export function cartSubtotal() {
  return cart.lines.reduce((n, l) => n + l.unitPrice * l.quantity, 0)
}

export function placeOrder() {
  if (!cart.lines.length) return
  clearCart()
  setCartOpen(false)
  setOrderPlaced(true)
}

export {
  cart,
  cartOpen,
  setCartOpen,
  builderOpen,
  builderConfig,
  setBuilderConfig,
  serviceMethod,
  setServiceMethod,
  orderPlaced,
  setOrderPlaced,
}
