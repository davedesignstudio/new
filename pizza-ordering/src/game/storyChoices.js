import { getStoryById } from '../data/stories';

/** Story-driven choice per stage — tied to heritage tales */
export const STORY_STAGE_CHOICES = {
  'antica-pizzeria': {
    knead: [
      {
        id: 'promise',
        label: 'La promessa del 1738',
        hint: 'Tre secoli di fuoco — non tradire il tempo.',
        correct: true,
        bonus: 12,
      },
      {
        id: 'rush',
        label: 'Chiudere presto stasera',
        hint: 'La città può aspettare, il forno no.',
        correct: false,
        bonus: 0,
      },
    ],
    stretch: [
      {
        id: 'tribunali',
        label: 'Stendi come sul pavimento storico',
        hint: 'Dal centro al bordo, con rispetto.',
        correct: true,
        bonus: 10,
        stretchHint: 78,
      },
      {
        id: 'thin',
        label: 'Pizza sottile da asporto',
        hint: 'Veloce, ma non è la nostra strada.',
        correct: false,
        bonus: 0,
        stretchHint: 55,
      },
    ],
    top: [
      {
        id: 'tricolor',
        label: 'I colori di Napoli',
        hint: 'Pomodoro, mozzarella, basilico — equilibrio.',
        correct: true,
        bonus: 12,
        wantsSauce: true,
        wantsCheese: true,
        highlightToppings: ['pomodoro', 'basilico', 'bufala'],
      },
      {
        id: 'plain',
        label: 'Solo il necessario',
        hint: 'Pochi ingredienti, ma non vuota.',
        correct: false,
        bonus: 0,
        wantsSauce: true,
        wantsCheese: false,
        highlightToppings: ['pomodoro'],
      },
    ],
    bake: [
      {
        id: 'first-flame',
        label: 'La prima fiamma',
        hint: 'Cottura dorata — senti la cenere antica.',
        correct: true,
        bonus: 12,
        bakeHint: 72,
      },
      {
        id: 'blaze',
        label: 'Fuoco al massimo',
        hint: 'Troppo aggressivo per un forno antico.',
        correct: false,
        bonus: 0,
        bakeHint: 90,
      },
    ],
  },
  'forno-1738': {
    knead: [
      {
        id: 'teresa-salt',
        label: 'Sale di Trapani di Teresa',
        hint: 'Acqua di sorgente e lievito madre.',
        correct: true,
        bonus: 12,
      },
      {
        id: 'dry',
        label: 'Impasto secco e veloce',
        hint: 'Raffaele non approverebbe.',
        correct: false,
        bonus: 0,
      },
    ],
    stretch: [
      {
        id: 'bell-crack',
        label: 'Il crack della campana',
        hint: 'Cornicione alto — suono breve in forno.',
        correct: true,
        bonus: 14,
        stretchHint: 78,
      },
      {
        id: 'flat',
        label: 'Disco uniforme',
        hint: 'Senza corona napoletana.',
        correct: false,
        bonus: 0,
        stretchHint: 50,
      },
    ],
    top: [
      {
        id: 'bufala-basil',
        label: 'Bufala e basilico del forno',
        hint: 'Come insegnava la famiglia Esposito.',
        correct: true,
        bonus: 12,
        wantsSauce: true,
        wantsCheese: true,
        highlightToppings: ['basilico', 'bufala'],
      },
      {
        id: 'overload',
        label: 'Tutto quello che c\'è',
        hint: 'Il forno non mente — meno è meglio.',
        correct: false,
        bonus: 0,
        wantsSauce: true,
        wantsCheese: true,
        highlightToppings: ['salame', 'olive', 'funghi'],
      },
    ],
    bake: [
      {
        id: 'castellammare',
        label: 'Legna di Castellammare',
        hint: '485°C — zona dorata del 1738.',
        correct: true,
        bonus: 15,
        bakeHint: 72,
      },
      {
        id: 'scorch',
        label: 'Brucia i bordi',
        hint: 'La fiamma non perdona l\'impazienza.',
        correct: false,
        bonus: 0,
        bakeHint: 95,
      },
    ],
  },
  'regina-margherita': {
    knead: [
      {
        id: 'court',
        label: 'Impasto da corte reale',
        hint: 'Umiltà nell\'impasto, come Vincenzo.',
        correct: true,
        bonus: 12,
      },
      {
        id: 'fancy',
        label: 'Impasto con burro',
        hint: 'La regina voleva semplicità.',
        correct: false,
        bonus: 0,
      },
    ],
    stretch: [
      {
        id: 'timid',
        label: 'Stesura quasi timida',
        hint: 'Semplice, come la terza pizza.',
        correct: true,
        bonus: 10,
        stretchHint: 75,
      },
      {
        id: 'show',
        label: 'Spettacolo di cornicione',
        hint: 'Troppo teatro per il 1889.',
        correct: false,
        bonus: 0,
        stretchHint: 88,
      },
    ],
    top: [
      {
        id: 'tricolor',
        label: 'Rosso, bianco, verde',
        hint: 'San Marzano, mozzarella, basilico.',
        correct: true,
        bonus: 15,
        wantsSauce: true,
        wantsCheese: true,
        highlightToppings: ['pomodoro', 'basilico', 'bufala'],
      },
      {
        id: 'anchovy',
        label: 'Acciughe del Cantabrico',
        hint: 'Era la seconda pizza — non la scelta della regina.',
        correct: false,
        bonus: 0,
        wantsSauce: true,
        wantsCheese: true,
        highlightToppings: ['olive'],
      },
    ],
    bake: [
      {
        id: 'royal',
        label: 'Cottura regale',
        hint: 'Dorata, non bruciata — degna di palazzo.',
        correct: true,
        bonus: 12,
        bakeHint: 70,
      },
      {
        id: 'char',
        label: 'Bordi carbonizzati',
        hint: 'La regina non accetta compromessi.',
        correct: false,
        bonus: 0,
        bakeHint: 92,
      },
    ],
  },
  'via-tribunali': {
    knead: [
      {
        id: 'dawn',
        label: 'Impasto dell\'alba',
        hint: 'Alle 4 del mattino, quando Napoli dorme.',
        correct: true,
        bonus: 12,
      },
      {
        id: 'noon-rush',
        label: 'Impasto di mezzogiorno',
        hint: 'I vicoli chiedono pazienza, non fretta.',
        correct: false,
        bonus: 0,
      },
    ],
    stretch: [
      {
        id: 'steps',
        label: 'Come sui gradini di Spaccanapoli',
        hint: 'Morbido al centro, alto sul bordo.',
        correct: true,
        bonus: 12,
        stretchHint: 78,
      },
      {
        id: 'paper',
        label: 'Sottile da carta',
        hint: 'Serviamo su carta, non schiacciata.',
        correct: false,
        bonus: 0,
        stretchHint: 52,
      },
    ],
    top: [
      {
        id: 'palette',
        label: 'Palette rinascimentale',
        hint: 'Bufala, pomodoro, funghi — tre colori.',
        correct: true,
        bonus: 14,
        wantsSauce: true,
        wantsCheese: true,
        highlightToppings: ['bufala', 'pomodoro', 'funghi'],
      },
      {
        id: 'ink',
        label: 'Solo marinara inchiostrata',
        hint: 'I tipografi mangiavano semplice.',
        correct: false,
        bonus: 0,
        wantsSauce: true,
        wantsCheese: false,
        highlightToppings: ['pomodoro'],
      },
    ],
    bake: [
      {
        id: 'window',
        label: 'Calore da vetrina',
        hint: 'Come i quadri illuminati la sera.',
        correct: true,
        bonus: 10,
        bakeHint: 74,
      },
      {
        id: 'smoke',
        label: 'Fumo di motorino',
        hint: 'Troppo fumo, poca arte.',
        correct: false,
        bonus: 0,
        bakeHint: 88,
      },
    ],
  },
  'impasto-24-ore': {
    knead: [
      {
        id: 'sourdough',
        label: 'Lievito madre vivo',
        hint: '24 ore — il tempo non si compra.',
        correct: true,
        bonus: 15,
      },
      {
        id: 'fridge',
        label: 'Freddo industriale',
        hint: 'Non usiamo frigoriferi per accelerare.',
        correct: false,
        bonus: 0,
      },
    ],
    stretch: [
      {
        id: 'bubbles',
        label: 'Segui le bolle d\'aria',
        hint: 'Raccontano la lievitazione.',
        correct: true,
        bonus: 12,
        stretchHint: 78,
      },
      {
        id: 'roller',
        label: 'Mattarello meccanico',
        hint: 'Solo le mani, dal centro.',
        correct: false,
        bonus: 0,
        stretchHint: 60,
      },
    ],
    top: [
      {
        id: 'respect',
        label: 'Rispetta l\'impasto',
        hint: 'Condimenti leggeri dopo 24 ore.',
        correct: true,
        bonus: 10,
        wantsSauce: true,
        wantsCheese: true,
        highlightToppings: ['basilico', 'pomodoro'],
      },
      {
        id: 'heavy',
        label: 'Pizza gravata',
        hint: 'Troppo peso dopo tanta pazienza.',
        correct: false,
        bonus: 0,
        wantsSauce: true,
        wantsCheese: true,
        highlightToppings: ['salame', 'olive'],
      },
    ],
    bake: [
      {
        id: 'patient',
        label: 'Fuoco paziente',
        hint: 'L\'impasto ha aspettato — anche il forno.',
        correct: true,
        bonus: 12,
        bakeHint: 72,
      },
      {
        id: 'hurry',
        label: 'Inforna e basta',
        hint: 'La fretta sa di fretta.',
        correct: false,
        bonus: 0,
        bakeHint: 85,
      },
    ],
  },
  'sfogliatella-mare': {
    knead: [
      {
        id: 'shell',
        label: 'Impasto a conchiglia',
        hint: 'Come la sfogliatella di Santa Rosa.',
        correct: true,
        bonus: 12,
      },
      {
        id: 'tough',
        label: 'Impasto duro',
        hint: 'Deve essere soffice come le onde.',
        correct: false,
        bonus: 0,
      },
    ],
    stretch: [
      {
        id: 'wave',
        label: 'Stesura a onda',
        hint: 'Dalla Costiera al forno.',
        correct: true,
        bonus: 10,
        stretchHint: 76,
      },
      {
        id: 'crisp',
        label: 'Sottile e croccante',
        hint: 'Prima la pizza, poi la sfogliatella.',
        correct: false,
        bonus: 0,
        stretchHint: 58,
      },
    ],
    top: [
      {
        id: 'coast',
        label: 'Sapori della Costiera',
        hint: 'Olive e salame piccante.',
        correct: true,
        bonus: 14,
        wantsSauce: true,
        wantsCheese: true,
        highlightToppings: ['olive', 'salame'],
      },
      {
        id: 'sweet',
        label: 'Condimenti dolci',
        hint: 'La sfogliatella viene dopo!',
        correct: false,
        bonus: 0,
        wantsSauce: true,
        wantsCheese: false,
        highlightToppings: ['basilico'],
      },
    ],
    bake: [
      {
        id: 'amalfi',
        label: 'Calore di limoncello',
        hint: 'Dorata come il tramonto sulla costa.',
        correct: true,
        bonus: 10,
        bakeHint: 73,
      },
      {
        id: 'bitter',
        label: 'Bordi amari',
        hint: 'Il limoncello aspetta — non bruciare.',
        correct: false,
        bonus: 0,
        bakeHint: 91,
      },
    ],
  },
  'vesuvio-vigilia': {
    knead: [
      {
        id: 'bread',
        label: '«Finché c\'è fuoco, c\'è pane»',
        hint: 'Nonno Antonio, marzo 1944.',
        correct: true,
        bonus: 15,
      },
      {
        id: 'close',
        label: 'Spegni e riposa',
        hint: 'Quella notte il forno restò acceso.',
        correct: false,
        bonus: 0,
      },
    ],
    stretch: [
      {
        id: 'share',
        label: 'Stendi per dividere',
        hint: 'Una pizza per tutti i vicini.',
        correct: true,
        bonus: 12,
        stretchHint: 77,
      },
      {
        id: 'solo',
        label: 'Porzione singola',
        hint: 'La marinara era per la strada.',
        correct: false,
        bonus: 0,
        stretchHint: 55,
      },
    ],
    top: [
      {
        id: 'marinara',
        label: 'Marinara della vigilia',
        hint: 'Salsa sì, formaggio no — pomodoro e aglio.',
        correct: true,
        bonus: 15,
        wantsSauce: true,
        wantsCheese: false,
        highlightToppings: ['pomodoro'],
      },
      {
        id: 'cheese',
        label: 'Aggiungi mozzarella',
        hint: 'Quella notte non c\'era formaggio.',
        correct: false,
        bonus: 0,
        wantsSauce: true,
        wantsCheese: true,
        highlightToppings: ['bufala'],
      },
    ],
    bake: [
      {
        id: 'candle',
        label: 'Fuoco di speranza',
        hint: 'Come la candela sulla soglia.',
        correct: true,
        bonus: 12,
        bakeHint: 71,
      },
      {
        id: 'ash',
        label: 'Cottura di cenere',
        hint: 'Il Vesuvio già basta — non bruciare.',
        correct: false,
        bonus: 0,
        bakeHint: 94,
      },
    ],
  },
};

