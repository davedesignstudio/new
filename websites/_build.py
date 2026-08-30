#!/usr/bin/env python3
"""Generate Pass GY Survey brand sites + index."""
from pathlib import Path

ROOT = Path(__file__).resolve().parent

FONTS = """
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,700&family=Instrument+Sans:wght@400;500;600&family=Bodoni+Moda:opsz,wght@6..96,500;6..96,700&family=DM+Sans:wght@400;500;600&family=Libre+Baskerville:wght@400;700&family=Source+Sans+3:wght@400;600&family=Syne:wght@600;700&family=IBM+Plex+Sans:wght@400;500;600&family=Cormorant+Garamond:wght@500;600&family=Outfit:wght@400;500;600&display=swap" rel="stylesheet">
"""

SHARED_MOTION = """
@keyframes rise { from { transform: translateY(14px); } to { transform: none; } }
@keyframes drift { from { transform: translateY(0); } to { transform: translateY(-6px); } }
@keyframes pulse-line { 0%,100% { opacity: .55; } 50% { opacity: 1; } }
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition: none !important; }
}
@media (prefers-reduced-motion: no-preference) {
  header { animation: rise .7s ease both; }
  .hero-content { animation: rise .8s .05s ease both; }
  .place-credit { animation: rise .9s .1s ease both; }
  .stakes { animation: pulse-line 3.5s ease infinite; }
  .hero-media { animation: drift 14s ease-in-out alternate infinite; }
}
"""

