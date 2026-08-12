import { PALETTE, STROKE } from './tokens';
import { wrapWithGeometry, sceneGeometry } from './geometricFrames';

const P = PALETTE;

function pizzaBase(children, extra = '') {
  return `
    <circle cx="100" cy="100" r="88" fill="url(#crustGrad)" stroke="${P.umber}" stroke-width="${STROKE}"/>
    <circle cx="100" cy="100" r="78" fill="url(#sauceGrad)" opacity="0.95"/>
    <circle cx="100" cy="100" r="70" fill="url(#cheeseGrad)" opacity="0.9"/>
    ${extra}
  `;
}

const defs = `
  <defs>
    <radialGradient id="crustGrad" cx="40%" cy="35%">
      <stop offset="0%" stop-color="${P.ochreLight}"/>
      <stop offset="100%" stop-color="${P.ochre}"/>
    </radialGradient>
    <radialGradient id="sauceGrad" cx="45%" cy="40%">
      <stop offset="0%" stop-color="${P.terracottaLight}"/>
      <stop offset="100%" stop-color="${P.pomodoroDeep}"/>
    </radialGradient>
    <radialGradient id="cheeseGrad" cx="50%" cy="45%">
      <stop offset="0%" stop-color="${P.mozzarella}"/>
      <stop offset="100%" stop-color="${P.ochreLight}"/>
    </radialGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${P.goldLight}"/>
      <stop offset="100%" stop-color="${P.gold}"/>
    </linearGradient>
    <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#7BA4C4"/>
      <stop offset="100%" stop-color="${P.mediterranean}"/>
    </linearGradient>
    <linearGradient id="vesuvioGrad" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="${P.charcoal}"/>
      <stop offset="60%" stop-color="${P.umber}"/>
      <stop offset="100%" stop-color="${P.cream}"/>
    </linearGradient>
  </defs>
`;

const toppings = {
  basilico: `<ellipse cx="100" cy="72" rx="8" ry="5" fill="${P.basil}" stroke="${P.umber}" stroke-width="1"/><ellipse cx="88" cy="78" rx="6" ry="4" fill="${P.basil}" stroke="${P.umber}" stroke-width="1"/>`,
  bufala: `<circle cx="85" cy="90" r="12" fill="${P.cream}" stroke="${P.umber}" stroke-width="1.5"/><circle cx="115" cy="95" r="10" fill="${P.cream}" stroke="${P.umber}" stroke-width="1.5"/>`,
  salame: `<circle cx="78" cy="88" r="7" fill="${P.pomodoro}" stroke="${P.umber}" stroke-width="1"/><circle cx="95" cy="105" r="7" fill="${P.pomodoro}" stroke="${P.umber}" stroke-width="1"/><circle cx="118" cy="85" r="7" fill="${P.pomodoro}" stroke="${P.umber}" stroke-width="1"/>`,
  prosciutto: `<ellipse cx="90" cy="95" rx="14" ry="7" fill="${P.terracottaLight}" stroke="${P.umber}" stroke-width="1" transform="rotate(-15 90 95)"/>`,
  funghi: `<ellipse cx="82" cy="102" rx="6" ry="8" fill="${P.ochreLight}" stroke="${P.umber}" stroke-width="1"/><ellipse cx="108" cy="88" rx="6" ry="8" fill="${P.ochreLight}" stroke="${P.umber}" stroke-width="1"/>`,
  olive: `<circle cx="75" cy="110" r="5" fill="${P.charcoal}" stroke="${P.umber}" stroke-width="1"/><circle cx="120" cy="108" r="5" fill="${P.charcoal}" stroke="${P.umber}" stroke-width="1"/>`,
  carciofi: `<circle cx="100" cy="115" r="8" fill="${P.olive}" stroke="${P.umber}" stroke-width="1" opacity="0.85"/>`,
  acciughe: `<ellipse cx="88" cy="78" rx="10" ry="3" fill="${P.mediterranean}" stroke="${P.umber}" stroke-width="1" transform="rotate(25 88 78)"/><ellipse cx="112" cy="82" rx="10" ry="3" fill="${P.mediterranean}" stroke="${P.umber}" stroke-width="1" transform="rotate(-20 112 82)"/>`,
};