export function getStageChoices(storyId, stage) {
  return STORY_STAGE_CHOICES[storyId]?.[stage] ?? STORY_STAGE_CHOICES['antica-pizzeria'][stage] ?? [];
}

export function getStoryExcerpt(storyId) {
  return getStoryById(storyId)?.excerpt ?? '';
}

export function getStoryTitle(storyId) {
  return getStoryById(storyId)?.title ?? '';
}

export function scoreStoryChoice(choice) {
  if (!choice) return 0;
  return choice.correct ? (choice.bonus ?? 10) : 0;
}

export function totalStoryChoiceScore(choices) {
  if (!choices) return 0;
  return Object.values(choices).reduce((sum, c) => sum + scoreStoryChoice(c), 0);
}

export function applyStoryChoiceEffects(choice, { setStretch, setBakeIdeal }) {
  if (!choice) return;
  if (choice.stretchHint != null && setStretch) setStretch(choice.stretchHint);
  if (choice.bakeHint != null && setBakeIdeal) setBakeIdeal(choice.bakeHint);
}

export function isToppingStoryHighlighted(toppingId, choice) {
  return choice?.highlightToppings?.includes(toppingId) ?? false;
}

export function storyGuidesSauce(choice) {
  return choice?.wantsSauce;
}

export function storyGuidesCheese(choice) {
  return choice?.wantsCheese;
}

export function getCustomerStoryReaction(customer, storyScore, orderMatch) {
  const story = getStoryById(customer?.storyId);
  if (!story) return null;
  if (storyScore >= 40 && orderMatch >= 80) {
    return { mood: '📖', line: `«${story.title}» — l'hai capito davvero.` };
  }
  if (storyScore >= 25) {
    return { mood: '📜', line: `Hai sentito parte di «${story.title}».` };
  }
  return { mood: '📕', line: `Rileggi «${story.title}» e riprova.` };
}
