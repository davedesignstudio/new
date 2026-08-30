#!/usr/bin/env python3
"""Run one brands-500 wave: ensure roster exists, print batch paths."""
import json, sys, re
from pathlib import Path
from itertools import product

ROOT = Path('/workspace/logos/brands-500')
TMP = Path('/tmp/brands500')
TMP.mkdir(parents=True, exist_ok=True)
ROOT.mkdir(parents=True, exist_ok=True)

A = ["Amber","Axle","Basin","Birch","Bloom","Bolt","Brass","Brick","Brook","Cadence","Canal","Canvas","Cedar","Chord","Cinder","Cipher","Citrus","Cliff","Cobalt","Copper","Cove","Crag","Creek","Crest","Crimson","Crown","Dapple","Drift","Dune","Echo","Ember","Fathom","Fern","Field","Flint","Forge","Frost","Gale","Gilt","Glass","Glen","Grain","Grove","Harbor","Hearth","Hinge","Hollow","Ink","Iron","Ivory","Jade","Kiln","Knot","Lumen","Maple","Marble","Mesa","Mill","Mint","Moss","North","Oak","Onyx","Orbit","Orchard","Oxide","Pearl","Pine","Pitch","Plum","Quarry","Quartz","Rail","Ridge","Rivet","Rook","Rowan","Rust","Sage","Sand","Sable","Shard","Silk","Slate","Smoke","Sparrow","Spine","Spruce","Steel","Summit","Teal","Thorn","Timber","Vellum","Volt","Walnut","Wave","Willow","Wren","Zinc"]
# Extra prefixes per wave to guarantee uniqueness beyond product exhaustion
WAVE_PREFIX = {1:"", 2:"Nova", 3:"Prime", 4:"Atlas", 5:"Vector"}
B = ["Archive","Atelier","Beacon","Bench","Borough","Bureau","Circuit","Clinic","Collective","Commons","Company","Counter","Craft","Depot","Exchange","Factory","Folio","Foundry","Guild","Hall","House","Index","Kitchen","Lab","Lattice","League","Library","Line","Lodge","Loft","Market","Meridian","Mill","Office","Parish","Press","Project","Rail","Range","Room","Shop","Society","Stack","Studio","Table","Tap","Works","Yard","Signal","Harbor","Vault"]
CATS = [("cafe","espresso bar"),("restaurant","supper club"),("bakery","bread house"),("bar","cocktail lounge"),("brewery","taproom"),("hotel","inn"),("retail","goods shop"),("fashion","apparel label"),("beauty","apothecary"),("fitness","training gym"),("wellness","spa studio"),("pet","pet goods"),("auto","garage"),("trades","renovation shop"),("architecture","design office"),("publisher","press"),("music","listening bar"),("gallery","art space"),("tech","software studio"),("civic","public workshop")]
PALETTES = ["charcoal, copper, cream","navy, warm gold, ivory","stone gray, espresso, cream","cedar green, cream, black","ink black, paper cream, rust","sea teal, foam white, navy","barn red, cream, black","forest green, brass, bone","slate, amber, white","oxide red, sand, black","midnight blue, silver, white","walnut, linen, iron","moss, clay, charcoal","cobalt, cloud, black","ochre, ink, chalk"]
ERAS = [("1950–1970","Swiss / International","grid, grotesque sans, objective photo"),("1950–1970","Mid-century modern","molded forms, honest materials"),("1950–1970","Corporate identity","system mark, fleet logic"),("1960–1970","Liberation print","thick line, high contrast, block type"),("1970–1990","Postmodern / New Wave","layered type, rule-breaking"),("1984–1995","Desktop publishing","vector craft, PostScript era"),("1995–2010","Early web / Web 2.0","screen as substrate, reflow"),("2010–2020","Flat / Material","digital clarity, motion hierarchy"),("2018–2026","Adaptive / motion identity","variable type, responsive lockups"),("2020–2026","GenUI / craft systems","envelope constraints, pressure-test")]

def slugify(name):
    return re.sub(r'[^a-z0-9]+','-', name.lower()).strip('-')

def load_existing():
    used=set()
    for p in [ROOT/'roster.json', Path('/workspace/logos/brands-100/roster.json'), Path('/workspace/logos/history-100/roster.json')]:
        if p.exists():
            for r in json.loads(p.read_text()):
                used.add(r['slug'])
    return used

def build_wave(wave:int, n:int=500):
    used = load_existing()
    pref = WAVE_PREFIX.get(wave, f"W{wave}")
    roster=[]; idx=0
    particles = A if not pref else [f"{pref}{a}" for a in A] + A
    for a,b in product(particles, B):
        if len(roster)>=n: break
        name = f"{a} {b}"
        slug = slugify(name)
        if slug in used:
            slug = f"{slug}-w{wave}"
        if slug in used:
            continue
        used.add(slug)
        cat,tone = CATS[idx%len(CATS)]
        pal = PALETTES[idx%len(PALETTES)]
        era,shelf,style = ERAS[idx%len(ERAS)]
        tags=["CRAFT","MAKE","SERVE","BUILD","PRESS","HOLD","OPEN","MARK"]
        roster.append({"slug":slug,"name":name,"wave":wave,"cat":cat,"tone":tone,"palette":pal,"era":era,"shelf":shelf,"style":f"{style}; {tone}","tagline":f"{tags[idx%8]} · {tags[(idx+3)%8]} · {tags[(idx+5)%8]}"})
        idx+=1
    if len(roster)<n:
        raise SystemExit(f'only built {len(roster)} for wave {wave}')
    return roster

def main():
    state_path = TMP/'state.json'
    state = json.loads(state_path.read_text()) if state_path.exists() else {"waves_total":5,"brands_per_wave":500,"current_wave":0,"waves_completed":[],"waves_started":[]}
    # determine next wave
    nxt = int(sys.argv[1]) if len(sys.argv)>1 else (max(state.get('waves_started') or [0]) + 1)
    if nxt > state.get('waves_total',5):
        print('ALL_WAVES_DONE')
        return
    roster = build_wave(nxt, state.get('brands_per_wave',500))
    (ROOT/f'roster-wave-{nxt}.json').write_text(json.dumps(roster, indent=2))
    # merge cumulative roster
    cum=[]
    for w in range(1, nxt+1):
        p=ROOT/f'roster-wave-{w}.json'
        if p.exists():
            cum.extend(json.loads(p.read_text()))
    (ROOT/'roster.json').write_text(json.dumps(cum, indent=2))
    (TMP/f'wave{nxt}.json').write_text(json.dumps(roster, indent=2))
    for i in range(5):
        batch=roster[i*100:(i+1)*100]
        (TMP/f'wave{nxt}-batch{i}.json').write_text(json.dumps(batch, indent=2))
    state['current_wave']=nxt
    state.setdefault('waves_started',[])
    if nxt not in state['waves_started']:
        state['waves_started'].append(nxt)
    state_path.write_text(json.dumps(state, indent=2))
    print(f'WAVE_READY {nxt} brands={len(roster)} cumulative={len(cum)}')

if __name__=='__main__':
    main()
