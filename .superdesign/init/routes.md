# Routes (Hugo)

Config: `site/config.toml` — title "Tasty Licks", menu About → `/about`.

| URL | Source | Layout | Renders |
| --- | --- | --- | --- |
| `/` | `site/layouts/index.html` | header + footer | Full-viewport looping home video over the sidebar chrome |
| `/about` | `site/content/pages/about.md` | `_default/single.html` | Placeholder restaurant about copy |
| `/contact` | `site/content/pages/contact.md` | `_default/single.html` | Reservation form (not in main menu) |
| `/food/` | `site/content/food/*.md` | `_default/list.html` | Menu grouped by lunch/dinner taxonomies |
| `/gallery/` | `site/content/gallery/*.md` | `_default/list.html` | Image carousel |
| `/404/` | `site/layouts/404.html` | header + footer | Not found |

Home is the primary redesign target. Brand case studies do not exist yet (new targets).
