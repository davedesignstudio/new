# Domino's Pizza Order UI (SolidJS)

A Domino's-inspired pizza ordering interface built with [SolidJS](https://solidjs.com/) and [Vite](https://vite.dev/).

## Features

- **Step-based ordering flow** — Pizzas → Sides → Drinks → Checkout
- **Pizza customization** — Size, crust, and toppings with live price updates
- **Live cart** — Quantity controls, subtotal, delivery fee, and checkout
- **Domino's branding** — Red/blue color scheme, promo banner, and familiar layout
- **Responsive design** — Works on desktop and mobile

## Getting Started

```bash
cd pizza-order
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

## Build

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
  components/     # UI components (Header, Cart, PizzaGrid, etc.)
  data/           # Pizza, sides, drinks, and option data
  stores/         # Shared order state (SolidJS signals)
```
