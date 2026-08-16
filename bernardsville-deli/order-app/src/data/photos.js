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
  classic: '/assets/photos/listing/pizza.jpg',
  margherita: '/assets/photos/listing/pizza.jpg',
  'meat-lovers': '/assets/photos/listing/pizza.jpg',
  'white-pie': '/assets/photos/listing/pizza.jpg',
  'chicken-parm': '/assets/photos/listing/pizza.jpg',
  'bbq-buffalo': '/assets/photos/listing/pizza.jpg',
  veggie: '/assets/photos/listing/pizza.jpg',
  philly: '/assets/photos/listing/quesadilla.jpg',
  'bville-special': '/assets/photos/listing/chicken-platter.jpg',
  'thai-chili': '/assets/photos/listing/pizza.jpg',
  'don-pomodoro': '/assets/photos/listing/pizza.jpg',
  combination: '/assets/photos/listing/pizza.jpg',
  'classic-burger': '/assets/photos/listing/chicken-pesto-sub.jpg',
  'boom-boom': '/assets/photos/listing/quesadilla.jpg',
  wings: '/assets/photos/listing/chicken-platter.jpg',
  'mozz-sticks': '/assets/photos/listing/falafel.jpg',
  'chicken-wrap': '/assets/photos/listing/wrap-fries.jpg',
  gelato: '/assets/photos/gelato-pistachio.png',
  'house-blend': '/assets/photos/coffee.jpg',
  latte: '/assets/photos/listing/interior.jpg',
};

const LOCAL_CATEGORY = {
  pizza: '/assets/photos/listing/pizza.jpg',
  burgers: '/assets/photos/listing/chicken-pesto-sub.jpg',
  starters: '/assets/photos/listing/falafel.jpg',
  wraps: '/assets/photos/listing/wrap-fries.jpg',
  garden: '/assets/photos/listing/chicken-kabob-salad.jpg',
  desserts: '/assets/photos/gelato-mascarpone.png',
  drinks: '/assets/photos/coffee.jpg',
};

const LOCAL_SCENE = {
  'hero-forno': '/assets/photos/listing/interior.jpg',
  'footer-napoli': '/assets/photos/listing/menu-cover.jpg',
  'order-delivery': '/assets/photos/listing/chicken-platter.jpg',
  'order-carryout': '/assets/photos/listing/pizza.jpg',
  'empty-cart': '/assets/photos/listing/pizza.jpg',
  tribunali: '/assets/photos/listing/interior-alt.jpg',
};

const LOCAL_STORY = {
  forno: '/assets/photos/listing/chicken-kabob-salad.jpg',
  margherita: '/assets/photos/listing/pizza.jpg',
  tribunali: '/assets/photos/listing/falafel-salad.jpg',
  impasto: '/assets/photos/listing/interior-alt.jpg',
  sfogliatella: '/assets/photos/gelato-mascarpone.png',
  vesuvio: '/assets/photos/listing/menu-cover.jpg',
};

const LOCAL_DEAL = {
  degustazione: '/assets/photos/listing/pizza.jpg',
  asporto: '/assets/photos/listing/wrap-fries.jpg',
  consegna: '/assets/photos/listing/chicken-platter.jpg',
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
  return LOCAL_FOOD[itemId] ?? LOCAL_FOOD['classic-burger'];
}

export function getCategoryPhotoUrl(categoryId) {
  return LOCAL_CATEGORY[categoryId] ?? LOCAL_CATEGORY.starters;
}

export function getPhotoMeta(group, key) {
  return getPhotoRecord(group, key);
}
