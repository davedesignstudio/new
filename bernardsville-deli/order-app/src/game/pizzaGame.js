/** Each game stage links to a heritage story + media from the site catalog */
export const STAGE_STORIES = {
  knead: {
    storyId: 'impasto-24-ore',
    variant: 'impasto',
    type: 'story',
    geometry: 'vitruvian',
    scene: false,
    artVariant: 'impasto',
    artType: 'story',
    museumVariant: 'impasto',
    heritage: 'Impasto lievitato 24 ore — Napoli',
  },
  stretch: {
    storyId: 'impasto-24-ore',
    variant: 'impasto',
    type: 'story',
    geometry: 'vitruvian',
    scene: false,
    artVariant: 'impasto',
    artType: 'story',
    museumVariant: 'impasto',
    heritage: 'Stesura a mano — cornicione napoletano',
  },
  top: {
    storyId: 'regina-margherita',
    variant: 'margherita',
    type: 'story',
    geometry: 'mandorla',
    scene: false,
    artVariant: 'margherita',
    artType: 'food',
    museumVariant: 'margherita',
    heritage: 'I tre colori della Regina — 1889',
  },
  bake: {
    storyId: 'forno-1738',
    variant: 'forno',
    type: 'story',
    geometry: 'rose',
    scene: true,
    artVariant: 'hero-forno',
    artType: 'scene',
    museumVariant: 'hero-forno',
    heritage: 'Forno a legna dal 1738 — Via dei Tribunali',
  },
  result: {
    storyId: 'regina-margherita',
    variant: 'margherita',
    type: 'story',
    geometry: 'mandorla',
    scene: false,
    artVariant: 'margherita',
    artType: 'food',
    museumVariant: 'margherita',
    heritage: 'Giudizio del cliente',
  },
};

/** All six heritage stories — every prompt wired into the game */
export const GAME_STORY_IDS = [
  'antica-pizzeria',
  'forno-1738',
  'regina-margherita',
  'via-tribunali',
  'impasto-24-ore',
  'sfogliatella-mare',
  'vesuvio-vigilia',
];

export const STAGES = ['knead', 'stretch', 'top', 'bake', 'result'];

export const STAGE_LABELS = {
  knead: 'Impasta',
  stretch: 'Stendi',
  top: 'Condimenti',
  bake: 'Forno',
  result: 'Servi',
};

export const TOPPING_OPTIONS = [
  { id: 'basilico', label: 'Basilico', color: '#3A6B35', emoji: '🌿' },
  { id: 'bufala', label: 'Bufala', color: '#FFF8E0', emoji: '🧀' },
  { id: 'pomodoro', label: 'Pomodoro', color: '#A03020', emoji: '🍅' },
  { id: 'salame', label: 'Salame', color: '#8B2030', emoji: '🌶️' },
  { id: 'olive', label: 'Olive', color: '#3D2914', emoji: '🫒' },
  { id: 'funghi', label: 'Funghi', color: '#C49A30', emoji: '🍄' },
];

/** App Store–style customers with quirky Napoli orders (Good Pizza, Great Pizza inspired) */
export const CUSTOMERS = [
  {
    id: 'nonna-carmela',
    name: 'Nonna Carmela',
    emoji: '👵',
    location: 'Via dei Tribunali',
    order: 'Una Margherita come nel 1889: salsa, mozzarella e basilico fresco.',
    storyId: 'regina-margherita',
    wants: { sauce: true, cheese: true, toppings: ['basilico'], minToppings: 2 },
    quirk: '«I tre colori della bandiera, o niente!»',
  },
  {
    id: 'marinaio-luigi',
    name: 'Luigi il Marinaio',
    emoji: '⚓',
    location: 'Porto di Napoli',
    order: 'Marinara semplice — solo salsa e aglio, niente formaggio.',
    storyId: 'vesuvio-vigilia',
    wants: { sauce: true, cheese: false, toppings: ['pomodoro'], minToppings: 1 },
    quirk: '«La marinara del Vesuvio mi tiene in piedi.»',
  },
  {
    id: 'studente-arte',
    name: 'Chiara dell\'Accademia',
    emoji: '🎨',
    location: 'Spaccanapoli',
    order: 'Bufala DOP con pomodoro e funghi — come un quadro rinascimentale.',
    storyId: 'via-tribunali',
    wants: { sauce: true, cheese: true, toppings: ['bufala', 'funghi'], minToppings: 3 },
    quirk: '«Ogni ingrediente deve essere un colore diverso.»',
  },
  {
    id: 'turista-amalfi',
    name: 'Marco della Costiera',
    emoji: '🍋',
    location: 'Costiera Amalfitana',
    order: 'Pizza con olive e salame piccante — e una sfogliatella dopo!',
    storyId: 'sfogliatella-mare',
    wants: { sauce: true, cheese: true, toppings: ['olive', 'salame'], minToppings: 2 },
    quirk: '«Il limoncello aspetta, ma prima la pizza!»',
  },
  {
    id: 'fornaio-raffaele',
    name: 'Raffaele Esposito',
    emoji: '🔥',
    location: 'Forno storico, 1738',
    order: 'Impasto perfetto, cornicione alto, cottura dorata nel forno a legna.',
    storyId: 'forno-1738',
    wants: { sauce: true, cheese: true, toppings: ['basilico', 'bufala'], minToppings: 2 },
    quirk: '«Il forno non mente mai.»',
  },
  {
    id: 'vecchio-vicolo',
    name: 'Il Cantastorie del 32',
    emoji: '📜',
    location: '159 Morristown Rd',
    order: 'Cook like this kitchen — sauce, cheese, and a pie with a name.',
    storyId: 'antica-pizzeria',
    wants: { sauce: true, cheese: true, toppings: ['basilico', 'bufala', 'pomodoro'], minToppings: 3 },
    quirk: '«Ogni pizza è un capitolo della nostra storia.»',
  },
];

