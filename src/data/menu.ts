export type CategoryId =
  | 'deals'
  | 'pizza'
  | 'chicken'
  | 'sides'
  | 'pasta'
  | 'sandwiches'
  | 'desserts'
  | 'drinks'

export type CrustId =
  | 'hand-tossed'
  | 'handmade-pan'
  | 'crunchy-thin'
  | 'new-york'
  | 'parmesan-stuffed'
  | 'gluten-free'

export type SizeId = 'small' | 'medium' | 'large' | 'xlarge'
export type SauceId = 'robust' | 'hearty' | 'bbq' | 'alfredo' | 'garlic-parm' | 'ranch'
export type CheeseAmount = 'none' | 'light' | 'normal' | 'extra'

export interface Category {
  id: CategoryId
  label: string
}

export interface SizeOption {
  id: SizeId
  label: string
  inches: string
  priceMod: number
}

export interface CrustOption {
  id: CrustId
  label: string
  description: string
  priceMod: number
  sizes: SizeId[]
}

export interface SauceOption {
  id: SauceId
  label: string
}

export interface Topping {
  id: string
  label: string
  group: 'meats' | 'veggies' | 'cheese'
  price: number
}

export interface MenuItem {
  id: string
  category: CategoryId
  name: string
  description: string
  price: number
  image: string
  badge?: string
  isPizza?: boolean
  defaultToppings?: string[]
}

export const categories: Category[] = [
  { id: 'deals', label: 'Deals' },
  { id: 'pizza', label: 'Pizza' },
  { id: 'chicken', label: 'Chicken' },
  { id: 'sides', label: 'Sides' },
  { id: 'pasta', label: 'Pasta' },
  { id: 'sandwiches', label: 'Sandwiches' },
  { id: 'desserts', label: 'Desserts' },
  { id: 'drinks', label: 'Drinks' },
]

export const sizes: SizeOption[] = [
  { id: 'small', label: 'Small', inches: '10"', priceMod: 0 },
  { id: 'medium', label: 'Medium', inches: '12"', priceMod: 3 },
  { id: 'large', label: 'Large', inches: '14"', priceMod: 5 },
  { id: 'xlarge', label: 'X-Large', inches: '16"', priceMod: 7 },
]

export const crusts: CrustOption[] = [
  {
    id: 'hand-tossed',
    label: 'Hand Tossed',
    description: 'Garlic-seasoned crust with a rich, buttery taste.',
    priceMod: 0,
    sizes: ['small', 'medium', 'large'],
  },
  {
    id: 'handmade-pan',
    label: 'Handmade Pan',
    description: 'Thick and chewy with a buttery taste.',
    priceMod: 2,
    sizes: ['medium'],
  },
  {
    id: 'crunchy-thin',
    label: 'Crunchy Thin',
    description: 'Thin enough for the perfect crunch.',
    priceMod: 0,
    sizes: ['medium', 'large'],
  },
  {
    id: 'new-york',
    label: 'New York Style',
    description: 'Hand-stretched foldable slices.',
    priceMod: 1.5,
    sizes: ['large', 'xlarge'],
  },
  {
    id: 'parmesan-stuffed',
    label: 'Parmesan Stuffed',
    description: 'Stuffed with a six-cheese blend and garlic seasoning.',
    priceMod: 3,
    sizes: ['medium', 'large'],
  },
  {
    id: 'gluten-free',
    label: 'Gluten Free',
    description: 'Made without gluten-containing ingredients.',
    priceMod: 2.5,
    sizes: ['small'],
  },
]

export const sauces: SauceOption[] = [
  { id: 'robust', label: 'Robust Inspired Tomato' },
  { id: 'hearty', label: 'Hearty Marinara' },
  { id: 'bbq', label: 'Honey BBQ' },
  { id: 'alfredo', label: 'Alfredo' },
  { id: 'garlic-parm', label: 'Garlic Parmesan' },
  { id: 'ranch', label: 'Ranch' },
]

