#!/usr/bin/env node
/**
 * Pass HM · Integrate — generate hub + five brand sites
 */
const fs = require("fs");
const path = require("path");

const ROOT = "/workspace/websites";

const brands = [
  {
    id: "lumen-press",
    name: "Lumen Press",
    type: "Cafe",
    kinetic: "brand-breathe",
    accent: "#c4a35a",
    paper: "#f3efe6",
    ink: "#1a1612",
    stakesClass: "",
    stakesLabel: "Allergen stakes",
    stakes:
      "Soy-ink residue may contact pastry surfaces. Tell us about soy allergies before you order — we plate presseside.",
    place: "Letterpress loft · West Oakland",
    lede: "Coffee poured beside the platen. Ink, oat milk, and morning light.",
    boardName: "Press board",
    items: [
      { title: "Platen drip", teaser: "Single origin…", body: "Single-origin pour-over, soy-ink free bar." },
      { title: "Galley bun", teaser: "Sesame…", body: "Toasted bun; sesame noted on ticket." },
      { title: "Colophon cocoa", teaser: "Dark…", body: "House cocoa, oat or dairy." },
    ],
    cards: [
      {
        title: "Reserve a stool",
        body: "Two seats at the platen rail. Seal stamps when stakes and status are ready.",
        cta: "Reserve",
        attr: 'data-reserve data-requires-seal data-item="platen rail stool" data-limit="45 min hold"',
      },
      {
        title: "Press tour",
        body: "Watch a pull. Ear protection offered; no hands on the chase.",
        cta: "Book tour",
        attr: 'data-reserve data-requires-seal data-item="press tour" data-limit="Sat 11:00"',
      },
    ],
    canon:
      "Canon shelves (labeled, not SKU-pasted): Protestant 66 · Catholic deuterocanon · LXX · Ethiopian broader OT · Peshitta · Didache companion.",
  },
  {
    id: "cedar-drift",
    name: "Cedar Drift",
    type: "Cafe",
    kinetic: "mist-drift brand-breathe",
    accent: "#2f4a3a",
    paper: "#eef2ef",
    ink: "#1c2420",
    stakesClass: "",
    stakesLabel: "Allergen + mist",
    stakes:
      "Tree-nut milks on the bar. Coastal mist advisory: paths may be slick — ask for indoor seating if mobility is limited.",
    place: "Cedar grove · Olympic Peninsula verge",
    lede: "Mist in the boughs. Quiet cups under living cedar.",
    boardName: "Grove board",
    items: [
      { title: "Drift latte", teaser: "Cedar…", body: "Espresso with steamed oat; almond on request (labeled)." },
      { title: "Moss cake", teaser: "Matcha…", body: "Matcha crumb; contains tree nuts." },
      { title: "Fog tonic", teaser: "Citrus…", body: "Yuzu soda, no nuts." },
    ],
    cards: [
      {
        title: "Reserve grove bench",
        body: "Covered bench for two. Seal before we promise the seat.",
        cta: "Reserve",
        attr: 'data-reserve data-requires-seal data-item="grove bench" data-limit="60 min"',
      },
      {
        title: "Mist walk cup",
        body: "Takeaway only when paths are posted clear.",
        cta: "Order cup",
        attr: 'data-reserve data-requires-seal data-item="mist walk cup" data-limit="while supplies last"',
      },
    ],
    canon: "Looking ethic: place credited; unfamiliar grove ≠ undeveloped. Plain language for mist advisory.",
  },
  {
    id: "salt-loom",
    name: "Salt Loom",
    type: "Restaurant",
    kinetic: "wind-sway",
    accent: "#1c3d44",
    paper: "#f2f0ea",
    ink: "#142428",
    stakesClass: "critical",
    stakesLabel: "Critical allergen",
    stakes:
      "Shellfish is central to tonight’s loom — crab, mussel, shrimp. Cross-contact possible on shared flat-tops. Tell us before seating.",
    place: "Harbor terrace · Port Townsend",
    lede: "Warp of rope, weft of tide. Dinner where the wind finds the linen.",
    boardName: "Tide board",
    items: [
      { title: "Warp broth", teaser: "Shell…", body: "Shellfish broth; vegetarian kelp alternate." },
      { title: "Weft noodles", teaser: "Crab…", body: "Hand-pulled, crab butter (critical)." },
      { title: "Salt cake", teaser: "Citrus…", body: "Olive oil cake, no shellfish." },
    ],
    cards: [
      {
        title: "Reserve terrace",
        body: "Wind-forward tables. Seal stamps after shellfish stakes are acknowledged in status.",
        cta: "Reserve",
        attr: 'data-reserve data-requires-seal data-item="harbor terrace" data-limit="seating window 90 min"',
      },
      {
        title: "Loom tasting",
        body: "Five courses. Shellfish flight unless you request the kelp path.",
        cta: "Book tasting",
        attr: 'data-reserve data-requires-seal data-item="loom tasting" data-limit="Thu–Sat"',
      },
    ],
    canon: "Hear-do (Mt 7): naming shellfish above the fold is the rock; burying it in a drawer is sand.",
  },
  {
    id: "forge-table",
    name: "Forge Table",
    type: "Restaurant",
    kinetic: "ember-pulse brand-breathe",
    accent: "#b85c38",
    paper: "#f4eee8",
    ink: "#1b1714",
    stakesClass: "critical",
    stakesLabel: "Open flame",
    stakes:
      "Open-flame hearth service. Ember ash may contact shared irons. Tell us about smoke sensitivity or nut allergies (walnut ash dessert) before we seat you at the forge rail.",
    place: "Forge hall · former smithy, Portland",
    lede: "One long table. Heat as hospitality. Iron, oak, and ember.",
    boardName: "Forge board",
    items: [
      { title: "Anvil chop", teaser: "Fire…", body: "Dry-aged chop, open flame." },
      { title: "Ember roots", teaser: "Ash…", body: "Root vegetables in walnut ash (allergen)." },
      { title: "Quench greens", teaser: "Herb…", body: "Bitter greens, no ash." },
    ],
    cards: [
      {
        title: "Reserve forge rail",
        body: "Seats nearest the hearth. Practice seal before we hold the rail.",
        cta: "Reserve",
        attr: 'data-reserve data-requires-seal data-item="forge rail" data-limit="120 min"',
      },
      {
        title: "Communal bench",
        body: "Farther from flame. Same menu, cooler air.",
        cta: "Reserve bench",
        attr: 'data-reserve data-requires-seal data-item="communal bench" data-limit="120 min"',
      },
    ],
    canon: "Craft Ri: joints absorbed into hoop — Fitts, PRM, seal — unmarked excellence that still stamps.",
  },
  {
    id: "pair-registry",
    name: "Pair Registry",
    type: "Sneaker boutique",
    kinetic: "brand-breathe",
    accent: "#1a1612",
    paper: "#f5f1ea",
    ink: "#12110f",
    stakesClass: "critical",
    stakesLabel: "Reseller + hold",
    stakes:
      "Independent reseller of collectible Nike sneakers and other pairs. Not affiliated with Nike, Inc. Authentication reports labeled by shelf. 24-hour holds are binding — missed pickup releases the pair.",
    place: "Independent vault · Seattle archive district",
    lede: "Catalogued pairs. Quiet vault light. Holds with clear limits.",
    boardName: "Vault stream",
    items: [
      {
        title: "Dunk Low · registry #1042",
        teaser: "Auth…",
        body: "Collectible Dunk — auth report shelf B. Independent stock.",
      },
      {
        title: "Air Max sample · #0881",
        teaser: "Vault…",
        body: "Sample-run Air Max — labeled report; Nike™ not in our mark.",
      },
      {
        title: "Trail runner · #2204",
        teaser: "Non-Nike…",
        body: "Non-Nike trail pair for contrast cataloguing.",
      },
    ],
    cards: [
      {
        title: "Hold Dunk #1042",
        body: "24h hold. Action · Item · Limit narrated in the rail when sealed.",
        cta: "Start hold",
        attr: 'data-hold data-requires-seal data-item="Dunk Low #1042" data-limit="24h pickup"',
      },
      {
        title: "Request auth sheet",
        body: "Shelf-labeled report PDF. Not a Nike corporate certificate.",
        cta: "Request sheet",
        attr: 'data-reserve data-requires-seal data-item="auth sheet #1042" data-limit="email within 1h"',
      },
    ],
    canon:
      "Mark hygiene: PR monogram only — no Nike swoosh in identity. Stock may include collectible Nike pairs; shelf labels name the tradition.",
    extra: true,
  },
];

