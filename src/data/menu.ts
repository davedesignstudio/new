export type CategoryId =
  | 'deals'
  | 'pizza'
  | 'build'
  | 'sides'
  | 'chicken'
  | 'desserts'
  | 'drinks'

export type CrustId =
  | 'hand-tossed'
  | 'handmade-pan'
  | 'crunchy-thin'
  | 'brooklyn'
  | 'gluten-free'
  | 'parmesan-stuffed'

export type SizeId = 'small' | 'medium' | 'large' | 'xlarge'

export type ToppingId = string

export interface CrustOption {
  id: CrustId
  name: string
  description: string
  priceAdd: number
  sizes: SizeId[]
}

export interface SizeOption {
  id: SizeId
  name: string
  inches: string
  feeds: string
  multiplier: number
}

export interface Topping {
  id: ToppingId
  name: string
  group: 'sauce' | 'cheese' | 'meat' | 'veggie' | 'seasoning' | 'dip'
  price: number
  color: string
}

export interface SpecialtyPizza {
  id: string
  name: string
  description: string
  basePrice: number
  imageHue: number
  defaultToppings: ToppingId[]
  badge?: string
}

export interface SideItem {
  id: string
  name: string
  description: string
  price: number
  category: Exclude<CategoryId, 'deals' | 'pizza' | 'build'>
  imageHue: number
}

export interface Deal {
  id: string
  title: string
  subtitle: string
  priceLabel: string
  accent: string
}

export const CATEGORIES: { id: CategoryId; label: string }[] = [
  { id: 'deals', label: 'Deals' },
  { id: 'pizza', label: 'Specialty Pizzas' },
  { id: 'build', label: 'Build Your Own' },
  { id: 'sides', label: 'Breads & Sides' },
  { id: 'chicken', label: 'Chicken' },
  { id: 'desserts', label: 'Desserts' },
  { id: 'drinks', label: 'Drinks' },
]

export const CRUSTS: CrustOption[] = [
  {
    id: 'hand-tossed',
    name: 'Hand Tossed',
    description: 'Garlic-seasoned crust with a rich, buttery taste.',
    priceAdd: 0,
    sizes: ['small', 'medium', 'large', 'xlarge'],
  },
  {
    id: 'handmade-pan',
    name: 'Handmade Pan',
    description: 'Thick and chewy with a buttery taste.',
    priceAdd: 2,
    sizes: ['medium'],
  },
  {
    id: 'crunchy-thin',
    name: 'Crunchy Thin',
    description: 'Thin enough for the perfect crunch.',
    priceAdd: 0,
    sizes: ['medium', 'large'],
  },
  {
    id: 'brooklyn',
    name: 'Brooklyn Style',
    description: 'Hand-stretched to be big, foldable, and loaded.',
    priceAdd: 1.5,
    sizes: ['large', 'xlarge'],
  },
  {
    id: 'parmesan-stuffed',
    name: 'Parmesan Stuffed',
    description: 'Our hand tossed crust stuffed with cheese.',
    priceAdd: 3,
    sizes: ['large'],
  },
  {
    id: 'gluten-free',
    name: 'Gluten Free',
    description: 'A thin crust made without gluten ingredients.',
    priceAdd: 2.5,
    sizes: ['small'],
  },
]

export const SIZES: SizeOption[] = [
  { id: 'small', name: 'Small', inches: '10"', feeds: '1–2', multiplier: 0.75 },
  { id: 'medium', name: 'Medium', inches: '12"', feeds: '2–3', multiplier: 1 },
  { id: 'large', name: 'Large', inches: '14"', feeds: '3–5', multiplier: 1.25 },
  { id: 'xlarge', name: 'X-Large', inches: '16"', feeds: '5–6', multiplier: 1.5 },
]

