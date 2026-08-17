import {
  cosmatesqueBand,
  roseWindow,
  mandorlaFrame,
  guillocheRing,
  vitruvianGrid,
  tessellationField,
  renaissanceBorder,
  quatrefoil,
  vesicaPiscis,
} from './geometry';
import { PALETTE } from './tokens';

const P = PALETTE;

function svg(viewBox, content) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" preserveAspectRatio="xMidYMid meet" aria-hidden="true">${content}</svg>`;
}

const VARIANTS = {
  frieze: () =>
    svg('0 0 400 56', `
      <rect width="400" height="56" fill="${P.cream}" opacity="0.5"/>
      ${cosmatesqueBand(400, 20, 34)}
      ${guillocheRing(40, 28, 16, 8)}
      ${guillocheRing(360, 28, 16, 8)}
      <line x1="0" y1="28" x2="400" y2="28" stroke="${P.gold}" stroke-width="0.5" opacity="0.35"/>
    `),

  rose: () =>
    svg('0 0 120 120', `
      <rect width="120" height="120" fill="${P.cream}" opacity="0.3"/>
      ${roseWindow(60, 60, 52, 12, P.gold)}
      ${guillocheRing(60, 60, 38, 16)}
      ${vitruvianGrid(60, 60, 22)}
    `),

  mandorla: () =>
    svg('0 0 200 120', `
      <rect width="200" height="120" fill="${P.cream}" opacity="0.25"/>
      ${mandorlaFrame(100, 60, 160, 90)}
      ${quatrefoil(30, 60, 18, P.goldLight, P.gold)}
      ${quatrefoil(170, 60, 18, P.goldLight, P.gold)}
    `),

  vitruvian: () =>
    svg('0 0 400 80', `
      <rect width="400" height="80" fill="${P.cream}" opacity="0.4"/>
      ${vitruvianGrid(80, 40, 32)}
      ${vitruvianGrid(200, 40, 32)}
      ${vitruvianGrid(320, 40, 32)}
      ${vesicaPiscis(200, 40, 28, P.gold, 0.8)}
      <line x1="0" y1="40" x2="400" y2="40" stroke="${P.gold}" stroke-width="0.6" opacity="0.3"/>
    `),

  tessellation: () =>
    svg('0 0 400 64', `
      <rect width="400" height="64" fill="${P.cream}" opacity="0.35"/>
      ${tessellationField(400, 64)}
      ${renaissanceBorder(400, 64, 4)}
    `),

  corner: () =>
    svg('0 0 100 100', `
      ${roseWindow(50, 50, 42, 8, P.gold)}
      ${quatrefoil(50, 50, 28, 'none', P.goldLight)}
    `),
};

export default function RenaissanceGeometry(props) {
  const variant = () => props.variant ?? 'frieze';
  const markup = () => (VARIANTS[variant()] ?? VARIANTS.frieze)();

  return <div class="ren-geometry" innerHTML={markup()} />;
}
