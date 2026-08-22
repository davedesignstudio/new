import { BRANCHES, CHECKS } from './data.js';

const SVG_NS = 'http://www.w3.org/2000/svg';
const NODE_R = 48;
const CURVE = 40;

const NODES = {
  legislative: { x: 230, y: 68 },
  executive: { x: 76, y: 320 },
  judicial: { x: 384, y: 320 }
};

const svg = document.querySelector('.triangle');
const arrowsGroup = svg.querySelector('.triangle__arrows');
const nodesGroup = svg.querySelector('.triangle__nodes');
const switchEl = document.querySelector('.balance__switch');
const detailEl = document.querySelector('#balance-detail');

const el = (name, attrs = {}) => {
  const node = document.createElementNS(SVG_NS, name);
  Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, value));
  return node;
};

// Arc from one node to another, trimmed to the node edges and bowed to one
// side so the two directions between a pair never overlap.
function arcPath(from, to) {
  const a = NODES[from];
  const b = NODES[to];
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy);
  const control = {
    x: (a.x + b.x) / 2 + (-dy / len) * CURVE,
    y: (a.y + b.y) / 2 + (dx / len) * CURVE
  };

  const along = (point, gap) => {
    const vx = control.x - point.x;
    const vy = control.y - point.y;
    const vlen = Math.hypot(vx, vy);
    return { x: point.x + (vx / vlen) * gap, y: point.y + (vy / vlen) * gap };
  };

  const start = along(a, NODE_R + 6);
  const end = along(b, NODE_R + 13);
  return `M ${start.x.toFixed(1)} ${start.y.toFixed(1)} Q ${control.x.toFixed(1)} ${control.y.toFixed(1)} ${end.x.toFixed(1)} ${end.y.toFixed(1)}`;
}

function buildMarkers() {
  const defs = el('defs');
  const colors = {
    base: '#3c465c',
    legislative: '#b5872f',
    executive: '#2f5d8c',
    judicial: '#8f3243'
  };
  Object.entries(colors).forEach(([key, color]) => {
    const marker = el('marker', {
      id: `arrow-${key}`,
      viewBox: '0 0 10 10',
      refX: '8',
      refY: '5',
      markerWidth: '6',
      markerHeight: '6',
      orient: 'auto-start-reverse'
    });
    marker.appendChild(el('path', { d: 'M 0 0 L 10 5 L 0 10 z', fill: color }));
    defs.appendChild(marker);
  });
  svg.prepend(defs);
}

function buildDiagram() {
  buildMarkers();

  CHECKS.forEach((check) => {
    const path = el('path', {
      class: 'triangle__arrow',
      d: arcPath(check.from, check.to),
      'marker-end': 'url(#arrow-base)',
      'data-from': check.from,
      'data-to': check.to
    });
    arrowsGroup.appendChild(path);
  });

  BRANCHES.forEach((branch) => {
    const { x, y } = NODES[branch.id];
    const group = el('g', { class: 'triangle__node', 'data-branch': branch.id });
    group.style.setProperty('--accent', `var(--${branch.id})`);
    group.appendChild(el('circle', { cx: x, cy: y, r: NODE_R }));
    const text = el('text', { x, y: y + 5 });
    text.textContent = branch.name;
    group.appendChild(text);
    nodesGroup.appendChild(group);
  });
}

function render(sourceId) {
  const outgoing = CHECKS.filter((check) => check.from === sourceId);
  const targets = outgoing.map((check) => check.to);

  arrowsGroup.querySelectorAll('.triangle__arrow').forEach((path) => {
    const isActive = path.dataset.from === sourceId;
    path.classList.toggle('is-active', isActive);
    path.classList.toggle('is-dim', !isActive);
    path.style.setProperty('--accent', `var(--${sourceId})`);
    path.setAttribute('marker-end', `url(#arrow-${isActive ? sourceId : 'base'})`);
  });

  nodesGroup.querySelectorAll('.triangle__node').forEach((node) => {
    const id = node.dataset.branch;
    node.classList.toggle('is-source', id === sourceId);
    node.classList.toggle('is-target', targets.includes(id));
    if (id !== sourceId) node.style.setProperty('--accent', `var(--${sourceId})`);
  });

  switchEl.querySelectorAll('.chip').forEach((chip) => {
    chip.setAttribute('aria-pressed', String(chip.dataset.branch === sourceId));
  });

  detailEl.innerHTML = outgoing
    .map(
      (check) => `
      <article class="check-card" style="--accent: var(--${check.from})">
        <h3>${check.title}</h3>
        <ul>${check.items.map((item) => `<li>${item}</li>`).join('')}</ul>
      </article>`
    )
    .join('');

  detailEl.classList.remove('fade-in');
  void detailEl.offsetWidth;
  detailEl.classList.add('fade-in');
}

export function initBalance() {
  buildDiagram();

  switchEl.innerHTML = BRANCHES.map(
    (branch) => `
    <button class="chip" type="button" data-branch="${branch.id}" aria-pressed="false"
            style="--accent: var(--${branch.id})">${branch.name} checks&hellip;</button>`
  ).join('');

  switchEl.querySelectorAll('.chip').forEach((chip) => {
    chip.addEventListener('click', () => render(chip.dataset.branch));
  });

  nodesGroup.querySelectorAll('.triangle__node').forEach((node) => {
    node.style.cursor = 'pointer';
    node.addEventListener('click', () => render(node.dataset.branch));
  });

  render(BRANCHES[0].id);
}
