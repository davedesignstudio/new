import { createSignal, createMemo } from 'solid-js'
import type { OrderType, MenuItem } from '../data/menu'
import { ALL_TOPPINGS, CHEESES, CRUSTS, SAUCES, SIZES } from '../data/menu'

export interface PizzaConfig {
  crustId: string
  sizeId: string
  sauceId: string
  cheeseId: string
  toppingIds: string[]
  qty: number
}

export interface CartLine {
  key: string
  itemId: string
  name: string
  unitPrice: number
  qty: number
  isPizza: boolean
  config?: PizzaConfig
  summary?: string
}

const [orderType, setOrderType] = createSignal<OrderType | null>(null)
const [storeAddress, setStoreAddress] = createSignal('214 Main St · Downtown')
const [cart, setCart] = createSignal<CartLine[]>([])
const [cartOpen, setCartOpen] = createSignal(false)
const [checkoutOpen, setCheckoutOpen] = createSignal(false)
const [builderItem, setBuilderItem] = createSignal<MenuItem | null>(null)
const [activeCategory, setActiveCategory] = createSignal<string>('pizza')
const [orderPlaced, setOrderPlaced] = createSignal(false)

export function calcPizzaUnitPrice(base: number, config: PizzaConfig) {
  const crust = CRUSTS.find((c) => c.id === config.crustId)?.price ?? 0
  const size = SIZES.find((s) => s.id === config.sizeId)?.price ?? 0
  const sauce = SAUCES.find((s) => s.id === config.sauceId)?.price ?? 0
  const cheese = CHEESES.find((c) => c.id === config.cheeseId)?.price ?? 0
  const toppings = config.toppingIds.reduce((sum, id) => {
    return sum + (ALL_TOPPINGS.find((t) => t.id === id)?.price ?? 0)
  }, 0)
  return base + crust + size + sauce + cheese + toppings
}

export function summarizeConfig(config: PizzaConfig) {
  const crust = CRUSTS.find((c) => c.id === config.crustId)?.label
  const size = SIZES.find((s) => s.id === config.sizeId)?.label
  const toppings = config.toppingIds
    .map((id) => ALL_TOPPINGS.find((t) => t.id === id)?.label)
    .filter(Boolean)
  const parts = [`${size} ${crust}`]
  if (toppings.length) parts.push(toppings.join(', '))
  return parts.join(' · ')
}

export function defaultConfig(item: MenuItem): PizzaConfig {
  return {
    crustId: 'hand-tossed',
    sizeId: 'large',
    sauceId: item.id === 'bbq-chicken' ? 'bbq' : item.id === 'buffalo-chicken' ? 'ranch' : 'robust',
    cheeseId: 'normal',
    toppingIds: [...(item.defaultToppings ?? [])],
    qty: 1,
  }
}

const itemCount = createMemo(() => cart().reduce((n, line) => n + line.qty, 0))
const subtotal = createMemo(() => cart().reduce((n, line) => n + line.unitPrice * line.qty, 0))
const tax = createMemo(() => subtotal() * 0.0825)
const deliveryFee = createMemo(() => (orderType() === 'delivery' && subtotal() > 0 ? 3.99 : 0))
const total = createMemo(() => subtotal() + tax() + deliveryFee())

function lineKey(itemId: string, config?: PizzaConfig) {
  if (!config) return itemId
  return [
    itemId,
    config.crustId,
    config.sizeId,
    config.sauceId,
    config.cheeseId,
    [...config.toppingIds].sort().join('+'),
  ].join('|')
}

export const store = {
  orderType,
  setOrderType,
  storeAddress,
  setStoreAddress,
  cart,
  cartOpen,
  setCartOpen,
  checkoutOpen,
  setCheckoutOpen,
  builderItem,
  setBuilderItem,
  activeCategory,
  setActiveCategory,
  orderPlaced,
  setOrderPlaced,
  itemCount,
  subtotal,
  tax,
  deliveryFee,
  total,
  openBuilder(item: MenuItem) {
    setBuilderItem(item)
  },
  closeBuilder() {
    setBuilderItem(null)
  },
  addPizza(item: MenuItem, config: PizzaConfig) {
    const key = lineKey(item.id, config)
    const unitPrice = calcPizzaUnitPrice(item.price, config)
    setCart((prev) => {
      const existing = prev.find((l) => l.key === key)
      if (existing) {
        return prev.map((l) =>
          l.key === key ? { ...l, qty: l.qty + config.qty } : l,
        )
      }
      return [
        ...prev,
        {
          key,
          itemId: item.id,
          name: item.name,
          unitPrice,
          qty: config.qty,
          isPizza: true,
          config: { ...config },
          summary: summarizeConfig(config),
        },
      ]
    })
    setBuilderItem(null)
    setCartOpen(true)
  },
  addSimple(item: MenuItem, qty = 1) {
    const key = item.id
    setCart((prev) => {
      const existing = prev.find((l) => l.key === key)
      if (existing) {
        return prev.map((l) => (l.key === key ? { ...l, qty: l.qty + qty } : l))
      }
      return [
        ...prev,
        {
          key,
          itemId: item.id,
          name: item.name,
          unitPrice: item.price,
          qty,
          isPizza: false,
          summary: item.description,
        },
      ]
    })
    setCartOpen(true)
  },
  updateQty(key: string, qty: number) {
    if (qty <= 0) {
      setCart((prev) => prev.filter((l) => l.key !== key))
      return
    }
    setCart((prev) => prev.map((l) => (l.key === key ? { ...l, qty } : l)))
  },
  removeLine(key: string) {
    setCart((prev) => prev.filter((l) => l.key !== key))
  },
  clearCart() {
    setCart([])
  },
  placeOrder() {
    setOrderPlaced(true)
    setCheckoutOpen(false)
    setCartOpen(false)
    setCart([])
  },
  resetOrder() {
    setOrderPlaced(false)
    setOrderType(null)
  },
}