export const TOPPINGS: Topping[] = [
  { id: 'robust-sauce', name: 'Robust Inspired Tomato', group: 'sauce', price: 0, color: '#c62828' },
  { id: 'hearty-marinara', name: 'Hearty Marinara', group: 'sauce', price: 0, color: '#b71c1c' },
  { id: 'bbq-sauce', name: 'BBQ Sauce', group: 'sauce', price: 0, color: '#5d4037' },
  { id: 'garlic-parm', name: 'Garlic Parmesan White', group: 'sauce', price: 0, color: '#fff3e0' },
  { id: 'alfredo', name: 'Alfredo Sauce', group: 'sauce', price: 0, color: '#fff8e1' },

  { id: 'mozzarella', name: 'Mozzarella', group: 'cheese', price: 0, color: '#fffde7' },
  { id: 'cheddar', name: 'Cheddar', group: 'cheese', price: 1.5, color: '#ffb300' },
  { id: 'parmesan', name: 'Parmesan', group: 'cheese', price: 1.5, color: '#f5f5f5' },
  { id: 'feta', name: 'Feta', group: 'cheese', price: 1.5, color: '#eeeeee' },
  { id: 'provolone', name: 'Provolone', group: 'cheese', price: 1.5, color: '#fafafa' },

  { id: 'pepperoni', name: 'Pepperoni', group: 'meat', price: 1.75, color: '#d32f2f' },
  { id: 'italian-sausage', name: 'Italian Sausage', group: 'meat', price: 1.75, color: '#8d6e63' },
  { id: 'beef', name: 'Beef', group: 'meat', price: 1.75, color: '#6d4c41' },
  { id: 'ham', name: 'Ham', group: 'meat', price: 1.75, color: '#e57373' },
  { id: 'bacon', name: 'Bacon', group: 'meat', price: 1.75, color: '#a1887f' },
  { id: 'chicken', name: 'Grilled Chicken', group: 'meat', price: 1.75, color: '#d7ccc8' },
  { id: 'philly-steak', name: 'Philly Steak', group: 'meat', price: 1.75, color: '#5d4037' },

  { id: 'mushrooms', name: 'Mushrooms', group: 'veggie', price: 1.5, color: '#bcaaa4' },
  { id: 'onions', name: 'Onions', group: 'veggie', price: 1.5, color: '#fce4ec' },
  { id: 'green-peppers', name: 'Green Peppers', group: 'veggie', price: 1.5, color: '#66bb6a' },
  { id: 'black-olives', name: 'Black Olives', group: 'veggie', price: 1.5, color: '#37474f' },
  { id: 'spinach', name: 'Spinach', group: 'veggie', price: 1.5, color: '#2e7d32' },
  { id: 'pineapple', name: 'Pineapple', group: 'veggie', price: 1.5, color: '#ffee58' },
  { id: 'jalapenos', name: 'Jalapeños', group: 'veggie', price: 1.5, color: '#43a047' },
  { id: 'tomatoes', name: 'Diced Tomatoes', group: 'veggie', price: 1.5, color: '#ef5350' },
  { id: 'banana-peppers', name: 'Banana Peppers', group: 'veggie', price: 1.5, color: '#fdd835' },

  { id: 'garlic-seasoning', name: 'Garlic Crust Seasoning', group: 'seasoning', price: 0, color: '#fff9c4' },
  { id: 'no-seasoning', name: 'No Seasoning', group: 'seasoning', price: 0, color: '#e0e0e0' },

  { id: 'ranch-dip', name: 'Ranch', group: 'dip', price: 0.79, color: '#fffde7' },
  { id: 'garlic-dip', name: 'Garlic Dipping Sauce', group: 'dip', price: 0.79, color: '#fff8e1' },
  { id: 'marinara-dip', name: 'Marinara', group: 'dip', price: 0.79, color: '#c62828' },
  { id: 'bbq-dip', name: 'BBQ Dipping Cup', group: 'dip', price: 0.79, color: '#5d4037' },
]

export const SPECIALTY_PIZZAS: SpecialtyPizza[] = [
  {
    id: 'pepperoni-feast',
    name: 'Pepperoni Feast',
    description: 'Loads of pepperoni paired with extra mozzarella on our signature sauce.',
    basePrice: 12.99,
    imageHue: 0,
    defaultToppings: ['robust-sauce', 'mozzarella', 'pepperoni'],
    badge: 'Popular',
  },
  {
    id: 'extravaganZZa',
    name: 'ExtravaganZZa',
    description: 'Pepperoni, ham, Italian sausage, beef, onions, green peppers, mushrooms & olives.',
    basePrice: 16.99,
    imageHue: 12,
    defaultToppings: [
      'robust-sauce',
      'mozzarella',
      'pepperoni',
      'ham',
      'italian-sausage',
      'beef',
      'onions',
      'green-peppers',
      'mushrooms',
      'black-olives',
    ],
  },
  {
    id: 'meatZZa',
    name: 'MeatZZa',
    description: 'Pepperoni, ham, Italian sausage & beef — for serious carnivores.',
    basePrice: 15.99,
    imageHue: 20,
    defaultToppings: ['robust-sauce', 'mozzarella', 'pepperoni', 'ham', 'italian-sausage', 'beef'],
    badge: 'Fan favorite',
  },
  {
    id: 'philly-cheese',
    name: 'Philly Cheese Steak',
    description: 'Tender philly steak, onions, green peppers, mushrooms & provolone.',
    basePrice: 15.99,
    imageHue: 30,
    defaultToppings: ['garlic-parm', 'provolone', 'philly-steak', 'onions', 'green-peppers', 'mushrooms'],
  },
  {
    id: 'pacific-veggie',
    name: 'Pacific Veggie',
    description: 'Roasted red peppers, spinach, onions, mushrooms, tomatoes & feta.',
    basePrice: 14.99,
    imageHue: 95,
    defaultToppings: ['robust-sauce', 'feta', 'mozzarella', 'spinach', 'onions', 'mushrooms', 'tomatoes'],
  },
  {
    id: 'honolulu-hawaiian',
    name: 'Honolulu Hawaiian',
    description: 'Ham, bacon, pineapple & green peppers over a sweet-savory base.',
    basePrice: 14.99,
    imageHue: 45,
    defaultToppings: ['robust-sauce', 'mozzarella', 'ham', 'bacon', 'pineapple', 'green-peppers'],
  },
  {
    id: 'buffalo-chicken',
    name: 'Buffalo Chicken',
    description: 'Grilled chicken, onions & hot buffalo sauce finished with cheddar.',
    basePrice: 15.49,
    imageHue: 5,
    defaultToppings: ['bbq-sauce', 'cheddar', 'mozzarella', 'chicken', 'onions'],
    badge: 'Spicy',
  },
  {
    id: 'wisconsin-6-cheese',
    name: 'Wisconsin 6 Cheese',
    description: 'Feta, provolone, cheddar, parmesan, mozzarella & asiago-style blend.',
    basePrice: 13.99,
    imageHue: 50,
    defaultToppings: ['robust-sauce', 'mozzarella', 'cheddar', 'parmesan', 'feta', 'provolone'],
  },
]