def site(brand, cfg):
    css = f"""
:root {{
  --bg: {cfg['bg']};
  --ink: {cfg['ink']};
  --accent: {cfg['accent']};
  --muted: {cfg['muted']};
  --surface: {cfg['surface']};
  --display: {cfg['display']};
  --body: {cfg['body']};
}}
* {{ box-sizing: border-box; margin: 0; padding: 0; }}
html {{ scroll-behavior: smooth; }}
body {{
  font-family: var(--body);
  color: var(--ink);
  background: var(--bg);
  line-height: 1.55;
  overflow-x: hidden;
}}
{SHARED_MOTION}
.site-bg {{
  position: fixed; inset: 0; z-index: -1;
  background:
    radial-gradient(ellipse 80% 50% at 10% 0%, {cfg['glow']}, transparent 55%),
    radial-gradient(ellipse 60% 40% at 90% 20%, {cfg['glow2']}, transparent 50%),
    {cfg['pattern']},
    var(--bg);
}}
header {{
  display: flex; align-items: center; justify-content: space-between;
  padding: 1.1rem 6vw; position: relative; z-index: 5;
}}
.brand {{
  display: flex; align-items: center; gap: .75rem;
  text-decoration: none; color: var(--ink);
}}
.brand img {{ width: 48px; height: 48px; object-fit: contain; }}
.brand span {{
  font-family: var(--display);
  font-size: 1.35rem; font-weight: 600; letter-spacing: .01em;
}}
nav {{ display: flex; gap: 1.4rem; }}
nav a {{
  color: var(--muted); text-decoration: none; font-size: .92rem; font-weight: 500;
}}
nav a:hover {{ color: var(--ink); }}
.hero {{
  min-height: calc(100vh - 7rem); min-height: calc(100dvh - 7rem);
  display: grid; grid-template-rows: 1fr auto;
  position: relative; color: #fff;
  width: 100%;
}}
.hero-media {{
  position: absolute; inset: 0; width: 100%; height: 100%;
  background-color: #1a1210;
  background-image: {cfg['hero_overlay']}, url('assets/hero.png');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}}
.hero-content {{
  position: relative; z-index: 2;
  padding: 18vh 6vw 2rem;
  max-width: 38rem;
}}
.hero-content .wordmark {{
  font-family: var(--display);
  font-size: clamp(2.8rem, 7vw, 5.2rem);
  line-height: .95; font-weight: 700;
  margin-bottom: 1rem;
  text-shadow: 0 2px 24px rgba(0,0,0,.35);
}}
.hero-content p {{
  font-size: 1.1rem; max-width: 28rem;
  opacity: .92; margin-bottom: 1.75rem;
}}
.cta-row {{ display: flex; flex-wrap: wrap; gap: .75rem; }}
.btn {{
  display: inline-flex; align-items: center; justify-content: center;
  min-height: 48px; padding: .85rem 1.4rem;
  border-radius: 2px; font-weight: 600; font-size: .95rem;
  text-decoration: none; border: none; cursor: pointer;
  transition: transform .2s ease, background .2s ease;
}}
.btn:hover {{ transform: translateY(-2px); }}
.btn-primary {{ background: var(--accent); color: {cfg['btn_ink']}; }}
.btn-ghost {{
  background: transparent; color: #fff;
  border: 1px solid rgba(255,255,255,.55);
}}
.place-credit {{
  position: relative; z-index: 2;
  padding: 1rem 6vw 1.5rem;
  font-size: .78rem; letter-spacing: .04em;
  text-transform: uppercase; opacity: .8;
}}
.stakes {{
  background: {cfg['stakes_bg']};
  color: {cfg['stakes_ink']};
  padding: .9rem 6vw;
  font-size: .92rem;
  border-top: 3px solid var(--accent);
}}
.stakes strong {{ font-weight: 600; }}
section {{
  padding: 4.5rem 6vw;
  max-width: 1100px;
}}
section h2 {{
  font-family: var(--display);
  font-size: clamp(1.8rem, 3.5vw, 2.6rem);
  margin-bottom: .6rem; line-height: 1.15;
}}
section .lead {{
  color: var(--muted); max-width: 36rem; margin-bottom: 2rem;
}}
.menu-list, .vault-list {{
  display: grid; gap: 1.25rem;
}}
.menu-list article, .vault-list article {{
  display: grid; grid-template-columns: 1fr auto;
  gap: .5rem 1.5rem; align-items: baseline;
  padding-bottom: 1rem;
  border-bottom: 1px solid {cfg['rule']};
}}
.menu-list h3, .vault-list h3 {{
  font-family: var(--display); font-size: 1.25rem; font-weight: 600;
}}
.menu-list p, .vault-list p {{
  grid-column: 1 / -1; color: var(--muted); font-size: .95rem;
}}
.price {{ font-weight: 600; color: var(--accent); white-space: nowrap; }}
.ail {{
  background: var(--surface);
  padding: 1.25rem 1.5rem;
  border-left: 4px solid var(--accent);
  max-width: 34rem;
  font-size: .95rem;
}}
.ail .label {{
  font-size: .72rem; letter-spacing: .08em; text-transform: uppercase;
  color: var(--muted); margin-bottom: .35rem;
}}
footer {{
  padding: 2.5rem 6vw 3rem;
  border-top: 1px solid {cfg['rule']};
  color: var(--muted); font-size: .88rem;
  display: flex; flex-wrap: wrap; gap: 1rem; justify-content: space-between;
}}
footer a {{ color: var(--ink); }}
@media (max-width: 700px) {{
  nav {{ display: none; }}
  .hero-content {{ padding-top: 14vh; }}
}}
"""
    stakes = ""
    if cfg.get("stakes"):
        stakes = f'<aside class="stakes" role="note"><strong>Know this:</strong> {cfg["stakes"]}</aside>'

    items = "\n".join(
        f"""<article>
  <h3>{t}</h3>
  <span class="price">{p}</span>
  <p>{d}</p>
</article>"""
        for t, p, d in cfg["items"]
    )

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{cfg['title']}</title>
<meta name="description" content="{cfg['desc']}">
{FONTS}
<style>{css}</style>
</head>
<body>
<div class="site-bg" aria-hidden="true"></div>
<header>
  <a class="brand" href="index.html">
    <img src="assets/logo.png" alt="{brand} logo" width="48" height="48">
    <span>{brand}</span>
  </a>
  <nav aria-label="Primary">
    <a href="#offer">{cfg['nav_offer']}</a>
    <a href="#visit">Visit</a>
    <a href="#hold">{cfg['nav_cta']}</a>
  </nav>