export const KNEAD_TARGET = 12;
export const STRETCH_IDEAL = 78;
export const STRETCH_TOLERANCE = 12;
export const BAKE_IDEAL = 72;
export const BAKE_TOLERANCE = 14;

/** Bubsy-on-Sega: 9 lives marketing nod + Genesis arcade HUD */
export const STARTING_LIVES = 9;
export const LIVES_KEY = 'antica-pizzeria-lives';

/** Snarky 90s platformer quips — Italian spin on Bubsy attitude */
export const MASCOT_NAME = 'Gatto Bubù';

export const MASCOT_INTRO = [
  'Cosa potrebbe andare storto? Solo la pizza.',
  '9 vite. 1 forno. Zero rimpianti.',
  'SEGA vibes, Napoli rules.',
];

export const STAGE_QUIPS = {
  knead: [
    'Impasta forte! I gatti napoletani non scherzano.',
    'Più clic, più lievito. Trust me.',
    'What could possibly go wrong? L\'impasto.',
  ],
  stretch: [
    'Stendi come un platformer — non cadere nel forno!',
    'Cornicione perfetto = bonus stage unlocked.',
    'Allarga quel disco o il cliente salta via.',
  ],
  top: [
    'Condimenti! È come raccogliere anelli dorati.',
    'Segui l\'ordine o Bubù ti guarda male.',
    'Più topping, più punti. Classico arcade.',
  ],
  bake: [
    'FORNO A 485°C! Ferma l\'ago, eroe!',
    'Non bruciare nulla. Ho detto NIENTE.',
    'Timing perfetto = combo x2. Forse.',
  ],
  result: [
    'LEVEL CLEAR! ...o game over?',
    'Cliente soddisfatto = extra life!',
    'Insert coin per un\'altra pizza.',
  ],
};

export function getStageQuip(stage) {
  const lines = STAGE_QUIPS[stage] ?? STAGE_QUIPS.knead;
  return lines[Math.floor(Math.random() * lines.length)];
}

export function mascotVerdict(score) {
  if (score >= 90) return 'MAESTRO! Hai battuto il high score di Bubù!';
  if (score >= 75) return 'Ottimo! Il gatto approva con la coda alta.';
  if (score >= 60) return 'Non male. Un altro tentativo e passi il livello.';
  if (score >= 40) return 'Game over? No, solo pizza media.';
  return 'Riprovare non costa vite. Ne hai ancora 9.';
}

export function loadLives() {
  try {
    const stored = localStorage.getItem(LIVES_KEY);
    if (stored === null) return STARTING_LIVES;
    return Math.max(0, Number(stored));
  } catch {
    return STARTING_LIVES;
  }
}

export function saveLives(lives) {
  try {
    localStorage.setItem(LIVES_KEY, String(Math.max(0, lives)));
    return lives;
  } catch {
    return lives;
  }
}

export function loseLife() {
  const next = Math.max(0, loadLives() - 1);
  saveLives(next);
  return next;
}

export function gainLife() {
  const next = Math.min(STARTING_LIVES, loadLives() + 1);
  saveLives(next);
  return next;
}

export function resetLives() {
  return saveLives(STARTING_LIVES);
}

export function pickCustomer(day = 1) {
  const index = (day - 1) % CUSTOMERS.length;
  return CUSTOMERS[index];
}

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

export function scoreBake(needle, ideal = BAKE_IDEAL) {
  const diff = Math.abs(needle - ideal);
  if (diff <= BAKE_TOLERANCE) return 100 - diff * 3;
  return Math.max(0, 50 - (diff - BAKE_TOLERANCE) * 5);
}

/** How well the pizza matches the customer's order (App Store order-matching) */
export function scoreOrderMatch(customer, { hasSauce, hasCheese, toppings }) {
  if (!customer?.wants) return 50;
  const ids = toppings.map((t) => t.id);
  let score = 0;
  if (hasSauce === customer.wants.sauce) score += 25;
  else score -= 15;
  if (hasCheese === customer.wants.cheese) score += 25;
  else score -= 15;
  const wanted = customer.wants.toppings ?? [];
  const matched = wanted.filter((id) => ids.includes(id)).length;
  score += wanted.length ? (matched / wanted.length) * 35 : 0;
  if (ids.length >= (customer.wants.minToppings ?? 2)) score += 15;
  return Math.max(0, Math.min(100, Math.round(score)));
}

