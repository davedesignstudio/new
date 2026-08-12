export type OrderType = 'delivery' | 'carryout'

export type CategoryId = 'deals' | 'pizza' | 'sides' | 'drinks' | 'desserts'

export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: CategoryId
  imageHue: number
  badge?: string
  isPizza?: boolean
  defaultToppings?: string[]
}

export interface Option {
  id: string
  label: string
  price?: number
  description?: string
}

export const CATEGORIES: { id: CategoryId; label: string }[] = [
  { id: 'deals', label: 'Deals' },
  { id: 'pizza', label: 'Pizza' },
  { id: 'sides', label: 'Sides' },
  { id: 'drinks', label: 'Drinks' },
  { id: 'desserts', label: 'Desserts' },
]

export const CRUSTS: Option[] = [
  { id: 'hand-tossed', label: 'Hand Tossed', description: 'Garlic-seasoned edge', price: 0 },
  { id: 'handmade-pan', label: 'Handmade Pan', description: 'Thick & crispy', price: 2 },
  { id: 'thin', label: 'Crunchy Thin', description: 'Light & crisp', price: 0 },
  { id: 'stuffed', label: 'Stuffed Crust', description: 'Melted cheese rim', price: 3 },
  { id: 'gluten-free', label: 'Gluten Free', description: '10" only', price: 2.5 },
]

export const SIZES: Option[] = [
  { id: 'small', label: '10"', description: 'Small · feeds 1–2', price: 0 },
  { id: 'medium', label: '12"', description: 'Medium · feeds 2–3', price: 2 },
  { id: 'large', label: '14"', description: 'Large · feeds 3–5', price: 4 },
]

export const SAUCES: Option[] = [
  { id: 'robust', label: 'Robust Tomato', price: 0 },
  { id: 'hearty', label: 'Hearty Marinara', price: 0 },
  { id: 'bbq', label: 'Honey BBQ', price: 0 },
  { id: 'alfredo', label: 'Garlic Parmesan Alfredo', price: 0.75 },
  { id: 'ranch', label: 'Ranch', price: 0.75 },
  { id: 'none', label: 'No Sauce', price: 0 },
]

export const CHEESES: Option[] = [
  { id: 'normal', label: 'Normal Cheese', price: 0 },
  { id: 'light', label: 'Light Cheese', price: 0 },
  { id: 'extra', label: 'Extra Cheese', price: 1.5 },
  { id: 'none', label: 'No Cheese', price: 0 },
]

export const MEATS: Option[] = [
  { id: 'pepperoni', label: 'Pepperoni', price: 1.75 },
  { id: 'sausage', label: 'Italian Sausage', price: 1.75 },
  { id: 'bacon', label: 'Bacon', price: 1.75 },
  { id: 'ham', label: 'Ham', price: 1.5 },
  { id: 'beef', label: 'Beef', price: 1.75 },
  { id: 'chicken', label: 'Grilled Chicken', price: 2 },
  { id: 'philly', label: 'Philly Steak', price: 2.25 },
]

export const VEGGIES: Option[] = [
  { id: 'mushrooms', label: 'Mushrooms', price: 1.25 },
  { id: 'onions', label: 'Onions', price: 1 },
  { id: 'peppers', label: 'Green Peppers', price: 1.25 },
  { id: 'olives', label: 'Black Olives', price: 1.25 },
  { id: 'tomatoes', label: 'Diced Tomatoes', price: 1.25 },
  { id: 'jalapenos', label: 'Jalapeños', price: 1 },
  { id: 'spinach', label: 'Spinach', price: 1.25 },
  { id: 'pineapple', label: 'Pineapple', price: 1.25 },
  { id: 'banana-peppers', label: 'Banana Peppers', price: 1 },
]

export const ALL_TOPPINGS = [...MEATS, ...VEGGIES]

