#!/usr/bin/env python3
"""Wire Aurea / Juniper / Kiln + Room Method into preview + theme."""
from __future__ import annotations

from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PREV = ROOT / "preview"
THEME = ROOT / "theme" / "dphilhower-studio"

NAV_LI = '      <li><a href="{process}">Process</a></li>\n'

CASE_TEMPLATE = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{title} — D Philhower Studio</title>
  <meta name="description" content="{meta}">
  <link rel="icon" href="../../img/favicon.svg" type="image/svg+xml">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,600;1,6..72,400&family=Syne:wght@500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../../css/main.css">
  <link rel="stylesheet" href="../../css/editorial.css">
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header">
    <a class="brand-mark" href="../../index.html"><img src="../../img/d-philhower-lockup.png" alt="D Philhower Studio" width="1024" height="1024"></a>
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-nav">Menu</button>
    <ul class="nav" id="site-nav">
      <li><a href="../index.html" aria-current="page">Brands</a></li>
      <li><a href="../../process/index.html">Process</a></li>
      <li><a href="../../services/index.html">Services</a></li>
      <li><a href="../../about/index.html">About</a></li>
      <li class="cta"><a href="../../contact/index.html">Start a project</a></li>
    </ul>
  </header>
  <main id="main">
    <header class="page-hero">
      <p class="section-label">Room Method · full branding</p>
      <h1>{title}</h1>
      <p>{lede}</p>
    </header>
    <div class="case-hero">
      <img src="../../img/{slug}-hero.png" alt="{hero_alt}" width="1536" height="1024">
    </div>
    <article class="case-body">
      <ul class="case-meta">
        <li><strong>Identity</strong><br>{identity}</li>
        <li><strong>Services</strong><br>Identity · Room Method · menu · window · packaging · website</li>
        <li><strong>Year</strong><br>2026</li>
        <li><strong>Place</strong><br>Morris County, NJ</li>
      </ul>
      <div class="entry-content">
        {body}
      </div>
    </article>
    <section class="brand-kit brand-process" id="process">
      <p class="section-label">Room Method</p>
      <h2 class="section-title is-wide">{process_title}</h2>
      <p class="section-copy is-wide">{process_intro}</p>
      <div class="process is-room">
{process_steps}
      </div>
    </section>
    <section class="brand-kit identity-kit">
      <p class="section-label">The kit</p>
      <h2 class="section-title">Mark, color, type</h2>
      <figure class="kit-board">
        <img src="../../img/{slug}-kit.png" alt="{kit_alt}" width="1536" height="1024">
      </figure>
      <div class="kit-panel">
        <p class="kit-wordmark">{wordmark}<span>{wordmark_span}</span></p>
        <p class="section-copy" style="margin-bottom:0">{kit_blurb}</p>
        <div class="swatches">
{swatches}
        </div>
        <div class="type-row">
          <div class="type-card">
            <small>{display_label}</small>
            <p class="type-display">{display_sample}</p>
            <p>{display_note}</p>
          </div>
          <div class="type-card">
            <small>{body_label}</small>
            <p>{body_note}</p>
          </div>
        </div>
      </div>
    </section>
    <section class="brand-kit brand-system">
      <p class="section-label">Brand system</p>
      <h2 class="section-title">{system_title}</h2>
      <div class="brand-system-grid">
        <div class="brand-story">
          <h3>The mark</h3>
          <p>{mark_story}</p>
        </div>
        <div class="pack-label">
          <h3 class="pack-label-title">On the pack</h3>
          <dl>
{pack_rows}
          </dl>
        </div>
      </div>
    </section>
    <section class="brand-kit">
      <p class="section-label">Print system</p>
      <h2 class="section-title">{print_title}</h2>
      <p class="section-copy">{print_intro}</p>
      <div class="print-system">
{print_figures}
      </div>
    </section>
    <section class="brand-kit">
      <p class="section-label">In the hand / on the phone</p>
      <h2 class="section-title">Window, pack, homepage</h2>
      <div class="touch-grid">
        <figure class="touch-card">
          <img src="../../img/{slug}-print-window.png" alt="{window_alt}" width="1536" height="1024">
        </figure>
        <figure class="touch-card touch-phone">
          <img src="../../img/{slug}-phone.png" alt="{phone_alt}" width="1024" height="1536">
        </figure>
        <figure class="touch-card">
          <img src="../../img/{slug}-print-pack.png" alt="{pack_alt}" width="1536" height="1024">
        </figure>
      </div>
      <p class="section-copy" style="margin:1.25rem 0 0">{touch_copy}</p>
    </section>
    <section class="cta-brand">
      <div class="cta-brand-inner">
        <h2>Let’s sit down</h2>
        <p>Every business is a different room. Invite us over — we Sit, Say, Scatter, Shear, Stage, and Ship a system for that room, not a layout reused from the last shop.</p>
        <a class="btn btn-primary" href="../../contact/index.html">Invite the studio</a>
      </div>
    </section>
  </main>
  <footer class="site-footer">
    <div class="footer-inner">
      <span>© <span id="dps-year">2026</span> D Philhower Studio · dphilhower.com</span>
      <a href="../index.html">All work</a>
    </div>
  </footer>
  <script src="../../js/main.js"></script>
