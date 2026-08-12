export const categories = [
  { id: 'pizza', label: 'Pizza', icon: '🍕' },
  { id: 'sides', label: 'Sides', icon: '🥖' },
  { id: 'wings', label: 'Wings', icon: '🍗' },
  { id: 'sandwiches', label: 'Sandwiches', icon: '🥪' },
  { id: 'pasta', label: 'Pasta', icon: '🍝' },
  { id: 'desserts', label: 'Desserts', icon: '🍰' },
  { id: 'drinks', label: 'Drinks', icon: '🥤' },
];

export const sizes = [
  { id: 'small', label: 'Small', inches: '10"', priceMultiplier: 0.75 },
  { id: 'medium', label: 'Medium', inches: '12"', priceMultiplier: 1 },
  { id: 'large', label: 'Large', inches: '14"', priceMultiplier: 1.25 },
  { id: 'xlarge', label: 'X-Large', inches: '16"', priceMultiplier: 1.5 },
];

export const crusts = [
  { id: 'hand-tossed', label: 'Hand Tossed', price: 0 },
  { id: 'thin', label: 'Crunchy Thin Crust', price: 0 },
  { id: 'brooklyn', label: 'Brooklyn Style', price: 1 },
  { id: 'handmade-pan', label: 'Handmade Pan', price: 2 },
  { id: 'gluten-free', label: 'Gluten Free Crust', price: 3 },
];

export const sauces = [
  { id: 'robust', label: 'Robust Inspired Tomato Sauce' },
  { id: 'hearty', label: 'Hearty Marinara Sauce' },
  { id: 'bbq', label: 'Honey BBQ Sauce' },
  { id: 'alfredo', label: 'Alfredo Sauce' },
  { id: 'garlic', label: 'Garlic Parmesan Sauce' },
];

export const cheeses = [
  { id: 'normal', label: 'Normal Cheese', price: 0 },
  { id: 'extra', label: 'Extra Cheese', price: 1.5 },
  { id: 'light', label: 'Light Cheese', price: 0 },
  { id: 'none', label: 'No Cheese', price: 0 },
];

export const toppings = {
  meats: [
    { id: 'pepperoni', label: 'Pepperoni', price: 1.5 },
    { id: 'sausage', label: 'Italian Sausage', price: 1.5 },
    { id: 'bacon', label: 'Bacon', price: 1.5 },
    { id: 'ham', label: 'Ham', price: 1.5 },
    { id: 'beef', label: 'Beef', price: 1.5 },
    { id: 'chicken', label: 'Grilled Chicken', price: 1.5 },
  ],
  veggies: [
    { id: 'mushrooms', label: 'Mushrooms', price: 1 },
    { id: 'onions', label: 'Onions', price: 1 },
    { id: 'peppers', label: 'Green Peppers', price: 1 },
    { id: 'olives', label: 'Black Olives', price: 1 },
    { id: 'tomatoes', label: 'Tomatoes', price: 1 },
    { id: 'jalapenos', label: 'Jalapeño Peppers', price: 1 },
    { id: 'spinach', label: 'Spinach', price: 1 },
    { id: 'pineapple', label: 'Pineapple', price: 1 },
  ],
};

