export const CATEGORIES = [
  { id: 'pizza', label: 'Pizze', sublabel: 'Pizzas', icon: '🍕' },
  { id: 'antipasti', label: 'Antipasti', sublabel: 'Starters', icon: '🫒' },
  { id: 'secondi', label: 'Secondi', sublabel: 'Mains', icon: '🍖' },
  { id: 'contorni', label: 'Contorni', sublabel: 'Sides', icon: '🥗' },
  { id: 'dolci', label: 'Dolci', sublabel: 'Desserts', icon: '🍰' },
  { id: 'bevande', label: 'Bevande', sublabel: 'Drinks', icon: '🍷' },
];

export const SIZES = [
  { id: 'personal', label: 'Personale', inches: '25 cm', priceMod: 0 },
  { id: 'media', label: 'Media', inches: '30 cm', priceMod: 2 },
  { id: 'famiglia', label: 'Famiglia', inches: '40 cm', priceMod: 4 },
  { id: 'napoletana', label: 'Napoletana', inches: '50 cm', priceMod: 6 },
];

export const CRUSTS = [
  { id: 'napoletana', label: 'Impasto Napoletano', priceMod: 0 },
  { id: 'integrale', label: 'Farina Integrale', priceMod: 1 },
  { id: 'multicereali', label: 'Multicereali', priceMod: 1.5 },
  { id: 'senza-glutine', label: 'Senza Glutine', priceMod: 3 },
];

export const SAUCES = [
  { id: 'pomodoro', label: 'Pomodoro San Marzano DOP' },
  { id: 'marinara', label: 'Salsa Marinara' },
  { id: 'bianca', label: 'Crema di Bufala' },
  { id: 'pesto', label: 'Pesto Genovese' },
  { id: 'nduja', label: "Nduja Calabrese" },
];

export const CHEESE_LEVELS = [
  { id: 'normale', label: 'Normale' },
  { id: 'leggera', label: 'Leggera' },
  { id: 'abbondante', label: 'Abbondante', priceMod: 1.5 },
  { id: 'senza', label: 'Senza' },
];

export const TOPPINGS = [
  { id: 'prosciutto', label: 'Prosciutto Crudo', category: 'carne', price: 1.5 },
  { id: 'salsiccia', label: 'Salsiccia Napoletana', category: 'carne', price: 1.5 },
  { id: 'salame', label: 'Salame Piccante', category: 'carne', price: 1.5 },
  { id: 'pancetta', label: 'Pancetta', category: 'carne', price: 1.5 },
  { id: 'bufala', label: 'Mozzarella di Bufala', category: 'carne', price: 2 },
  { id: 'acciughe', label: 'Acciughe del Cantabrico', category: 'carne', price: 1.5 },
  { id: 'funghi', label: 'Funghi Porcini', category: 'verdura', price: 1 },
  { id: 'cipolla', label: 'Cipolla di Tropea', category: 'verdura', price: 1 },
  { id: 'peperoni', label: 'Peperoni Arrostiti', category: 'verdura', price: 1 },
  { id: 'olive', label: 'Olive Taggiasche', category: 'verdura', price: 1 },
  { id: 'carciofi', label: 'Carciofi', category: 'verdura', price: 1 },
  { id: 'rucola', label: 'Rucola Fresca', category: 'verdura', price: 1 },
  { id: 'pomodorini', label: 'Pomodorini del Piennolo', category: 'verdura', price: 1 },
  { id: 'basilico', label: 'Basilico Genovese', category: 'verdura', price: 0.5 },
];

