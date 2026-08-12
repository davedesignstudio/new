export const SIZES = [
  { id: 'small', label: 'Small', inches: '10"', basePrice: 7.99 },
  { id: 'medium', label: 'Medium', inches: '12"', basePrice: 10.99 },
  { id: 'large', label: 'Large', inches: '14"', basePrice: 13.99 },
  { id: 'xlarge', label: 'X-Large', inches: '16"', basePrice: 16.99 },
];

export const CRUSTS = [
  { id: 'hand-tossed', label: 'Hand Tossed', price: 0 },
  { id: 'thin', label: 'Thin Crust', price: 0 },
  { id: 'crunchy-thin', label: 'Crunchy Thin', price: 0 },
  { id: 'handmade-pan', label: 'Handmade Pan', price: 2.5 },
  { id: 'stuffed', label: 'Stuffed Crust', price: 3.5 },
];

export const TOPPINGS = [
  { id: 'pepperoni', label: 'Pepperoni', price: 1.5, category: 'meat' },
  { id: 'sausage', label: 'Italian Sausage', price: 1.5, category: 'meat' },
  { id: 'ham', label: 'Ham', price: 1.5, category: 'meat' },
  { id: 'bacon', label: 'Bacon', price: 1.5, category: 'meat' },
  { id: 'chicken', label: 'Grilled Chicken', price: 1.75, category: 'meat' },
  { id: 'beef', label: 'Beef', price: 1.5, category: 'meat' },
  { id: 'mushrooms', label: 'Mushrooms', price: 1.25, category: 'veggie' },
  { id: 'onions', label: 'Onions', price: 1.25, category: 'veggie' },
  { id: 'green-peppers', label: 'Green Peppers', price: 1.25, category: 'veggie' },
  { id: 'black-olives', label: 'Black Olives', price: 1.25, category: 'veggie' },
  { id: 'tomatoes', label: 'Tomatoes', price: 1.25, category: 'veggie' },
  { id: 'jalapenos', label: 'Jalapeño Peppers', price: 1.25, category: 'veggie' },
  { id: 'extra-cheese', label: 'Extra Cheese', price: 1.5, category: 'cheese' },
  { id: 'feta', label: 'Feta Cheese', price: 1.5, category: 'cheese' },
];

export const SIDES = [
  { id: 'bread-twists', label: 'Garlic Bread Twists', description: '8 pieces with garlic seasoning', price: 5.99, emoji: '🥖' },
  { id: 'wings', label: 'Bone-In Chicken Wings', description: '8 wings, choose your sauce', price: 8.99, emoji: '🍗' },
  { id: 'boneless-wings', label: 'Boneless Chicken', description: '8 pieces, crispy and tender', price: 8.49, emoji: '🍗' },
  { id: 'cheesy-bread', label: 'Stuffed Cheesy Bread', description: '8 pieces with cheese & bacon', price: 7.99, emoji: '🧀' },
  { id: 'marble-cookie', label: 'Marble Cookie Brownie', description: 'Warm chocolate brownie', price: 6.99, emoji: '🍫' },
];

export const DRINKS = [
  { id: 'coke', label: 'Coca-Cola', description: '20 oz bottle', price: 2.49, emoji: '🥤' },
  { id: 'sprite', label: 'Sprite', description: '20 oz bottle', price: 2.49, emoji: '🥤' },
  { id: 'fanta', label: 'Fanta Orange', description: '20 oz bottle', price: 2.49, emoji: '🥤' },
  { id: 'water', label: 'Dasani Water', description: '20 oz bottle', price: 1.99, emoji: '💧' },
];

export const PIZZAS = [
  {
    id: 'build-your-own',
    name: 'Build Your Own',
    description: 'Choose your crust, sauce, cheese & toppings',
    price: 10.99,
    badge: 'Custom',
    emoji: '🍕',
    toppings: [],
    isCustom: true,
  },
  {
    id: 'pepperoni',
    name: 'Pepperoni Passion',
    description: 'Double pepperoni with extra mozzarella',
    price: 12.99,
    badge: 'Popular',
    emoji: '🍕',
    toppings: ['pepperoni', 'extra-cheese'],
  },
  {
    id: 'supreme',
    name: 'ExtravaganZZa',
    description: 'Pepperoni, ham, beef, sausage, onions, peppers, mushrooms & olives',
    price: 15.99,
    badge: 'Best Seller',
    emoji: '🍕',
    toppings: ['pepperoni', 'ham', 'beef', 'sausage', 'onions', 'green-peppers', 'mushrooms', 'black-olives'],
  },
  {
    id: 'meat-lovers',
    name: "MeatZZa",
    description: 'Pepperoni, ham, Italian sausage, beef & bacon',
    price: 14.99,
    badge: null,
    emoji: '🍕',
    toppings: ['pepperoni', 'ham', 'sausage', 'beef', 'bacon'],
  },
  {
    id: 'veggie',
    name: 'Veggie Paradise',
    description: 'Onions, green peppers, mushrooms, tomatoes & black olives',
    price: 13.99,
    badge: 'Veggie',
    emoji: '🍕',
    toppings: ['onions', 'green-peppers', 'mushrooms', 'tomatoes', 'black-olives'],
  },
  {
    id: 'hawaiian',
    name: 'Pacific Veggie',
    description: 'Ham, pineapple, roasted red peppers & feta',
    price: 13.49,
    badge: null,
    emoji: '🍕',
    toppings: ['ham', 'feta', 'tomatoes'],
  },
  {
    id: 'buffalo',
    name: 'Buffalo Chicken',
    description: 'Grilled chicken, hot sauce, onions & provolone',
    price: 14.49,
    badge: 'Spicy',
    emoji: '🍕',
    toppings: ['chicken', 'onions', 'jalapenos'],
  },
  {
    id: 'cheese',
    name: 'Cheese Pizza',
    description: 'Classic mozzarella on our signature sauce',
    price: 10.99,
    badge: null,
    emoji: '🍕',
    toppings: [],
  },
];

export const STEPS = [
  { id: 'pizzas', label: 'Pizzas' },
  { id: 'sides', label: 'Sides' },
  { id: 'drinks', label: 'Drinks' },
  { id: 'checkout', label: 'Checkout' },
];
