const IMG = (id, w = 600, h = 400) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

export const HERO_IMAGE = IMG('photo-1555396273-367ea4eb4db5', 1600, 700);
export const LOGO_IMAGE = IMG('photo-1571997478779-2adcbbe9ab2f', 120, 120);
export const FOOTER_IMAGE = IMG('photo-1523906834658-6e24ef2386f9', 1600, 400);

export const FOOD_IMAGES = {
  margherita: IMG('photo-1574071318508-1cdbab80d002'),
  marinara: IMG('photo-1595854341625-f33eeeb883e7'),
  bufala: IMG('photo-1565299624946-b28f40a0ae38'),
  diavola: IMG('photo-1628840042765-356cda07504e'),
  'quattro-stagioni': IMG('photo-1513104890138-7c749659a591'),
  napoletana: IMG('photo-1571997478779-2adcbbe9ab2f'),
  capricciosa: IMG('photo-1604382893640-4b0e5e9f4b3a'),
  bruschetta: IMG('photo-1572695157366-5e585ab2b6f9'),
  caprese: IMG('photo-1592417817098-8fd3d9eb14a5'),
  frittatina: IMG('photo-1633504581786-316c8002b1b2'),
  polpette: IMG('photo-1529042410759-befb1204b468'),
  melanzane: IMG('photo-1572457241063-0d411544591e'),
  patate: IMG('photo-1518013432764-7fa09ad45b01'),
  'insalata-mista': IMG('photo-1512621776951-a57141f2eefd'),
  sfogliatella: IMG('photo-1555507036-ab1f4038808a'),
  'babà': IMG('photo-1563805042-7684c019e1cb'),
  limoncello: IMG('photo-1556679343-c7306c1976bc'),
  acqua: IMG('photo-1548839140-29a749e1cf4d'),
  'vino-rosso': IMG('photo-1510812431401-41d2bd2722f3'),
};

export const CATEGORY_IMAGES = {
  pizza: FOOD_IMAGES.margherita,
  antipasti: FOOD_IMAGES.bruschetta,
  secondi: FOOD_IMAGES.melanzane,
  contorni: FOOD_IMAGES['insalata-mista'],
  dolci: FOOD_IMAGES.sfogliatella,
  bevande: FOOD_IMAGES['vino-rosso'],
};

export const ORDER_IMAGES = {
  delivery: IMG('photo-1565299585323-38d6b0865b47', 200, 200),
  carryout: IMG('photo-1414235077428-338989a2e8c0', 200, 200),
};

export const DEAL_IMAGES = {
  degustazione: IMG('photo-1565299624946-b28f40a0ae38', 480, 280),
  asporto: IMG('photo-1513104890138-7c749659a591', 480, 280),
  consegna: IMG('photo-1565299585323-38d6b0865b47', 480, 280),
};

export const EMPTY_CART_IMAGE = IMG('photo-1574071318508-1cdbab80d002', 320, 240);

export const DEFAULT_FOOD_IMAGE = FOOD_IMAGES['quattro-stagioni'];

export const DEALS = [
  {
    id: 'degustazione',
    tag: 'Menu Degustazione',
    title: 'Pizza + Antipasto + Dolce',
    description: 'Margherita, bruschetta e sfogliatella —',
    price: '€16,90',
    cta: 'Scopri',
    featured: true,
  },
  {
    id: 'asporto',
    tag: 'Asporto',
    title: 'Due Pizze al Prezzo di Una',
    description: 'Ogni martedì, dalle 18:00 —',
    priceLabel: 'asporto',
    cta: 'Scopri',
  },
  {
    id: 'consegna',
    tag: 'Consegna',
    title: 'Consegna Gratuita',
    description: 'Per ordini superiori a',
    price: '€25',
    priceSuffix: 'in centro Napoli',
    cta: 'Ordina Ora',
  },
];

export function getItemImage(item) {
  return item.image ?? FOOD_IMAGES[item.id] ?? DEFAULT_FOOD_IMAGE;
}

export function getCategoryImage(categoryId) {
  return CATEGORY_IMAGES[categoryId] ?? DEFAULT_FOOD_IMAGE;
}

export function getDealImage(dealId) {
  return DEAL_IMAGES[dealId] ?? DEFAULT_FOOD_IMAGE;
}

export function getItemImageById(itemId) {
  return FOOD_IMAGES[itemId] ?? DEFAULT_FOOD_IMAGE;
}
