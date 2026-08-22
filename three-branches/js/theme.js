// Each branch carries four tones: the accent itself, a tinted surface, a deeper
// shade for small text on light backgrounds, and a foreground that stays legible
// on top of the accent. Components pull all four so gold, navy, and crimson
// panels all keep their contrast.
const TONES = ['accent', 'accent-soft', 'accent-deep', 'accent-on'];
const source = (id, tone) => `var(--${id}${tone === 'accent' ? '' : tone.replace('accent', '')})`;

export const accentStyle = (id) => TONES.map((tone) => `--${tone}: ${source(id, tone)}`).join('; ');

export function applyAccent(element, id) {
  TONES.forEach((tone) => element.style.setProperty(`--${tone}`, source(id, tone)));
}
