export const CATEGORIES = [
  { id: 'pizza', label: 'Stone Oven', sublabel: 'Pizzas' },
  { id: 'burgers', label: 'Burgers', sublabel: 'Angus' },
  { id: 'starters', label: 'Starters', sublabel: 'Share' },
  { id: 'wraps', label: 'Wraps', sublabel: 'Handhelds' },
  { id: 'desserts', label: 'Sweet Endings', sublabel: 'Gelato' },
  { id: 'drinks', label: 'Drinks', sublabel: 'Cafe' },
];

export const SIZES = [
  { id: 'personal', label: 'Personal', inches: '10"', priceMod: -2 },
  { id: 'twelve', label: '12"', inches: '12"', priceMod: 0 },
  { id: 'sixteen', label: '16"', inches: '16"', priceMod: 5 },
  { id: 'sheet', label: 'Party', inches: 'Sheet', priceMod: 12 },
];

export const CRUSTS = [
  { id: 'stone', label: 'Stone oven classic', priceMod: 0 },
  { id: 'thin', label: 'Thin & crispy', priceMod: 0 },
  { id: 'thick', label: 'Thick crust', priceMod: 1.5 },
  { id: 'gf', label: 'Gluten free', priceMod: 3 },
];

export const SAUCES = [
  { id: 'pizza', label: 'House pizza sauce' },
  { id: 'fra', label: 'Fra Diavolo (spicy)' },
  { id: 'vodka', label: 'B-ville pink vodka' },
  { id: 'white', label: 'White / garlic' },
  { id: 'bbq', label: 'BBQ' },
];

export const CHEESE_LEVELS = [
  { id: 'normale', label: 'Regular' },
  { id: 'leggera', label: 'Light' },
  { id: 'abbondante', label: 'Extra cheese', priceMod: 2 },
  { id: 'senza', label: 'No cheese' },
];

export const TOPPINGS = [
  { id: 'pepperoni', label: 'Pepperoni', category: 'carne', price: 1.5 },
  { id: 'sausage', label: 'Sausage', category: 'carne', price: 1.5 },
  { id: 'bacon', label: 'Bacon', category: 'carne', price: 1.5 },
  { id: 'meatball', label: 'Meatballs', category: 'carne', price: 1.5 },
  { id: 'chicken', label: 'Chicken', category: 'carne', price: 2 },
  { id: 'shawarma', label: 'Shawarma chicken', category: 'carne', price: 2 },
  { id: 'mushrooms', label: 'Mushrooms', category: 'verdura', price: 1 },
  { id: 'onions', label: 'Onions', category: 'verdura', price: 1 },
  { id: 'peppers', label: 'Peppers', category: 'verdura', price: 1 },
  { id: 'olives', label: 'Olives', category: 'verdura', price: 1 },
  { id: 'spinach', label: 'Spinach', category: 'verdura', price: 1 },
  { id: 'tomato', label: 'Fresh tomato', category: 'verdura', price: 1 },
  { id: 'basil', label: 'Fresh basil', category: 'verdura', price: 0.5 },
  { id: 'ricotta', label: 'Ricotta', category: 'carne', price: 1.5 },
];

