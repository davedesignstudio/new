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
  return FOOD_PHOTOS[itemId] ?? FOOD_PHOTOS.margherita;
}

export function getCategoryPhotoUrl(categoryId) {
  return CATEGORY_PHOTOS[categoryId] ?? CATEGORY_PHOTOS.pizza;
}

export function getPhotoMeta(group, key) {
  return getPhotoRecord(group, key);
}
