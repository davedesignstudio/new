# Philhower & Okrogly

Marketing site for **Philhower & Okrogly** — a construction and design company specializing in carpentry design & build, web design, and branding.

## Theme song

Lyrics live in [`THEME-SONG.md`](THEME-SONG.md) and on the site at `/theme-song/` (“Timber & Type”).

## Local development

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000). The site is static HTML/CSS/JS in `public/`.

Or serve the folder directly:

```bash
npx --yes serve public -l 3000
```

## Deploy

Netlify publish directory: `public` (see `netlify.toml`).

## Pages

- `/` — Home
- `/services/` — Carpentry, web, branding
- `/work/` — Selected builds
- `/about/` — The partnership
- `/theme-song/` — Company anthem lyrics
- `/contact/` — Project inquiry form (wire to a form provider before launch)