export const PIZZA_ART = {
  margherita: pizzaBase(toppings.basilico + `<circle cx="92" cy="92" r="6" fill="${P.mozzarella}" stroke="${P.umber}" stroke-width="1"/><circle cx="108" cy="98" r="6" fill="${P.mozzarella}" stroke="${P.umber}" stroke-width="1"/>`),
  marinara: `<circle cx="100" cy="100" r="88" fill="url(#crustGrad)" stroke="${P.umber}" stroke-width="${STROKE}"/><circle cx="100" cy="100" r="78" fill="url(#sauceGrad)"/><ellipse cx="100" cy="70" rx="6" ry="4" fill="${P.basil}" stroke="${P.umber}" stroke-width="1"/>`,
  bufala: pizzaBase(toppings.bufala + toppings.basilico),
  diavola: pizzaBase(toppings.salame + `<circle cx="100" cy="78" r="4" fill="${P.pomodoro}" stroke="${P.umber}" stroke-width="1"/>`),
  'quattro-stagioni': pizzaBase(toppings.funghi + toppings.olive + toppings.prosciutto + toppings.carciofi),
  napoletana: pizzaBase(toppings.acciughe + toppings.olive + `<circle cx="100" cy="70" r="4" fill="${P.ochre}" stroke="${P.umber}" stroke-width="1"/>`),
  capricciosa: pizzaBase(toppings.prosciutto + toppings.funghi + toppings.olive + toppings.carciofi),
};

export function dishArt(id) {
  const dishes = {
    bruschetta: `<rect x="35" y="95" width="130" height="18" rx="4" fill="${P.ochreLight}" stroke="${P.umber}" stroke-width="${STROKE}"/><ellipse cx="70" cy="88" rx="14" ry="10" fill="${P.pomodoro}" stroke="${P.umber}" stroke-width="1.5"/><ellipse cx="100" cy="85" rx="14" ry="10" fill="${P.pomodoro}" stroke="${P.umber}" stroke-width="1.5"/><ellipse cx="130" cy="88" rx="14" ry="10" fill="${P.pomodoro}" stroke="${P.umber}" stroke-width="1.5"/>${toppings.basilico}`,
    caprese: `<circle cx="75" cy="95" r="22" fill="${P.cream}" stroke="${P.umber}" stroke-width="${STROKE}"/><circle cx="125" cy="95" r="20" fill="${P.pomodoro}" stroke="${P.umber}" stroke-width="${STROKE}"/><ellipse cx="100" cy="75" rx="8" ry="5" fill="${P.basil}" stroke="${P.umber}" stroke-width="1"/>`,
    frittatina: `<ellipse cx="100" cy="105" rx="35" ry="28" fill="${P.ochreLight}" stroke="${P.umber}" stroke-width="${STROKE}"/><path d="M75 95 Q100 70 125 95" fill="${P.terracotta}" stroke="${P.umber}" stroke-width="1.5"/>`,
    polpette: `<circle cx="75" cy="100" r="18" fill="${P.terracotta}" stroke="${P.umber}" stroke-width="${STROKE}"/><circle cx="125" cy="100" r="18" fill="${P.terracotta}" stroke="${P.umber}" stroke-width="${STROKE}"/><ellipse cx="100" cy="130" rx="55" ry="12" fill="${P.pomodoroDeep}" opacity="0.6" stroke="${P.umber}" stroke-width="1"/>`,
    melanzane: `<rect x="50" y="70" width="100" height="60" rx="6" fill="${P.charcoal}" stroke="${P.umber}" stroke-width="${STROKE}" opacity="0.85"/><rect x="55" y="75" width="90" height="12" fill="${P.pomodoro}" opacity="0.8"/><rect x="55" y="92" width="90" height="12" fill="${P.cream}" opacity="0.9"/><rect x="55" y="109" width="90" height="12" fill="${P.ochre}" opacity="0.8"/>`,
    patate: `<rect x="55" y="85" width="28" height="28" rx="4" fill="${P.ochreLight}" stroke="${P.umber}" stroke-width="1.5"/><rect x="86" y="85" width="28" height="28" rx="4" fill="${P.ochre}" stroke="${P.umber}" stroke-width="1.5"/><rect x="117" y="85" width="28" height="28" rx="4" fill="${P.ochreLight}" stroke="${P.umber}" stroke-width="1.5"/><path d="M70 80 Q74 70 78 80" stroke="${P.olive}" stroke-width="2" fill="none"/>`,
    'insalata-mista': `<ellipse cx="100" cy="105" rx="50" ry="22" fill="${P.cream}" stroke="${P.umber}" stroke-width="${STROKE}"/><ellipse cx="80" cy="95" rx="12" ry="8" fill="${P.basil}" stroke="${P.umber}" stroke-width="1"/><ellipse cx="110" cy="90" rx="10" ry="10" fill="${P.pomodoro}" stroke="${P.umber}" stroke-width="1"/><ellipse cx="125" cy="100" rx="8" ry="6" fill="${P.ochreLight}" stroke="${P.umber}" stroke-width="1"/>`,
    sfogliatella: `<path d="M60 120 Q100 50 140 120 Q100 135 60 120Z" fill="${P.ochreLight}" stroke="${P.umber}" stroke-width="${STROKE}"/><path d="M70 115 Q100 65 130 115" fill="none" stroke="${P.gold}" stroke-width="1.5"/><path d="M75 110 Q100 75 125 110" fill="none" stroke="${P.gold}" stroke-width="1"/>`,
    'babà': `<ellipse cx="100" cy="95" rx="30" ry="38" fill="${P.terracottaLight}" stroke="${P.umber}" stroke-width="${STROKE}"/><ellipse cx="100" cy="70" rx="18" ry="12" fill="${P.ochreLight}" stroke="${P.umber}" stroke-width="1.5"/><path d="M85 110 Q100 130 115 110" fill="${P.wine}" opacity="0.5" stroke="none"/>`,
    limoncello: `<rect x="88" y="60" width="24" height="70" rx="4" fill="${P.goldLight}" stroke="${P.umber}" stroke-width="${STROKE}"/><ellipse cx="100" cy="58" rx="12" ry="6" fill="${P.gold}" stroke="${P.umber}" stroke-width="1"/><circle cx="100" cy="90" r="10" fill="${P.gold}" opacity="0.6"/>`,
    acqua: `<rect x="82" y="55" width="36" height="80" rx="6" fill="url(#skyGrad)" stroke="${P.umber}" stroke-width="${STROKE}"/><path d="M90 70 H110 M90 85 H110" stroke="${P.cream}" stroke-width="2" opacity="0.7"/>`,
    'vino-rosso': `<path d="M88 55 L88 95 Q100 110 112 95 L112 55Z" fill="${P.wine}" stroke="${P.umber}" stroke-width="${STROKE}"/><ellipse cx="100" cy="55" rx="12" ry="5" fill="${P.charcoal}" stroke="${P.umber}" stroke-width="1"/><path d="M95 75 Q100 85 105 75" fill="${P.goldLight}" opacity="0.5"/>`,
  };
  return dishes[id] ?? PIZZA_ART.margherita;
}

