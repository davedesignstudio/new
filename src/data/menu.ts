export type CategoryId = 'pizza' | 'sides' | 'desserts' | 'drinks' | 'deals'

export interface MenuItem {
  id: string
  name: string
  description: string
  category: CategoryId
  basePrice: number
  image: string
  badge?: string
  toppings?: string[]
  customizable?: boolean
}

export interface CrustOption {
  id: string
  name: string
  price: number
  description: string
}

export interface SizeOption {
  id: string
  name: string
  feeds: string
  multiplier: number
}

export interface ToppingOption {
  id: string
  name: string
  price: number
  kind: 'meat' | 'veggie' | 'cheese'
}

export const categories: { id: CategoryId; label: string }[] = [
  { id: 'deals', label: 'Deals' },
  { id: 'pizza', label: 'Pizza' },
  { id: 'sides', label: 'Sides' },
  { id: 'desserts', label: 'Desserts' },
  { id: 'drinks', label: 'Drinks' },
]

export const crusts: CrustOption[] = [
  { id: 'hand', name: 'Hand Tossed', price: 0, description: 'Garlic-seasoned crust with a rich, buttery taste' },
  { id: 'handmade-pan', name: 'Handmade Pan', price: 2, description: 'Thick and chewy with a buttery taste' },
  { id: 'crunchy-thin', name: 'Crunchy Thin', price: 0, description: 'Thin enough for the optimum crispy-to-topping ratio' },
  { id: 'gluten-free', name: 'Gluten Free', price: 3, description: 'A thin, crispy crust made without gluten' },
]

export const sizes: SizeOption[] = [
  { id: 'small', name: 'Small', feeds: '1–2', multiplier: 0.75 },
  { id: 'medium', name: 'Medium', feeds: '2–3', multiplier: 1 },
  { id: 'large', name: 'Large', feeds: '3–5', multiplier: 1.35 },
  { id: 'xlarge', name: 'X-Large', feeds: '5–6', multiplier: 1.6 },
]

export const sauces = [
  { id: 'robust', name: 'Robust Inspired Tomato' },
  { id: 'hearty', name: 'Hearty Marinara' },
  { id: 'bbq', name: 'BBQ' },
  { id: 'garlic-parmesan', name: 'Garlic Parmesan' },
  { id: 'alfredo', name: 'Alfredo' },
  { id: 'ranch', name: 'Ranch' },
]

export const cheeseAmounts = [
  { id: 'none', name: 'None' },
  { id: 'light', name: 'Light' },
  { id: 'normal', name: 'Normal' },
  { id: 'extra', name: 'Extra' },
]

export const toppings: ToppingOption[] = [
  { id: 'pepperoni', name: 'Pepperoni', price: 1.5, kind: 'meat' },
  { id: 'sausage', name: 'Italian Sausage', price: 1.5, kind: 'meat' },
  { id: 'beef', name: 'Beef', price: 1.5, kind: 'meat' },
  { id: 'ham', name: 'Ham', price: 1.5, kind: 'meat' },
  { id: 'bacon', name: 'Bacon', price: 1.75, kind: 'meat' },
  { id: 'chicken', name: 'Grilled Chicken', price: 1.75, kind: 'meat' },
  { id: 'philly', name: 'Philly Steak', price: 2, kind: 'meat' },
  { id: 'mushrooms', name: 'Mushrooms', price: 1.25, kind: 'veggie' },
  { id: 'onions', name: 'Onions', price: 1.25, kind: 'veggie' },
  { id: 'green-peppers', name: 'Green Peppers', price: 1.25, kind: 'veggie' },
  { id: 'black-olives', name: 'Black Olives', price: 1.25, kind: 'veggie' },
  { id: 'tomatoes', name: 'Diced Tomatoes', price: 1.25, kind: 'veggie' },
  { id: 'jalapenos', name: 'Jalapeños', price: 1.25, kind: 'veggie' },
  { id: 'spinach', name: 'Spinach', price: 1.25, kind: 'veggie' },
  { id: 'pineapple', name: 'Pineapple', price: 1.25, kind: 'veggie' },
  { id: 'banana-peppers', name: 'Banana Peppers', price: 1.25, kind: 'veggie' },
  { id: 'feta', name: 'Feta', price: 1.5, kind: 'cheese' },
  { id: 'provolone', name: 'Provolone', price: 1.5, kind: 'cheese' },
  { id: 'cheddar', name: 'Cheddar', price: 1.5, kind: 'cheese' },
  { id: 'parmesan-asiago', name: 'Parmesan-Asiago', price: 1.5, kind: 'cheese' },
]

