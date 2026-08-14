import { PALETTE } from './tokens';

const P = PALETTE;
const φ = 1.618033988749;

/** Golden-ratio point on segment */
export function golden(a, b) {
  return a + (b - a) / φ;
}

/** Regular polygon vertices */
export function polygonPoints(cx, cy, r, sides, rotation = -90) {
  return Array.from({ length: sides }, (_, i) => {
    const a = ((rotation + (360 / sides) * i) * Math.PI) / 180;
    return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
  }).join(' ');
}

/** Vesica piscis — two intersecting circles */
export function vesicaPiscis(cx, cy, r, stroke = P.gold, sw = 1) {
  const d = r * 0.55;
  return `
    <circle cx="${cx - d}" cy="${cy}" r="${r}" fill="none" stroke="${stroke}" stroke-width="${sw}" opacity="0.7"/>
    <circle cx="${cx + d}" cy="${cy}" r="${r}" fill="none" stroke="${stroke}" stroke-width="${sw}" opacity="0.7"/>
    <path d="M${cx} ${cy - r * 0.86} Q${cx - d} ${cy} ${cx} ${cy + r * 0.86} Q${cx + d} ${cy} ${cx} ${cy - r * 0.86}Z"
      fill="${P.goldLight}" opacity="0.08" stroke="${stroke}" stroke-width="${sw * 0.5}"/>
  `;
}

/** Cosmatesque triangle — classic Italian church floor motif */
export function cosmatesqueTriangle(x, y, size, c1, c2, c3) {
  const h = size * 0.866;
  return `
    <polygon points="${x},${y} ${x + size},${y} ${x + size / 2},${y - h}" fill="${c1}" stroke="${P.umber}" stroke-width="0.5"/>
    <polygon points="${x + size * 0.25},${y - h * 0.33} ${x + size * 0.75},${y - h * 0.33} ${x + size / 2},${y - h * 0.66}" fill="${c2}" stroke="${P.umber}" stroke-width="0.5"/>
    <circle cx="${x + size / 2}" cy="${y - h * 0.45}" r="${size * 0.12}" fill="${c3}" stroke="${P.umber}" stroke-width="0.5"/>
  `;
}

/** Cosmatesque floor band */
export function cosmatesqueBand(w, h, y0 = 0) {
  const s = 24;
  let out = '';
  for (let x = 0; x < w; x += s) {
    const flip = (x / s) % 2 === 0;
    out += cosmatesqueTriangle(
      x, y0 + h,
      s,
      flip ? P.terracotta : P.cream,
      flip ? P.gold : P.terracottaLight,
      flip ? P.mediterranean : P.goldLight
    );
  }
  return out;
}

/** Renaissance rose — radial petal geometry */
export function roseWindow(cx, cy, r, petals = 8, stroke = P.gold) {
  let out = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${stroke}" stroke-width="1.5"/>`;
  out += `<circle cx="${cx}" cy="${cy}" r="${r * 0.35}" fill="${P.cream}" opacity="0.15" stroke="${stroke}" stroke-width="1"/>`;
  for (let i = 0; i < petals; i++) {
    const a = (i * 360) / petals;
    out += `<ellipse cx="${cx}" cy="${cy}" rx="${r * 0.85}" ry="${r * 0.28}" fill="none" stroke="${stroke}" stroke-width="0.8" opacity="0.6" transform="rotate(${a} ${cx} ${cy})"/>`;
  }
  for (let i = 0; i < petals; i++) {
    const a = ((i + 0.5) * 360) / petals;
    const rad = (a * Math.PI) / 180;
    const x2 = cx + r * 0.9 * Math.cos(rad);
    const y2 = cy + r * 0.9 * Math.sin(rad);
    out += `<line x1="${cx}" y1="${cy}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="0.5" opacity="0.4"/>`;
  }
  return out;
}