export const MENU_ITEMS = [
  {
    id: 'classic',
    category: 'pizza',
    name: 'Regular Classic Pizza',
    description: 'House sauce and mozzarella — customize it your way.',
    basePrice: 9.95,
    badge: 'Build',
    customizable: true,
    photo: '/assets/photos/pizza.jpg',
    defaultToppings: [],
  },
  {
    id: 'margherita',
    category: 'pizza',
    name: 'Margherita',
    description: 'Fresh mozzarella, fresh basil & pizza sauce.',
    basePrice: 13.95,
    badge: 'Classic',
    customizable: true,
    photo: '/assets/photos/pizza.jpg',
    defaultToppings: ['basil'],
  },
  {
    id: 'meat-lovers',
    category: 'pizza',
    name: "Meat Lover's",
    description: 'Pepperoni, sausage, bacon & meatballs.',
    basePrice: 14.95,
    customizable: true,
    photo: '/assets/photos/pizza.jpg',
    defaultToppings: ['pepperoni', 'sausage', 'bacon', 'meatball'],
  },
  {
    id: 'white-pie',
    category: 'pizza',
    name: 'White Pie',
    description: 'Mozzarella & ricotta cheese.',
    basePrice: 13.95,
    customizable: true,
    photo: '/assets/photos/pizza.jpg',
    defaultToppings: ['ricotta'],
  },
  {
    id: 'chicken-parm',
    category: 'pizza',
    name: 'Chicken Parmesan',
    description: 'Breaded chicken cutlet, pomodoro, mozzarella & fresh basil.',
    basePrice: 14.95,
    customizable: true,
    photo: '/assets/photos/pizza.jpg',
    defaultToppings: ['chicken', 'basil'],
  },
  {
    id: 'bbq-buffalo',
    category: 'pizza',
    name: 'BBQ or Buffalo Chicken',
    description: 'Choose BBQ or buffalo sauce with chicken.',
    basePrice: 15.95,
    customizable: true,
    photo: '/assets/photos/pizza.jpg',
    defaultToppings: ['chicken'],
  },
  {
    id: 'veggie',
    category: 'pizza',
    name: "Vegetarian Lover's",
    description: 'Peppers, onions, mushrooms & olives.',
    basePrice: 12.95,
    badge: 'Veg',
    customizable: true,
    photo: '/assets/photos/pizza.jpg',
    defaultToppings: ['peppers', 'onions', 'mushrooms', 'olives'],
  },
  {
    id: 'philly',
    category: 'pizza',
    name: 'Philly Cheesesteak',
    description: 'Sautéed beef, onions, peppers, mushrooms & mozzarella with American cheese.',
    basePrice: 15.95,
    customizable: true,
    photo: '/assets/photos/pizza.jpg',
    defaultToppings: ['onions', 'peppers', 'mushrooms'],
  },
  {
    id: 'bville-special',
    category: 'pizza',
    name: "B'Ville Special",
    description: 'Shawarma chicken, lettuce, tomato, onion & parsley with garlic sauce drizzle.',
    basePrice: 14.95,
    badge: 'House',
    customizable: true,
    photo: '/assets/photos/pizza.jpg',
    defaultToppings: ['shawarma', 'onions', 'tomato'],
  },
  {
    id: 'thai-chili',
    category: 'pizza',
    name: 'Sesame Thai Chili',
    description: 'Thai chili spread, sesame chicken, mozzarella, ranch garnish.',
    basePrice: 14.95,
    badge: 'Spicy',
    customizable: true,
    photo: '/assets/photos/pizza.jpg',
    defaultToppings: ['chicken'],
  },
  {
    id: 'don-pomodoro',
    category: 'pizza',
    name: 'Don Pomodoro',
    description: 'Mozzarella, fresh plum tomatoes, basil, grated pecorino.',
    basePrice: 13.95,
    customizable: true,
    photo: '/assets/photos/pizza.jpg',
    defaultToppings: ['tomato', 'basil'],
  },
  {
    id: 'combination',
    category: 'pizza',
    name: 'Combination',
    description: 'Pepperoni, sausage, mushroom, onion & peppers.',
    basePrice: 14.95,
    customizable: true,
    photo: '/assets/photos/pizza.jpg',
    defaultToppings: ['pepperoni', 'sausage', 'mushrooms', 'onions', 'peppers'],
  },
  {
    id: 'classic-burger',
    category: 'burgers',
    name: 'Classic Burger',
    description: 'Angus beef, lettuce, tomato, onion — add cheese if you like.',
    basePrice: 10.95,
    customizable: false,
    photo: '/assets/photos/burger.jpg',
  },
  {
    id: 'boom-boom',
    category: 'burgers',
    name: 'Boom Boom Burger',
    description: 'House favorite with spicy boom boom sauce.',
    basePrice: 12.95,
    customizable: false,
    photo: '/assets/photos/burger.jpg',
  },
  {
    id: 'wings',
    category: 'starters',
    name: 'Homemade Wings (6)',
    description: 'Buffalo, teriyaki, BBQ or sweet chili with carrots & celery.',
    basePrice: 8.95,
    customizable: false,
    photo: '/assets/photos/plated-grill.jpg',
  },
  {
    id: 'mozz-sticks',
    category: 'starters',
    name: 'Mozzarella Sticks',
    description: 'Golden-fried with marinara.',
    basePrice: 7.95,
    customizable: false,
    photo: '/assets/photos/grill.jpg',
  },
  {
    id: 'chicken-wrap',
    category: 'wraps',
    name: 'Grilled Chicken Wrap',
    description: 'Lettuce, tomato, cheese & house dressing.',
    basePrice: 10.95,
    customizable: false,
    photo: '/assets/photos/wraps.jpg',
  },
  {
    id: 'gelato',
    category: 'desserts',
    name: 'Italian Gelato Coppa',
    description: 'Sweet Endings — pick your favorite flavor at pickup.',
    basePrice: 5.95,
    badge: '5.95',
    customizable: false,
    photo: '/assets/photos/gelato-pistachio.png',
  },
  {
    id: 'house-blend',
    category: 'drinks',
    name: 'Cafe Robust House Blend',
    description: 'Dark roast, smooth finish.',
    basePrice: 2.99,
    customizable: false,
    photo: '/assets/photos/coffee.jpg',
  },
  {
    id: 'latte',
    category: 'drinks',
    name: 'Latte',
    description: 'Espresso with steamed milk.',
    basePrice: 4.99,
    customizable: false,
    photo: '/assets/photos/cafe-dining.jpg',
  },
];

/** Pizza-only customization gate */
export function isPizzaItem(item) {
  return Boolean(item && item.category === 'pizza' && item.customizable);
}
export function getMenuItemById(id) {
  return MENU_ITEMS.find((item) => item.id === id);
}

export function calcPizzaPrice(item, options) {
  const size = SIZES.find((s) => s.id === options.size) ?? SIZES[1];
  const crust = CRUSTS.find((c) => c.id === options.crust) ?? CRUSTS[0];
  const cheese = CHEESE_LEVELS.find((c) => c.id === options.cheese) ?? CHEESE_LEVELS[0];

  const defaultSet = new Set(item.defaultToppings ?? []);
  const extraToppings = (options.toppings ?? []).filter((t) => !defaultSet.has(t));
  const toppingCost = extraToppings.reduce((sum, id) => {
    const t = TOPPINGS.find((top) => top.id === id);
    return sum + (t?.price ?? 0);
  }, 0);

  return (
    item.basePrice +
    size.priceMod +
    crust.priceMod +
    (cheese.priceMod ?? 0) +
    toppingCost
  );
}

export function formatPrice(amount) {
  return `$${Number(amount).toFixed(2)}`;
}
