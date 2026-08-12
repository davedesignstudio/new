import { createSignal, createRoot } from 'solid-js'
import type {
  CheeseAmount,
  CrustId,
  MenuItem,
  SauceId,
  SizeId,
} from '../data/menu'
import { crusts, sizes, toppings } from '../data/menu'

export type OrderType = 'delivery' | 'carryout'

export interface CartLine {
  id: string
  name: string
  image: string
  quantity: number
  unitPrice: number
  isPizza: boolean
  size?: SizeId
  crust?: CrustId
  sauce?: SauceId
  cheese?: CheeseAmount
  toppingIds?: string[]
  notes?: string
}

function createCartStore() {
  const [orderType, setOrderType] = createSignal<OrderType>('delivery')
  const [address, setAddress] = createSignal('123 Main St, Your City')
  const [store, setStore] = createSignal('Downtown — 0.8 mi')
  const [cart, setCart] = createSignal<CartLine[]>([])
  const [cartOpen, setCartOpen] = createSignal(false)
  const [builderItem, setBuilderItem] = createSignal<MenuItem | null>(null)

  const itemCount = () => cart().reduce((n, line) => n + line.quantity, 0)
  const subtotal = () =>
    cart().reduce((sum, line) => sum + line.unitPrice * line.quantity, 0)
  const tax = () => subtotal() * 0.0825
  const deliveryFee = () => (orderType() === 'delivery' && subtotal() > 0 ? 3.99 : 0)
  const total = () => subtotal() + tax() + deliveryFee()

  function openBuilder(item: MenuItem) {
    setBuilderItem(item)
  }

  function closeBuilder() {
    setBuilderItem(null)
  }

  function addSimpleItem(item: MenuItem) {
    setCart((prev) => {
      const existing = prev.find((l) => l.id === item.id && !l.isPizza)
      if (existing) {
        return prev.map((l) =>
          l.id === existing.id ? { ...l, quantity: l.quantity + 1 } : l,
        )
      }
      return [
        ...prev,
        {
          id: item.id,
          name: item.name,
          image: item.image,
          quantity: 1,
          unitPrice: item.price,
          isPizza: false,
        },
      ]
    })
    setCartOpen(true)
  }

  function addPizza(config: {
    item: MenuItem
    size: SizeId
    crust: CrustId
    sauce: SauceId
    cheese: CheeseAmount
    toppingIds: string[]
    notes: string
  }) {
    const sizeOpt = sizes.find((s) => s.id === config.size)!
    const crustOpt = crusts.find((c) => c.id === config.crust)!
    const cheeseExtra = config.cheese === 'extra' ? 1.5 : 0
    const toppingTotal = config.toppingIds.reduce((sum, id) => {
      const t = toppings.find((x) => x.id === id)
      return sum + (t?.price ?? 0)
    }, 0)
    const unitPrice =
      config.item.price + sizeOpt.priceMod + crustOpt.priceMod + cheeseExtra + toppingTotal

    const lineId = `pizza-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
    setCart((prev) => [
      ...prev,
      {
        id: lineId,
        name: config.item.name,
        image: config.item.image,
        quantity: 1,
        unitPrice,
        isPizza: true,
        size: config.size,
        crust: config.crust,
        sauce: config.sauce,
        cheese: config.cheese,
        toppingIds: config.toppingIds,
        notes: config.notes || undefined,
      },
    ])
    setBuilderItem(null)
    setCartOpen(true)
  }

  function updateQty(id: string, delta: number) {
    setCart((prev) =>
      prev
        .map((l) => (l.id === id ? { ...l, quantity: l.quantity + delta } : l))
        .filter((l) => l.quantity > 0),
    )
  }

  function removeLine(id: string) {
    setCart((prev) => prev.filter((l) => l.id !== id))
  }

  function clearCart() {
    setCart([])
  }

  return {
    orderType,
    setOrderType,
    address,
    setAddress,
    store,
    setStore,
    cart,
    cartOpen,
    setCartOpen,
    builderItem,
    openBuilder,
    closeBuilder,
    addSimpleItem,
    addPizza,
    updateQty,
    removeLine,
    clearCart,
    itemCount,
    subtotal,
    tax,
    deliveryFee,
    total,
  }
}

export const cartStore = createRoot(createCartStore)