/** Quatrefoil — four-lobed Gothic/Renaissance motif */
export function quatrefoil(cx, cy, r, fill = 'none', stroke = P.gold) {
  const l = r * 0.42;
  return `
    <path d="M${cx} ${cy - r}
      C${cx + l} ${cy - r} ${cx + r} ${cy - l} ${cx + r} ${cy}
      C${cx + r} ${cy + l} ${cx + l} ${cy + r} ${cx} ${cy + r}
      C${cx - l} ${cy + r} ${cx - r} ${cy + l} ${cx - r} ${cy}
      C${cx - r} ${cy - l} ${cx - l} ${cy - r} ${cx} ${cy - r}Z"
      fill="${fill}" stroke="${stroke}" stroke-width="1.2" opacity="0.85"/>
  `;
}

/** Guilloche interlace ring */
export function guillocheRing(cx, cy, r, loops = 12) {
  let out = '';
  for (let i = 0; i < loops; i++) {
    const a1 = ((i * 360) / loops) * (Math.PI / 180);
    const a2 = (((i + 2) * 360) / loops) * (Math.PI / 180);
    const x1 = cx + r * Math.cos(a1);
    const y1 = cy + r * Math.sin(a1);
    const x2 = cx + r * Math.cos(a2);
    const y2 = cy + r * Math.sin(a2);
    out += `<path d="M${x1} ${y1} A${r} ${r} 0 0 1 ${x2} ${y2}" fill="none" stroke="${P.gold}" stroke-width="0.7" opacity="0.5"/>`;
  }
  return out;
}

/** Vitruvian square inscribed in circle */
export function vitruvianGrid(cx, cy, r) {
  const s = r * 1.414 * 0.7;
  return `
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${P.gold}" stroke-width="1" opacity="0.35"/>
    <rect x="${cx - s / 2}" y="${cy - s / 2}" width="${s}" height="${s}" fill="none" stroke="${P.gold}" stroke-width="1" opacity="0.35" transform="rotate(45 ${cx} ${cy})"/>
    <line x1="${cx - r}" y1="${cy}" x2="${cx + r}" y2="${cy}" stroke="${P.gold}" stroke-width="0.5" opacity="0.25"/>
    <line x1="${cx}" y1="${cy - r}" x2="${cx}" y2="${cy + r}" stroke="${P.gold}" stroke-width="0.5" opacity="0.25"/>
  `;
}

/** Octagonal Renaissance frame */
export function octagonFrame(cx, cy, r, stroke = P.gold) {
  return `<polygon points="${polygonPoints(cx, cy, r, 8)}" fill="none" stroke="${stroke}" stroke-width="1.5"/>`;
}

/** Full mandorla ornamental frame for illustrations */
export function mandorlaFrame(cx, cy, w, h) {
  const rx = w / 2;
  const ry = h / 2;
  return `
    ${vitruvianGrid(cx, cy, Math.max(rx, ry) * 1.05)}
    ${guillocheRing(cx, cy, Math.max(rx, ry) * 0.92, 16)}
    ${quatrefoil(cx, cy - ry * 0.85, rx * 0.2, P.goldLight, P.gold)}
    ${quatrefoil(cx, cy + ry * 0.85, rx * 0.2, P.goldLight, P.gold)}
    ${quatrefoil(cx - rx * 0.85, cy, ry * 0.2, P.goldLight, P.gold)}
    ${quatrefoil(cx + rx * 0.85, cy, ry * 0.2, P.goldLight, P.gold)}
    <ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="none" stroke="${P.gold}" stroke-width="2"/>
    <ellipse cx="${cx}" cy="${cy}" rx="${rx * 0.88}" ry="${ry * 0.88}" fill="${P.cream}" opacity="0.12" stroke="${P.goldLight}" stroke-width="0.8"/>
    ${vesicaPiscis(cx, cy, rx * 0.55, P.gold, 0.8)}
  `;
}

/** Perspective grid — Renaissance architectural drawing */
export function perspectiveGrid(w, h, vanishX, vanishY) {
  let out = '';
  const steps = 8;
  for (let i = 1; i <= steps; i++) {
    const t = i / steps;
    const y = h * t;
    out += `<line x1="0" y1="${y}" x2="${w}" y2="${y}" stroke="${P.gold}" stroke-width="0.4" opacity="${0.08 + t * 0.06}"/>`;
    out += `<line x1="0" y1="${y}" x2="${vanishX}" y2="${vanishY}" stroke="${P.gold}" stroke-width="0.3" opacity="0.12"/>`;
    out += `<line x1="${w}" y1="${y}" x2="${vanishX}" y2="${vanishY}" stroke="${P.gold}" stroke-width="0.3" opacity="0.12"/>`;
  }
  return out;
}

