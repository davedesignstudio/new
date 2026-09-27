# D. Philhower Design — studio website

The website for [D. Philhower Design](https://www.linkedin.com/in/david-philhower-984264169), the brand and design studio of David Philhower in Oak Ridge, New Jersey. The studio designs identities, menus, websites and signage for restaurants and the small businesses around them.

The site is a static [Hugo](https://gohugo.io) build on the [Victor Hugo](https://github.com/netlify/victor-hugo) boilerplate (Gulp + PostCSS + Webpack), deployed on Netlify.

## Structure

```
site/
  config.toml          Site title, studio details, contact info, main menu
  data/services.yaml   The four service offerings (used on the home, services and contact pages)
  content/
    work/              One markdown file per project (case study)
    about.md           About page
    services.md        Services page intro
    contact.md         Contact page intro
    thanks.md          Form success page
  layouts/             Hugo templates and partials
src/
  css/                 PostCSS source (tokens, base, layout, components, pages)
  js/app.js            Mobile nav, header state, scroll reveals
  fonts/               Self-hosted Fraunces + DM Sans (OFL)
  img/work/            Project imagery
```

## Editing content

**Add a project:** create `site/content/work/<slug>.md` with front matter like:

```toml
+++
title = "Project name"
client = "Client name"
location = "Town, State"
year = "2025"
services = ["Brand identity", "Menus & print"]
summary = "One sentence used on cards and in the page header."
image = "/img/work/cover.jpg"          # 4:3 works best
images = ["/img/work/a.jpg", "/img/work/b.jpg"]
featured = true                        # shows on the homepage (first three by weight)
weight = 10                            # lower = earlier
date = "2025-01-01"
+++
```

Projects marked `sample = true` show a small "Sample" tag. The three sample projects that ship with the site are placeholders: replace them with real case studies and remove the flag, or turn the tags off with `show_sample_tags = false` in `config.toml`.

**Contact details** (email, phone, location, social links) live in `[params]` in `site/config.toml`. The contact form uses [Netlify Forms](https://docs.netlify.com/forms/setup/) and redirects to `/thanks/` on success.

## Development

Requirements: Node 8 (see `.nvmrc`) and npm. Hugo is installed automatically through `hugo-bin`.

```bash
nvm use
npm install
npm run start      # dev server with live reload at http://localhost:3000
npm run build      # production build to /dist
```

On Netlify the build command is `npm run build` and the publish directory is `dist` (see `netlify.toml`). The Netlify `URL` / `DEPLOY_PRIME_URL` environment variables are passed to Hugo as the base URL so canonical and Open Graph URLs are absolute.

## License

[MIT](LICENSE). Fonts are licensed under the SIL Open Font License, see `src/fonts/README.md`.
