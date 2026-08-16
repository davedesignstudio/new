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

export function getPhotoUrl(key, group = 'food') {
  const tables = {
    scene: SCENE_PHOTOS,
    story: STORY_PHOTOS,
    category: CATEGORY_PHOTOS,
    food: FOOD_PHOTOS,
    deal: DEAL_PHOTOS,
  };
  const table = tables[group] ?? FOOD_PHOTOS;
  return table[key] ?? FOOD_PHOTOS.margherita ?? SCENE_PHOTOS['hero-forno'];
}

export function getStoryPhotoUrl(storyId) {
  const key = STORY_ID_TO_KEY[storyId] ?? 'forno';
  return STORY_PHOTOS[key] ?? STORY_PHOTOS.forno;
}

export function getFoodPhotoUrl(itemId) {
  const local = {
    classic: '/assets/photos/pizza.jpg',
    margherita: '/assets/photos/pizza.jpg',
    'meat-lovers': '/assets/photos/pizza.jpg',
    'white-pie': '/assets/photos/pizza.jpg',
    'chicken-parm': '/assets/photos/pizza.jpg',
    'bbq-buffalo': '/assets/photos/pizza.jpg',
    veggie: '/assets/photos/pizza.jpg',
    philly: '/assets/photos/pizza.jpg',
    'bville-special': '/assets/photos/pizza.jpg',
    'thai-chili': '/assets/photos/pizza.jpg',
    'don-pomodoro': '/assets/photos/pizza.jpg',
    combination: '/assets/photos/pizza.jpg',
    'classic-burger': '/assets/photos/burger.jpg',
    'boom-boom': '/assets/photos/burger.jpg',
    wings: '/assets/photos/plated-grill.jpg',
    'mozz-sticks': '/assets/photos/grill.jpg',
    'chicken-wrap': '/assets/photos/wraps.jpg',
    gelato: '/assets/photos/gelato-pistachio.png',
    'house-blend': '/assets/photos/coffee.jpg',
    latte: '/assets/photos/cafe-dining.jpg',
  };
  return local[itemId] ?? FOOD_PHOTOS[itemId] ?? local['classic-burger'];
}

export function getCategoryPhotoUrl(categoryId) {
  const local = {
    pizza: '/assets/photos/pizza.jpg',
    burgers: '/assets/photos/burger.jpg',
    starters: '/assets/photos/plated-grill.jpg',
    wraps: '/assets/photos/wraps.jpg',
    desserts: '/assets/photos/gelato-mascarpone.png',
    drinks: '/assets/photos/coffee.jpg',
  };
  return local[categoryId] ?? CATEGORY_PHOTOS[categoryId] ?? local.starters;
}

export function getPhotoMeta(group, key) {
  return getPhotoRecord(group, key);
}