</body>
</html>
"""

PRINT_PIECES = [
    ("seal", "Seal"),
    ("window", "Window"),
    ("menu", "Menu"),
    ("pack", "Pack"),
    ("cards", "Business cards"),
    ("coasters", "Coasters"),
    ("loyalty", "Loyalty card"),
    ("poster", "Dining-room poster"),
    ("matches", "Napkin band and matchbook"),
]

BRANDS = {
    "aurea": {
        "title": "Aurea",
        "meta": "Aurea Italian trattoria identity by D Philhower Studio: gold-leaf monogram in the Philhower & O’Krogly register, dusk window, cream menu, pack.",
        "lede": "Sit → Say → Scatter → Shear → Stage → Ship. Gold leaf on black — Trattoria · Forno · Vino — then the window, the oil, and the phone.",
        "hero_alt": "Aurea gold-leaf monogram and wordmark on black",
        "identity": "Italian trattoria — gold-leaf studio system",
        "body": """        <p>Aurea is built in the Philhower &amp; O’Krogly register: black field, gold leaf, an ornate monogram that has to survive embroidery and a dusk window. The Room Method locked the brief before the foil — Sit in a trattoria that wants leaf, not a flag; Say Trattoria · Forno · Vino; Scatter until only one mark held both black tests and glass.</p>
        <p>No Italian flag. No clipart pizza. The food is inside. Cream stock, teal diamond, and gold leaf agree from the seal to the oil bottle. This is a studio identity, not a live account.</p>""",
        "process_title": "From leaf to glass",
        "process_intro": "Aurea was sheared in the Room Method: one gold-leaf idea that reads on black, on cream, and on glass — then staged on every hold.",
        "steps": [
            ("01 · Sit", "A room that wants leaf", "Who stays for primi, who takes oil home, and what has to live on glass in gold leaf — not a flag, not clipart pizza."),
            ("02 · Say", "Trattoria · Forno · Vino", "One line the window can hold. Black is the plate. Gold is the leaf. Teal is the diamond that frames the monogram."),
            ("03 · Scatter", "Twenty gold answers", "Monograms, seals, Trajan arcs, blackletter locks. Quantity first. No favorites until Shear."),
            ("04 · Shear", "One leaf, one idea", "Ornate gold monogram on black. AUREA in the same leaf. Thin teal diamond. Kill every second idea."),
            ("05 · Stage", "Seal, menu, pack, phone", "Prove the mark on glass, cream list, oil and ragù, cards, coasters, and a homepage that uses the same black and gold."),
            ("06 · Ship", "One kit, every surface", "Print files, naming, and a system the room can run. Studio identity — Morris County, NJ."),
        ],
        "kit_alt": "Aurea identity board: gold-leaf monogram, black, gold, teal, cream",
        "wordmark": "Aurea",
        "wordmark_span": "Trattoria",
        "kit_blurb": "Gold-leaf display for the seal. Quiet serif for primi, secondi, dolci. Black plate, gold monogram, teal diamond, cream stock.",
        "swatches": [
            ("swatch-aurea-black", "Black", "#0E0E0E"),
            ("swatch-aurea-gold", "Gold", "#C9A24A"),
            ("swatch-aurea-teal", "Teal", "#2F5F63"),
            ("swatch-aurea-cream", "Cream", "#F4EFE4"),
        ],
        "display_label": "Display — gold-leaf blackletter",
        "display_sample": "AUREA",
        "display_note": "Seal, window vinyl, poster. Never a paragraph of specials.",
        "body_label": "Body — quiet serif",
        "body_note": "Primi, secondi, dolci. Prices in a column. The kitchen is twenty feet away — no food photos.",
        "system_title": "Gold leaf, teal diamond, the oven in the line",
        "mark_story": "The official mark sits in the Philhower & O’Krogly gold-leaf register: ornate monogram on black, AUREA in the same leaf, a thin teal diamond so the lockup can live on embroidery and on glass. No flag. The food is inside. Trattoria · Forno · Vino sits under the seal so the sidewalk, the menu, and the oil bottle agree.",
        "pack": [
            ("Oil", "Extra virgin · cold pressed · 16.9 fl oz (500 mL)"),
            ("Pasta", "House ragù · 16 oz (454 g)"),
            ("Keep", "Oil: cool, dark. Ragù: keep refrigerated."),
            ("Menu", "Primi · Secondi · Dolci"),
            ("Line", "Trattoria · Forno · Vino"),
            ("Lot", "AU-261010"),
            ("Packed", "Studio identity — Morris County, NJ"),
        ],
        "print_title": "The leaf, then the room",
        "print_intro": "Official gold-leaf badge on black. Gold vinyl on the dusk window. Cream menu with primi, secondi, dolci. Oil, ragù, cards, coasters, loyalty, poster, and matchbook carry the same black and gold.",
        "print_stories": {
            "seal": "The official lockup. Gold-leaf monogram, teal diamond, AUREA. Same leaf language as Philhower & O’Krogly, rewritten for the oven.",
            "window": "Gold leaf on glass, cream hours, hanging wordmark. The sidewalk should know the room before the door.",
            "menu": "Cream stock, black headings, gold rules. No food photos: the kitchen is twenty feet away.",
            "pack": "Same seal on green glass and kraft. Extra virgin 500 mL, house ragù 16 oz, lot AU-261010.",
            "cards": "Black field is the plate, gold leaf is the window stamp in a pocket.",
            "coasters": "The seal in the center so a glass still frames the mark.",
            "loyalty": "Ten visits, one dolci. Oval punches so every return restates the seal.",
            "poster": "The line is the only copy besides the seal. Cream sheet, black ink, one gold rule.",
            "matches": "Black band around cream linen. The matchbook is a pocket version of the poster line.",
        },
        "window_alt": "Aurea dusk trattoria window with the gold-leaf seal on glass",
        "phone_alt": "Phone showing the Aurea homepage",
        "pack_alt": "Aurea olive oil and house ragù with the official seal",
        "touch_copy": "Gold leaf on glass. Oil and ragù carry weight, keep, and lot. The homepage uses the same black and gold as the menu. Studio identity — Morris County, NJ.",
    },
    "juniper": {
        "title": "Juniper Bar",
        "meta": "Juniper Bar identity by D Philhower Studio: botanical seal, navy on cream, dusk window, menu, pack.",
        "lede": "Sit → Say → Scatter → Shear → Stage → Ship. One botanical seal — Gin · Bar · Night — then glass, the list, and the phone.",
        "hero_alt": "Juniper Bar botanical seal: juniper branch, berries, cream plate",
        "identity": "Botanical bar — studio system",
        "body": """        <p>Juniper Bar is a studio system written for a room that wants a botanical seal, not a neon cocktail. The Room Method started at the bar rail: Sit with who walks in for gin, Say Gin · Bar · Night, Scatter until the branch and berries were the only idea that survived black and glass tests.</p>
        <p>No cartoon martini. The food and the pour stay inside. Navy ink on cream stock, a double ring, and a quiet BAR line so the coaster and the window agree. This is a studio identity, not a live account.</p>""",
        "process_title": "From the branch to the glass",
        "process_intro": "Juniper was sheared to one botanical idea that reads on cream, on navy, and on a coaster under a glass.",
        "steps": [
            ("01 · Sit", "A stool at the rail", "Who walks in for gin, who stays for the night, and what has to live on glass in navy — not a cartoon cocktail."),
            ("02 · Say", "Gin · Bar · Night", "One line the window can hold. Cream is the stock. Navy is the ink. The branch is the only picture."),
            ("03 · Scatter", "Twenty botanical answers", "Seals, wordmarks, berry clusters, apothecary labels. Quantity first."),
            ("04 · Shear", "Branch, berries, double ring", "JUNIPER on the top arc. BAR under a rule. Kill decoration that does not carry the plant."),
            ("05 · Stage", "Seal, list, pack, phone", "Prove the mark on glass, cream menu, bottle and kraft, cards, coasters, and a homepage that uses the same navy and cream."),
            ("06 · Ship", "One kit, every surface", "Print files and a system the bar can run. Studio identity — Morris County, NJ."),
        ],
        "kit_alt": "Juniper Bar identity board: botanical seal, navy, cream, sage, brass",
        "wordmark": "Juniper",
        "wordmark_span": "Bar",
        "kit_blurb": "Serif for JUNIPER on the arc. Quiet sans for BAR. Navy ink, cream plate, sage leaf, brass edge.",
        "swatches": [
            ("swatch-juniper-navy", "Navy", "#1C2430"),
            ("swatch-juniper-cream", "Cream", "#F3EFE6"),
            ("swatch-juniper-sage", "Sage", "#6B7F6A"),
            ("swatch-juniper-brass", "Brass", "#C4A35A"),
        ],
        "display_label": "Display — high-contrast serif",
        "display_sample": "JUNIPER",
        "display_note": "Seal, window vinyl, poster. Never a paragraph of specials.",
        "body_label": "Body — quiet sans",
        "body_note": "Gin, bar, small plates. Prices in a column. The rail is twenty feet away — no cocktail photos.",
        "system_title": "Branch in the ring, the night in the name",
        "mark_story": "The official seal is a cream roundel: juniper branch and berries in the center, JUNIPER on the top arc, BAR under a rule, double navy ring. No cartoon martini. The pour stays inside. Gin · Bar · Night sits under the seal so the sidewalk, the list, and the bottle agree.",
        "pack": [
            ("Tonic", "House tonic syrup · 8.5 fl oz (250 mL)"),
            ("Box", "Bar takeaway · kraft"),
            ("Keep", "Syrup: refrigerate after opening."),
            ("Menu", "Gin · Bar · Small plates"),
            ("Line", "Gin · Bar · Night"),
            ("Lot", "JB-261010"),
            ("Packed", "Studio identity — Morris County, NJ"),
        ],
        "print_title": "The seal, then the rail",
        "print_intro": "Official botanical badge on cream. Navy vinyl on the dusk window. Cream menu. Tonic, takeaway, cards, coasters, loyalty, poster, and matchbook carry the same navy and cream.",
        "print_stories": {
            "seal": "The official lockup. Branch, berries, double ring. The pour stays inside.",
            "window": "Seal on glass, cream hours, hanging wordmark. The sidewalk should know the bar before the door.",
            "menu": "Cream stock, navy headings, thin brass rules. No cocktail photos.",
            "pack": "Same seal on glass and kraft. House tonic 250 mL, lot JB-261010.",
            "cards": "Navy field is the night, cream seal is the window stamp in a pocket.",
            "coasters": "The seal in the center so a glass still frames the mark.",
            "loyalty": "Ten visits, one round. Oval punches so every return restates the seal.",
            "poster": "The line is the only copy besides the seal. Cream sheet, navy ink, one brass rule.",
            "matches": "Navy band around cream linen. The matchbook is a pocket version of the poster line.",
        },
        "window_alt": "Juniper Bar dusk window with the botanical seal on glass",
        "phone_alt": "Phone showing the Juniper Bar homepage",
        "pack_alt": "Juniper Bar tonic bottle and kraft takeaway with the official seal",
        "touch_copy": "Seal on glass. Tonic and kraft carry weight, keep, and lot. The homepage uses the same navy and cream as the menu. Studio identity — Morris County, NJ.",
    },
    "kiln": {
        "title": "Kiln Fired",
        "meta": "Kiln Fired identity by D Philhower Studio: kiln-mouth seal with a single flame, dusk window, menu, pack.",
        "lede": "Sit → Say → Scatter → Shear → Stage → Ship. One kiln mouth, one flame — Fire · Dough · Night — then glass, the list, and the phone.",
        "hero_alt": "Kiln Fired seal: kiln arch, charcoal, single orange flame",
        "identity": "Wood-fired room — studio system",
        "body": """        <p>Kiln Fired is a studio system written for a room with an oven mouth and one flame. The Room Method started at the pass: Sit with who walks in for fire-cooked food, Say Fire · Dough · Night, Scatter until the arch and a single flame were the only geometry that survived black and glass tests.</p>
        <p>No clipart pizza. No second flame. Charcoal for the kiln, orange for heat, cream for the stock. The food stays inside. This is a studio identity, not a live account.</p>""",
        "process_title": "From the mouth to the flame",
        "process_intro": "Kiln was sheared to one idea: an arch, a pile of coal, a single orange flame that still reads on a coaster.",
        "steps": [
            ("01 · Sit", "Stand at the oven mouth", "Who walks in for fire, who takes dough home, and what has to live on glass in orange — not a cartoon pizza."),
            ("02 · Say", "Fire · Dough · Night", "One line the window can hold. Charcoal is the kiln. Cream is the stock. Orange is the only loud color."),
            ("03 · Scatter", "Twenty fire answers", "Seals, wordmarks, oven doors, wheat-and-flame locks. Quantity first."),
            ("04 · Shear", "Arch, coal, one flame", "KILN on the top arc. FIRED on the bottom. Kill every second flame and every second idea."),
            ("05 · Stage", "Seal, list, pack, phone", "Prove the mark on glass, cream menu, jar and kraft, cards, coasters, and a homepage that uses the same charcoal and orange."),
            ("06 · Ship", "One kit, every surface", "Print files and a system the room can run. Studio identity — Morris County, NJ."),
        ],
        "kit_alt": "Kiln Fired identity board: kiln seal, charcoal, flame, cream, ash",
        "wordmark": "Kiln",
        "wordmark_span": "Fired",
        "kit_blurb": "Heavy sans for KILN / FIRED. Quiet body for the list. Charcoal plate, orange flame, cream stock, ash ground.",
        "swatches": [
            ("swatch-kiln-charcoal", "Charcoal", "#1C1C1C"),
            ("swatch-kiln-flame", "Flame", "#E85C28"),
            ("swatch-kiln-cream", "Cream", "#F7F1E6"),
            ("swatch-kiln-ash", "Ash", "#8A847A"),
        ],
        "display_label": "Display — heavy sans",
        "display_sample": "KILN FIRED",
        "display_note": "Seal, window vinyl, poster. Never a paragraph of specials.",
        "body_label": "Body — quiet sans",
        "body_note": "Fire, dough, sides. Prices in a column. The oven is twenty feet away — no food photos.",
        "system_title": "One flame in the mouth, the night in the name",
        "mark_story": "The official seal is a cream roundel: kiln arch and coal in charcoal, a single orange flame, KILN and FIRED on the arcs. No clipart pizza. The food stays inside. Fire · Dough · Night sits under the seal so the sidewalk, the list, and the jar agree.",
        "pack": [
            ("Oil", "House chili oil · 6.8 fl oz (200 mL)"),
            ("Box", "Fire takeaway · kraft"),
            ("Keep", "Oil: cool, dark. Box: keep hot / eat soon."),
            ("Menu", "Fire · Dough · Sides"),
            ("Line", "Fire · Dough · Night"),
            ("Lot", "KF-261010"),
            ("Packed", "Studio identity — Morris County, NJ"),
        ],
        "print_title": "The seal, then the oven",
        "print_intro": "Official kiln badge on cream. Orange vinyl on the dusk window. Cream menu. Oil, takeaway, cards, coasters, loyalty, poster, and matchbook carry the same charcoal and flame.",
        "print_stories": {
            "seal": "The official lockup. Arch, coal, one flame. The food stays inside.",
            "window": "Seal on glass, cream hours, hanging wordmark. The sidewalk should know the oven before the door.",
            "menu": "Cream stock, charcoal headings, thin flame rules. No food photos.",
            "pack": "Same seal on glass and kraft. Chili oil 200 mL, lot KF-261010.",
            "cards": "Charcoal field is the kiln, orange flame is the window stamp in a pocket.",
            "coasters": "The seal in the center so a glass still frames the mark.",
            "loyalty": "Ten visits, one pie. Oval punches so every return restates the seal.",
            "poster": "The line is the only copy besides the seal. Cream sheet, charcoal ink, one flame rule.",
            "matches": "Charcoal band around cream linen. The matchbook is a pocket version of the poster line.",
        },
        "window_alt": "Kiln Fired dusk window with the kiln seal on glass",
        "phone_alt": "Phone showing the Kiln Fired homepage",
        "pack_alt": "Kiln Fired oil bottle and kraft takeaway with the official seal",
        "touch_copy": "Seal on glass. Oil and kraft carry weight, keep, and lot. The homepage uses the same charcoal and flame as the menu. Studio identity — Morris County, NJ.",
    },
}


def esc(s: str) -> str:
    return s.replace("&", "&amp;").replace("<", "&lt;") if False else s


def process_steps_html(steps):
    parts = []
    for num, title, copy in steps:
        parts.append(
            f"""        <div class="process-step">
          <span class="process-num">{num}</span>
          <strong>{title}</strong>
          <p>{copy}</p>
        </div>"""
        )
    return "\n".join(parts)


def swatches_html(swatches):
    return "\n".join(
        f'          <div class="swatch {cls}"><b>{name}</b>{hexv}</div>'
        for cls, name, hexv in swatches
    )


def pack_rows_html(rows):
    return "\n".join(
        f'            <div class="pack-row"><dt>{lab}</dt><dd>{val}</dd></div>'
        for lab, val in rows
    )


def print_figures_html(slug, stories, alts):
    parts = []
    for key, heading in PRINT_PIECES:
        file = f"{slug}-print-{key}.png"
        alt = alts.get(key, f"{slug} {heading}")
        story = stories[key]
        parts.append(
            f"""        <figure>
          <img src="../../img/{file}" alt="{alt}" width="1536" height="1024">
          <figcaption><strong>{heading}</strong> {story}</figcaption>
        </figure>"""
        )
    return "\n".join(parts)


def write_cases():
    for slug, b in BRANDS.items():
        alts = {
            "seal": f"{b['title']} official seal",
            "window": b["window_alt"],
            "menu": f"{b['title']} cream menu",
            "pack": b["pack_alt"],
            "cards": f"{b['title']} business cards",
            "coasters": f"{b['title']} coasters",
            "loyalty": f"{b['title']} loyalty card",
            "poster": f"{b['title']} dining-room poster",
            "matches": f"{b['title']} napkin band and matchbook",
        }
        html = CASE_TEMPLATE.format(
            slug=slug,
            title=b["title"],
            meta=b["meta"],
            lede=b["lede"],
            hero_alt=b["hero_alt"],
            identity=b["identity"],
            body=b["body"],
            process_title=b["process_title"],
            process_intro=b["process_intro"],
            process_steps=process_steps_html(b["steps"]),
            kit_alt=b["kit_alt"],
            wordmark=b["wordmark"],
            wordmark_span=b["wordmark_span"],
            kit_blurb=b["kit_blurb"],
            swatches=swatches_html(b["swatches"]),
            display_label=b["display_label"],
            display_sample=b["display_sample"],
            display_note=b["display_note"],
            body_label=b["body_label"],
            body_note=b["body_note"],
            system_title=b["system_title"],
            mark_story=b["mark_story"],
            pack_rows=pack_rows_html(b["pack"]),
            print_title=b["print_title"],
            print_intro=b["print_intro"],
            print_figures=print_figures_html(slug, b["print_stories"], alts),
            window_alt=b["window_alt"],
            phone_alt=b["phone_alt"],
            pack_alt=b["pack_alt"],
            touch_copy=b["touch_copy"],
        )
        out = PREV / "work" / slug / "index.html"
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_text(html)
        print("wrote", out)


def patch_navs():
    """Insert Process link into preview HTML navs if missing."""
    for path in PREV.rglob("*.html"):
        text = path.read_text()
        if "process/index.html" in text and ">Process<" in text:
            continue
        # determine relative process href
        rel = path.relative_to(PREV)
        depth = len(rel.parts) - 1
        if depth == 0:
            href = "process/index.html"
        elif depth == 1:
            href = "../process/index.html"
        else:
            href = "../../process/index.html"
        needle = '      <li><a href="'
        # insert after Brands li
        import re

        pattern = re.compile(
            r'(<li><a href="[^"]*(?:work(?:/index\.html)?|/work/)[^"]*"[^>]*>Brands</a></li>\n)',
            re.I,
        )
        m = pattern.search(text)
        if not m:
            continue
        insert = m.group(1) + f'      <li><a href="{href}">Process</a></li>\n'
        if path.name == "index.html" and "process" in str(path.parent):
            insert = m.group(1) + f'      <li><a href="{href}" aria-current="page">Process</a></li>\n'
        text2 = pattern.sub(insert, text, count=1)
        if text2 != text:
            path.write_text(text2)
            print("nav+", path)


def php_process_block(slug: str, b: dict) -> str:
    lines = [
        f"\t\t'{slug}' => array(",
        f"\t\t\t'title' => __( '{b['process_title'].replace(chr(39), chr(92)+chr(39))}', 'dphilhower-studio' ),",
        f"\t\t\t'intro' => __( '{b['process_intro'].replace(chr(39), chr(92)+chr(39))}', 'dphilhower-studio' ),",
        "\t\t\t'steps' => array(",
    ]
    for num, title, copy in b["steps"]:
        lines.append("\t\t\t\tarray(")
        lines.append(f"\t\t\t\t\t'num'   => __( '{num}', 'dphilhower-studio' ),")
        lines.append(f"\t\t\t\t\t'title' => __( '{title.replace(chr(39), chr(92)+chr(39))}', 'dphilhower-studio' ),")
        lines.append(f"\t\t\t\t\t'copy'  => __( '{copy.replace(chr(39), chr(92)+chr(39))}', 'dphilhower-studio' ),")
        lines.append("\t\t\t\t),")
    lines.append("\t\t\t),")
    lines.append("\t\t),")
    return "\n".join(lines)


def php_identity_block(slug: str, b: dict) -> str:
    sw = ",\n".join(
        f"\t\t\t\tarray( 'class' => '{cls}', 'name' => '{name}', 'hex' => '{hexv}' )"
        for cls, name, hexv in b["swatches"]
    )
    return f"""\t\t'{slug}' => array(
\t\t\t'wordmark'       => '{b['wordmark']}',
\t\t\t'wordmark_span'  => '{b['wordmark_span']}',
\t\t\t'blurb'          => __( '{b['kit_blurb'].replace(chr(39), chr(92)+chr(39))}', 'dphilhower-studio' ),
\t\t\t'board'          => '{slug}-kit.png',
\t\t\t'board_alt'      => __( '{b['kit_alt'].replace(chr(39), chr(92)+chr(39))}', 'dphilhower-studio' ),
\t\t\t'swatches'       => array(
{sw},
\t\t\t),
\t\t\t'display_label'  => __( '{b['display_label'].replace(chr(39), chr(92)+chr(39))}', 'dphilhower-studio' ),
\t\t\t'display_sample' => '{b['display_sample']}',
\t\t\t'display_note'   => __( '{b['display_note'].replace(chr(39), chr(92)+chr(39))}', 'dphilhower-studio' ),
\t\t\t'body_label'     => __( '{b['body_label'].replace(chr(39), chr(92)+chr(39))}', 'dphilhower-studio' ),
\t\t\t'body_note'      => __( '{b['body_note'].replace(chr(39), chr(92)+chr(39))}', 'dphilhower-studio' ),
\t\t),"""


def php_touch_block(slug: str, b: dict) -> str:
    return f"""\t\t'{slug}' => array(
\t\t\t'title' => __( 'Window, pack, homepage', 'dphilhower-studio' ),
\t\t\t'copy'  => __( '{b['touch_copy'].replace(chr(39), chr(92)+chr(39))}', 'dphilhower-studio' ),
\t\t\t'items' => array(
\t\t\t\tarray(
\t\t\t\t\t'file'  => '{slug}-print-window.png',
\t\t\t\t\t'alt'   => __( '{b['window_alt'].replace(chr(39), chr(92)+chr(39))}', 'dphilhower-studio' ),
\t\t\t\t\t'phone' => false,
\t\t\t\t),
\t\t\t\tarray(
\t\t\t\t\t'file'  => '{slug}-phone.png',
\t\t\t\t\t'alt'   => __( '{b['phone_alt'].replace(chr(39), chr(92)+chr(39))}', 'dphilhower-studio' ),
\t\t\t\t\t'phone' => true,
\t\t\t\t),
\t\t\t\tarray(
\t\t\t\t\t'file'  => '{slug}-print-pack.png',
\t\t\t\t\t'alt'   => __( '{b['pack_alt'].replace(chr(39), chr(92)+chr(39))}', 'dphilhower-studio' ),
\t\t\t\t\t'phone' => false,
\t\t\t\t),
\t\t\t),
\t\t),"""


def php_system_block(slug: str, b: dict) -> str:
    pack_lines = []
    for lab, val in b["pack"]:
        pack_lines.append(
            f"\t\t\t\tarray( 'label' => __( '{lab}', 'dphilhower-studio' ), 'value' => __( '{val.replace(chr(39), chr(92)+chr(39))}', 'dphilhower-studio' ) ),"
        )
    return f"""\t\t'{slug}' => array(
\t\t\t'title' => __( '{b['system_title'].replace(chr(39), chr(92)+chr(39))}', 'dphilhower-studio' ),
\t\t\t'mark'  => __( '{b['mark_story'].replace(chr(39), chr(92)+chr(39))}', 'dphilhower-studio' ),
\t\t\t'pack'  => array(
{chr(10).join(pack_lines)}
\t\t\t),
\t\t),"""


def php_kit_block(slug: str, b: dict) -> str:
    pieces = []
    headings = dict(PRINT_PIECES)
    for key, heading in PRINT_PIECES:
        story = b["print_stories"][key]
        alt = f"{b['title']} {heading.lower()}"
        pieces.append(
            f"""\t\t\t\tarray(
\t\t\t\t\t'file'    => '{slug}-print-{key}.png',
\t\t\t\t\t'alt'     => __( '{alt.replace(chr(39), chr(92)+chr(39))}', 'dphilhower-studio' ),
\t\t\t\t\t'heading' => __( '{heading}', 'dphilhower-studio' ),
\t\t\t\t\t'story'   => __( '{story.replace(chr(39), chr(92)+chr(39))}', 'dphilhower-studio' ),
\t\t\t\t),"""
        )
    return f"""\t\t'{slug}' => array(
\t\t\t'label'  => __( 'Print system', 'dphilhower-studio' ),
\t\t\t'title'  => __( '{b['print_title'].replace(chr(39), chr(92)+chr(39))}', 'dphilhower-studio' ),
\t\t\t'intro'  => __( '{b['print_intro'].replace(chr(39), chr(92)+chr(39))}', 'dphilhower-studio' ),
\t\t\t'pieces' => array(
{chr(10).join(pieces)}
\t\t\t),
\t\t),"""


def insert_before(path: Path, marker: str, block: str, already: str):
    text = path.read_text()
    if already in text:
        print("skip", path.name, already)
        return
    if marker not in text:
        raise SystemExit(f"marker missing in {path}: {marker}")
    path.write_text(text.replace(marker, block + "\n" + marker, 1))
    print("patched", path)


def patch_php():
    rf = THEME / "inc" / "restaurant-full.php"
    # Insert before closing of dps_brand_processes — marker is last mizu process then );
    # Use mizu touchpoints end as safer unique markers
    text = rf.read_text()
    if "'aurea'" not in text:
        # processes: insert before final ");\n}" of dps_brand_processes — after mizu process block
        marker = "\t\t),\n\t);\n}\n\n/**\n * Mark / color / type boards"
        blocks = "\n".join(php_process_block(s, BRANDS[s]) for s in ("aurea", "juniper", "kiln"))
        # Fix: process blocks end with ), and we need them inside the array before );
        # Current marker starts with ), which closes mizu — we want to ADD after mizu's closing
        marker2 = "\t\t),\n\t);\n}\n\n/**\n * Mark / color / type boards for the restaurant systems."
        if marker2 not in text:
            raise SystemExit("process marker missing")
        # The mizu entry ends with ), then ); closes function array. Insert new brands before );
        text = text.replace(
            marker2,
            "\t\t),\n"
            + "\n".join(php_process_block(s, BRANDS[s]) for s in ("aurea", "juniper", "kiln"))
            + "\n\t);\n}\n\n/**\n * Mark / color / type boards for the restaurant systems.",
            1,
        )
        # That duplicated the mizu closing ), — fix by removing duplicate
        # Actually: marker2 starts with \t\t),\n so we replaced mizu's ), + ); with ), + NEW + );
        # But php_process_block already includes full entries. The first \t\t), in replacement is mizu close. Good.

        marker_id = "\t\t),\n\t);\n}\n\n/**\n * Bag / window / phone stills after the print system."
        text = text.replace(
            marker_id,
            "\t\t),\n"
            + "\n".join(php_identity_block(s, BRANDS[s]) for s in ("aurea", "juniper", "kiln"))
            + "\n\t);\n}\n\n/**\n * Bag / window / phone stills after the print system.",
            1,
        )

        marker_tp = "\t\t),\n\t);\n}\n\n/**\n * Render the four-step process for a restaurant slug."
        text = text.replace(
            marker_tp,
            "\t\t),\n"
            + "\n".join(php_touch_block(s, BRANDS[s]) for s in ("aurea", "juniper", "kiln"))
            + "\n\t);\n}\n\n/**\n * Render the four-step process for a restaurant slug.",
            1,
        )
        rf.write_text(text)
        print("patched restaurant-full.php")
    else:
        print("skip restaurant-full brands")

    # brand-systems
    bs = THEME / "inc" / "brand-systems.php"
    bt = bs.read_text()
    if "'aurea'" not in bt:
        marker = "\t\t'pattern-studies'"
        block = "\n".join(php_system_block(s, BRANDS[s]) for s in ("aurea", "juniper", "kiln")) + "\n"
        bs.write_text(bt.replace(marker, block + marker, 1))
        print("patched brand-systems.php")

    # brand-kits
    bk = THEME / "inc" / "brand-kits.php"
    kt = bk.read_text()
    if "'aurea'" not in kt:
        marker = "\t\t'fitness-kick-boxing'"
        block = "\n".join(php_kit_block(s, BRANDS[s]) for s in ("aurea", "juniper", "kiln")) + "\n"
        bk.write_text(kt.replace(marker, block + marker, 1))
        print("patched brand-kits.php")

    # helpers slugs + stills
    hp = THEME / "inc" / "helpers.php"
    ht = hp.read_text()
    if "'aurea'" not in ht:
        ht = ht.replace(
            """\treturn array(
\t\t'bville-pizza-grill',
\t\t'ember-pie-co',
\t\t'casa-forno',
\t\t'salt-cedar',
\t\t'noche-roja',
\t\t'hearth-rye',
\t\t'black-olive',
\t\t'mizu',
\t);""",
            """\treturn array(
\t\t'bville-pizza-grill',
\t\t'ember-pie-co',
\t\t'casa-forno',
\t\t'aurea',
\t\t'juniper',
\t\t'kiln',
\t\t'salt-cedar',
\t\t'noche-roja',
\t\t'hearth-rye',
\t\t'black-olive',
\t\t'mizu',
\t);""",
            1,
        )
        stills = """\t\t'aurea'              => array(
\t\t\t'file' => 'aurea-print-window.png',
\t\t\t'alt'  => __( 'Aurea dusk trattoria window with the gold-leaf seal on glass', 'dphilhower-studio' ),
\t\t),
\t\t'juniper'            => array(
\t\t\t'file' => 'juniper-print-window.png',
\t\t\t'alt'  => __( 'Juniper Bar dusk window with the botanical seal on glass', 'dphilhower-studio' ),
\t\t),
\t\t'kiln'               => array(
\t\t\t'file' => 'kiln-print-window.png',
\t\t\t'alt'  => __( 'Kiln Fired dusk window with the kiln seal on glass', 'dphilhower-studio' ),
\t\t),
\t\t'salt-cedar'"""
        ht = ht.replace("\t\t'salt-cedar'", stills, 1)
        # nav Process
        ht = ht.replace(
            """\t<ul class="nav" id="site-nav">
