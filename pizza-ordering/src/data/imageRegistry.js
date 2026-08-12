/**
 * Complete image record — every photo and art variant used across the site.
 * Each entry: unsplash id, subject (Italian), where it appears, art overlay key.
 */

export const PHOTO_RECORDS = {
  'pizzeria-arch': {
    id: 'photo-1672596468079-2a257c139ede',
    subject: 'Pizzeria italiana vista attraverso un arco',
    location: 'Italia',
    usedIn: ['scene.hero-forno', 'story.forno'],
    artVariant: 'hero-forno',
  },
  'napoli-vesuvio': {
    id: 'photo-1768322264436-9b766658d037',
    subject: 'Napoli con il Vesuvio sullo sfondo',
    location: 'Napoli, Italia',
    usedIn: ['scene.footer-napoli', 'story.vesuvio'],
    artVariant: 'footer-napoli',
  },
  'napoli-vicolo': {
    id: 'photo-1763906667343-dcdb19b1ee4e',
    subject: 'Vicolo napoletano soleggiato',
    location: 'Napoli, Italia',
    usedIn: ['story.tribunali'],
    artVariant: 'tribunali',
  },
  'impasto-mani': {
    id: 'photo-1696919469971-f8b7d2ce15f6',
    subject: 'Mani che impastano la pizza',
    location: 'Napoli, Italia',
    usedIn: ['story.impasto', 'food.napoletana'],
    artVariant: 'impasto',
  },
  'pizza-margherita': {
    id: 'photo-1574071318508-1cdbab80d002',
    subject: 'Pizza Margherita con basilico',
    usedIn: ['story.margherita', 'food.margherita', 'category.pizza', 'deal.degustazione'],
    artVariant: 'margherita',
  },
  'pizza-forno': {
    id: 'photo-1571997478779-2adcbbe9ab2f',
    subject: 'Pizza nel forno a legna',
    usedIn: ['food.marinara'],
    artVariant: 'marinara',
  },
  'pizza-bufala': {
    id: 'photo-1593560708920-61dd98c46a4e',
    subject: 'Pizza con mozzarella di bufala',
    usedIn: ['food.bufala'],
    artVariant: 'bufala',
  },
  'pizza-diavola': {
    id: 'photo-1628840042765-356cda07504e',
    subject: 'Pizza piccante con salame',
    usedIn: ['food.diavola'],
    artVariant: 'diavola',
  },
  'pizza-quattro': {
    id: 'photo-1565299624946-b28f40a0ae38',
    subject: 'Pizza con condimenti misti',
    usedIn: ['food.quattro-stagioni', 'deal.asporto'],
    artVariant: 'quattro-stagioni',
  },
  'pizza-capricciosa': {
    id: 'photo-1513104890138-7c749659a591',
    subject: 'Pizza capricciosa',
    usedIn: ['food.capricciosa', 'food.napoletana'],
    artVariant: 'capricciosa',
  },
  'antipasti-tavola': {
    id: 'photo-1504674900247-0877df9cc836',
    subject: 'Tavola di antipasti italiani',
    usedIn: ['category.antipasti', 'food.bruschetta'],
    artVariant: 'bruschetta',
  },
  'colazione-tavola': {
    id: 'photo-1482049016688-2d3e1b311543',
    subject: 'Pane e pomodoro — stile bruschetta',
    usedIn: [],
    artVariant: 'bruschetta',
  },
  'insalata-caprese': {
    id: 'photo-1623428187969-5da2dcea5ebf',
    subject: 'Insalata Caprese con mozzarella',
    usedIn: ['food.caprese'],
    artVariant: 'caprese',
  },
  'frittatina': {
    id: 'photo-1563379926898-05f4575a45d8',
    subject: 'Frittatina di pasta napoletana',
    usedIn: ['food.frittatina'],
    artVariant: 'frittatina',
  },
  'polpette': {
    id: 'photo-1600891964092-4316c288032e',
    subject: 'Polpette al sugo',
    usedIn: ['food.polpette'],
    artVariant: 'polpette',
  },
  'parmigiana': {
    id: 'photo-1551183053-bf91a1d81141',
    subject: 'Parmigiana di melanzane',
    usedIn: ['food.melanzane', 'category.secondi'],
    artVariant: 'melanzane',
  },
  'patate-forno': {
    id: 'photo-1573080496219-bb080dd4f877',
    subject: 'Patate al forno con rosmarino',
    usedIn: ['food.patate'],
    artVariant: 'patate',
  },
  'insalata-mista': {
    id: 'photo-1512621776951-a57141f2eefd',
    subject: 'Insalata mista fresca',
    usedIn: ['food.insalata-mista', 'category.contorni'],
    artVariant: 'insalata-mista',
  },
  'sfogliatella': {
    id: 'photo-1555507036-ab1f4038808a',
    subject: 'Sfogliatella riccia napoletana',
    usedIn: ['food.sfogliatella', 'story.sfogliatella', 'category.dolci'],
    artVariant: 'sfogliatella',
  },
  'baba-rum': {
    id: 'photo-1621303837174-89787a7d4729',
    subject: 'Babà al rum',
    usedIn: ['food.babà'],
    artVariant: 'babà',
  },
  'limoncello': {
    id: 'photo-1470337458703-46ad1756a187',
    subject: 'Cocktail agli agrumi — limoncello',
    usedIn: ['food.limoncello'],
    artVariant: 'limoncello',
  },
  'acqua-minerale': {
    id: 'photo-1548839140-29a749e1cf4d',
    subject: 'Acqua minerale',
    usedIn: ['food.acqua'],
    artVariant: 'acqua',
  },
  'vino-rosso': {
    id: 'photo-1510812431401-41d2bd2722f3',
    subject: 'Calice di vino rosso',
    usedIn: ['food.vino-rosso', 'category.bevande'],
    artVariant: 'vino-rosso',
  },
  'consegna': {
    id: 'photo-1566576912321-d58ddd7a6088',
    subject: 'Consegna a domicilio',
    usedIn: ['deal.consegna', 'scene.order-delivery'],
    artVariant: 'order-delivery',
  },
};