export const MENU: MenuItem[] = [
  {
    id: 'byo',
    name: 'Build Your Own',
    description: 'Start with sauce & cheese, then stack up to 7 toppings.',
    price: 11.99,
    category: 'pizza',
    imageHue: 12,
    badge: 'Popular',
    isPizza: true,
    defaultToppings: [],
  },
  {
    id: 'pepperoni-feast',
    name: 'Pepperoni Feast',
    description: 'Loads of pepperoni and mozzarella on robust tomato sauce.',
    price: 14.99,
    category: 'pizza',
    imageHue: 0,
    badge: 'Fan Fav',
    isPizza: true,
    defaultToppings: ['pepperoni'],
  },
  {
    id: 'extravaganZZa',
    name: 'ExtravaganZZa',
    description: 'Pepperoni, ham, Italian sausage, beef, onions, peppers, mushrooms & olives.',
    price: 18.99,
    category: 'pizza',
    imageHue: 25,
    isPizza: true,
    defaultToppings: ['pepperoni', 'ham', 'sausage', 'beef', 'onions', 'peppers', 'mushrooms', 'olives'],
  },
  {
    id: 'meatZZa',
    name: 'MeatZZa',
    description: 'Pepperoni, ham, Italian sausage, and beef.',
    price: 16.99,
    category: 'pizza',
    imageHue: 8,
    isPizza: true,
    defaultToppings: ['pepperoni', 'ham', 'sausage', 'beef'],
  },
  {
    id: 'pacific-veggie',
    name: 'Pacific Veggie',
    description: 'Roasted red peppers, spinach, onions, mushrooms, tomatoes, and olives.',
    price: 15.99,
    category: 'pizza',
    imageHue: 120,
    isPizza: true,
    defaultToppings: ['peppers', 'spinach', 'onions', 'mushrooms', 'tomatoes', 'olives'],
  },
  {
    id: 'bbq-chicken',
    name: 'Honey BBQ Chicken',
    description: 'Grilled chicken, bacon, and onions on honey BBQ sauce.',
    price: 16.49,
    category: 'pizza',
    imageHue: 30,
    isPizza: true,
    defaultToppings: ['chicken', 'bacon', 'onions'],
  },
  {
    id: 'buffalo-chicken',
    name: 'Buffalo Chicken',
    description: 'Grilled chicken with hot sauce and creamy ranch.',
    price: 16.49,
    category: 'pizza',
    imageHue: 18,
    isPizza: true,
    defaultToppings: ['chicken'],
  },
  {
    id: 'philly-cheese',
    name: 'Philly Cheese Steak',
    description: 'Philly steak, onions, green peppers, mushrooms, and provolone.',
    price: 17.49,
    category: 'pizza',
    imageHue: 35,
    isPizza: true,
    defaultToppings: ['philly', 'onions', 'peppers', 'mushrooms'],
  },
  {
    id: 'wings',
    name: 'Bone-in Wings',
    description: '8 pieces. Choose Hot, BBQ, or Plain.',
    price: 9.99,
    category: 'sides',
    imageHue: 20,
    badge: 'Pair it',
  },
  {
    id: 'bread-twists',
    name: 'Garlic Bread Twists',
    description: 'Buttery garlic seasoning with marinara dip.',
    price: 6.99,
    category: 'sides',
    imageHue: 40,
  },
  {
    id: 'stuffed-cheesy',
    name: 'Stuffed Cheesy Bread',
    description: 'Oven-baked bread stuffed with cheese.',
    price: 7.99,
    category: 'sides',
    imageHue: 45,
  },
  {
    id: 'parmesan-bites',
    name: 'Parmesan Bread Bites',
    description: '16 bites with garlic & parm.',
    price: 5.99,
    category: 'sides',
    imageHue: 50,
  },
  {
    id: 'cola',
    name: '2-Liter Cola',
    description: 'Ice-cold classic cola.',
    price: 3.49,
    category: 'drinks',
    imageHue: 200,
  },
  {
    id: 'lemon-lime',
    name: '2-Liter Lemon-Lime',
    description: 'Crisp lemon-lime soda.',
    price: 3.49,
    category: 'drinks',
    imageHue: 160,
  },
  {
    id: 'water',
    name: 'Bottled Water',
    description: '16.9 oz spring water.',
    price: 1.99,
    category: 'drinks',
    imageHue: 195,
  },
  {
    id: 'lava-cakes',
    name: 'Chocolate Lava Cakes',
    description: 'Two warm cakes with molten chocolate centers.',
    price: 6.99,
    category: 'desserts',
    imageHue: 25,
    badge: 'Sweet',
  },
  {
    id: 'cinnamon-twists',
    name: 'Cinnamon Bread Twists',
    description: 'Sweet cinnamon sugar with icing.',
    price: 6.49,
    category: 'desserts',
    imageHue: 28,
  },
  {
    id: 'marbled-cookie',
    name: 'Marbled Cookie Brownie',
    description: 'Cookie dough swirled with brownie batter.',
    price: 7.49,
    category: 'desserts',
    imageHue: 22,
  },
]

export const DEALS = [
  {
    id: 'mix-match',
    title: 'Mix & Match',
    subtitle: 'Any 2 or more · $7.99 each',
    detail: 'Medium 2-topping pizzas, 8-piece wings, bread twists & more.',
    accent: 'red' as const,
  },
  {
    id: 'carryout-special',
    title: 'Carryout Special',
    subtitle: 'Large 1-topping · $9.99',
    detail: 'Any crust. Online only. Perfect for pickup.',
    accent: 'blue' as const,
  },
  {
    id: 'loaded-deal',
    title: 'Loaded Feast',
    subtitle: 'Large 3-topping · $14.99',
    detail: 'Build it heavy. Extra toppings additional.',
    accent: 'red' as const,
  },
]

export function money(n: number) {
  return `$${n.toFixed(2)}`
}

export function toppingLabel(id: string) {
  return ALL_TOPPINGS.find((t) => t.id === id)?.label ?? id
}
