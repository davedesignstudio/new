import { BILL_STEPS, BRANCHES } from './data.js';

const trackEl = document.querySelector('.journey__track');
const stageEl = document.querySelector('#journey-stage');
const countEl = document.querySelector('#journey-count');
const prevBtn = document.querySelector('[data-journey="prev"]');
const nextBtn = document.querySelector('[data-journey="next"]');

const branchName = (id) => BRANCHES.find((branch) => branch.id === id).name;

let index = 0;

function render() {
  const step = BILL_STEPS[index];

  trackEl.querySelectorAll('.journey__tick').forEach((tick, i) => {
    tick.classList.toggle('is-done', i <= index);
    tick.classList.toggle('is-current', i === index);
    tick.setAttribute('aria-current', i === index ? 'step' : 'false');
  });

  stageEl.style.setProperty('--accent', `var(--${step.branch})`);
  stageEl.style.setProperty('--accent-soft', `var(--${step.branch}-soft)`);
  stageEl.innerHTML = `
    <span class="journey__badge">${branchName(step.branch)} branch</span>
    <h3>${step.title}</h3>
    <p>${step.detail}</p>
  `;
  stageEl.classList.remove('fade-in');
  void stageEl.offsetWidth;
  stageEl.classList.add('fade-in');

  countEl.textContent = `Step ${index + 1} of ${BILL_STEPS.length}`;
  prevBtn.disabled = index === 0;
  nextBtn.disabled = index === BILL_STEPS.length - 1;
}

function goTo(next) {
  index = Math.min(Math.max(next, 0), BILL_STEPS.length - 1);
  render();
}

export function initJourney() {
  trackEl.innerHTML = BILL_STEPS.map(
    (step, i) => `
    <li>
      <button class="journey__tick" type="button" data-step="${i}"
              style="--accent: var(--${step.branch}); --accent-soft: var(--${step.branch}-soft)">
        <span></span>
        <em>${step.title}</em>
      </button>
    </li>`
  ).join('');

  trackEl.querySelectorAll('.journey__tick').forEach((tick) => {
    tick.setAttribute('aria-label', `Step ${Number(tick.dataset.step) + 1}: ${BILL_STEPS[tick.dataset.step].title}`);
    tick.addEventListener('click', () => goTo(Number(tick.dataset.step)));
  });

  prevBtn.addEventListener('click', () => goTo(index - 1));
  nextBtn.addEventListener('click', () => goTo(index + 1));

  render();
}