\t\t<li><a href="<?php echo esc_url( $work_url ); ?>"><?php esc_html_e( 'Brands', 'dphilhower-studio' ); ?></a></li>
\t\t<li><a href="<?php echo esc_url( home_url( '/services/' ) ); ?>"><?php esc_html_e( 'Services', 'dphilhower-studio' ); ?></a></li>""",
            """\t<ul class="nav" id="site-nav">
\t\t<li><a href="<?php echo esc_url( $work_url ); ?>"><?php esc_html_e( 'Brands', 'dphilhower-studio' ); ?></a></li>
\t\t<li><a href="<?php echo esc_url( home_url( '/process/' ) ); ?>"><?php esc_html_e( 'Process', 'dphilhower-studio' ); ?></a></li>
\t\t<li><a href="<?php echo esc_url( home_url( '/services/' ) ); ?>"><?php esc_html_e( 'Services', 'dphilhower-studio' ); ?></a></li>""",
            1,
        )
        hp.write_text(ht)
        print("patched helpers.php")

    # setup-content projects + process page + nav
    sc = THEME / "inc" / "setup-content.php"
    st = sc.read_text()
    if "'aurea'" not in st:
        projects = """\t\tarray(
\t\t\t'slug'     => 'aurea',
\t\t\t'title'    => 'Aurea',
\t\t\t'image'    => 'aurea-hero.png',
\t\t\t'excerpt'  => 'Room Method · gold-leaf trattoria',
\t\t\t'subtitle' => 'Room Method · gold-leaf trattoria',
\t\t\t'client'   => 'Studio identity — Italian trattoria (gold leaf)',
\t\t\t'services' => 'Identity · Room Method · menu · window · packaging · website',
\t\t\t'year'     => '2026',
\t\t\t'location' => 'Morris County, NJ',
\t\t\t'content'  => '<p>Aurea is built in the Philhower &amp; O\\'Krogly register: black field, gold leaf, an ornate monogram that has to survive embroidery and a dusk window. The Room Method locked the brief before the foil.</p><p>No Italian flag. No clipart pizza. The food is inside. Trattoria · Forno · Vino sits under the seal. This is a studio identity, not a live account.</p>',
\t\t),
\t\tarray(
\t\t\t'slug'     => 'juniper',
\t\t\t'title'    => 'Juniper Bar',
\t\t\t'image'    => 'juniper-hero.png',
\t\t\t'excerpt'  => 'Room Method · botanical bar',
\t\t\t'subtitle' => 'Room Method · botanical bar',
\t\t\t'client'   => 'Studio identity — botanical bar',
\t\t\t'services' => 'Identity · Room Method · menu · window · packaging · website',
\t\t\t'year'     => '2026',
\t\t\t'location' => 'Morris County, NJ',
\t\t\t'content'  => '<p>Juniper Bar is a studio system written for a room that wants a botanical seal, not a neon cocktail. Sit at the rail, say Gin · Bar · Night, shear to one branch and berries, then stage on glass, cream, and kraft.</p><p>No cartoon martini. This is a studio identity, not a live account.</p>',
\t\t),
\t\tarray(
\t\t\t'slug'     => 'kiln',
\t\t\t'title'    => 'Kiln Fired',
\t\t\t'image'    => 'kiln-hero.png',
\t\t\t'excerpt'  => 'Room Method · wood-fired room',
\t\t\t'subtitle' => 'Room Method · wood-fired room',
\t\t\t'client'   => 'Studio identity — wood-fired room',
\t\t\t'services' => 'Identity · Room Method · menu · window · packaging · website',
\t\t\t'year'     => '2026',
\t\t\t'location' => 'Morris County, NJ',
\t\t\t'content'  => '<p>Kiln Fired is a studio system written for a room with an oven mouth and one flame. Sit at the pass, say Fire · Dough · Night, shear to an arch and a single orange flame, then stage on glass, cream, and kraft.</p><p>No clipart pizza. This is a studio identity, not a live account.</p>',
\t\t),
"""
        st = st.replace(
            "\t\tarray(\n\t\t\t'slug'     => 'salt-cedar',",
            projects + "\t\tarray(\n\t\t\t'slug'     => 'salt-cedar',",
            1,
        )
        # process page seed — find dps_upsert_page calls
        if "process" not in st.split("dps_upsert_page")[0] if False else True:
            # add after about page upsert — search for services upsert pattern
            pass
        sc.write_text(st)
        print("patched setup projects")


if __name__ == "__main__":
    write_cases()
    patch_php()
    print("done core")