function page(b) {
  const cssVars = `--accent:${b.accent};--paper:${b.paper};--ink:${b.ink};--focus-ring:${b.ink};`;
  const cards = b.cards
    .map(
      (c) => `
      <article class="card">
        <span class="practice-seal" data-sealed="false">Joints open</span>
        <h3>${c.title}</h3>
        <p>${c.body}</p>
        <button type="button" class="btn btn-primary" data-cta ${c.attr} disabled aria-disabled="true">${c.cta}</button>
      </article>`
    )
    .join("");

  const holdStatus =
    b.id === "pair-registry"
      ? `<div class="section" id="hold">
        <h2>Hold status</h2>
        <p class="support">A+I+L rail narrates every hold. Panic FID never ships.</p>
        <div data-hold-status class="card"><p class="meta">No active hold. Start one above when sealed.</p></div>
      </div>`
      : `<div class="section" id="status-panel">
        <h2>Live status</h2>
        <p class="support">Action · Item · Limit — written plain, not meagre.</p>
        <div data-hold-status class="card"><p class="meta">Waiting for a sealed Reserve.</p></div>
      </div>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${b.name} · ${b.type}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,650&family=IBM+Plex+Sans:wght@400;600&family=Source+Serif+4:opsz,wght@8..60,400;8..60,600&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="../shared/pattern.css" />
  <style>:root{${cssVars}}</style>
</head>
<body class="${b.kinetic}">
  <div class="envelope" data-envelope>
    <div class="envelope-inner">
      <a class="brand-lockup" href="./index.html">
        <img class="logo" src="./assets/logo.png" width="48" height="48" alt="${b.name} logo" />
        <span class="brand-name">${b.name}</span>
      </a>
      <ul class="nav-links">
        <li><a href="#board">Board</a></li>
        <li><a href="#visit">Visit</a></li>
        <li><a href="../index.html">All sites</a></li>
      </ul>
    </div>
    <div class="stream-rail" data-stream-rail aria-live="polite" aria-busy="true" aria-atomic="false"></div>
  </div>

  <div class="stakes ${b.stakesClass}" role="note">
    <div class="stakes-inner">
      <span class="label">${b.stakesLabel}</span>
      ${b.stakes}
    </div>
  </div>

  <header class="hero">
    <div class="hero-media">
      <img src="./assets/hero.png" alt="" />
    </div>
    <div class="hero-copy">
      <p class="place-credit">${b.place}</p>
      <h1 class="brand-hero">${b.name}</h1>
      <p class="lede">${b.lede}</p>
      <div class="cta-row">
        <a class="btn btn-primary" href="#visit">Plan a visit</a>
        <a class="btn btn-ghost" href="#board">See the board</a>
      </div>
      <p class="integrate-mark">Integrate HM · cycle sealed</p>
    </div>
  </header>

  <main>
    <section class="section" id="board">
      <h2>${b.boardName}</h2>
      <p class="support">Fill streams skeleton → partial → ready. The envelope never leaves.</p>
      <div
        class="stream-board"
        data-stream-board
        data-board-name="${b.boardName}"
        data-items='${JSON.stringify(b.items)}'
        data-fallback='${JSON.stringify(b.items)}'
      ></div>
      <div class="filters">
        <details>
          <summary>Optional filters</summary>
          <p>Advanced dietary filters stay in the drawer. Danger stays above the fold.</p>
        </details>
      </div>
    </section>

    <section class="section" id="visit">
      <h2>Visit</h2>
      <p class="support">Cards exist only for interaction. Seal before promise.</p>
      <div class="card-grid">
        ${cards}
      </div>
    </section>

    ${holdStatus}

    <p class="canon-shelf">${b.canon}</p>
  </main>

  <footer class="site-foot">
    <p>${b.name} · ${b.type} · Pass HM Integrate · Fitts ≥48px · prefers-reduced-motion honored</p>
    ${
      b.id === "pair-registry"
        ? "<p>Independent reseller. Nike is a trademark of Nike, Inc. — not used in our mark.</p>"
        : ""
    }
  </footer>
  <script src="../shared/stream.js"></script>
</body>
</html>`;
}

