# Theme tokens

## Compact summary

**Colors**
- Body text: `#515151`
- Headings: `#313131` / `#303030`
- Page bg: `#fff`
- Sidebar bg: `#202020`
- Sidebar text: `rgba(255,255,255,0.5)` / links `#fff`
- Accent (hover, buttons, h2 em): `#ff7660` → hover `#d35b48`
- Links: `#268bd2`
- Borders: `#eee` / `#ddd` / `#e5e5e5`
- Muted: `#9a9a9a` `#7a7a7a` `#c0c0c0`

**Type**
- Body: `"PT Sans", Helvetica, Arial, sans-serif`
- Display / sidebar h1 / content h1: `"Rock Salt", cursive`
- Root size: 16px; 20px ≥ 38em; 16px ≥ 48em; 20px ≥ 58em
- Line height: 1.5 body, 1.25 headings

**Layout**
- Sidebar: full-width stacked on small screens; fixed left 18rem from 48em
- Content: padded 4rem; from 48em `margin-left: 20rem` (22rem at 64em), max-width 38rem
- Container max-width: 38rem
- Breakpoints: 30em, 38em, 48em, 58em, 64em
- Radius: inputs 4px, images 5px
- Home video: `object-fit: cover; 100vw × 100vh; fixed; z-index: -1`

**Motion**
- Link/button color 0.2s ease

## Raw source

See `src/css/imports/base.css` (sidebar, content, video, type) and `src/css/imports/menu.css` (menu lists, form, coral buttons). Entry: `src/css/main.css` imports both. Fonts loaded from Google: PT Sans 400/700 + Rock Salt.
