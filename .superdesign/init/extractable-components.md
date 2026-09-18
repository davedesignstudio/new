# Extractable components

The current restaurant template has only thin Hugo partials. For the studio redesign, extract layout chrome from the new static site rather than the old sidebar.

## Sidebar
- Source: `site/layouts/partials/sidebar.html`
- Category: layout
- Description: Dark left rail with wordmark and nav
- Extractable props: activeItem (string, default: "home")
- Hardcoded: Home label, sidebar classes, Rock Salt wordmark styling

## DocumentHeader
- Source: `site/layouts/partials/header.html`
- Category: layout
- Description: HTML document shell, meta, CSS, opens body
- Extractable props: title (string), sectionClass (string)
- Hardcoded: favicon paths, CSS path `/css/main.css`

## PageFooter
- Source: `site/layouts/partials/footer.html`
- Category: layout
- Description: Script tags only (Siema + app.js)
- Extractable props: none
- Hardcoded: script paths
