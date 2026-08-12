import { createContext, useContext, createSignal } from 'solid-js';
import { SIZES, CRUSTS, SAUCES, CHEESES, getToppingById, calcPizzaPrice } from '../data/menu';

const CartContext = createContext();

let nextId = 1;

export function createDefaultPizza() {
  return {
    sizeId: 'medium',
    crustId: 'hand-tossed',
    sauceId: 'robust',
    cheeseId: 'normal',
    toppingIds: [],
    quantity: 1,
    name: 'Build Your Own Pizza',
  };
}

export function CartProvider(props) {
  const [items, setItems] = createSignal([]);
  const [builder, setBuilder] = createSignal(createDefaultPizza());
  const [activeTab, setActiveTab] = createSignal('pizzas');
  const [builderStep, setBuilderStep] = createSignal(0);
  const [showCheckout, setShowCheckout] = createSignal(false);
  const [orderPlaced, setOrderPlaced] = createSignal(false);

  const cartTotal = () =>
    items().reduce((sum, item) => sum + item.price * item.quantity, 0);

  const cartCount = () =>
    items().reduce((sum, item) => sum + item.quantity, 0);

  const builderPrice = () => {
    const b = builder();
    return calcPizzaPrice(b);
  };

  function updateBuilder(patch) {
    setBuilder((prev) => ({ ...prev, ...patch }));
  }

  function addPizzaToCart(pizza = null) {
    const b = pizza ?? builder();
    const size = SIZES.find((s) => s.id === b.sizeId);
    const crust = CRUSTS.find((c) => c.id === b.crustId);
    const sauce = SAUCES.find((s) => s.id === b.sauceId);
    const cheese = CHEESES.find((c) => c.id === b.cheeseId);
    const toppings = b.toppingIds.map((id) => getToppingById(id)?.label).filter(Boolean);

    const price = calcPizzaPrice(b);
    const description = [
      `${size?.label} (${size?.inches})`,
      crust?.label,
      sauce?.label,
      cheese?.label !== 'Normal' ? `${cheese?.label} cheese` : null,
      toppings.length ? toppings.join(', ') : null,
    ]
      .filter(Boolean)
      .join(' · ');

    setItems((prev) => [
      ...prev,
      {
        id: nextId++,
        type: 'pizza',
        name: b.name ?? 'Build Your Own Pizza',
        description,
        price,
        quantity: b.quantity ?? 1,
        toppingIds: [...b.toppingIds],
      },
    ]);

    if (!pizza) {
      setBuilder(createDefaultPizza());
      setBuilderStep(0);
    }
  }

  function addSimpleItem(item) {
    setItems((prev) => [
      ...prev,
      {
        id: nextId++,
        type: item.type ?? 'side',
        name: item.name,
        description: item.description ?? '',
        price: item.price,
        quantity: 1,
      },
    ]);
  }

  function updateQuantity(id, delta) {
    setItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function removeItem(id) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  function placeOrder() {
    setOrderPlaced(true);
    setShowCheckout(false);
    setItems([]);
    setBuilder(createDefaultPizza());
    setBuilderStep(0);
  }

  const value = {
    items,
    builder,
    activeTab,
    builderStep,
    showCheckout,
    orderPlaced,
    cartTotal,
    cartCount,
    builderPrice,
    setActiveTab,
    setBuilderStep,
    setShowCheckout,
    setOrderPlaced,
    updateBuilder,
    addPizzaToCart,
    addSimpleItem,
    updateQuantity,
    removeItem,
    placeOrder,
  };

  return (
    <CartContext.Provider value={value}>
      {props.children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
