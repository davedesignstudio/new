# D Philhower Studio — Design system

Independent restaurant design studio in the Morristown / Morris County, NJ area. The site is a press room for hospitality brands: identity, menus, windows, and websites designed as one system. The first conversation is a meal at the restaurant.

## Jobs to be done

- Show fourteen featured brand systems as proof the studio can give a room a complete visual language.
- Explain the design process (Listen → Shape → Print & build) without agency jargon.
- Convert independent restaurant owners into a first meeting (in person, at their table).

## Key pages

- `/` Home — manifesto + fourteen brand tiles + process
- `/work/` Brands index
- `/work/{slug}/` case studies for all fourteen brands
- `/brands/{slug}/` live brand microsites (the identity in the world)
- `/services/` Process & services
- `/about/` Studio
- `/contact/` Start a project

## Visual direction — “Letterpress table”

Warm rag-paper ground, printer’s-ink black, one studio red. Editorial type, not a dark maroon stage and not the old Rock Salt restaurant template. Each brand is allowed its own palette on case-study bands and microsites; the studio chrome never borrows those palettes.

### Color (studio chrome)

| Token | Value | Use |
| --- | --- | --- |
| `--paper` | `#F3EEE4` | Page ground |
| `--paper-deep` | `#E7E0D2` | Bands, cards |
| `--ink` | `#16120E` | Type, rules |
| `--ink-soft` | `#5E564C` | Supporting copy |
| `--rule` | `#C9BBA8` | Hairlines |
| `--press` | `#9C2418` | Studio accent, CTAs, labels |
| `--press-deep` | `#6E160F` | CTA hover |
| `--chalk` | `#FAF7F1` | Inverse panels |

### Type

- Display: **Fraunces** (opsz 9–144, wght 500–700, italic for pull quotes)
- Body: **Source Sans 3** 400/600
- Meta/labels: Source Sans 3, 0.72rem, letter-spacing 0.16em, uppercase
- Root 18px, body line-height 1.55, display line-height 1.05–1.12
- H1 clamp(2.6rem, 7vw, 5.4rem)

### Space & layout

- Page max 1180px, side gutter `clamp(1.1rem, 4vw, 3rem)`
- Section padding `clamp(3.5rem, 8vw, 7rem) 0`
- 12-column mental grid; brand tiles 3-up desktop, 1-up mobile
- Hairline 1px rules; no drop shadows except a 12px soft paper shadow on brand cards
- Radius 0 on studio chrome (letterpress); 2px on form fields
- Header sticky, paper/90 with backdrop blur, 1px rule

### Motion

- 180ms ease for color/opacity; no bounce
- `prefers-reduced-motion: reduce` disables transforms

### Components

- **Brand mark:** small square printer’s D (SVG) + “D Philhower Studio”
- **Buttons:** solid `--press` on paper; ghost = ink outline
- **Brand tile:** image 4:3, caption with name + discipline
- **Process steps:** 01 / 02 / 03 with a left rule
- **Case study:** hero band in the brand’s palette, then studio paper for the write-up, then a link into the live brand site

## Fourteen brands

1. **Foxhollow** — inn, Far Hills. Burgundy `#5C1220`, gold `#C9A44A`, cream `#F3EDE0`, forest `#243024`, charcoal `#1A1A1A`. Playfair Display + Allura + Montserrat. Double-ring fox seal; print lockup; window gold leaf.
2. **The Brass Door** — supper, Madison. Navy `#0F1C2E`, brass `#C4A35A`, stone `#E8DFD0`, walnut `#5A3A24`, charcoal `#1A1A1A`. Playfair Display + Allura + Montserrat. Knocker seal; print lockup; window gold leaf.
3. **Cider Hill** — farm kitchen, Long Valley. Cider `#6B1C28`, gold `#C9A44A`, cream `#F4EDE0`, leaf `#4F6B3A`, charcoal `#1A1A1A`. Playfair Display + Allura + Montserrat. Apple-and-wheat seal; print lockup; window gold leaf.
4. **The Mill House** — kitchen, Mendham. Navy `#0F1C2E`, brass `#C4A35A`, stone `#E8DFD0`, wood `#6B4E32`, charcoal `#1A1A1A`. Playfair Display + Allura + Montserrat. Saw-tooth millstone seal; print lockup; window gold leaf.
2. **Bell & Court** — supper club, Morristown. Black `#111111`, gold `#C9A44A`, cream `#F3EDE0`, forest `#243024`, brass `#A67C3A`. Playfair Display + Allura + Montserrat. Diamond BC monogram; print lockup; window gold leaf.
3. **Stag Lantern** — wood grill, Bernardsville. Same navy/brass craftsman palette as The Mill House. Playfair Display + Allura + Montserrat. Stag-and-lantern toothed seal; print lockup; window gold leaf.
4. **Porta Vecchia** — trattoria in Chatham, NJ. Plaster `#F3E6D4`, brick `#8C2F24`, olive `#4F5D32`, straw `#C9A15B`. Playfair Display + Karla.
5. **Salt + Cedar** — oyster bar, Morristown. Slate `#1B2830`, salt `#F0EBE1`, cedar `#9A4E2C`, tide `#7FA3A0`. Newsreader + IBM Plex Sans.
6. **Hari** — modern Indian, Summit. Night `#1C120E`, cream `#F6EFE4`, saffron `#C75B1A`, turmeric `#D4A017`, leaf `#2E5A38`. Cormorant Garamond + Outfit.
7. **Nightjar** — wine bar, Madison. Midnight `#16131C`, plum `#3D2140`, gold `#C8B07A`, paper `#F1EBE0`. Libre Bodoni + Manrope.
8. **Ash & Marrow** — wood-fired, Randolph. Charcoal `#161311`, ash `#C9C2B6`, ember `#C44A1A`, bone `#EBE4D6`. Oswald + Source Sans 3.
9. **North Hollow** — tavern in Chester, NJ. Forest `#1C2A22`, cream `#EDE6D4`, brass `#C4A35A`. Cormorant Garamond + Barlow.
10. **Kumo Counter** — eight-seat omakase, Morristown. Sumi `#111111`, washi `#EFECE4`, indigo `#24315C`, vermillion `#C44536`. Shippori Mincho + Zen Kaku Gothic New.
11. **Linden Oven** — bakery-café, Madison. Flour `#F7F0E4`, cocoa `#3D2A1F`, terracotta `#C46A3A`, leaf `#6F8454`. Fraunces + Nunito Sans.

Do not mix brand palettes into studio chrome. Do not reintroduce Rock Salt, PT Sans coral (`#ff7660`), or the previous maroon/gold stage.