export const menuItems: MenuItem[] = [
  {
    id: 'byo',
    name: 'Build Your Own',
    description: 'Create one of over 34 million unique pizza combinations.',
    category: 'pizza',
    basePrice: 11.99,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
    badge: 'Popular',
    customizable: true,
  },
  {
    id: 'pepperoni',
    name: 'Pepperoni',
    description: 'Loads of pepperoni with real cheese made from mozzarella.',
    category: 'pizza',
    basePrice: 13.99,
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80',
    toppings: ['pepperoni'],
    customizable: true,
  },
  {
    id: 'extravaganZZa',
    name: 'ExtravaganZZa',
    description: 'Pepperoni, ham, Italian sausage, beef, onions, green peppers, mushrooms & black olives.',
    category: 'pizza',
    basePrice: 17.99,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80',
    badge: 'Fan Favorite',
    toppings: ['pepperoni', 'ham', 'sausage', 'beef', 'onions', 'green-peppers', 'mushrooms', 'black-olives'],
    customizable: true,
  },
  {
    id: 'meatZZa',
    name: 'MeatZZa',
    description: 'Pepperoni, ham, Italian sausage & beef — piled high.',
    category: 'pizza',
    basePrice: 16.99,
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=800&q=80',
    toppings: ['pepperoni', 'ham', 'sausage', 'beef'],
    customizable: true,
  },
  {
    id: 'buffalo-chicken',
    name: 'Buffalo Chicken',
    description: 'Grilled chicken, onions, and banana peppers with hot buffalo sauce.',
    category: 'pizza',
    basePrice: 15.99,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80',
    toppings: ['chicken', 'onions', 'banana-peppers'],
    customizable: true,
  },
  {
    id: 'pacific-veggie',
    name: 'Pacific Veggie',
    description: 'Roasted red peppers, spinach, onions, mushrooms, tomatoes & black olives.',
    category: 'pizza',
    basePrice: 15.49,
    image: 'https://images.unsplash.com/photo-1571407970349-bc81e7e3360b?auto=format&fit=crop&w=800&q=80',
    toppings: ['spinach', 'onions', 'mushrooms', 'tomatoes', 'black-olives'],
    customizable: true,
  },
  {
    id: 'honolulu-hawaiian',
    name: 'Honolulu Hawaiian',
    description: 'Ham, pineapple & green peppers over tomato sauce.',
    category: 'pizza',
    basePrice: 14.99,
    image: 'https://images.unsplash.com/photo-1594007654729-407eedc4be65?auto=format&fit=crop&w=800&q=80',
    toppings: ['ham', 'pineapple', 'green-peppers'],
    customizable: true,
  },
  {
    id: 'philly-cheese',
    name: 'Philly Cheese Steak',
    description: 'Philly steak, onions, green peppers & mushrooms with provolone.',
    category: 'pizza',
    basePrice: 16.49,
    image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=800&q=80',
    toppings: ['philly', 'onions', 'green-peppers', 'mushrooms', 'provolone'],
    customizable: true,
  },
  {
    id: 'bread-bites',
    name: 'Parmesan Bread Bites',
    description: 'Oven-baked bread bites seasoned with garlic and Parmesan.',
    category: 'sides',
    basePrice: 5.99,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'stuffed-cheesy',
    name: 'Stuffed Cheesy Bread',
    description: 'Oven-baked bread stuffed with cheese and garlic.',
    category: 'sides',
    basePrice: 7.99,
    image: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?auto=format&fit=crop&w=800&q=80',
    badge: 'Best Seller',
  },
  {
    id: 'wings',
    name: 'Chicken Wings',
    description: 'Bone-in wings tossed in your choice of sauce.',
    category: 'sides',
    basePrice: 9.99,
    image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'pasta',
    name: 'Chicken Alfredo Pasta',
    description: 'Creamy Alfredo with grilled chicken and cheese.',
    category: 'sides',
    basePrice: 8.99,
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'lava-cakes',
    name: 'Chocolate Lava Crunch Cakes',
    description: 'Warm chocolate cake with a molten chocolate center.',
    category: 'desserts',
    basePrice: 6.99,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'cinnamon-sticks',
    name: 'Cinnamon Bread Twists',
    description: 'Hand-twisted soft breadsticks with cinnamon sugar.',
    category: 'desserts',
    basePrice: 5.49,
    image: 'https://images.unsplash.com/photo-1509365465985-25d7493db2e0?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'cookie',
    name: 'Marbled Cookie Brownie',
    description: 'Oven-baked brownie swirled with cookie dough.',
    category: 'desserts',
    basePrice: 7.49,
    image: 'https://images.unsplash.com/photo-1607920591413-4ec007768d42?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'coke',
    name: 'Coca-Cola®',
    description: 'Ice-cold 2-liter bottle.',
    category: 'drinks',
    basePrice: 3.49,
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'sprite',
    name: 'Sprite®',
    description: 'Crisp lemon-lime 2-liter bottle.',
    category: 'drinks',
    basePrice: 3.49,
    image: 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'water',
    name: 'Bottled Water',
    description: 'Refreshing purified bottled water.',
    category: 'drinks',
    basePrice: 1.99,
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'mix-match',
    name: 'Mix & Match Deal',
    description: 'Choose any two or more medium 2-topping pizzas, sides, or desserts for $6.99 each.',
    category: 'deals',
    basePrice: 6.99,
    image: 'https://images.unsplash.com/photo-1601924582970-9238bcb495d2?auto=format&fit=crop&w=800&q=80',
    badge: 'Limited',
    customizable: true,
  },
  {
    id: 'carryout-special',
    name: 'Carryout Special',
    description: 'Large 3-topping pizza for just $9.99 when you carry out.',
    category: 'deals',
    basePrice: 9.99,
    image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=800&q=80',
    badge: 'Save Big',
    customizable: true,
  },
]

export function formatPrice(n: number) {
  return `$${n.toFixed(2)}`
}
