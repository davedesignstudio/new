import { createStore } from 'solid-js/store'
import { createSignal, createMemo } from 'solid-js'
import { toppings as toppingList } from '../data/menu'

const [cart, setCart] = createStore([])
const [orderType, setOrderType] = createSignal('delivery')
const [cartOpen, setCartOpen] = createSignal(false)
const [builderItem, setBuilderItem] = createSignal(null)
const [checkoutDone, setCheckoutDone] = createSignal(false)
const [flyPulse, setFlyPulse] = createSignal(false)

let idCounter = 1

function calcLinePrice(item) {
  const sizeExtra = item.sizePrice || 0
  const toppingExtra = (item.toppings || []).reduce((sum, tid) => {
    const t = toppingList.find((x) => x.id === tid)
    return sum + (t?.price || 0)
  }, 0)
  return (item.basePrice + sizeExtra + toppingExtra) * item.qty
}

const itemCount = createMemo(() => cart.reduce((n, i) => n + i.qty, 0))
const subtotal = createMemo(() => cart.reduce((n, i) => n + calcLinePrice(i), 0))
const tax = createMemo(() => subtotal() * 0.0825)
const deliveryFee = createMemo(() =>
  orderType() === 'delivery' && subtotal() > 0 ? 3.99 : 0,
)
const total = createMemo(() => subtotal() + tax() + deliveryFee())

function addItem(item) {
  const entry = {
    ...item,
    cartId: idCounter++,
    qty: item.qty || 1,
  }
  setCart(cart.length, entry)
  setFlyPulse(true)
  setTimeout(() => setFlyPulse(false), 500)
  setCartOpen(true)
}

function updateQty(cartId, qty) {
  const idx = cart.findIndex((i) => i.cartId === cartId)
  if (idx === -1) return
  if (qty <= 0) {
    setCart((c) => c.filter((i) => i.cartId !== cartId))
  } else {
    setCart(idx, 'qty', qty)
  }
}

function removeItem(cartId) {
  setCart((c) => c.filter((i) => i.cartId !== cartId))
}

function clearCart() {
  setCart([])
}

function placeOrder() {
  if (cart.length === 0) return
  setCheckoutDone(true)
  setCart([])
  setTimeout(() => {
    setCheckoutDone(false)
    setCartOpen(false)
  }, 3200)
}

export function useCart() {
  return {
    cart,
    orderType,
    setOrderType,
    cartOpen,
    setCartOpen,
    builderItem,
    setBuilderItem,
    checkoutDone,
    flyPulse,
    itemCount,
    subtotal,
    tax,
    deliveryFee,
    total,
    addItem,
    updateQty,
    removeItem,
    clearCart,
    placeOrder,
    calcLinePrice,
  }
}
