import { BRANCHES } from './data.js';
import { ICONS } from './icons.js';
import { accentStyle, applyAccent } from './theme.js';

const pillarsEl = document.querySelector('.pillars');
const briefEl = document.querySelector('#brief');

function renderBrief(branch) {
  applyAccent(briefEl, branch.id);
  briefEl.setAttribute('aria-labelledby', `pillar-${branch.id}`);

  briefEl.innerHTML = `
    <div class="brief__bar">
      <h3>${branch.body}</h3>
      <span class="brief__meta">${branch.article} &middot; ${branch.tagline}</span>
      <span class="brief__seat">${branch.seat}</span>
    </div>
    <p class="brief__summary">${branch.summary}</p>
    <div class="brief__grid">
      <div class="brief__col">
        <h4>Who serves</h4>
        <dl class="brief__facts">
          ${branch.composition
            .map((fact) => `<div><dt>${fact.label}</dt><dd>${fact.value}</dd></div>`)
            .join('')}
        </dl>
      </div>
      <div class="brief__col">
        <h4>What it can do</h4>
        <ul class="brief__list">${branch.powers.map((p) => `<li>${p}</li>`).join('')}</ul>
      </div>
      <div class="brief__col">
        <h4>Where its power stops</h4>
        <ul class="brief__list brief__list--limits">${branch.limits.map((l) => `<li>${l}</li>`).join('')}</ul>
      </div>
    </div>
    <figure class="brief__clause">
      <blockquote>&ldquo;${branch.clause.text}&rdquo;</blockquote>
      <cite>${branch.clause.cite}</cite>
    </figure>
  `;

  briefEl.classList.remove('fade-in');
  void briefEl.offsetWidth;
  briefEl.classList.add('fade-in');
}

function select(id, { focusPanel = false } = {}) {
  BRANCHES.forEach((branch) => {
    const tab = pillarsEl.querySelector(`#pillar-${branch.id}`);
    const isActive = branch.id === id;
    tab.setAttribute('aria-selected', String(isActive));
    tab.tabIndex = isActive ? 0 : -1;
  });
  renderBrief(BRANCHES.find((branch) => branch.id === id));
  if (focusPanel) briefEl.focus();
}

export function initBranches() {
  pillarsEl.innerHTML = BRANCHES.map(
    (branch) => `
    <button class="pillar" type="button" role="tab" id="pillar-${branch.id}"
            aria-selected="false" aria-controls="brief" tabindex="-1"
            style="${accentStyle(branch.id)}">
      ${ICONS[branch.id]}
      <span class="pillar__article">${branch.article}</span>
      <span class="pillar__name">${branch.name}</span>
      <span class="pillar__tagline">${branch.tagline}</span>
      <span class="pillar__body">${branch.body}</span>
    </button>`
  ).join('');

  pillarsEl.querySelectorAll('.pillar').forEach((tab) => {
    tab.addEventListener('click', () => select(tab.id.replace('pillar-', '')));
  });

  // Left/right arrows move between tabs, matching the ARIA tabs pattern.
  pillarsEl.addEventListener('keydown', (event) => {
    const step = { ArrowRight: 1, ArrowLeft: -1, Home: -Infinity, End: Infinity }[event.key];
    if (step === undefined) return;
    event.preventDefault();
    const current = BRANCHES.findIndex(
      (branch) => pillarsEl.querySelector(`#pillar-${branch.id}`).getAttribute('aria-selected') === 'true'
    );
    let next;
    if (step === -Infinity) next = 0;
    else if (step === Infinity) next = BRANCHES.length - 1;
    else next = (current + step + BRANCHES.length) % BRANCHES.length;
    select(BRANCHES[next].id);
    pillarsEl.querySelector(`#pillar-${BRANCHES[next].id}`).focus();
  });

  select(BRANCHES[0].id);
}
