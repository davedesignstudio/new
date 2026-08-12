/**
 * Complete image record — every photo and art variant used across the site.
 * Each entry: unsplash id, subject (Italian), location, region, usage, art overlay key.
 */

export const PHOTO_RECORDS = {
  'pizzeria-arch': {
    id: 'photo-1759749222405-597aef63b3e1',
    subject: 'Pizzeria napoletana illuminata di notte',
    location: 'Napoli, Italia',
    region: 'Campania',
    usedIn: ['scene.hero-forno', 'story.forno'],
    artVariant: 'hero-forno',
  },
  'napoli-vesuvio': {
    id: 'photo-1768322264436-9b766658d037',
    subject: 'Napoli con il Vesuvio sullo sfondo',
    location: 'Napoli, Italia',
    region: 'Campania',
    usedIn: ['scene.footer-napoli', 'story.vesuvio'],
    artVariant: 'footer-napoli',
  },
  'napoli-vicolo': {
    id: 'photo-1763906667343-dcdb19b1ee4e',
    subject: 'Vicolo napoletano soleggiato',
    location: 'Via dei Tribunali, Napoli',
    region: 'Campania',
    usedIn: ['story.tribunali', 'scene.tribunali'],
    artVariant: 'tribunali',
  },
  'impasto-mani': {
    id: 'photo-1696919469971-f8b7d2ce15f6',
    subject: 'Mani che impastano la pizza',
    location: 'Napoli, Italia',
    region: 'Campania',
    usedIn: ['story.impasto', 'food.napoletana'],
    artVariant: 'impasto',
  },
  'pizza-margherita': {
    id: 'photo-1675381099043-7c8bca49f343',
    subject: 'Pizza napoletana in tavola',
    location: 'Napoli, Italia',
    region: 'Campania',
    usedIn: ['story.margherita', 'food.margherita', 'category.pizza', 'deal.degustazione'],
    artVariant: 'margherita',
  },
  'pizza-forno': {
    id: 'photo-1765652584214-ab9167622c8d',
    subject: 'Pizza napoletana nel forno a legna',
    location: 'Napoli, Italia',
    region: 'Campania',
    usedIn: ['food.marinara'],
    artVariant: 'marinara',
  },
  'pizza-bufala': {
    id: 'photo-1670275559226-cacd73cdfc32',
    subject: 'Bancone pizzeria napoletana con pizze fresche',
    location: 'Napoli, Italia',
    region: 'Campania',
    usedIn: ['food.bufala'],
    artVariant: 'bufala',
  },
  'pizza-diavola': {
    id: 'photo-1628840042765-356cda07504e',
    subject: 'Pizza piccante con salame',
    location: 'Italia',
    region: 'Campania',
    usedIn: ['food.diavola'],
    artVariant: 'diavola',
  },
  'pizza-quattro': {
    id: 'photo-1565299624946-b28f40a0ae38',
    subject: 'Pizza con condimenti misti',
    location: 'Italia',
    region: 'Campania',
    usedIn: ['food.quattro-stagioni', 'deal.asporto'],
    artVariant: 'quattro-stagioni',
  },
  'pizza-capricciosa': {
    id: 'photo-1513104890138-7c749659a591',
    subject: 'Pizza capricciosa',
    location: 'Italia',
    region: 'Campania',
    usedIn: ['food.capricciosa', 'food.napoletana'],
    artVariant: 'capricciosa',
  },
  'antipasti-tavola': {
    id: 'photo-1555939594-58d7cb561ad1',
    subject: 'Tavola imbandita in trattoria italiana',
    location: 'Italia',
    region: 'Campania',
    usedIn: ['category.antipasti', 'food.bruschetta'],
    artVariant: 'bruschetta',
  },
  'colazione-tavola': {
    id: 'photo-1540189549336-e6e99c3679fe',
    subject: 'Piatti colorati — cucina mediterranea',
    location: 'Italia',
    region: 'Campania',
    usedIn: [],
    artVariant: 'bruschetta',
  },
  'insalata-caprese': {
    id: 'photo-1623428187969-5da2dcea5ebf',
    subject: 'Insalata Caprese con mozzarella',
    location: 'Campania, Italia',
    region: 'Campania',
    usedIn: ['food.caprese'],
    artVariant: 'caprese',
  },
  'frittatina': {
    id: 'photo-1563379926898-05f4575a45d8',
    subject: 'Frittatina di pasta napoletana',
    location: 'Napoli, Italia',
    region: 'Campania',
    usedIn: ['food.frittatina'],
    artVariant: 'frittatina',
  },
  'polpette': {
    id: 'photo-1600891964092-4316c288032e',
    subject: 'Polpette al sugo',
    location: 'Italia',
    region: 'Campania',
    usedIn: ['food.polpette'],
    artVariant: 'polpette',
  },
  'parmigiana': {
    id: 'photo-1551183053-bf91a1d81141',
    subject: 'Parmigiana di melanzane',
    location: 'Campania, Italia',
    region: 'Campania',
    usedIn: ['food.melanzane', 'category.secondi'],
    artVariant: 'melanzane',
  },
  'patate-forno': {
    id: 'photo-1573080496219-bb080dd4f877',
    subject: 'Patate al forno con rosmarino',
    location: 'Italia',
    region: 'Campania',
    usedIn: ['food.patate'],
    artVariant: 'patate',
  },
  'insalata-mista': {
    id: 'photo-1512621776951-a57141f2eefd',
    subject: 'Insalata mista fresca',
    location: 'Italia',
    region: 'Campania',
    usedIn: ['food.insalata-mista', 'category.contorni'],
    artVariant: 'insalata-mista',
  },
  'costiera-amalfi': {
    id: 'photo-1534445867742-43195f401b6c',
    subject: 'Costiera Amalfitana con mare azzurro',
    location: 'Costiera Amalfitana, Italia',
    region: 'Campania',
    usedIn: ['story.sfogliatella'],
    artVariant: 'sfogliatella',
  },
  'sfogliatella': {
    id: 'photo-1555507036-ab1f4038808a',
    subject: 'Sfogliatella riccia napoletana',
    location: 'Napoli, Italia',
    region: 'Campania',
    usedIn: ['food.sfogliatella', 'category.dolci'],
    artVariant: 'sfogliatella',
  },
  'baba-rum': {
    id: 'photo-1621303837174-89787a7d4729',
    subject: 'Babà al rum',
    location: 'Napoli, Italia',
    region: 'Campania',
    usedIn: ['food.babà'],
    artVariant: 'babà',
  },
  'limoncello': {
    id: 'photo-1509440159596-0249088772ff',
    subject: 'Pane e agrumi — tradizione sorrentina',
    location: 'Sorrento, Italia',
    region: 'Campania',
    usedIn: ['food.limoncello'],
    artVariant: 'limoncello',
  },
  'acqua-minerale': {
    id: 'photo-1548839140-29a749e1cf4d',
    subject: 'Acqua minerale',
    location: 'Italia',
    region: 'Campania',
    usedIn: ['food.acqua'],
    artVariant: 'acqua',
  },
  'vino-rosso': {
    id: 'photo-1510812431401-41d2bd2722f3',
    subject: 'Calice di vino rosso',
    location: 'Campania, Italia',
    region: 'Campania',
    usedIn: ['food.vino-rosso', 'category.bevande'],
    artVariant: 'vino-rosso',
  },
  'consegna': {
    id: 'photo-1566576912321-d58ddd7a6088',
    subject: 'Consegna a domicilio',
    location: 'Napoli, Italia',
    region: 'Campania',
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
    tribunali: 'napoli-vicolo',
  },
  story: {
    forno: 'pizzeria-arch',
    margherita: 'pizza-margherita',
    tribunali: 'napoli-vicolo',
    impasto: 'impasto-mani',
    sfogliatella: 'costiera-amalfi',
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
  scenes: ['hero-forno', 'footer-napoli', 'tribunali', 'order-delivery', 'order-carryout', 'empty-cart'],
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