export const toppings: Topping[] = [
  { id: 'pepperoni', label: 'Pepperoni', group: 'meats', price: 1.5 },
  { id: 'sausage', label: 'Italian Sausage', group: 'meats', price: 1.5 },
  { id: 'beef', label: 'Beef', group: 'meats', price: 1.5 },
  { id: 'ham', label: 'Ham', group: 'meats', price: 1.5 },
  { id: 'bacon', label: 'Bacon', group: 'meats', price: 1.75 },
  { id: 'chicken', label: 'Grilled Chicken', group: 'meats', price: 1.75 },
  { id: 'philly', label: 'Philly Steak', group: 'meats', price: 2 },
  { id: 'mushrooms', label: 'Mushrooms', group: 'veggies', price: 1.25 },
  { id: 'onions', label: 'Onions', group: 'veggies', price: 1.25 },
  { id: 'peppers', label: 'Green Peppers', group: 'veggies', price: 1.25 },
  { id: 'black-olives', label: 'Black Olives', group: 'veggies', price: 1.25 },
  { id: 'spinach', label: 'Spinach', group: 'veggies', price: 1.25 },
  { id: 'pineapple', label: 'Pineapple', group: 'veggies', price: 1.25 },
  { id: 'jalapenos', label: 'Jalapeños', group: 'veggies', price: 1.25 },
  { id: 'banana-peppers', label: 'Banana Peppers', group: 'veggies', price: 1.25 },
  { id: 'tomato', label: 'Diced Tomatoes', group: 'veggies', price: 1.25 },
  { id: 'feta', label: 'Feta', group: 'cheese', price: 1.5 },
  { id: 'provolone', label: 'Provolone', group: 'cheese', price: 1.5 },
  { id: 'cheddar', label: 'Cheddar', group: 'cheese', price: 1.5 },
  { id: 'parmesan-asiago', label: 'Parmesan Asiago', group: 'cheese', price: 1.5 },
]