export const menuItems = [
  {
    id: 'pepperoni-passion',
    category: 'pizza',
    name: 'Pepperoni Passion',
    description: 'Extra pepperoni and extra cheese for the ultimate pepperoni lover.',
    basePrice: 12.99,
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop',
    isCustomizable: true,
    badge: 'Fan Favorite',
  },
  {
    id: 'extravaganzza',
    category: 'pizza',
    name: 'ExtravaganZZa',
    description: 'Pepperoni, ham, Italian sausage, beef, onions, green peppers, mushrooms, black olives, extra cheese.',
    basePrice: 15.99,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop',
    isCustomizable: true,
    badge: 'Best Seller',
  },
  {
    id: 'meatzza',
    category: 'pizza',
    name: 'MeatZZa',
    description: 'Pepperoni, ham, Italian sausage, beef, and bacon.',
    basePrice: 14.99,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop',
    isCustomizable: true,
  },
  {
    id: 'veggie',
    category: 'pizza',
    name: 'Pacific Veggie',
    description: 'Onions, green peppers, mushrooms, tomatoes, black olives, extra cheese.',
    basePrice: 13.99,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop',
    isCustomizable: true,
    badge: 'Veggie',
  },
  {
    id: 'cheese',
    category: 'pizza',
    name: 'Cheese Pizza',
    description: 'Classic cheese or create your own.',
    basePrice: 10.99,
    image: 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=400&h=300&fit=crop',
    isCustomizable: true,
  },
  {
    id: 'buffalo-chicken',
    category: 'pizza',
    name: 'Buffalo Chicken',
    description: 'Grilled chicken, onions, hot sauce, provolone, American, cheddar.',
    basePrice: 14.49,
    image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=400&h=300&fit=crop',
    isCustomizable: true,
    badge: 'Spicy',
  },
  {
    id: 'bread-twists',
    category: 'sides',
    name: 'Stuffed Cheesy Bread',
    description: 'Oven-baked breadsticks stuffed with cheese, seasoned with garlic and herbs.',
    basePrice: 6.99,
    image: 'https://images.unsplash.com/photo-1619535854721-06f4bb1e1b0e?w=400&h=300&fit=crop',
    isCustomizable: false,
  },
  {
    id: 'cinnamon-twists',
    category: 'sides',
    name: 'Cinnamon Bread Twists',
    description: 'Freshly baked twists dusted with cinnamon and sugar.',
    basePrice: 5.99,
    image: 'https://images.unsplash.com/photo-1608198394988-83fa06a85531?w=400&h=300&fit=crop',
    isCustomizable: false,
  },
  {
    id: 'wings-buffalo',
    category: 'wings',
    name: 'Buffalo Wings',
    description: '8-piece bone-in wings tossed in classic buffalo sauce.',
    basePrice: 8.99,
    image: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=400&h=300&fit=crop',
    isCustomizable: false,
    badge: '8 pc',
  },
  {
    id: 'wings-bbq',
    category: 'wings',
    name: 'BBQ Wings',
    description: '8-piece bone-in wings tossed in sweet BBQ sauce.',
    basePrice: 8.99,
    image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=400&h=300&fit=crop',
    isCustomizable: false,
    badge: '8 pc',
  },
  {
    id: 'italian-sandwich',
    category: 'sandwiches',
    name: 'Italian Sandwich',
    description: 'Pepperoni, salami, ham, provolone, banana peppers, fresh veggies.',
    basePrice: 7.99,
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&h=300&fit=crop',
    isCustomizable: false,
  },
  {
    id: 'chicken-parm',
    category: 'pasta',
    name: 'Chicken Alfredo Pasta',
    description: 'Grilled chicken breast, creamy Alfredo sauce, penne pasta.',
    basePrice: 8.99,
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop',
    isCustomizable: false,
  },
  {
    id: 'chocolate-lava',
    category: 'desserts',
    name: 'Marbled Cookie Brownie',
    description: 'A decadent blend of cookie and brownie, marbled together.',
    basePrice: 6.99,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop',
    isCustomizable: false,
  },
  {
    id: 'cinnamon-dessert',
    category: 'desserts',
    name: 'Cinnamon Sugar Twists',
    description: 'Sweet cinnamon sugar twists, perfect for dessert.',
    basePrice: 5.49,
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf64db3b?w=400&h=300&fit=crop',
    isCustomizable: false,
  },
  {
    id: 'coke',
    category: 'drinks',
    name: 'Coca-Cola® 2-Liter',
    description: '2-liter bottle of Coca-Cola.',
    basePrice: 3.49,
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&h=300&fit=crop',
    isCustomizable: false,
  },
  {
    id: 'sprite',
    category: 'drinks',
    name: 'Sprite® 2-Liter',
    description: '2-liter bottle of Sprite.',
    basePrice: 3.49,
    image: 'https://images.unsplash.com/photo-1625772299848-391b6a87ff6e?w=400&h=300&fit=crop',
    isCustomizable: false,
  },
];

export const coupons = [
  { code: 'PIZZA50', description: '50% off all pizzas', discount: 0.5, type: 'percent' },
  { code: 'FREEDRINK', description: 'Free 2-liter with $20+ order', discount: 3.49, type: 'fixed' },
  { code: 'WINGS10', description: '$10 off wings', discount: 10, type: 'fixed' },
];

export function calculatePizzaPrice(item, options) {
  const size = sizes.find((s) => s.id === options.size) || sizes[1];
  const crust = crusts.find((c) => c.id === options.crust) || crusts[0];
  const cheese = cheeses.find((c) => c.id === options.cheese) || cheeses[0];

  let price = item.basePrice * size.priceMultiplier;
  price += crust.price;
  price += cheese.price;

  const allToppings = [...toppings.meats, ...toppings.veggies];
  options.selectedToppings.forEach((toppingId) => {
    const topping = allToppings.find((t) => t.id === toppingId);
    if (topping) price += topping.price;
  });

  return price;
}

export function formatPrice(price) {
  return `$${price.toFixed(2)}`;
}