export const SIDES: SideItem[] = [
  {
    id: 'cheesy-bread',
    name: 'Cheesy Bread',
    description: 'Oven-baked bread topped with cheese & garlic seasoning.',
    price: 6.99,
    category: 'sides',
    imageHue: 40,
  },
  {
    id: 'parmesan-bites',
    name: 'Parmesan Bread Twists',
    description: 'Hand-twisted bread baked with garlic and parmesan.',
    price: 5.99,
    category: 'sides',
    imageHue: 35,
  },
  {
    id: 'stuffed-cheesy',
    name: 'Stuffed Cheesy Bread',
    description: 'Bacon & jalapeño stuffed bread with melted cheese.',
    price: 7.99,
    category: 'sides',
    imageHue: 25,
  },
  {
    id: 'boneless-chicken',
    name: 'Boneless Chicken',
    description: 'Lightly breaded boneless chicken with your choice of sauce.',
    price: 8.99,
    category: 'chicken',
    imageHue: 15,
  },
  {
    id: 'wings',
    name: 'Specialty Chicken Wings',
    description: 'Bone-in wings tossed in hot, BBQ, or plain.',
    price: 9.99,
    category: 'chicken',
    imageHue: 8,
  },
  {
    id: 'chicken-bites',
    name: 'Crispy Bacon & Tomato Specialty Chicken',
    description: 'Oven-baked chicken with bacon, tomatoes and cheese.',
    price: 8.49,
    category: 'chicken',
    imageHue: 18,
  },
  {
    id: 'lava-cakes',
    name: 'Chocolate Lava Crunch Cakes',
    description: 'Warm chocolate cake with a molten chocolate center.',
    price: 5.99,
    category: 'desserts',
    imageHue: 350,
  },
  {
    id: 'cinnamon-twists',
    name: 'Cinnamon Bread Twists',
    description: 'Hand-twisted bread finished with cinnamon sugar & icing.',
    price: 5.99,
    category: 'desserts',
    imageHue: 30,
  },
  {
    id: 'cookie-brownie',
    name: 'Marbled Cookie Brownie',
    description: 'A swirl of cookie dough and brownie baked to order.',
    price: 6.49,
    category: 'desserts',
    imageHue: 25,
  },
  {
    id: 'coke',
    name: 'Coca-Cola 20oz',
    description: 'Ice-cold classic Coke.',
    price: 2.29,
    category: 'drinks',
    imageHue: 0,
  },
  {
    id: 'sprite',
    name: 'Sprite 20oz',
    description: 'Crisp lemon-lime soda.',
    price: 2.29,
    category: 'drinks',
    imageHue: 100,
  },
  {
    id: 'water',
    name: 'Dasani Water',
    description: 'Purified bottled water.',
    price: 1.99,
    category: 'drinks',
    imageHue: 200,
  },
]

export const DEALS: Deal[] = [
  {
    id: 'mix-match',
    title: 'Mix & Match',
    subtitle: 'Choose any two or more medium 2-topping pizzas, sides & desserts.',
    priceLabel: '2 for $6.99 ea',
    accent: '#e31837',
  },
  {
    id: 'carryout-deal',
    title: 'Weeklong Carryout',
    subtitle: 'Large 1-topping pizza or 8-piece chicken — carryout only.',
    priceLabel: '$7.99 each',
    accent: '#006491',
  },
  {
    id: 'perfect-combo',
    title: 'The Perfect Combo',
    subtitle: 'Two medium 1-topping pizzas and two orders of Parmesan bites.',
    priceLabel: '$19.99',
    accent: '#c45c26',
  },
  {
    id: 'stuffed-crust',
    title: 'Parmesan Stuffed Crust',
    subtitle: 'Mix & match 2-topping stuffed crust pizzas.',
    priceLabel: '$10.99 each',
    accent: '#8b1e3f',
  },
]

export function getTopping(id: ToppingId): Topping | undefined {
  return TOPPINGS.find((t) => t.id === id)
}

export function toppingsByGroup(group: Topping['group']): Topping[] {
  return TOPPINGS.filter((t) => t.group === group)
}