export function totalScore(scores, orderMatch = 0, storyBonus = 0) {
  const weights = { knead: 0.13, stretch: 0.17, top: 0.17, bake: 0.22, order: 0.18, story: 0.13 };
  const sum =
    scores.knead * weights.knead +
    scores.stretch * weights.stretch +
    scores.top * weights.top +
    scores.bake * weights.bake +
    orderMatch * weights.order +
    Math.min(100, storyBonus) * weights.story;
  return Math.round(sum);
}

export function starRating(score) {
  if (score >= 90) return 5;
  if (score >= 75) return 4;
  if (score >= 60) return 3;
  if (score >= 40) return 2;
  return 1;
}

export function customerReaction(score) {
  if (score >= 90) return { mood: '😍', label: 'Perfetta!', tipMult: 1.4 };
  if (score >= 75) return { mood: '😊', label: 'Ottima pizza!', tipMult: 1.2 };
  if (score >= 60) return { mood: '🙂', label: 'Buona.', tipMult: 1.0 };
  if (score >= 40) return { mood: '😐', label: 'Mah...', tipMult: 0.7 };
  return { mood: '😞', label: 'Non era quello che volevo.', tipMult: 0.4 };
}

export function calcTip(score, baseTip = 2.5) {
  const reaction = customerReaction(score);
  return Math.round(baseTip * reaction.tipMult * 100) / 100;
}

export function verdict(score) {
  if (score >= 90) return 'Maestro Pizzaiolo! Una vera opera d\'arte napoletana.';
  if (score >= 75) return 'Eccellente! Il forno approva con orgoglio.';
  if (score >= 60) return 'Buona pizza — con un altro tentativo sarà perfetta.';
  if (score >= 40) return 'Non male per un principiante. Continua a impastare!';
  return 'La nonna Carmela ti guarda... ma non giudica. Riprova!';
}

export const HIGH_SCORE_KEY = 'antica-pizzeria-best-score';
export const DAY_KEY = 'antica-pizzeria-game-day';
export const TIPS_KEY = 'antica-pizzeria-total-tips';

export function loadHighScore() {
  try {
    return Number(localStorage.getItem(HIGH_SCORE_KEY)) || 0;
  } catch {
    return 0;
  }
}

export function saveHighScore(score) {
  try {
    const best = Math.max(score, loadHighScore());
    localStorage.setItem(HIGH_SCORE_KEY, String(best));
    return best;
  } catch {
    return score;
  }
}

export function loadGameDay() {
  try {
    return Number(localStorage.getItem(DAY_KEY)) || 1;
  } catch {
    return 1;
  }
}

export function advanceGameDay() {
  try {
    const next = loadGameDay() + 1;
    localStorage.setItem(DAY_KEY, String(next));
    return next;
  } catch {
    return 2;
  }
}

export function loadTotalTips() {
  try {
    return Number(localStorage.getItem(TIPS_KEY)) || 0;
  } catch {
    return 0;
  }
}

export function addTips(amount) {
  try {
    const total = loadTotalTips() + amount;
    localStorage.setItem(TIPS_KEY, String(Math.round(total * 100) / 100));
    return total;
  } catch {
    return amount;
  }
}

export const GAME_RULES = [
  { stage: 'Storia', tip: 'Scegli come racconta la storia del cliente — ogni scelta conta.' },
  { stage: 'Ordine', tip: 'Leggi il biglietto — la storia guida salsa, formaggio e condimenti.' },
  { stage: 'Impasta', tip: 'Segui la storia dell\'impasto, poi impasta 12 volte.' },
  { stage: 'Stendi', tip: 'La storia suggerisce il cornicione — punta al diametro giusto.' },
  { stage: 'Condimenti', tip: 'Ingredienti evidenziati = capitoli della storia del cliente.' },
  { stage: 'Forno', tip: 'La scelta narrativa indica la zona dorata del forno.' },
  { stage: 'Servi', tip: 'Punteggio storia + ordine = mance e stelle.' },
];

export const GAME_FEATURES = [
  { icon: '🇮🇹', label: 'Grafica italiana', detail: 'Campania, Napoli, Costiera' },
  { icon: '🏛️', label: 'Arte dei musei', detail: 'Met, Cleveland, Chicago, Rijksmuseum' },
  { icon: '📖', label: '7 storie originali', detail: 'Dalla fondazione al Vesuvio' },
  { icon: '📱', label: 'Stile App Store', detail: 'Ordini, mance, giorni, clienti' },
  { icon: '🎮', label: 'Vibes Sega Genesis', detail: '9 vite, HUD arcade, Gatto Bubù' },
];

export function randomToppingPosition(seed) {
  const angle = (seed * 137.5 * Math.PI) / 180;
  const r = 25 + (seed % 5) * 8;
  return {
    x: 50 + Math.cos(angle) * r * 0.35,
    y: 50 + Math.sin(angle) * r * 0.35,
  };
}
