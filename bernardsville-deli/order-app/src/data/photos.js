import {
  PHOTO_RECORDS,
  PHOTO_KEY_MAP,
  STORY_ID_TO_KEY,
  getPhotoRecord,
  getStoryPhotoRecord,
  listAllPhotoRecords,
} from './imageRegistry';

export { getPhotoRecord, getStoryPhotoRecord, listAllPhotoRecords, PHOTO_RECORDS, ART_RECORDS } from './imageRegistry';

const url = (id, w = 800, h = 600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

function photoUrl(group, key, w, h) {
  return url(getPhotoRecord(group, key).id, w, h);
}

function buildTable(group, w, h) {
  const map = PHOTO_KEY_MAP[group] ?? {};
  return Object.fromEntries(
    Object.keys(map).map((key) => [key, photoUrl(group, key, w, h)])
  );
}

export const SCENE_PHOTOS = buildTable('scene', 1600, 900);
export const STORY_PHOTOS = buildTable('story', 900, 560);
export const CATEGORY_PHOTOS = buildTable('category', 1200, 400);
export const FOOD_PHOTOS = buildTable('food', 640, 480);
export const DEAL_PHOTOS = buildTable('deal', 640, 400);

const LOCAL_FOOD = {
  classic: '/assets/photos/menu/pizza-classic.jpg',
  margherita: '/assets/photos/menu/pizza-margherita.jpg',
  'meat-lovers': '/assets/photos/menu/pizza-meat-lovers.jpg',
  'white-pie': '/assets/photos/menu/pizza-white-pie.jpg',
  'chicken-parm': '/assets/photos/menu/pizza-chicken-parm.jpg',
  'bbq-buffalo': '/assets/photos/menu/pizza-bbq-buffalo.jpg',
  veggie: '/assets/photos/menu/pizza-veggie.jpg',
  philly: '/assets/photos/menu/pizza-philly.jpg',
  'bville-special': '/assets/photos/menu/pizza-bville-special.jpg',
  'thai-chili': '/assets/photos/menu/pizza-thai-chili.jpg',
  'don-pomodoro': '/assets/photos/menu/pizza-don-pomodoro.jpg',
  combination: '/assets/photos/menu/pizza-combination.jpg',
  'classic-burger': '/assets/photos/menu/burgers-classic.jpg',
  'boom-boom': '/assets/photos/menu/burgers-boom-boom.jpg',
  wings: '/assets/photos/menu/starters-wings.jpg',
  'mozz-sticks': '/assets/photos/menu/starters-mozzarella-sticks.jpg',
  'chicken-wrap': '/assets/photos/menu/wraps-chicken-caesar.jpg',
  gelato: '/assets/photos/gelato-pistachio.png',
  'house-blend': '/assets/photos/coffee.jpg',
  latte: '/assets/photos/cafe-dining.jpg',
};

const LOCAL_CATEGORY = {
  pizza: '/assets/photos/menu/pizza-margherita.jpg',
  burgers: '/assets/photos/menu/burgers-classic.jpg',
  starters: '/assets/photos/menu/starters-wings.jpg',
  wraps: '/assets/photos/menu/wraps-chicken-caesar.jpg',
  garden: '/assets/photos/menu/garden-house.jpg',
  pasta: '/assets/photos/menu/pasta-penne-vodka.jpg',
  cheesesteak: '/assets/photos/menu/cheesesteak-philly.jpg',
  sandwiches: '/assets/photos/menu/sandwiches-turkey-club.jpg',
  panini: '/assets/photos/menu/panini-chicken.jpg',
  platters: '/assets/photos/menu/platters-chicken-kabab.jpg',
  kids: '/assets/photos/menu/kids-grilled-cheese.jpg',
  shakes: '/assets/photos/menu/shakes-milkshake.jpg',
  desserts: '/assets/photos/gelato-mascarpone.png',
  drinks: '/assets/photos/coffee.jpg',
};

const LOCAL_SCENE = {
  'hero-forno': '/assets/photos/hero-restaurant.jpg',
  'footer-napoli': '/assets/photos/exterior.jpg',
  'order-delivery': '/assets/photos/grill.jpg',
  'order-carryout': '/assets/photos/pizza.jpg',
  'empty-cart': '/assets/photos/pizza.jpg',
  tribunali: '/assets/photos/kitchen-bar.jpg',
};

const LOCAL_STORY = {
  forno: '/assets/photos/steam-kitchen.jpg',
  margherita: '/assets/photos/pizza.jpg',
  tribunali: '/assets/photos/table-spread.jpg',
  impasto: '/assets/photos/kitchen-bar.jpg',
  sfogliatella: '/assets/photos/gelato-mascarpone.png',
  vesuvio: '/assets/photos/exterior.jpg',
};

const LOCAL_DEAL = {
  degustazione: '/assets/photos/pizza.jpg',
  asporto: '/assets/photos/pizza.jpg',
  consegna: '/assets/photos/grill.jpg',
};

export function getPhotoUrl(key, group = 'food') {
  if (group === 'scene') return LOCAL_SCENE[key] ?? LOCAL_SCENE['hero-forno'];
  if (group === 'story') return LOCAL_STORY[key] ?? LOCAL_STORY.forno;
  if (group === 'category') return getCategoryPhotoUrl(key);
  if (group === 'deal') return LOCAL_DEAL[key] ?? LOCAL_FOOD.classic;
  if (group === 'food') return getFoodPhotoUrl(key);
  return LOCAL_FOOD.classic;
}

export function getStoryPhotoUrl(storyId) {
  const key = STORY_ID_TO_KEY[storyId] ?? 'forno';
  return LOCAL_STORY[key] ?? LOCAL_STORY.forno;
}

export function getFoodPhotoUrl(itemId) {
  if (LOCAL_FOOD[itemId]) return LOCAL_FOOD[itemId];
  if (itemId && itemId.startsWith('desserts-')) {
    return `/assets/photos/gelato-pistachio.png`;
  }
  return `/assets/photos/menu/${itemId}.jpg`;
}

export function getCategoryPhotoUrl(categoryId) {
  return LOCAL_CATEGORY[categoryId] ?? LOCAL_CATEGORY.starters;
}

export function getPhotoMeta(group, key) {
  return getPhotoRecord(group, key);
}
