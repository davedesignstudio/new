# Page dependency trees

## / (Home)
Entry: `site/layouts/index.html`
Dependencies:
- `site/layouts/partials/header.html`
  - `site/layouts/partials/sidebar.html`
  - `site/config.toml` (title, description, menus)
- `site/layouts/partials/footer.html`
- `src/css/main.css`
  - `src/css/imports/base.css`
  - `src/css/imports/menu.css`
- Home video: `/videos/SDVid.mp4`, `/videos/SDVid.ogg`

Render: sidebar + full-bleed autoplay video. No other page content.

## /about
Entry: `site/content/pages/about.md` → `site/layouts/_default/single.html`
Dependencies:
- `site/layouts/partials/header.html` → sidebar
- `site/layouts/partials/footer.html`
- CSS as home

## /contact
Entry: `site/content/pages/contact.md` → `site/layouts/_default/single.html`
Dependencies: same shell + form styles in `src/css/imports/menu.css`

## /food/ (menu list)
Entry: `site/layouts/_default/list.html` (section food)
Dependencies: header/sidebar/footer, taxonomy grouping, `src/css/imports/menu.css` list layout

## /gallery/
Entry: `site/layouts/_default/list.html` (section gallery)
Dependencies:
- `src/js/app.js`
- `src/js/siema.min.js`
- gallery markdown image params
