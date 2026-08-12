export type CrustId = 'handtossed' | 'handmade-pan' | 'crunchy-thin' | 'gluten-free'
export type SizeId = 'small' | 'medium' | 'large' | 'xlarge'
export type SauceId = 'robust-tomato' | 'hearty-marinara' | 'bbq' | 'alfredo' | 'garlic-parmesan' | 'none'
export type CheeseAmount = 'light' | 'normal' | 'extra' | 'none'
export type ToppingSide = 'whole' | 'left' | 'right'
export type CategoryId = 'specialty' | 'build' | 'sides' | 'drinks' | 'desserts'

export interface Crust {
  id: CrustId
  name: string
  description: string
  priceMod: number
}

export interface Size {
  id: SizeId
  name: string
  slices: number
  feeds: string
  priceMod: number
}

export interface Sauce {
  id: SauceId
  name: string
}

export interface Topping {
  id: string
  name: string
  category: 'meat' | 'veggie' | 'cheese'
  price: number
}

export interface SpecialtyPizza {
  id: string
  name: string
  description: string
  image: string
  basePrice: number
  badge?: string
  defaultToppings: string[]
  defaultCrust: CrustId
  defaultSauce: SauceId
}

export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: 'sides' | 'drinks' | 'desserts'
}

export const crusts: Crust[] = [
  {
    id: 'handtossed',
    name: 'Hand Tossed',
    description: 'Garlic-seasoned crust with a rich, buttery taste.',
    priceMod: 0,
  },
  {
    id: 'handmade-pan',
    name: 'Handmade Pan',
    description: 'Thick, chewy edges and a golden crisp bottom.',
    priceMod: 2,
  },
  {
    id: 'crunchy-thin',
    name: 'Crunchy Thin',
    description: 'Thin and crispy with less dough.',
    priceMod: 0,
  },
  {
    id: 'gluten-free',
    name: 'Gluten Free',
    description: 'Made without gluten-containing ingredients.',
    priceMod: 3,
  },
]

export const sizes: Size[] = [
  { id: 'small', name: 'Small', slices: 4, feeds: '1–2', priceMod: 0 },
  { id: 'medium', name: 'Medium', slices: 6, feeds: '2–3', priceMod: 3 },
  { id: 'large', name: 'Large', slices: 8, feeds: '3–5', priceMod: 6 },
  { id: 'xlarge', name: 'X-Large', slices: 10, feeds: '4–6', priceMod: 9 },
]

export const sauces: Sauce[] = [
  { id: 'robust-tomato', name: 'Robust Inspired Tomato' },
  { id: 'hearty-marinara', name: 'Hearty Marinara' },
  { id: 'bbq', name: 'BBQ Sauce' },
  { id: 'alfredo', name: 'Alfredo Sauce' },
  { id: 'garlic-parmesan', name: 'Garlic Parmesan White' },
  { id: 'none', name: 'No Sauce' },
]

export const toppings: Topping[] = [
  { id: 'pepperoni', name: 'Pepperoni', category: 'meat', price: 1.5 },
  { id: 'italian-sausage', name: 'Italian Sausage', category: 'meat', price: 1.5 },
  { id: 'beef', name: 'Beef', category: 'meat', price: 1.5 },
  { id: 'ham', name: 'Ham', category: 'meat', price: 1.5 },
  { id: 'bacon', name: 'Bacon', category: 'meat', price: 1.75 },
  { id: 'chicken', name: 'Grilled Chicken', category: 'meat', price: 1.75 },
  { id: 'philly-steak', name: 'Philly Steak', category: 'meat', price: 2 },
  { id: 'mushrooms', name: 'Mushrooms', category: 'veggie', price: 1.25 },
  { id: 'onions', name: 'Onions', category: 'veggie', price: 1.25 },
  { id: 'green-peppers', name: 'Green Peppers', category: 'veggie', price: 1.25 },
  { id: 'black-olives', name: 'Black Olives', category: 'veggie', price: 1.25 },
  { id: 'spinach', name: 'Spinach', category: 'veggie', price: 1.25 },
  { id: 'pineapple', name: 'Pineapple', category: 'veggie', price: 1.25 },
  { id: 'jalapenos', name: 'Jalapeños', category: 'veggie', price: 1.25 },
  { id: 'tomato', name: 'Diced Tomatoes', category: 'veggie', price: 1.25 },
  { id: 'banana-peppers', name: 'Banana Peppers', category: 'veggie', price: 1.25 },
  { id: 'feta', name: 'Feta Cheese', category: 'cheese', price: 1.5 },
  { id: 'provolone', name: 'Provolone', category: 'cheese', price: 1.5 },
  { id: 'cheddar', name: 'Cheddar', category: 'cheese', price: 1.5 },
  { id: 'parmesan-asiago', name: 'Parmesan-Asiago', category: 'cheese', price: 1.5 },
]

