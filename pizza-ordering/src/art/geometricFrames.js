import { PALETTE } from './tokens';
import {
  mandorlaFrame,
  renaissanceBorder,
  geometricBackdrop,
  cosmatesqueBand,
  roseWindow,
  guillocheRing,
  perspectiveGrid,
} from './geometry';

const P = PALETTE;

export function wrapWithGeometry(content, viewBox = '0 0 200 200', style = 'frame') {
  const [,, w, h] = viewBox.split(' ').map(Number);
  const cx = w / 2;
  const cy = h / 2;

  let geometry = '';
  if (style === 'frame') {
    geometry = `
      ${renaissanceBorder(w, h, 6)}
      ${mandorlaFrame(cx, cy, w * 0.72, h * 0.72)}
    `;
  } else if (style === 'backdrop') {
    geometry = geometricBackdrop(w, h, 'full');
  } else if (style === 'minimal') {
    geometry = `${guillocheRing(cx, cy, Math.min(w, h) * 0.46, 12)}`;
  }

  return `
    <rect width="${w}" height="${h}" fill="${P.cream}" opacity="0.35"/>
    ${geometry}
    <g class="fresco-subject">${content}</g>
  `;
}

export function sceneGeometry(w, h) {
  return `
    <rect width="${w}" height="${h}" fill="${P.umberDark}"/>
    ${geometricBackdrop(w, h, 'full')}
    ${perspectiveGrid(w, h, w / 2, h * 0.28)}
    ${cosmatesqueBand(w, 28, h - 30)}
    ${roseWindow(w * 0.12, h * 0.2, 36, 8, P.goldLight)}
    ${roseWindow(w * 0.88, h * 0.2, 36, 8, P.goldLight)}
    <rect x="0" y="0" width="${w}" height="${h}" fill="url(#geoFade)" opacity="0.4"/>
    <defs>
      <linearGradient id="geoFade" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="${P.umberDark}" stop-opacity="0.2"/>
        <stop offset="100%" stop-color="${P.umberDark}" stop-opacity="0.85"/>
      </linearGradient>
    </defs>
  `;
}