/** Maps site keys → registry record keys */
export const PHOTO_KEY_MAP = {
  scene: {
    'hero-forno': 'pizzeria-arch',
    'footer-napoli': 'napoli-vesuvio',
    'order-delivery': 'consegna',
    'order-carryout': 'pizza-quattro',
    'empty-cart': 'pizza-margherita',
  },
  story: {
    forno: 'pizzeria-arch',
    margherita: 'pizza-margherita',
    tribunali: 'napoli-vicolo',
    impasto: 'impasto-mani',
    sfogliatella: 'sfogliatella',
    vesuvio: 'napoli-vesuvio',
  },
  category: {
    pizza: 'pizza-margherita',
    antipasti: 'antipasti-tavola',
    secondi: 'parmigiana',
    contorni: 'insalata-mista',
    dolci: 'sfogliatella',
    bevande: 'vino-rosso',
  },
  food: {
    margherita: 'pizza-margherita',
    marinara: 'pizza-forno',
    bufala: 'pizza-bufala',
    diavola: 'pizza-diavola',
    'quattro-stagioni': 'pizza-quattro',
    napoletana: 'pizza-capricciosa',
    capricciosa: 'pizza-capricciosa',
    bruschetta: 'antipasti-tavola',
    caprese: 'insalata-caprese',
    frittatina: 'frittatina',
    polpette: 'polpette',
    melanzane: 'parmigiana',
    patate: 'patate-forno',
    'insalata-mista': 'insalata-mista',
    sfogliatella: 'sfogliatella',
    'babà': 'baba-rum',
    limoncello: 'limoncello',
    acqua: 'acqua-minerale',
    'vino-rosso': 'vino-rosso',
  },
  deal: {
    degustazione: 'pizza-margherita',
    asporto: 'pizza-quattro',
    consegna: 'consegna',
  },
};

export const STORY_ID_TO_KEY = {
  'forno-1738': 'forno',
  'regina-margherita': 'margherita',
  'via-tribunali': 'tribunali',
  'impasto-24-ore': 'impasto',
  'sfogliatella-mare': 'sfogliatella',
  'vesuvio-vigilia': 'vesuvio',
};

/** Fresco SVG art variants — geometric Renaissance illustrations */
export const ART_RECORDS = {
  pizzas: ['margherita', 'marinara', 'bufala', 'diavola', 'quattro-stagioni', 'napoletana', 'capricciosa'],
  dishes: ['bruschetta', 'caprese', 'frittatina', 'polpette', 'melanzane', 'patate', 'insalata-mista', 'sfogliatella', 'babà', 'limoncello', 'acqua', 'vino-rosso'],
  scenes: ['hero-forno', 'footer-napoli', 'order-delivery', 'order-carryout', 'empty-cart'],
  stories: ['forno', 'margherita', 'tribunali', 'impasto', 'sfogliatella', 'vesuvio'],
  deals: ['degustazione', 'asporto', 'consegna'],
  categories: ['pizza', 'antipasti', 'secondi', 'contorni', 'dolci', 'bevande'],
};

export function getPhotoRecord(group, key) {
  const recordKey = PHOTO_KEY_MAP[group]?.[key];
  if (!recordKey) return PHOTO_RECORDS['pizza-margherita'];
  return PHOTO_RECORDS[recordKey] ?? PHOTO_RECORDS['pizza-margherita'];
}

export function getStoryPhotoRecord(storyId) {
  const key = STORY_ID_TO_KEY[storyId] ?? 'forno';
  return getPhotoRecord('story', key);
}

export function listAllPhotoRecords() {
  return Object.entries(PHOTO_RECORDS).map(([key, record]) => ({ key, ...record }));
}
