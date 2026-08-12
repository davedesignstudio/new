/** Each game stage links to a heritage story + media from the site catalog */
export const STAGE_STORIES = {
  knead: {
    storyId: 'impasto-24-ore',
    variant: 'impasto',
    type: 'story',
    geometry: 'vitruvian',
    artVariant: 'impasto',
    artType: 'story',
  },
  stretch: {
    storyId: 'impasto-24-ore',
    variant: 'impasto',
    type: 'story',
    geometry: 'vitruvian',
    artVariant: 'impasto',
    artType: 'story',
  },
  top: {
    storyId: 'regina-margherita',
    variant: 'margherita',
    type: 'story',
    geometry: 'mandorla',
    artVariant: 'margherita',
    artType: 'food',
  },
  bake: {
    storyId: 'forno-1738',
    variant: 'forno',
    type: 'story',
    geometry: 'rose',
    scene: true,
    artVariant: 'hero-forno',
    artType: 'scene',
  },
  result: {
    storyId: 'regina-margherita',
    variant: 'margherita',
    type: 'story',
    geometry: 'mandorla',
    artVariant: 'margherita',
    artType: 'food',
  },
};

/** All heritage stories referenced in the game */
export const GAME_STORY_IDS = [
  'impasto-24-ore',
  'regina-margherita',
  'forno-1738',
  'vesuvio-vigilia',
];

export const STAGES = ['knead', 'stretch', 'top', 'bake', 'result'];

export const STAGE_LABELS = {
  knead: 'Impasta',
  stretch: 'Stendi',
  top: 'Condimenti',
  bake: 'Forno',
  result: 'Giudizio',
};

export const TOPPING_OPTIONS = [
  { id: 'basilico', label: 'Basilico', color: '#3A6B35', emoji: '🌿' },
  { id: 'bufala', label: 'Bufala', color: '#FFF8E0', emoji: '🧀' },
  { id: 'pomodoro', label: 'Pomodoro', color: '#A03020', emoji: '🍅' },
  { id: 'salame', label: 'Salame', color: '#8B2030', emoji: '🌶️' },
  { id: 'olive', label: 'Olive', color: '#3D2914', emoji: '🫒' },
  { id: 'funghi', label: 'Funghi', color: '#C49A30', emoji: '🍄' },
];

export const KNEAD_TARGET = 12;
export const STRETCH_IDEAL = 78;
export const STRETCH_TOLERANCE = 12;
export const BAKE_IDEAL = 72;
export const BAKE_TOLERANCE = 14;

export function scoreKnead(clicks) {
  const diff = Math.abs(clicks - KNEAD_TARGET);
  return Math.max(0, 100 - diff * 12);
}

export function scoreStretch(value) {
  const diff = Math.abs(value - STRETCH_IDEAL);
  if (diff <= STRETCH_TOLERANCE) return 100 - diff * 2;
  return Math.max(0, 60 - (diff - STRETCH_TOLERANCE) * 4);
}

export function scoreToppings(toppings) {
  const unique = new Set(toppings.map((t) => t.id)).size;
  const count = toppings.length;
  const variety = Math.min(unique * 18, 54);
  const amount = Math.min(count * 8, 40);
  const hasBasil = toppings.some((t) => t.id === 'basilico') ? 6 : 0;
  return Math.min(100, variety + amount + hasBasil);
}

export function scoreBake(needle) {
  const diff = Math.abs(needle - BAKE_IDEAL);
  if (diff <= BAKE_TOLERANCE) return 100 - diff * 3;
  return Math.max(0, 50 - (diff - BAKE_TOLERANCE) * 5);
}

export function totalScore(scores) {
  const weights = { knead: 0.2, stretch: 0.25, top: 0.25, bake: 0.3 };
  const sum =
    scores.knead * weights.knead +
    scores.stretch * weights.stretch +
    scores.top * weights.top +
    scores.bake * weights.bake;
  return Math.round(sum);
}

export function starRating(score) {
  if (score >= 90) return 5;
  if (score >= 75) return 4;
  if (score >= 60) return 3;
  if (score >= 40) return 2;
  return 1;
}

export function verdict(score) {
  if (score >= 90) return 'Maestro Pizzaiolo! Una vera opera d\'arte napoletana.';
  if (score >= 75) return 'Eccellente! Il forno approva con orgoglio.';
  if (score >= 60) return 'Buona pizza — con un altro tentativo sarà perfetta.';
  if (score >= 40) return 'Non male per un principiante. Continua a impastare!';
  return 'La nonna Carmela ti guarda... ma non giudica. Riprova!';
}

export function randomToppingPosition(seed) {
  const angle = (seed * 137.5 * Math.PI) / 180;
  const r = 25 + (seed % 5) * 8;
  return {
    x: 50 + Math.cos(angle) * r * 0.35,
    y: 50 + Math.sin(angle) * r * 0.35,
  };
}