export const specialtyPizzas: SpecialtyPizza[] = [
  {
    id: 'extravaganZZa',
    name: 'ExtravaganZZa',
    description:
      'Pepperoni, ham, Italian sausage, beef, onions, green peppers, mushrooms & black olives.',
    image:
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80',
    basePrice: 14.99,
    badge: 'Popular',
    defaultToppings: [
      'pepperoni',
      'ham',
      'italian-sausage',
      'beef',
      'onions',
      'green-peppers',
      'mushrooms',
      'black-olives',
    ],
    defaultCrust: 'handtossed',
    defaultSauce: 'robust-tomato',
  },
  {
    id: 'meatZZa',
    name: 'MeatZZa',
    description: 'Pepperoni, ham, Italian sausage & beef — for serious meat lovers.',
    image:
      'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=900&q=80',
    basePrice: 13.99,
    badge: 'Fan Fave',
    defaultToppings: ['pepperoni', 'ham', 'italian-sausage', 'beef'],
    defaultCrust: 'handtossed',
    defaultSauce: 'robust-tomato',
  },
  {
    id: 'pacific-veggie',
    name: 'Pacific Veggie',
    description: 'Roasted red peppers, spinach, onions, mushrooms, tomatoes & olives.',
    image:
      'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=80',
    basePrice: 12.99,
    defaultToppings: ['spinach', 'onions', 'mushrooms', 'tomato', 'black-olives'],
    defaultCrust: 'handtossed',
    defaultSauce: 'robust-tomato',
  },
  {
    id: 'honolulu-hawaiian',
    name: 'Honolulu Hawaiian',
    description: 'Ham, pineapple & bacon on a sweet-savory classic.',
    image:
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=80',
    basePrice: 12.99,
    defaultToppings: ['ham', 'pineapple', 'bacon'],
    defaultCrust: 'handtossed',
    defaultSauce: 'robust-tomato',
  },
  {
    id: 'philly-cheese-steak',
    name: 'Philly Cheese Steak',
    description: 'Tender steak, onions, green peppers, mushrooms & provolone.',
    image:
      'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=900&q=80',
    basePrice: 14.49,
    badge: 'New',
    defaultToppings: ['philly-steak', 'onions', 'green-peppers', 'mushrooms', 'provolone'],
    defaultCrust: 'handtossed',
    defaultSauce: 'garlic-parmesan',
  },
  {
    id: 'buffalo-chicken',
    name: 'Buffalo Chicken',
    description: 'Grilled chicken, onions & banana peppers with hot buffalo flavor.',
    image:
      'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=900&q=80',
    basePrice: 13.49,
    defaultToppings: ['chicken', 'onions', 'banana-peppers'],
    defaultCrust: 'handtossed',
    defaultSauce: 'bbq',
  },
  {
    id: 'wisconsin-6-cheese',
    name: 'Wisconsin 6 Cheese',
    description: 'Feta, provolone, cheddar, Parmesan-Asiago, mozzarella & cheese blend.',
    image:
      'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?auto=format&fit=crop&w=900&q=80',
    basePrice: 12.49,
    defaultToppings: ['feta', 'provolone', 'cheddar', 'parmesan-asiago'],
    defaultCrust: 'handtossed',
    defaultSauce: 'robust-tomato',
  },
  {
    id: 'spinach-feta',
    name: 'Spinach & Feta',
    description: 'Creamy Alfredo base with spinach & feta cheese.',
    image:
      'https://images.unsplash.com/photo-1594007654729-407eedc4be65?auto=format&fit=crop&w=900&q=80',
    basePrice: 12.49,
    defaultToppings: ['spinach', 'feta'],
    defaultCrust: 'handtossed',
    defaultSauce: 'alfredo',
  },
]