function hub() {
  const cards = brands
    .map(
      (b) => `
    <a class="hub-card" href="./${b.id}/index.html">
      <img src="./${b.id}/assets/hero.png" alt="" />
      <div class="pad">
        <strong>${b.name}</strong>
        <span>${b.type}</span>
      </div>
    </a>`
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Design Studio · Five brands · Pass HM Integrate</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,650&family=IBM+Plex+Sans:wght@400;600&family=Source+Serif+4:opsz,wght@8..60,400&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="./shared/pattern.css" />
</head>
<body class="hub">
  <header class="hub-hero">
    <p class="integrate-mark">Pass HM · Hour 5 Integrate · Cycle HI→… CLOSED</p>
    <h1>Five joined brands</h1>
    <p>Two cafes, two restaurants, one independent sneaker vault — research folded into craft: envelope≠fill, seal before promise, hear-do stakes above the fold.</p>
  </header>
  <div class="hub-grid">
    ${cards}
  </div>
  <footer class="site-foot">
    <p>Logos · illustrations · sites generated for automation research delivery. Shared hoop in <code>shared/pattern.css</code>.</p>
  </footer>
</body>
</html>`;
}

for (const b of brands) {
  const dir = path.join(ROOT, b.id);
  fs.mkdirSync(path.join(dir, "assets"), { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), page(b));
}
fs.writeFileSync(path.join(ROOT, "index.html"), hub());
console.log("Wrote hub +", brands.length, "brands");