export const CATEGORY_ART = {
  pizza: PIZZA_ART.margherita,
  antipasti: dishArt('bruschetta'),
  secondi: dishArt('melanzane'),
  contorni: dishArt('insalata-mista'),
  dolci: dishArt('sfogliatella'),
  bevande: dishArt('vino-rosso'),
};

export const SCENE_ART = {
  'hero-forno': `
    <rect width="400" height="200" fill="${P.umberDark}"/>
    <path d="M0 28 Q200 -8 400 28" fill="none" stroke="${P.gold}" stroke-width="1.5" opacity="0.55"/>
    <path d="M0 38 Q200 8 400 38" fill="none" stroke="${P.gold}" stroke-width="0.8" opacity="0.35"/>
    <rect x="0" y="38" width="400" height="162" fill="${P.terracotta}" opacity="0.22"/>
    <rect x="48" y="48" width="20" height="152" fill="${P.cream}" opacity="0.18" stroke="${P.gold}" stroke-width="1"/>
    <rect x="332" y="48" width="20" height="152" fill="${P.cream}" opacity="0.18" stroke="${P.gold}" stroke-width="1"/>
    <path d="M118 200 L118 68 Q200 22 282 68 L282 200" fill="${P.charcoal}" stroke="${P.gold}" stroke-width="2"/>
    <ellipse cx="200" cy="118" rx="52" ry="40" fill="${P.pomodoroDeep}" stroke="${P.gold}" stroke-width="2"/>
    <ellipse cx="200" cy="112" rx="36" ry="26" fill="${P.pomodoro}" opacity="0.88"/>
    <path d="M182 108 Q188 82 194 108 Q200 72 206 108 Q212 84 218 108" fill="${P.goldLight}" opacity="0.75"/>
    <circle cx="200" cy="108" r="6" fill="${P.goldLight}" opacity="0.95"/>
    <ellipse cx="88" cy="52" rx="16" ry="5" fill="${P.gold}" opacity="0.45"/>
    <path d="M88 52 L88 62" stroke="${P.gold}" stroke-width="1.5" opacity="0.5"/>
    <path d="M0 178 H400 M0 188 H400 M50 178 V200 M130 178 V200 M210 178 V200 M290 178 V200 M370 178 V200" stroke="${P.umber}" stroke-width="0.6" opacity="0.35"/>
    <path d="M60 200 L60 95 L78 86 L78 200" fill="${P.cream}" stroke="${P.umber}" stroke-width="1.2" opacity="0.28"/>
    <path d="M322 200 L322 95 L340 86 L340 200" fill="${P.cream}" stroke="${P.umber}" stroke-width="1.2" opacity="0.28"/>
  `,
  'footer-napoli': `
    <rect width="400" height="120" fill="url(#skyGrad)"/>
    <path d="M0 82 Q120 72 200 78 Q280 84 400 76 L400 120 L0 120Z" fill="${P.mediterranean}" opacity="0.85"/>
    <path d="M268 120 L308 38 L348 120Z" fill="url(#vesuvioGrad)" stroke="${P.umber}" stroke-width="1.5"/>
    <ellipse cx="308" cy="42" rx="10" ry="5" fill="${P.cream}" opacity="0.65"/>
    <path d="M302 44 Q308 28 314 44" fill="${P.pomodoro}" opacity="0.4"/>
    <path d="M0 92 L36 78 L72 90 L108 74 L144 86 L180 68 L216 82 L252 70 L288 84 L324 72 L360 82 L400 88 L400 120 L0 120Z" fill="${P.terracotta}" opacity="0.88" stroke="${P.umber}" stroke-width="0.5"/>
    <ellipse cx="96" cy="76" rx="20" ry="13" fill="${P.cream}" opacity="0.32" stroke="${P.gold}" stroke-width="1"/>
    <rect x="92" y="76" width="8" height="22" fill="${P.cream}" opacity="0.28"/>
    <path d="M150 120 L150 52 L170 42 L190 52 L190 120" fill="${P.cream}" opacity="0.22" stroke="${P.gold}" stroke-width="1"/>
    <path d="M210 120 L210 58 L230 48 L250 58 L250 120" fill="${P.cream}" opacity="0.22" stroke="${P.gold}" stroke-width="1"/>
    <circle cx="48" cy="32" r="14" fill="${P.goldLight}" opacity="0.45"/>
  `,
  tribunali: `
    <rect width="400" height="200" fill="${P.ochreLight}" opacity="0.25"/>
    <path d="M110 200 L155 35 L245 35 L290 200Z" fill="${P.terracotta}" stroke="${P.umber}" stroke-width="1.5" opacity="0.75"/>
    <path d="M130 200 L165 55 L235 55 L270 200Z" fill="${P.ochre}" opacity="0.35"/>
    <line x1="135" y1="68" x2="265" y2="68" stroke="${P.cream}" stroke-width="1.2" opacity="0.55"/>
    <path d="M160 68 Q168 88 176 68 M200 68 Q208 92 216 68 M230 68 Q238 86 246 68" fill="none" stroke="${P.cream}" stroke-width="1" opacity="0.45"/>
    <rect x="172" y="88" width="22" height="28" fill="${P.mediterranean}" opacity="0.42" stroke="${P.gold}" stroke-width="1"/>
    <rect x="206" y="94" width="20" height="24" fill="${P.mediterranean}" opacity="0.42" stroke="${P.gold}" stroke-width="1"/>
    <rect x="188" y="130" width="24" height="32" fill="${P.umberDark}" opacity="0.5" stroke="${P.gold}" stroke-width="0.8"/>
    <ellipse cx="200" cy="172" rx="28" ry="9" fill="${P.charcoal}" opacity="0.55"/>
    <circle cx="218" cy="52" r="20" fill="${P.goldLight}" opacity="0.5"/>
    <path d="M60 200 L60 120 L75 115 L75 200" fill="${P.cream}" opacity="0.2" stroke="${P.umber}" stroke-width="1"/>
    <path d="M325 200 L325 115 L340 110 L340 200" fill="${P.cream}" opacity="0.2" stroke="${P.umber}" stroke-width="1"/>
  `,
  'order-delivery': `<rect x="50" y="70" width="100" height="55" rx="8" fill="${P.terracotta}" stroke="${P.umber}" stroke-width="${STROKE}"/><circle cx="70" cy="130" r="12" fill="${P.charcoal}" stroke="${P.umber}" stroke-width="1.5"/><circle cx="130" cy="130" r="12" fill="${P.charcoal}" stroke="${P.umber}" stroke-width="1.5"/><ellipse cx="100" cy="85" rx="20" ry="12" fill="${P.cream}" stroke="${P.umber}" stroke-width="1"/>`,
  'order-carryout': `<path d="M100 50 L60 95 H140Z" fill="${P.terracotta}" stroke="${P.umber}" stroke-width="${STROKE}"/><rect x="75" y="95" width="50" height="45" fill="${P.ochreLight}" stroke="${P.umber}" stroke-width="${STROKE}"/><rect x="85" y="105" width="12" height="18" fill="${P.mediterranean}" opacity="0.5"/><rect x="103" y="105" width="12" height="18" fill="${P.mediterranean}" opacity="0.5"/>`,
  'empty-cart': PIZZA_ART.margherita,
};