export const menuItems: MenuItem[] = [
  {
    id: 'byo',
    category: 'pizza',
    name: 'Build Your Own Pizza',
    description: 'Create one of over 34 million unique pizzas. Choose crust, sauce, cheese & toppings.',
    price: 9.99,
    image:
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
    badge: 'NEW',
    isPizza: true,
    defaultToppings: [],
  },
  {
    id: 'pepperoni',
    category: 'pizza',
    name: 'Pepperoni',
    description: 'Loads of pepperoni with mozzarella cheese and our signature sauce.',
    price: 12.99,
    image:
      'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80',
    isPizza: true,
    defaultToppings: ['pepperoni'],
  },
  {
    id: 'extravaganZZa',
    category: 'pizza',
    name: 'ExtravaganZZa',
    description: 'Pepperoni, ham, Italian sausage, beef, onions, green peppers, mushrooms & black olives.',
    price: 16.99,
    image:
      'https://images.unsplash.com/photo-1574071318508-1cdbab80d2f3?auto=format&fit=crop&w=800&q=80',
    badge: 'Fan Fav',
    isPizza: true,
    defaultToppings: ['pepperoni', 'ham', 'sausage', 'beef', 'onions', 'peppers', 'mushrooms', 'black-olives'],
  },
  {
    id: 'meatZZa',
    category: 'pizza',
    name: 'MeatZZa',
    description: 'Pepperoni, ham, Italian sausage and beef — piled high for meat lovers.',
    price: 15.49,
    image:
      'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=800&q=80',
    isPizza: true,
    defaultToppings: ['pepperoni', 'ham', 'sausage', 'beef'],
  },
  {
    id: 'pacific-veggie',
    category: 'pizza',
    name: 'Pacific Veggie',
    description: 'Roasted red peppers, spinach, onions, mushrooms, tomatoes and feta.',
    price: 14.99,
    image:
      'https://images.unsplash.com/photo-1571407970349-43531e84edda?auto=format&fit=crop&w=800&q=80',
    isPizza: true,
    defaultToppings: ['peppers', 'spinach', 'onions', 'mushrooms', 'tomato', 'feta'],
  },
  {
    id: 'buffalo-chicken',
    category: 'pizza',
    name: 'Buffalo Chicken',
    description: 'Grilled chicken, onions and banana peppers with hot buffalo sauce.',
    price: 15.99,
    image:
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80',
    isPizza: true,
    defaultToppings: ['chicken', 'onions', 'banana-peppers'],
  },
  {
    id: 'honolulu-hawaiian',
    category: 'pizza',
    name: 'Honolulu Hawaiian',
    description: 'Ham, bacon and pineapple on a sweet & savory canvas.',
    price: 14.49,
    image:
      'https://images.unsplash.com/photo-1594007654729-407eedc4be64?auto=format&fit=crop&w=800&q=80',
    isPizza: true,
    defaultToppings: ['ham', 'bacon', 'pineapple'],
  },
  {
    id: 'philly-cheese',
    category: 'pizza',
    name: 'Philly Cheese Steak',
    description: 'Tender slices of steak with onions, green peppers, mushrooms and provolone.',
    price: 16.49,
    image:
      'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=800&q=80',
    isPizza: true,
    defaultToppings: ['philly', 'onions', 'peppers', 'mushrooms', 'provolone'],
  },
  {
    id: 'wings',
    category: 'chicken',
    name: 'Chicken Wings',
    description: 'Bone-in wings tossed in your choice of sauce. 8 piece.',
    price: 9.99,
    image:
      'https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=800&q=80',
    badge: '8 pc',
  },
  {
    id: 'boneless',
    category: 'chicken',
    name: 'Boneless Chicken',
    description: 'Crispy boneless bites with dipping sauce. Perfect shareable.',
    price: 8.99,
    image:
      'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'bread-bites',
    category: 'sides',
    name: 'Parmesan Bread Bites',
    description: 'Oven-baked bites seasoned with garlic and Parmesan.',
    price: 5.99,
    image:
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'stuffed-cheesy',
    category: 'sides',
    name: 'Stuffed Cheesy Bread',
    description: 'Baked with cheese and garlic — add bacon or jalapeño.',
    price: 7.49,
    image:
      'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=800&q=80',
    badge: 'Popular',
  },
  {
    id: 'chicken-carbonara',
    category: 'pasta',
    name: 'Chicken Carbonara',
    description: 'Creamy Alfredo with roasted chicken, bacon and onions.',
    price: 8.99,
    image:
      'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'italian-sausage-marinara',
    category: 'pasta',
    name: 'Italian Sausage Marinara',
    description: 'Hearty marinara with Italian sausage and green peppers.',
    price: 8.49,
    image:
      'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'chicken-bacon-ranch',
    category: 'sandwiches',
    name: 'Chicken Bacon Ranch',
    description: 'Grilled chicken, bacon and cheddar with ranch on artisan bread.',
    price: 7.99,
    image:
      'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'philly-sandwich',
    category: 'sandwiches',
    name: 'Philly Cheese Steak Sandwich',
    description: 'Steak, onions, green peppers and provolone.',
    price: 8.49,
    image:
      'https://images.unsplash.com/photo-1481070555726-e2fe83588228?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'lava-cakes',
    category: 'desserts',
    name: 'Chocolate Lava Crunch Cakes',
    description: 'Warm chocolate cakes with molten fudge centers. 2 cakes.',
    price: 4.99,
    image:
      'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'cinnamon-twists',
    category: 'desserts',
    name: 'Cinnamon Bread Twists',
    description: 'Oven-baked twists with cinnamon sugar and icing dip.',
    price: 5.49,
    image:
      'https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'coke',
    category: 'drinks',
    name: 'Coca-Cola',
    description: 'Ice-cold 20 oz bottle.',
    price: 2.29,
    image:
      'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'sprite',
    category: 'drinks',
    name: 'Sprite',
    description: 'Crisp lemon-lime 20 oz bottle.',
    price: 2.29,
    image:
      'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?auto=format&fit=crop&w=800&q=80',
  },
]

export const deals = [
  {
    id: 'mix-match',
    title: 'Mix & Match',
    subtitle: 'Choose any two or more for $6.99 each',
    detail: 'Medium 2-topping pizzas, sides & desserts. Upgrade crusts for more.',
    cta: 'Add Deal',
  },
  {
    id: 'best-deal',
    title: 'Best Deal Ever',
    subtitle: 'Any pizza, any toppings — $9.99',
    detail: 'Hand Tossed, Pan, Thin, New York or Gluten Free. Online only.',
    cta: 'Start Building',
  },
  {
    id: 'carryout',
    title: 'Carryout Special',
    subtitle: 'Large 3-topping for $9.99',
    detail: 'Pick it up fresh from your local store. Limited time.',
    cta: 'Order Carryout',
  },
]
