export const categories = [
  { id: 'deals', label: 'Deals' },
  { id: 'pizza', label: 'Pizza' },
  { id: 'wings', label: 'Wings & More' },
  { id: 'sides', label: 'Sides' },
  { id: 'desserts', label: 'Desserts' },
  { id: 'drinks', label: 'Drinks' },
]

export const sizes = [
  { id: 'small', label: 'Small', inches: '10"', price: 0 },
  { id: 'medium', label: 'Medium', inches: '12"', price: 3 },
  { id: 'large', label: 'Large', inches: '14"', price: 5 },
  { id: 'xlarge', label: 'X-Large', inches: '16"', price: 7 },
]

export const crusts = [
  { id: 'hand', label: 'Hand Tossed', desc: 'Classic garlic-seasoned crust' },
  { id: 'handmade', label: 'Handmade Pan', desc: 'Thick, buttery, crispy edge' },
  { id: 'crunchy', label: 'Crunchy Thin', desc: 'Light and cracker-crisp' },
  { id: 'gluten', label: 'Gluten Free', desc: 'Available in small only' },
]

export const sauces = [
  { id: 'robust', label: 'Robust Tomato' },
  { id: 'marinara', label: 'Hearty Marinara' },
  { id: 'bbq', label: 'Honey BBQ' },
  { id: 'alfredo', label: 'Garlic Parmesan' },
  { id: 'ranch', label: 'Ranch' },
]

export const toppings = [
  { id: 'pepperoni', label: 'Pepperoni', price: 1.5, group: 'meat' },
  { id: 'sausage', label: 'Italian Sausage', price: 1.5, group: 'meat' },
  { id: 'ham', label: 'Ham', price: 1.5, group: 'meat' },
  { id: 'bacon', label: 'Bacon', price: 1.75, group: 'meat' },
  { id: 'chicken', label: 'Grilled Chicken', price: 1.75, group: 'meat' },
  { id: 'beef', label: 'Beef', price: 1.5, group: 'meat' },
  { id: 'mushrooms', label: 'Mushrooms', price: 1.25, group: 'veg' },
  { id: 'onions', label: 'Onions', price: 1.0, group: 'veg' },
  { id: 'peppers', label: 'Green Peppers', price: 1.0, group: 'veg' },
  { id: 'olives', label: 'Black Olives', price: 1.25, group: 'veg' },
  { id: 'spinach', label: 'Spinach', price: 1.25, group: 'veg' },
  { id: 'pineapple', label: 'Pineapple', price: 1.25, group: 'veg' },
  { id: 'jalapenos', label: 'Jalapeños', price: 1.0, group: 'veg' },
  { id: 'tomatoes', label: 'Diced Tomatoes', price: 1.0, group: 'veg' },
  { id: 'extra-cheese', label: 'Extra Cheese', price: 1.5, group: 'cheese' },
  { id: 'feta', label: 'Feta', price: 1.5, group: 'cheese' },
]

export const deals = [
  {
    id: 'mix-match',
    title: 'Mix & Match Deal',
    subtitle: 'Choose any 2 or more',
    price: 7.99,
    badge: 'Popular',
    image:
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'carryout-special',
    title: 'Carryout Special',
    subtitle: 'Large 1-topping pizza',
    price: 9.99,
    badge: 'Carryout',
    image:
      'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'feast',
    title: 'Family Feast',
    subtitle: '2 mediums + breadsticks + drink',
    price: 24.99,
    badge: 'Save $8',
    image:
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80',
  },
]

