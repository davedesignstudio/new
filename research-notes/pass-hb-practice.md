# Pass HB — Practice research notes (Hour 4 / 5)

**Date:** 2026-08-30 ~05:23Z cron  
**Mandate:** Exercise shared pattern — change one croze row + one vault field in lockstep; verify Fitts ≥48px + reduced-motion.

## Practice exercise (executed)

| Lane | Change | Lockstep link |
|------|--------|---------------|
| Kiln & Cup croze | **Sesame** row added (`data-practice="hb"`) — Action: hold biscuit · plate plain; Limit: seeds on shared board | Croze Item↔Vault field naming |
| Sole Archive vault | **`lastInspected`** field on every card (`data-practice="hb"`) | Vault Limit↔inspection timestamp |
| Shared CSS | `.croze__row[data-practice="hb"]` inset accent + `.card .meta dd[data-practice="hb"]` outline | Same Fitts tokens (`--fitts-min: 48px`) |

## Fresh research slices (Practice)

### Design techniques / styles
- **Control-plane as material:** croze rows and vault fields are first-class UI, not footer fine print.
- **Envelope ≠ fill:** hero structure (veil, brand, CTA) separate from photographic fill; motion on fill only.
- **Practice > pattern catalogs:** changing one paired field reveals whether the system holds under real edits.

### Design principles — when to break
- **BREAK (kept):** stakes + hold/auth in first viewport — safety/provenance outrank hero purity.
- **KEEP:** optional filters stay in drawer; decorative cards stay out of hero.
- **Fitts:** every Seen / Hold / CTA ≥48px; practice edit must not shrink hit targets.
- **Reduced motion:** `prefers-reduced-motion: reduce` kills stakes/hero/button motion — practice must not reintroduce uncancellable animation.

### Art as whole
- Hospitality looking (Kiln/Mist/Ember/Citrus): place credit + invitation.
- Archival looking (Sole): object label + provenance; independent reseller, no Nike HQ cosplay; no swoosh in mark.

### Writing styles through time
- A+I+L (Action · Item · Limit) as modern plain-style microcopy — anti-panic FID.
- Homiletic brevity in stakes strips; archival catalog diction on vault cards.

### Jesus / Bible / canons (practice fruit)
- Didache Two Ways × Samaritan: stakes = neighbor care (allergens, holds) not CYA panic.
- Hear-and-do: practice pass *does* the croze/vault change rather than only naming the pattern.

### Craftsmanship
- Croze (cooperage groove) as metaphor for seating the guest-head safely.
- Shu-ha-ri: this hour is *ha* — breaking form deliberately inside the shared language without abandoning Fitts/motion rules.

## Verification checklist
- [x] Sesame croze row present on Kiln
- [x] lastInspected on Sole cards
- [x] `--fitts-min: 48px` on buttons / Seen / hold chips
- [x] `@media (prefers-reduced-motion: reduce)` in `shared/pattern.css`
- [x] 5 logos · 5 heroes · 5 sites regenerated (workspace empty on boot)

## Next (Pass HC · Integrate)
Fold Practice fruit into durable hubs; close cycle GY→… Integrate spines.