export const STORY_ART = {
  forno: SCENE_ART['hero-forno'],
  margherita: PIZZA_ART.margherita,
  tribunali: SCENE_ART.tribunali,
  impasto: `<ellipse cx="100" cy="110" rx="60" ry="25" fill="${P.cream}" stroke="${P.umber}" stroke-width="${STROKE}"/><ellipse cx="100" cy="95" rx="50" ry="18" fill="${P.ochreLight}" stroke="${P.umber}" stroke-width="1.5" opacity="0.8"/><circle cx="70" cy="88" r="6" fill="${P.cream}" opacity="0.7"/><circle cx="100" cy="82" r="8" fill="${P.cream}" opacity="0.7"/><circle cx="130" cy="88" r="5" fill="${P.cream}" opacity="0.7"/>`,
  sfogliatella: dishArt('sfogliatella'),
  vesuvio: `<path d="M40 150 L100 40 L160 150Z" fill="url(#vesuvioGrad)" stroke="${P.umber}" stroke-width="${STROKE}"/><ellipse cx="100" cy="45" rx="15" ry="8" fill="${P.cream}" opacity="0.7"/><path d="M90 50 Q100 30 110 50" fill="${P.pomodoro}" opacity="0.5"/><path d="M0 150 Q50 130 100 140 Q150 125 200 150" fill="${P.mediterranean}" opacity="0.35"/>`,
};