</header>
{stakes}
<main>
  <section class="hero" aria-label="Hero">
    <div class="hero-media" role="img" aria-label="{cfg['place']}"></div>
    <div class="hero-content">
      <h1 class="wordmark">{brand}</h1>
      <p>{cfg['tagline']}</p>
      <div class="cta-row">
        <a class="btn btn-primary" href="#hold">{cfg['cta_primary']}</a>
        <a class="btn btn-ghost" href="#offer">{cfg['cta_secondary']}</a>
      </div>
    </div>
    <p class="place-credit">Place · {cfg['place']}</p>
  </section>

  <section id="offer">
    <h2>{cfg['offer_h']}</h2>
    <p class="lead">{cfg['offer_lead']}</p>
    <div class="{cfg['list_class']}">
      {items}
    </div>
  </section>

  <section id="hold">
    <h2>{cfg['hold_h']}</h2>
    <p class="lead">{cfg['hold_lead']}</p>
    <div class="ail" id="visit">
      <div class="label">Status · Action + Item + Limit</div>
      <p><strong>{cfg['ail_action']}</strong> {cfg['ail_item']} <em>{cfg['ail_limit']}</em></p>
    </div>
  </section>
</main>
<footer>
  <p>{brand} · Pass GY Survey · Design as hospitality</p>
  <p><a href="../index.html">All five brands</a></p>
