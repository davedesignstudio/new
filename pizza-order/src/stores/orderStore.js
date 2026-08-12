import { createSignal, createMemo } from 'solid-js';
import { SIZES, CRUSTS, TOPPINGS } from '../data/pizzas';

const [cart, setCart] = createSignal([]);
const [currentStep, setCurrentStep] = createSignal('pizzas');
const [customizingPizza, setCustomizingPizza] = createSignal(null);
const [orderInfo, setOrderInfo] = createSignal({
  name: '',
  phone: '',
  address: '',
  deliveryType: 'delivery',
});

const cartTotal = createMemo(() =>
  cart().reduce((sum, item) => sum + item.totalPrice * item.quantity, 0)
);

const cartCount = createMemo(() =>
  cart().reduce((sum, item) => sum + item.quantity, 0)
);

function getToppingPrice(toppingIds) {
  return toppingIds.reduce((sum, id) => {
    const topping = TOPPINGS.find((t) => t.id === id);
    return sum + (topping?.price ?? 0);
  }, 0);
}

function calculatePizzaPrice(sizeId, crustId, toppingIds) {
  const size = SIZES.find((s) => s.id === sizeId) ?? SIZES[1];
  const crust = CRUSTS.find((c) => c.id === crustId) ?? CRUSTS[0];
  const sizeMultiplier = size.basePrice / SIZES[1].basePrice;
  const toppingsPrice = getToppingPrice(toppingIds) * sizeMultiplier;
  return size.basePrice + crust.price + toppingsPrice;
}

function addToCart(item) {
  setCart((prev) => [...prev, { ...item, id: crypto.randomUUID() }]);
}

function removeFromCart(itemId) {
  setCart((prev) => prev.filter((item) => item.id !== itemId));
}

function updateQuantity(itemId, quantity) {
  if (quantity <= 0) {
    removeFromCart(itemId);
    return;
  }
  setCart((prev) =>
    prev.map((item) => (item.id === itemId ? { ...item, quantity } : item))
  );
}

function clearCart() {
  setCart([]);
}

export {
  cart,
  currentStep,
  customizingPizza,
  orderInfo,
  cartTotal,
  cartCount,
  setCurrentStep,
  setCustomizingPizza,
  setOrderInfo,
  calculatePizzaPrice,
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
};