export const DEAL_ART = {
  degustazione: `${PIZZA_ART.margherita}<g transform="translate(0,-10)">${dishArt('bruschetta')}</g>`,
  asporto: PIZZA_ART['quattro-stagioni'],
  consegna: SCENE_ART['order-delivery'],
};

function subject(content, scale = 0.58) {
  const s = scale;
  const t = 100 - 100 * s;
  return `<g transform="translate(${t} ${t}) scale(${s})">${content}</g>`;
}

export function renderArt(variant, viewBox = '0 0 200 200') {
  const raw =
    PIZZA_ART[variant] ??
    dishArt(variant) ??
    CATEGORY_ART[variant] ??
    SCENE_ART[variant] ??
    STORY_ART[variant] ??
    DEAL_ART[variant] ??
    PIZZA_ART.margherita;

  const isSmallIcon = ['order-delivery', 'order-carryout'].includes(variant);
  const geoStyle = isSmallIcon ? 'minimal' : 'frame';
  const scale = isSmallIcon ? 0.72 : 0.58;

  const wrapped = wrapWithGeometry(subject(raw, scale), viewBox, geoStyle);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" role="img" aria-hidden="true">${defs}${wrapped}</svg>`;
}

export function renderScene(variant) {
  const viewBoxes = {
    'hero-forno': '0 0 400 200',
    'footer-napoli': '0 0 400 120',
    tribunali: '0 0 400 200',
  };
  const vb = viewBoxes[variant] ?? '0 0 200 200';
  const [,, w, h] = vb.split(' ').map(Number);
  const sceneContent = SCENE_ART[variant] ?? STORY_ART[variant] ?? '';
  const geometry = sceneGeometry(w, h);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" role="img" aria-hidden="true">${defs}${geometry}<g opacity="0.92">${sceneContent}</g></svg>`;
}
