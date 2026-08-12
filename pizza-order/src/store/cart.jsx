import { createContext, useContext, createSignal, createMemo } from 'solid-js';
import { coupons } from '../data/menu';

const CartContext = createContext();

export function CartProvider(props) {
  const [items, setItems] = createSignal([]);
  const [isOpen, setIsOpen] = createSignal(false);
  const [appliedCoupon, setAppliedCoupon] = createSignal(null);
  const [orderType, setOrderType] = createSignal('delivery');
  const [storeAddress, setStoreAddress] = createSignal('123 Main Street, Anytown, USA 12345');

  const subtotal = createMemo(() =>
    items().reduce((sum, item) => sum + item.price * item.quantity, 0)
  );

  const discount = createMemo(() => {
    const coupon = appliedCoupon();
    if (!coupon) return 0;
    if (coupon.type === 'percent') return subtotal() * coupon.discount;
    return Math.min(coupon.discount, subtotal());
  });

  const deliveryFee = createMemo(() => (orderType() === 'delivery' ? 3.99 : 0));
  const tax = createMemo(() => (subtotal() - discount()) * 0.08);
  const total = createMemo(() => subtotal() - discount() + deliveryFee() + tax());

  const itemCount = createMemo(() =>
    items().reduce((sum, item) => sum + item.quantity, 0)
  );

  function addItem(cartItem) {
    setItems((prev) => [...prev, { ...cartItem, id: crypto.randomUUID() }]);
    setIsOpen(true);
  }

  function removeItem(id) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  function updateQuantity(id, quantity) {
    if (quantity < 1) {
      removeItem(id);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  }

  function clearCart() {
    setItems([]);
    setAppliedCoupon(null);
  }

  function applyCoupon(code) {
    const coupon = coupons.find((c) => c.code === code.toUpperCase());
    if (coupon) {
      setAppliedCoupon(coupon);
      return { success: true, message: coupon.description };
    }
    return { success: false, message: 'Invalid coupon code' };
  }

  const value = {
    items,
    isOpen,
    setIsOpen,
    orderType,
    setOrderType,
    storeAddress,
    setStoreAddress,
    subtotal,
    discount,
    deliveryFee,
    tax,
    total,
    itemCount,
    appliedCoupon,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    applyCoupon,
  };

  return (
    <CartContext.Provider value={value}>
      {props.children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}