export const pizzas = [
  {
    id: 'pepperoni',
    name: 'Pepperoni',
    desc: 'Loads of pepperoni and cheese on our signature sauce',
    basePrice: 11.99,
    image:
      'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80',
    tags: ['Fan Favorite'],
    defaultToppings: ['pepperoni'],
  },
  {
    id: 'extravaganZZa',
    name: 'ExtravaganZZa',
    desc: 'Pepperoni, ham, Italian sausage, beef, onions, green peppers, mushrooms & black olives',
    basePrice: 16.99,
    image:
      'https://images.unsplash.com/photo-1594007654729-407eedc4be65?auto=format&fit=crop&w=800&q=80',
    tags: ['Loaded'],
    defaultToppings: ['pepperoni', 'ham', 'sausage', 'beef', 'onions', 'peppers', 'mushrooms', 'olives'],
  },
  {
    id: 'meatZZa',
    name: 'MeatZZa',
    desc: 'Pepperoni, ham, Italian sausage & beef',
    basePrice: 15.99,
    image:
      'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=800&q=80',
    tags: [],
    defaultToppings: ['pepperoni', 'ham', 'sausage', 'beef'],
  },
  {
    id: 'pacific-veggie',
    name: 'Pacific Veggie',
    desc: 'Roasted red peppers, spinach, onions, mushrooms, tomatoes & feta',
    basePrice: 14.99,
    image:
      'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=800&q=80',
    tags: ['Vegetarian'],
    defaultToppings: ['peppers', 'spinach', 'onions', 'mushrooms', 'tomatoes', 'feta'],
  },
  {
    id: 'honolulu',
    name: 'Honolulu Hawaiian',
    desc: 'Ham, pineapple & green peppers',
    basePrice: 13.99,
    image:
      'https://images.unsplash.com/photo-1565299507177-b0ac66763828?auto=format&fit=crop&w=800&q=80',
    tags: [],
    defaultToppings: ['ham', 'pineapple', 'peppers'],
  },
  {
    id: 'buffalo-chicken',
    name: 'Buffalo Chicken',
    desc: 'Grilled chicken, onions & banana peppers with Buffalo sauce',
    basePrice: 15.49,
    image:
      'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=800&q=80',
    tags: ['Spicy'],
    defaultToppings: ['chicken', 'onions', 'jalapenos'],
  },
  {
    id: 'philly',
    name: 'Philly Cheese Steak',
    desc: 'Tender steak, onions, green peppers & mushrooms with provolone',
    basePrice: 15.99,
    image:
      'https://images.unsplash.com/photo-1588315029754-2dd089d39a1a?auto=format&fit=crop&w=800&q=80',
    tags: [],
    defaultToppings: ['beef', 'onions', 'peppers', 'mushrooms'],
  },
  {
    id: 'spinach-feta',
    name: 'Spinach & Feta',
    desc: 'Creamy Alfredo, spinach & feta cheese',
    basePrice: 13.99,
    image:
      'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80',
    tags: ['Vegetarian'],
    defaultToppings: ['spinach', 'feta'],
  },
]

export const wings = [
  {
    id: 'bbq-wings',
    name: 'Hot Buffalo Wings',
    desc: '8 bone-in wings tossed in Buffalo sauce',
    basePrice: 9.99,
    image:
      'https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=800&q=80',
    category: 'wings',
  },
  {
    id: 'boneless',
    name: 'Boneless Chicken',
    desc: 'Crispy boneless bites with your choice of sauce',
    basePrice: 8.99,
    image:
      'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80',
    category: 'wings',
  },
  {
    id: 'chicken-parm',
    name: 'Chicken Parmesan',
    desc: 'Breaded chicken, marinara & mozzarella',
    basePrice: 7.99,
    image:
      'https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?auto=format&fit=crop&w=800&q=80',
    category: 'wings',
  },
]

export const sides = [
  {
    id: 'breadsticks',
    name: 'Parmesan Bread Twists',
    desc: 'Garlic-buttered twists with marinara',
    basePrice: 6.99,
    image:
      'https://images.unsplash.com/photo-1619535860414-f681141ef7cb?auto=format&fit=crop&w=800&q=80',
    category: 'sides',
  },
  {
    id: 'cheesy-bread',
    name: 'Cheesy Bread',
    desc: 'Oven-baked bread loaded with cheese',
    basePrice: 7.49,
    image:
      'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?auto=format&fit=crop&w=800&q=80',
    category: 'sides',
  },
  {
    id: 'salad',
    name: 'Classic Garden Salad',
    desc: 'Fresh greens, tomatoes, cucumbers & croutons',
    basePrice: 6.49,
    image:
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
    category: 'sides',
  },
]

export const desserts = [
  {
    id: 'lava-cake',
    name: 'Chocolate Lava Crunch Cake',
    desc: 'Warm chocolate cake with a molten center',
    basePrice: 6.99,
    image:
      'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
    category: 'desserts',
  },
  {
    id: 'cinnamon',
    name: 'Cinnamon Bread Twists',
    desc: 'Sweet twists with icing dip',
    basePrice: 6.99,
    image:
      'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80',
    category: 'desserts',
  },
]

export const drinks = [
  {
    id: 'coke',
    name: 'Coca-Cola® 2L',
    desc: 'Ice-cold classic Coke',
    basePrice: 3.49,
    image:
      'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&w=800&q=80',
    category: 'drinks',
  },
  {
    id: 'sprite',
    name: 'Sprite® 2L',
    desc: 'Crisp lemon-lime soda',
    basePrice: 3.49,
    image:
      'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?auto=format&fit=crop&w=800&q=80',
    category: 'drinks',
  },
]
