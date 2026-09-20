# D Philhower Studio

Marketing site for **D Philhower Studio** — identity, menus, windows, and websites for independent restaurants in Morristown and Morris County, New Jersey.

The live site is static HTML in `public/`.

## Featured brands

Eight hospitality systems from the same table-first process:

- [Porta Vecchia](public/brands/porta-vecchia/index.html) — Chatham trattoria
- [Salt + Cedar](public/brands/salt-cedar/index.html) — Morristown oyster bar
- [Hari](public/brands/hari/index.html) — Summit modern Indian
- [Nightjar](public/brands/nightjar/index.html) — Madison wine bar
- [Ash & Marrow](public/brands/ash-marrow/index.html) — Randolph wood-fired
- [North Hollow](public/brands/north-hollow/index.html) — Chester tavern
- [Kumo Counter](public/brands/kumo-counter/index.html) — Morristown omakase
- [Linden Oven](public/brands/linden-oven/index.html) — Madison bakery-café

Studio case studies live under `/work/`. Each brand also has a live microsite under `/brands/`.

## Local development

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy

Netlify publish directory: `public` (see `netlify.toml`).

## Pages

- `/` — Home
- `/work/` — Brands
- `/work/{slug}/` — case studies for all eight brands
- `/brands/...` — live brand sites
- `/services/` — Process
- `/about/` — Studio
- `/contact/` — Project inquiry
