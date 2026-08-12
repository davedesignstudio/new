import { foodVariant, categoryVariant, storyVariant } from '../art/tokens';

export { DEALS } from './deals';

export function getItemVariant(item) {
  return foodVariant(item.id);
}

export function getCategoryVariant(categoryId) {
  return categoryVariant(categoryId);
}

export function getDealVariant(dealId) {
  return dealId;
}

export function getItemVariantById(itemId) {
  return foodVariant(itemId);
}

export function getStoryVariant(storyId) {
  return storyVariant(storyId);
}

export const SCENE_VARIANTS = {
  hero: 'hero-forno',
  footer: 'footer-napoli',
  emptyCart: 'empty-cart',
  delivery: 'order-delivery',
  carryout: 'order-carryout',
};
