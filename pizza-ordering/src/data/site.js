/** Static site copy — address, hours, heritage taglines */

export const SITE = {
  name: 'Antica Pizzeria Napoletana',
  tagline: 'Napoletana · dal 1738',
  address: 'Via dei Tribunali, 32',
  city: '80138 Napoli',
  phone: '+39 081 123 4567',
  email: 'info@anticapizzerianapoli.it',
  hours: {
    label: 'Orari',
    schedule: [
      { days: 'Lun – Gio', time: '12:00 – 15:00 · 18:00 – 23:30' },
      { days: 'Ven – Sab', time: '12:00 – 00:00' },
      { days: 'Domenica', time: '12:00 – 23:00' },
    ],
  },
  heritage: [
    'Forno a legna dal 1738',
    'Impasto lievitato 24 ore',
    'Ingredienti DOP e biologici',
    'Via dei Tribunali — cuore di Napoli',
  ],
  origin: {
    headline: 'Tre secoli di fuoco, famiglia e fede in un impasto',
    pullQuote:
      'Al numero 32 non c\'è solo una pizzeria. C\'è una promessa fatta trecento anni fa: tenere acceso il fuoco, anche quando la città tremava.',
  },
  photoCredit:
    'Arte: Met Museum, Cleveland Museum of Art, Art Institute of Chicago, Rijksmuseum (open access) · Fotografie: Unsplash · Illustrazioni: Fresco Napoletano',
};
