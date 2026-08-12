export const SIZES = [
  { id: 'small', label: 'Small', inches: '10"', slices: 6, basePrice: 7.99 },
  { id: 'medium', label: 'Medium', inches: '12"', slices: 8, basePrice: 11.99 },
  { id: 'large', label: 'Large', inches: '14"', slices: 8, basePrice: 14.99 },
  { id: 'xlarge', label: 'X-Large', inches: '16"', slices: 12, basePrice: 17.99 },
];

export const CRUSTS = [
  { id: 'hand-tossed', label: 'Hand Tossed', description: 'Classic, chewy crust', price: 0 },
  { id: 'thin', label: 'Crunchy Thin', description: 'Crispy and light', price: 0 },
  { id: 'brooklyn', label: 'Brooklyn Style', description: 'Large, foldable slices', price: 1.5 },
  { id: 'handmade-pan', label: 'Handmade Pan', description: 'Thick, buttery crust', price: 3 },
  { id: 'gluten-free', label: 'Gluten Free Crust', description: 'Small only', price: 3, smallOnly: true },
];

export const SAUCES = [
  { id: 'robust', label: 'Robust Inspired Tomato', price: 0 },
  { id: 'hearty', label: 'Hearty Marinara', price: 0 },
  { id: 'bbq', label: 'Honey BBQ', price: 0.5 },
  { id: 'alfredo', label: 'Alfredo', price: 0.5 },
  { id: 'garlic', label: 'Garlic Parmesan', price: 0.5 },
];

export const CHEESES = [
  { id: 'normal', label: 'Normal', price: 0 },
  { id: 'light', label: 'Light', price: 0 },
  { id: 'extra', label: 'Extra', price: 1.5 },
  { id: 'none', label: 'None', price: 0 },
];

export const TOPPINGS = [
  { id: 'pepperoni', label: 'Pepperoni', category: 'meat', price: 1.5, emoji: '🍕' },
  { id: 'sausage', label: 'Italian Sausage', category: 'meat', price: 1.5, emoji: '🌭' },
  { id: 'bacon', label: 'Bacon', category: 'meat', price: 1.5, emoji: '🥓' },
  { id: 'ham', label: 'Ham', category: 'meat', price: 1.5, emoji: '🍖' },
  { id: 'beef', label: 'Beef', category: 'meat', price: 1.5, emoji: '🥩' },
  { id: 'chicken', label: 'Grilled Chicken', category: 'meat', price: 1.5, emoji: '🍗' },
  { id: 'mushrooms', label: 'Mushrooms', category: 'veggie', price: 1, emoji: '🍄' },
  { id: 'onions', label: 'Onions', category: 'veggie', price: 1, emoji: '🧅' },
  { id: 'peppers', label: 'Green Peppers', category: 'veggie', price: 1, emoji: '🫑' },
  { id: 'olives', label: 'Black Olives', category: 'veggie', price: 1, emoji: '🫒' },
  { id: 'jalapenos', label: 'Jalapeño Peppers', category: 'veggie', price: 1, emoji: '🌶️' },
  { id: 'spinach', label: 'Spinach', category: 'veggie', price: 1, emoji: '🥬' },
  { id: 'tomatoes', label: 'Diced Tomatoes', category: 'veggie', price: 1, emoji: '🍅' },
  { id: 'pineapple', label: 'Pineapple', category: 'veggie', price: 1, emoji: '🍍' },
];

export const SPECIALTY_PIZZAS = [
  {
    id: 'pepperoni',
    name: 'Ultimate Pepperoni',
    description: 'Two layers of pepperoni with extra cheese',
    image: '🍕',
    basePrice: 12.99,
    toppings: ['pepperoni'],
    badge: 'Fan Favorite',
  },
  {
    id: 'meatzza',
    name: 'MeatZZa',
    description: 'Pepperoni, ham, Italian sausage, beef, bacon',
    image: '🥩',
    basePrice: 14.99,
    toppings: ['pepperoni', 'ham', 'sausage', 'beef', 'bacon'],
    badge: 'Bestseller',
  },
  {
    id: 'veggie',
    name: 'Pacific Veggie',
    description: 'Onions, peppers, mushrooms, tomatoes, olives, spinach',
    image: '🥗',
    basePrice: 13.99,
    toppings: ['onions', 'peppers', 'mushrooms', 'tomatoes', 'olives', 'spinach'],
    badge: null,
  },
  {
    id: 'hawaiian',
    name: 'Honolulu Hawaiian',
    description: 'Ham, bacon, pineapple, roasted red peppers',
    image: '🍍',
    basePrice: 13.49,
    toppings: ['ham', 'bacon', 'pineapple', 'peppers'],
    badge: null,
  },
  {
    id: 'buffalo',
    name: 'Buffalo Chicken',
    description: 'Grilled chicken, onions, hot buffalo sauce, provolone',
    image: '🍗',
    basePrice: 14.49,
    toppings: ['chicken', 'onions', 'jalapenos'],
    badge: 'Spicy',
  },
  {
    id: 'cheese',
    name: 'Cheese Pizza',
    description: 'Extra cheese on our hand tossed crust',
    image: '🧀',
    basePrice: 9.99,
    toppings: [],
    badge: null,
  },
];

export const SIDES = [
  { id: 'bread-twists', name: 'Parmesan Bread Twists', price: 5.99, image: '🥖' },
  { id: 'cheesy-bread', name: 'Stuffed Cheesy Bread', price: 7.99, image: '🧀' },
  { id: 'wings', name: 'Hot Buffalo Wings (8pc)', price: 8.99, image: '🍗' },
  { id: 'cinna-stix', name: 'Cinnamon Bread Twists', price: 5.99, image: '🍩' },
];

export const DRINKS = [
  { id: 'coke', name: 'Coca-Cola (2L)', price: 3.49, image: '🥤' },
  { id: 'sprite', name: 'Sprite (2L)', price: 3.49, image: '🥤' },
  { id: 'water', name: 'Dasani Water', price: 1.99, image: '💧' },
];

export function getToppingById(id) {
  return TOPPINGS.find((t) => t.id === id);
}

export function calcPizzaPrice({ sizeId, crustId, sauceId, cheeseId, toppingIds }) {
  const size = SIZES.find((s) => s.id === sizeId) ?? SIZES[1];
  const crust = CRUSTS.find((c) => c.id === crustId) ?? CRUSTS[0];
  const sauce = SAUCES.find((s) => s.id === sauceId) ?? SAUCES[0];
  const cheese = CHEESES.find((c) => c.id === cheeseId) ?? CHEESES[0];

  const toppingTotal = toppingIds.reduce((sum, id) => {
    const t = getToppingById(id);
    return sum + (t?.price ?? 0);
  }, 0);

  return size.basePrice + crust.price + sauce.price + cheese.price + toppingTotal;
}
