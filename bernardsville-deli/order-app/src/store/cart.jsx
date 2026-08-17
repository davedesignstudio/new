import { createStore } from 'solid-js/store';
import { createContext, useContext, createSignal } from 'solid-js';
import { calcPizzaPrice } from '../data/menu';

const CartContext = createContext();

let nextId = 1;

export function CartProvider(props) {
  const [orderType, setOrderType] = createSignal('delivery');
  const [address, setAddress] = createSignal('');
  const [cartOpen, setCartOpen] = createSignal(false);
  const [builderItem, setBuilderItemRaw] = createSignal(null);
  const setBuilderItem = (item) => {
    if (item && item.category !== 'pizza') {
      setBuilderItemRaw(null);
      return;
    }
    setBuilderItemRaw(item);
  };
  const [store, setStore] = createStore({ items: [] });

  const addItem = (item, options = null) => {
    const price = options ? calcPizzaPrice(item, options) : item.basePrice;
    const lineOptions = item.category === 'pizza' ? options : null;
    const existing = store.items.findIndex(
      (line) =>
        line.itemId === item.id &&
        JSON.stringify(line.options) === JSON.stringify(lineOptions)
    );
    if (existing !== -1) {
      setStore('items', existing, 'quantity', (qty) => qty + 1);
      setCartOpen(true);
      return;
    }
    setStore('items', (items) => [
      ...items,
      {
        cartId: nextId++,
        itemId: item.id,
        name: item.name,
        price,
        quantity: 1,
        options: lineOptions,
      },
    ]);
    setCartOpen(true);
  };

  const addCustomItem = (name, price) => {
    setStore('items', (items) => [
      ...items,
      {
        cartId: nextId++,
        itemId: 'game-pizza',
        name,
        price,
        quantity: 1,
        options: null,
      },
    ]);
    setCartOpen(true);
  };

  const removeItem = (cartId) => {
    setStore('items', (items) => items.filter((i) => i.cartId !== cartId));
  };

  const updateQuantity = (cartId, delta) => {
    const index = store.items.findIndex((i) => i.cartId === cartId);
    if (index === -1) return;
    setStore('items', index, 'quantity', (q) => Math.max(1, q + delta));
  };

  const clearCart = () => setStore('items', []);

  const subtotal = () =>
    store.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const itemCount = () =>
    store.items.reduce((sum, i) => sum + i.quantity, 0);

  const value = {
    orderType,
    setOrderType,
    address,
    setAddress,
    cartOpen,
    setCartOpen,
    builderItem,
    setBuilderItem,
    items: () => store.items,
    addItem,
    addCustomItem,
    removeItem,
    updateQuantity,
    clearCart,
    subtotal,
    itemCount,
  };

  return (
    <CartContext.Provider value={value}>{props.children}</CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