</footer>
</body>
</html>
"""

BRANDS = {
    "Kiln & Cup": {
        "folder": "kiln-and-cup",
        "title": "Kiln & Cup — Ceramic Cafe",
        "desc": "Hand-thrown cups and slow coffee beside a working kiln.",
        "bg": "#F7F0E8",
        "ink": "#2A1810",
        "accent": "#C45C26",
        "muted": "#6B5344",
        "surface": "#EFE4D6",
        "display": "'Fraunces', Georgia, serif",
        "body": "'Instrument Sans', system-ui, sans-serif",
        "glow": "rgba(196,92,38,.18)",
        "glow2": "rgba(61,35,20,.08)",
        "pattern": "repeating-linear-gradient(135deg, transparent, transparent 22px, rgba(42,24,16,.03) 22px, rgba(42,24,16,.03) 23px)",
        "hero_overlay": "linear-gradient(105deg, rgba(42,24,16,.72) 0%, rgba(42,24,16,.25) 55%, rgba(42,24,16,.4) 100%)",
        "btn_ink": "#fff",
        "stakes_bg": "#2A1810",
        "stakes_ink": "#F7F0E8",
        "rule": "rgba(42,24,16,.15)",
        "stakes": "Allergy & ceramic-dust note: tell us about nut allergies before ordering; workshop tours stay behind the rail.",
        "tagline": "Fired clay, poured coffee — a workshop cafe where every cup remembers the kiln.",
        "place": "Kiln workshop, morning light",
        "nav_offer": "Menu",
        "nav_cta": "Reserve",
        "cta_primary": "Reserve a seat",
        "cta_secondary": "See the pour",
        "offer_h": "What we pour",
        "offer_lead": "One job here: coffee and clay. No brunch circus.",
        "list_class": "menu-list",
        "items": [
            ("House pour-over", "$5", "Single-origin, ceramic dripper, quiet table."),
            ("Kiln latte", "$6", "Steamed milk in a hand-thrown cup — keep the cup for +$18."),
            ("Workshop biscuit", "$4", "Buttery shortbread; nut-free batch marked daily."),
        ],
        "hold_h": "Hold a seat",
        "hold_lead": "Hospitality first: we disclose stakes before you commit.",
        "ail_action": "Reserve",
        "ail_item": "a window seat for two",
        "ail_limit": "— holds 20 minutes past your time.",
    },
    "Mist Harbor": {
        "folder": "mist-harbor",
        "title": "Mist Harbor — Coastal Cafe",
        "desc": "Fog-side coffee on the pier.",
        "bg": "#E8F0F2",
        "ink": "#1B3A4B",
        "accent": "#2F7D6D",
        "muted": "#4A6670",
        "surface": "#D5E4E8",
        "display": "'Cormorant Garamond', Georgia, serif",
        "body": "'Outfit', system-ui, sans-serif",
        "glow": "rgba(126,184,168,.25)",
        "glow2": "rgba(27,58,75,.1)",
        "pattern": "radial-gradient(circle at 20% 80%, rgba(255,255,255,.5) 0 1px, transparent 2px)",
        "hero_overlay": "linear-gradient(100deg, rgba(27,58,75,.78) 0%, rgba(27,58,75,.3) 60%, rgba(27,58,75,.45) 100%)",
        "btn_ink": "#fff",
        "stakes_bg": "#1B3A4B",
        "stakes_ink": "#E8F0F2",
        "rule": "rgba(27,58,75,.14)",
        "stakes": "Pier can be slick in fog — use the rope rail. Seafood broth contains shellfish.",
        "tagline": "Coffee where the fog co-authors the morning — slow service, salt air, lighthouse calm.",
        "place": "Mist pier at dawn",
        "nav_offer": "Board",
        "nav_cta": "Hold",
        "cta_primary": "Hold a table",
        "cta_secondary": "View the board",
        "offer_h": "Harbor board",
        "offer_lead": "Fog is part of the recipe. We keep the menu short.",
        "list_class": "menu-list",
        "items": [
            ("Pier drip", "$4.50", "Medium roast, ceramic mug, no rush."),
            ("Seafoam mocha", "$6.50", "Cocoa, oat or dairy — ask which batch."),
            ("Kelp cracker plate", "$8", "Local bakery; sesame noted on the card."),
        ],
        "hold_h": "Hold through the fog",
        "hold_lead": "Plain status, not panic: Action + Item + Limit.",
        "ail_action": "Hold",
        "ail_item": "pier table #4",
        "ail_limit": "— released if unchecked in 15 minutes.",
    },
    "Ember Court": {
        "folder": "ember-court",
        "title": "Ember Court — Courtyard Restaurant",
        "desc": "Fire-lit courtyard dining.",
        "bg": "#1A0F12",
        "ink": "#F3E8D8",
        "accent": "#C4A35A",
        "muted": "#B8A090",
        "surface": "#2A171C",
        "display": "'Bodoni Moda', 'Didot', serif",
        "body": "'Source Sans 3', system-ui, sans-serif",
        "glow": "rgba(196,163,90,.12)",
        "glow2": "rgba(107,29,42,.2)",
        "pattern": "repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(196,163,90,.04) 40px, rgba(196,163,90,.04) 41px)",
        "hero_overlay": "linear-gradient(115deg, rgba(26,15,18,.8) 0%, rgba(26,15,18,.35) 55%, rgba(107,29,42,.45) 100%)",
        "btn_ink": "#1A0F12",
        "stakes_bg": "#6B1D2A",
        "stakes_ink": "#F3E8D8",
        "rule": "rgba(243,232,216,.12)",
        "stakes": "Open-fire cooking — tell us about allergies before seating. Flames stay in the court hearth.",
        "tagline": "Courtyard fire, linen tables, courses paced like evening light.",
        "place": "Ember courtyard at dusk",
        "nav_offer": "Courses",
        "nav_cta": "Book",
        "cta_primary": "Book the court",
        "cta_secondary": "Tonight's courses",
        "offer_h": "Tonight's courses",
        "offer_lead": "One purpose: fire-cooked plates. No tasting-menu theater filler.",
        "list_class": "menu-list",
        "items": [
            ("Ember flatbread", "$16", "Rosemary oil, sea salt, hearth blister."),
            ("Court lamb", "$38", "Charred herbs, yogurt, late-summer greens."),
            ("Stone fruit tart", "$14", "Burnt-honey glaze, crème fraîche."),
        ],
        "hold_h": "Book the court",
        "hold_lead": "We put allergy stakes above the fold — hospitality before spectacle.",
        "ail_action": "Book",
        "ail_item": "courtyard table for four",
        "ail_limit": "— confirmed until 15 minutes past seating.",
    },
    "Citrus Hull": {
        "folder": "citrus-hull",
        "title": "Citrus Hull — Coastal Restaurant",
        "desc": "Terrace dining under citrus and sea air.",
        "bg": "#F4FBF8",
        "ink": "#143D3A",
        "accent": "#1F6F6A",
        "muted": "#4A6B66",
        "surface": "#DCEEE8",
        "display": "'Libre Baskerville', Georgia, serif",
        "body": "'DM Sans', system-ui, sans-serif",
        "glow": "rgba(232,197,71,.2)",
        "glow2": "rgba(31,111,106,.12)",
        "pattern": "radial-gradient(ellipse at 80% 10%, rgba(232,197,71,.15), transparent 40%)",
        "hero_overlay": "linear-gradient(100deg, rgba(20,61,58,.75) 0%, rgba(20,61,58,.28) 58%, rgba(20,61,58,.4) 100%)",
        "btn_ink": "#fff",
        "stakes_bg": "#143D3A",
        "stakes_ink": "#F4FBF8",
        "rule": "rgba(20,61,58,.14)",
        "stakes": "Catch board changes with the tide. Shellfish and citrus zest noted on each plate.",
        "tagline": "Citrus shade, hull-side breeze — seafood and bright plates on the terrace.",
        "place": "Citrus terrace, coastal light",
        "nav_offer": "Catch",
        "nav_cta": "Reserve",
        "cta_primary": "Reserve terrace",
        "cta_secondary": "Catch board",
        "offer_h": "Catch board",
        "offer_lead": "One job: today's catch. No competing promo strips.",
        "list_class": "menu-list",
        "items": [
            ("Lemon-cured crudo", "$19", "Olive oil, chili thread, citrus leaf."),
            ("Hull grilled fish", "$32", "Market fish, herb butter, grilled lemon."),
            ("Bergamot granita", "$9", "Dairy-free; zest-forward."),
        ],
        "hold_h": "Reserve the terrace",
        "hold_lead": "Neighborly clarity: Action + Item + Limit on every hold.",
        "ail_action": "Reserve",
        "ail_item": "terrace two-top",
        "ail_limit": "— weather hold moves indoors if wind >20mph.",
    },
    "Sole Archive": {
        "folder": "sole-archive",
        "title": "Sole Archive — Collectible Sneaker Boutique",
        "desc": "Independent boutique for collectable Nike sneakers.",
        "bg": "#EDEBE8",
        "ink": "#1A1A1A",
        "accent": "#3D3A36",
        "muted": "#5C5852",
        "surface": "#E0DDD8",
        "display": "'Syne', system-ui, sans-serif",
        "body": "'IBM Plex Sans', system-ui, sans-serif",
        "glow": "rgba(26,26,26,.06)",
        "glow2": "rgba(120,110,100,.08)",
        "pattern": "linear-gradient(90deg, rgba(26,26,26,.03) 1px, transparent 1px)",
        "hero_overlay": "linear-gradient(105deg, rgba(20,20,20,.82) 0%, rgba(20,20,20,.4) 55%, rgba(20,20,20,.55) 100%)",
        "btn_ink": "#fff",
        "stakes_bg": "#1A1A1A",
        "stakes_ink": "#EDEBE8",
        "rule": "rgba(26,26,16,.12)",
        "stakes": "Independent reseller — not affiliated with Nike, Inc. Authenticity cards on every pair. Holds are binding once confirmed.",
        "tagline": "A small vault for collectable Nike sneakers — archival light, verified pairs, no hype theater.",
        "place": "Concrete vault, archival lighting",
        "nav_offer": "Vault",
        "nav_cta": "Hold",
        "cta_primary": "Hold a pair",
        "cta_secondary": "Browse vault",
        "offer_h": "Vault pulls",
        "offer_lead": "Envelope (status, stakes) stays stable; vault fill rotates. Cards only when you interact.",
        "list_class": "vault-list",
        "items": [
            ("Air Jordan 1 — Chicago OG vibe", "$420", "Size 10 · authenticity card · pedestal 03."),
            ("Dunk Low — Vintage green", "$280", "Size 9.5 · box included · pedestal 07."),
            ("Air Max 1 — Anniversary pack", "$310", "Size 11 · verified · pedestal 12."),
        ],
        "hold_h": "Hold from the vault",
        "hold_lead": "We BREAK progressive disclosure for holds — stakes stay visible. Logo is SA monogram only (no Nike™ mark).",
        "ail_action": "Hold",
        "ail_item": "pedestal 03 · AJ1 Chicago vibe · size 10",
        "ail_limit": "— 2-hour hold, ID match at pickup.",
    },
}

INDEX = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Pass GY · Five Brands</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@600;700&family=IBM+Plex+Sans:wght@400;500&display=swap" rel="stylesheet">
<style>
:root { --ink:#1a1a1a; --muted:#5a5650; --bg:#f3f0eb; }
* { box-sizing:border-box; margin:0; padding:0; }
body {
  font-family:'IBM Plex Sans',system-ui,sans-serif;
  background:
    radial-gradient(ellipse at 0% 0%, rgba(196,92,38,.08), transparent 40%),
    radial-gradient(ellipse at 100% 0%, rgba(31,111,106,.08), transparent 40%),
    var(--bg);
  color:var(--ink); padding:3rem 6vw 4rem; line-height:1.5;
}
h1 { font-family:'Syne',sans-serif; font-size:clamp(2rem,5vw,3.2rem); margin-bottom:.4rem; }
.sub { color:var(--muted); max-width:40rem; margin-bottom:2.5rem; }
.grid { display:grid; gap:1.25rem; grid-template-columns:repeat(auto-fill,minmax(240px,1fr)); }
a.card {
  display:block; text-decoration:none; color:inherit;
  background:rgba(255,255,255,.55); padding:1.25rem;
  border:1px solid rgba(0,0,0,.08);
  transition:transform .2s ease, box-shadow .2s ease;
}
a.card:hover { transform:translateY(-3px); box-shadow:0 8px 24px rgba(0,0,0,.08); }
a.card img { width:56px; height:56px; object-fit:contain; margin-bottom:.75rem; }
a.card strong { display:block; font-family:'Syne',sans-serif; font-size:1.15rem; }
a.card span { color:var(--muted); font-size:.9rem; }
.note { margin-top:2.5rem; font-size:.88rem; color:var(--muted); max-width:40rem; }
</style>
</head>
<body>
<h1>Pass GY · Survey delivery</h1>
<p class="sub">Five brand sites from Hour 1 Survey — GenUI control-plane thinking, cooperage hospitality (hoop holds staves), Good Samaritan neighbor ethic. 2 cafes · 2 restaurants · 1 sneaker archive.</p>
<div class="grid">
  <a class="card" href="kiln-and-cup/index.html"><img src="kiln-and-cup/assets/logo.png" alt=""><strong>Kiln &amp; Cup</strong><span>Cafe · ceramic workshop</span></a>
  <a class="card" href="mist-harbor/index.html"><img src="mist-harbor/assets/logo.png" alt=""><strong>Mist Harbor</strong><span>Cafe · fog pier</span></a>
  <a class="card" href="ember-court/index.html"><img src="ember-court/assets/logo.png" alt=""><strong>Ember Court</strong><span>Restaurant · courtyard fire</span></a>
  <a class="card" href="citrus-hull/index.html"><img src="citrus-hull/assets/logo.png" alt=""><strong>Citrus Hull</strong><span>Restaurant · coastal terrace</span></a>
  <a class="card" href="sole-archive/index.html"><img src="sole-archive/assets/logo.png" alt=""><strong>Sole Archive</strong><span>Boutique · Nike collectibles</span></a>
</div>
<p class="note">Research notes live in <code>research-notes/</code>. Sole Archive is an independent reseller fiction — no Nike™ in the SA monogram. Cards appear only on this index (interaction to choose a brand), never in heroes.</p>
</body>
</html>
"""

def main():
    for brand, cfg in BRANDS.items():
        folder = ROOT / cfg["folder"]
        folder.mkdir(parents=True, exist_ok=True)
        (folder / "index.html").write_text(site(brand, cfg), encoding="utf-8")
        print("wrote", folder / "index.html")
    (ROOT / "index.html").write_text(INDEX, encoding="utf-8")
    print("wrote index")

if __name__ == "__main__":
    main()
