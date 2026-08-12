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
  photoCredit: 'Fotografie: Unsplash · Illustrazioni: Fresco Napoletano',
};
