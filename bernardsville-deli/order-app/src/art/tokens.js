/** Fresco Napoletano — original art direction tokens */
export const PALETTE = {
  umber: '#3D2914',
  umberDark: '#2C1810',
  terracotta: '#B85C38',
  terracottaLight: '#D4845C',
  ochre: '#C49A30',
  ochreLight: '#E8C878',
  gold: '#C9A227',
  goldLight: '#E8D48B',
  pomodoro: '#A03020',
  pomodoroDeep: '#6B1A10',
  basil: '#3A6B35',
  cream: '#F5EDE0',
  marble: '#F8F4EE',
  mozzarella: '#FFF8E0',
  mediterranean: '#2B5F7A',
  olive: '#5C6B3C',
  wine: '#6B2030',
  charcoal: '#4A3728',
};

export const STROKE = 2;
export const STROKE_SOFT = 1.5;

export const ART_VARIANTS = {
  food: [
    'margherita', 'marinara', 'bufala', 'diavola', 'quattro-stagioni',
    'napoletana', 'capricciosa', 'bruschetta', 'caprese', 'frittatina',
    'polpette', 'melanzane', 'patate', 'insalata-mista', 'sfogliatella',
    'babà', 'limoncello', 'acqua', 'vino-rosso',
  ],
  category: ['pizza', 'antipasti', 'secondi', 'contorni', 'dolci', 'bevande'],
  scene: ['hero-forno', 'footer-napoli', 'order-delivery', 'order-carryout', 'empty-cart'],
  story: ['forno', 'margherita', 'tribunali', 'impasto', 'sfogliatella', 'vesuvio'],
  deal: ['degustazione', 'asporto', 'consegna'],
};

export function foodVariant(id) {
  const map = {
    classic: 'margherita',
    margherita: 'margherita',
    'meat-lovers': 'diavola',
    'white-pie': 'bufala',
    'chicken-parm': 'capricciosa',
    'bbq-buffalo': 'diavola',
    veggie: 'quattro-stagioni',
    philly: 'napoletana',
    'bville-special': 'capricciosa',
    'thai-chili': 'diavola',
    'don-pomodoro': 'margherita',
    combination: 'quattro-stagioni',
    'classic-burger': 'polpette',
    'boom-boom': 'polpette',
    wings: 'frittatina',
    'mozz-sticks': 'frittatina',
    'chicken-wrap': 'bruschetta',
    gelato: 'sfogliatella',
    'house-blend': 'acqua',
    latte: 'limoncello',
  };
  return map[id] ?? (ART_VARIANTS.food.includes(id) ? id : 'bruschetta');
}

export function categoryVariant(id) {
  const map = {
    pizza: 'pizza',
    burgers: 'secondi',
    starters: 'antipasti',
    wraps: 'secondi',
    desserts: 'dolci',
    drinks: 'bevande',
    antipasti: 'antipasti',
    secondi: 'secondi',
    contorni: 'contorni',
    dolci: 'dolci',
    bevande: 'bevande',
  };
  return map[id] ?? (ART_VARIANTS.category.includes(id) ? id : 'antipasti');
}

export function storyVariant(id) {
  const map = {
    'forno-1738': 'forno',
    'regina-margherita': 'margherita',
    'via-tribunali': 'tribunali',
    'impasto-24-ore': 'impasto',
    'sfogliatella-mare': 'sfogliatella',
    'vesuvio-vigilia': 'vesuvio',
    'antica-pizzeria': 'tribunali',
  };
  return map[id] ?? 'forno';
}
