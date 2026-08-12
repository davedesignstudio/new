import { createSignal, createMemo } from 'solid-js'
import type { MenuItem, CrustOption, SizeOption } from './data/menu'
import { crusts, sizes, sauces, cheeseAmounts, toppings } from './data/menu'

export type Fulfillment = 'delivery' | 'carryout'

export interface CartLine {
  id: string
  itemId: string
  name: string
  image: string
  quantity: number
  unitPrice: number
  details: string[]
}

export interface PizzaBuild {
  item: MenuItem
  crustId: string
  sizeId: string
  sauceId: string
  cheeseId: string
  toppingIds: string[]
  quantity: number
}

let lineSeq = 0

const [fulfillment, setFulfillment] = createSignal<Fulfillment>('delivery')
const [cartOpen, setCartOpen] = createSignal(false)
const [builderItem, setBuilderItem] = createSignal<MenuItem | null>(null)
const [cart, setCart] = createSignal<CartLine[]>([])
const [activeCategory, setActiveCategory] = createSignal('pizza')
const [orderPlaced, setOrderPlaced] = createSignal(false)
const [showConfirmation, setShowConfirmation] = createSignal(false)

export {
  fulfillment,
  setFulfillment,
  cartOpen,
  setCartOpen,
  builderItem,
  setBuilderItem,
  cart,
  setCart,
  activeCategory,
  setActiveCategory,
  orderPlaced,
  setOrderPlaced,
  showConfirmation,
  setShowConfirmation,
}

export const cartCount = createMemo(() =>
  cart().reduce((sum, line) => sum + line.quantity, 0),
)

export const cartSubtotal = createMemo(() =>
  cart().reduce((sum, line) => sum + line.unitPrice * line.quantity, 0),
)

export function openBuilder(item: MenuItem) {
  setBuilderItem(item)
}

export function closeBuilder() {
  setBuilderItem(null)
}

export function calcPizzaPrice(build: PizzaBuild) {
  const crust = crusts.find((c) => c.id === build.crustId) as CrustOption
  const size = sizes.find((s) => s.id === build.sizeId) as SizeOption
  const toppingCost = build.toppingIds.reduce((sum, id) => {
    const t = toppings.find((x) => x.id === id)
    return sum + (t?.price ?? 0)
  }, 0)
  const cheeseExtra = build.cheeseId === 'extra' ? 1.5 : 0
  return (build.item.basePrice * size.multiplier + crust.price + toppingCost + cheeseExtra)
}

export function addPizzaToCart(build: PizzaBuild) {
  const crust = crusts.find((c) => c.id === build.crustId)!
  const size = sizes.find((s) => s.id === build.sizeId)!
  const toppingNames = build.toppingIds
    .map((id) => toppings.find((t) => t.id === id)?.name)
    .filter(Boolean) as string[]

  const details = [
    `${size.name} · ${crust.name}`,
    `Sauce: ${sauces.find((s) => s.id === build.sauceId)?.name ?? build.sauceId}`,
    `Cheese: ${cheeseAmounts.find((c) => c.id === build.cheeseId)?.name ?? build.cheeseId}`,
    ...(toppingNames.length ? [`Toppings: ${toppingNames.join(', ')}`] : ['Cheese pizza']),
  ]

  const unitPrice = calcPizzaPrice(build)
  const line: CartLine = {
    id: `line-${++lineSeq}`,
    itemId: build.item.id,
    name: build.item.name,
    image: build.item.image,
    quantity: build.quantity,
    unitPrice,
    details,
  }

  setCart((prev) => [...prev, line])
  closeBuilder()
  setCartOpen(true)
}

export function addSimpleToCart(item: MenuItem) {
  const existing = cart().find((l) => l.itemId === item.id && l.details.length === 0)
  if (existing) {
    setCart((prev) =>
      prev.map((l) =>
        l.id === existing.id ? { ...l, quantity: l.quantity + 1 } : l,
      ),
    )
  } else {
    setCart((prev) => [
      ...prev,
      {
        id: `line-${++lineSeq}`,
        itemId: item.id,
        name: item.name,
        image: item.image,
        quantity: 1,
        unitPrice: item.basePrice,
        details: [],
      },
    ])
  }
  setCartOpen(true)
}

export function updateQty(lineId: string, delta: number) {
  setCart((prev) =>
    prev
      .map((l) =>
        l.id === lineId ? { ...l, quantity: Math.max(0, l.quantity + delta) } : l,
      )
      .filter((l) => l.quantity > 0),
  )
}

export function removeLine(lineId: string) {
  setCart((prev) => prev.filter((l) => l.id !== lineId))
}

export function clearCart() {
  setCart([])
}

export function placeOrder() {
  if (cart().length === 0) return
  setOrderPlaced(true)
  setShowConfirmation(true)
  clearCart()
  setCartOpen(false)
}