export const sidesAndMore: MenuItem[] = [
  {
    id: 'parmesan-bites',
    name: 'Parmesan Bread Bites',
    description: 'Oven-baked bites brushed with garlic & Parmesan.',
    price: 5.99,
    image:
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=700&q=80',
    category: 'sides',
  },
  {
    id: 'stuffed-cheesy-bread',
    name: 'Stuffed Cheesy Bread',
    description: 'Baked with cheese stuffed inside and melted on top.',
    price: 6.99,
    image:
      'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=700&q=80',
    category: 'sides',
  },
  {
    id: 'chicken-wings',
    name: 'Chicken Wings',
    description: 'Bone-in wings tossed in your choice of sauce.',
    price: 8.99,
    image:
      'https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=700&q=80',
    category: 'sides',
  },
  {
    id: 'loaded-tots',
    name: 'Loaded Tots',
    description: 'Crispy tots with cheese, bacon & ranch drizzle.',
    price: 6.49,
    image:
      'https://images.unsplash.com/photo-1585109642470-c8ec4c4a0d0a?auto=format&fit=crop&w=700&q=80',
    category: 'sides',
  },
  {
    id: 'coke',
    name: 'Coca-Cola®',
    description: 'Ice-cold 20 oz bottle.',
    price: 2.49,
    image:
      'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&w=700&q=80',
    category: 'drinks',
  },
  {
    id: 'sprite',
    name: 'Sprite®',
    description: 'Crisp lemon-lime 20 oz bottle.',
    price: 2.49,
    image:
      'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?auto=format&fit=crop&w=700&q=80',
    category: 'drinks',
  },
  {
    id: 'water',
    name: 'Bottled Water',
    description: 'Refreshingly simple.',
    price: 1.99,
    image:
      'https://images.unsplash.com/photo-1548832335-cf2203953729?auto=format&fit=crop&w=700&q=80',
    category: 'drinks',
  },
  {
    id: 'cinnamon-twists',
    name: 'Cinnamon Bread Twists',
    description: 'Sweet twists with icing dipping cup.',
    price: 6.49,
    image:
      'https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&w=700&q=80',
    category: 'desserts',
  },
  {
    id: 'lava-cakes',
    name: 'Chocolate Lava Crunch Cakes',
    description: 'Warm chocolate cakes with a molten center.',
    price: 6.99,
    image:
      'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=700&q=80',
    category: 'desserts',
  },
  {
    id: 'cookie-brownie',
    name: 'Marbled Cookie Brownie',
    description: 'Chocolate chip cookie swirled with brownie.',
    price: 6.99,
    image:
      'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=700&q=80',
    category: 'desserts',
  },
]

export const categories: { id: CategoryId; label: string }[] = [
  { id: 'specialty', label: 'Specialty Pizzas' },
  { id: 'build', label: 'Build Your Own' },
  { id: 'sides', label: 'Sides' },
  { id: 'drinks', label: 'Drinks' },
  { id: 'desserts', label: 'Desserts' },
]

export function getTopping(id: string) {
  return toppings.find((t) => t.id === id)
}

export function formatPrice(n: number) {
  return `$${n.toFixed(2)}`
}