/** Corner acanthus-inspired geometric scroll */
export function cornerScroll(x, y, size, flipX = 1, flipY = 1) {
  const s = size;
  return `
    <g transform="translate(${x} ${y}) scale(${flipX} ${flipY})">
      <path d="M0 ${s} Q0 0 ${s} 0 Q${s * 0.4} ${s * 0.4} 0 ${s}" fill="none" stroke="${P.gold}" stroke-width="1.2"/>
      <path d="M${s * 0.15} ${s * 0.85} Q${s * 0.5} ${s * 0.5} ${s * 0.85} ${s * 0.15}" fill="none" stroke="${P.gold}" stroke-width="0.7" opacity="0.6"/>
      <circle cx="${s * 0.25}" cy="${s * 0.25}" r="${s * 0.08}" fill="${P.goldLight}" opacity="0.4"/>
    </g>
  `;
}

/** Complete ornamental border for viewBox */
export function renaissanceBorder(w, h, inset = 8) {
  const cx = w / 2;
  const cy = h / 2;
  return `
    <rect x="${inset}" y="${inset}" width="${w - inset * 2}" height="${h - inset * 2}" fill="none" stroke="${P.gold}" stroke-width="1.5"/>
    <rect x="${inset + 4}" y="${inset + 4}" width="${w - inset * 2 - 8}" height="${h - inset * 2 - 8}" fill="none" stroke="${P.goldLight}" stroke-width="0.6" opacity="0.7"/>
    ${cornerScroll(inset, inset, 28)}
    ${cornerScroll(w - inset, inset, 28, -1, 1)}
    ${cornerScroll(inset, h - inset, 28, 1, -1)}
    ${cornerScroll(w - inset, h - inset, 28, -1, -1)}
    ${roseWindow(inset + 14, inset + 14, 10, 6, P.gold)}
    ${roseWindow(w - inset - 14, inset + 14, 10, 6, P.gold)}
    ${roseWindow(inset + 14, h - inset - 14, 10, 6, P.gold)}
    ${roseWindow(w - inset - 14, h - inset - 14, 10, 6, P.gold)}
    ${cosmatesqueBand(w - inset * 2, 16, inset + 2)}
    <line x1="${inset}" y1="${cy}" x2="${w - inset}" y2="${cy}" stroke="${P.gold}" stroke-width="0.3" opacity="0.15"/>
    <line x1="${cx}" y1="${inset}" x2="${cx}" y2="${h - inset}" stroke="${P.gold}" stroke-width="0.3" opacity="0.15"/>
  `;
}

/** Background tessellation for scenes */
export function tessellationField(w, h) {
  const s = 40;
  let out = '';
  for (let y = 0; y < h + s; y += s * 0.866) {
    for (let x = 0; x < w + s; x += s) {
      const offset = (Math.floor(y / (s * 0.866)) % 2) * (s / 2);
      out += `<polygon points="${polygonPoints(x + offset, y, s * 0.38, 6)}" fill="none" stroke="${P.gold}" stroke-width="0.35" opacity="0.12"/>`;
    }
  }
  return out;
}

export function geometricBackdrop(w, h, style = 'full') {
  const cx = w / 2;
  const cy = h / 2;
  const r = Math.min(w, h) * 0.45;
  if (style === 'tessellation') return tessellationField(w, h);
  if (style === 'perspective') return perspectiveGrid(w, h, cx, h * 0.3);
  return `
    ${tessellationField(w, h)}
    ${perspectiveGrid(w, h, cx, h * 0.35)}
    ${roseWindow(cx, cy, r * 0.95, 12, P.gold)}
    ${guillocheRing(cx, cy, r * 0.72, 24)}
    ${octagonFrame(cx, cy, r * 0.55)}
    ${vitruvianGrid(cx, cy, r * 0.38)}
  `;
}