export const MENU_ITEMS = [
  {
    id: 'margherita',
    category: 'pizza',
    name: 'Margherita',
    description: 'Pomodoro San Marzano, mozzarella fior di latte, basilico fresco e olio EVO.',
    basePrice: 8.5,
    badge: 'Classica',
    customizable: true,
    defaultToppings: ['basilico'],
  },
  {
    id: 'marinara',
    category: 'pizza',
    name: 'Marinara',
    description: 'Pomodoro, aglio, origano e olio extravergine. La pizza più antica di Napoli.',
    basePrice: 6.5,
    badge: 'Tradizione',
    customizable: true,
    defaultToppings: [],
  },
  {
    id: 'bufala',
    category: 'pizza',
    name: 'Bufala DOP',
    description: 'Pomodoro, mozzarella di bufala campana DOP, basilico e olio a crudo.',
    basePrice: 11.5,
    badge: 'DOP',
    customizable: true,
    defaultToppings: ['bufala', 'basilico'],
  },
  {
    id: 'diavola',
    category: 'pizza',
    name: 'Diavola',
    description: 'Pomodoro, mozzarella, salame piccante calabrese e peperoncino.',
    basePrice: 10.5,
    customizable: true,
    defaultToppings: ['salame'],
  },
  {
    id: 'quattro-stagioni',
    category: 'pizza',
    name: 'Quattro Stagioni',
    description: 'Prosciutto cotto, funghi, carciofi e olive nere — le quattro stagioni in una pizza.',
    basePrice: 12.5,
    customizable: true,
    defaultToppings: ['funghi', 'olive', 'carciofi'],
  },
  {
    id: 'napoletana',
    category: 'pizza',
    name: 'Napoletana',
    description: 'Pomodoro, mozzarella, acciughe del Cantabrico, capperi e origano.',
    basePrice: 10.0,
    customizable: true,
    defaultToppings: ['acciughe', 'olive'],
  },
  {
    id: 'capricciosa',
    category: 'pizza',
    name: 'Capricciosa',
    description: 'Pomodoro, mozzarella, prosciutto cotto, funghi, carciofi e olive.',
    basePrice: 12.0,
    customizable: true,
    defaultToppings: ['prosciutto', 'funghi', 'carciofi', 'olive'],
  },
  {
    id: 'bruschetta',
    category: 'antipasti',
    name: 'Bruschetta al Pomodoro',
    description: 'Pane casereccio tostato con pomodorini, basilico e aglio.',
    basePrice: 5.5,
    customizable: false,
  },
  {
    id: 'caprese',
    category: 'antipasti',
    name: 'Insalata Caprese',
    description: 'Mozzarella di bufala, pomodori maturi, basilico e olio EVO.',
    basePrice: 8.0,
    customizable: false,
  },
  {
    id: 'frittatina',
    category: 'antipasti',
    name: 'Frittatina di Pasta',
    description: 'Crocchette napoletane ripiene di pasta, piselli e ragù.',
    basePrice: 4.5,
    badge: 'Napoletana',
    customizable: false,
  },
  {
    id: 'polpette',
    category: 'secondi',
    name: 'Polpette al Sugo',
    description: 'Polpette di carne napoletane cotte nel sugo di pomodoro.',
    basePrice: 9.5,
    customizable: false,
  },
  {
    id: 'melanzane',
    category: 'secondi',
    name: 'Parmigiana di Melanzane',
    description: 'Strati di melanzane fritte, pomodoro, mozzarella e parmigiano.',
    basePrice: 10.0,
    customizable: false,
  },
  {
    id: 'patate',
    category: 'contorni',
    name: 'Patate al Forno',
    description: 'Patate novelle con rosmarino e olio extravergine.',
    basePrice: 4.0,
    customizable: false,
  },
  {
    id: 'insalata-mista',
    category: 'contorni',
    name: 'Insalata Mista',
    description: 'Lattuga, rucola, pomodorini e carote con aceto balsamico.',
    basePrice: 5.0,
    customizable: false,
  },
  {
    id: 'sfogliatella',
    category: 'dolci',
    name: 'Sfogliatella Riccia',
    description: 'Dolce napoletano a forma di conchiglia con ripieno di ricotta.',
    basePrice: 3.5,
    badge: 'Dolce Napoletano',
    customizable: false,
  },
  {
    id: 'babà',
    category: 'dolci',
    name: 'Babà al Rum',
    description: 'Il classico dolce napoletano imbevuto di rum e sciroppo.',
    basePrice: 4.0,
    customizable: false,
  },
  {
    id: 'limoncello',
    category: 'bevande',
    name: 'Limoncello della Costiera',
    description: 'Liquore di limoni di Sorrento, servito ghiacciato.',
    basePrice: 4.5,
    customizable: false,
  },
  {
    id: 'acqua',
    category: 'bevande',
    name: 'Acqua Minerale',
    description: 'Acqua naturale o frizzante, 75cl.',
    basePrice: 2.0,
    customizable: false,
  },
  {
    id: 'vino-rosso',
    category: 'bevande',
    name: 'Vino Rosso Aglianico',
    description: 'Calice di Aglianico del Vulture, Campania.',
    basePrice: 5.5,
    customizable: false,
  },
];

export function calcPizzaPrice(item, options) {
  const size = SIZES.find((s) => s.id === options.size) ?? SIZES[1];
  const crust = CRUSTS.find((c) => c.id === options.crust) ?? CRUSTS[0];
  const cheese = CHEESE_LEVELS.find((c) => c.id === options.cheese) ?? CHEESE_LEVELS[0];

  const defaultSet = new Set(item.defaultToppings ?? []);
  const extraToppings = options.toppings.filter((t) => !defaultSet.has(t));
  const toppingCost = extraToppings.reduce((sum, id) => {
    const t = TOPPINGS.find((top) => top.id === id);
    return sum + (t?.price ?? 0);
  }, 0);

  return (
    item.basePrice +
    size.priceMod +
    crust.priceMod +
    (cheese.priceMod ?? 0) +
    toppingCost
  );
}

export function formatPrice(amount) {
  return `€${amount.toFixed(2).replace('.', ',')}`;
}
