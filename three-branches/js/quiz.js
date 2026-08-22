import { QUIZ } from './data.js';

const root = document.querySelector('#quiz-root');
const LETTERS = ['A', 'B', 'C', 'D'];

let index = 0;
let score = 0;
let picked = null;

function verdict() {
  if (score === QUIZ.length) return 'A perfect score. You could teach the civics class.';
  if (score >= QUIZ.length - 2) return 'Strong. The separation of powers is clearly in hand.';
  if (score >= QUIZ.length / 2) return 'A solid start. Revisit the checks and balances grid above.';
  return 'Worth another pass. Step through the branches and the bill journey, then try again.';
}

function renderResult() {
  root.innerHTML = `
    <div class="quiz__card quiz__result">
      <p class="quiz__progress">Results</p>
      <p class="quiz__tally">${score}<span style="opacity:.45">/${QUIZ.length}</span></p>
      <h3>${score === QUIZ.length ? 'Flawless' : 'Nicely done'}</h3>
      <p>${verdict()}</p>
      <button class="btn btn--primary" type="button" data-quiz="restart">Take it again</button>
    </div>
  `;
  root.querySelector('[data-quiz="restart"]').addEventListener('click', () => {
    index = 0;
    score = 0;
    picked = null;
    render();
  });
}

function render() {
  if (index >= QUIZ.length) {
    renderResult();
    return;
  }

  const question = QUIZ[index];
  const answered = picked !== null;

  root.innerHTML = `
    <div class="quiz__card">
      <p class="quiz__progress">Question ${index + 1} of ${QUIZ.length}</p>
      <h3 class="quiz__question">${question.question}</h3>
      <div class="quiz__options">
        ${question.options
          .map((option, i) => {
            const isAnswer = i === question.answer;
            let state = '';
            let mark = LETTERS[i];
            if (answered && isAnswer) {
              state = ' is-correct';
              mark = '&check;';
            } else if (answered && i === picked) {
              state = ' is-wrong';
              mark = '&times;';
            }
            return `
              <button class="quiz__option${state}" type="button" data-choice="${i}" ${answered ? 'disabled' : ''}>
                <span class="mark">${mark}</span>
                <span>${option}</span>
              </button>`;
          })
          .join('')}
      </div>
      ${answered ? `<p class="quiz__explanation">${question.explanation}</p>` : ''}
      <div class="quiz__footer">
        <p class="quiz__score">Score: ${score}</p>
        ${
          answered
            ? `<button class="btn btn--primary" type="button" data-quiz="next">${
                index === QUIZ.length - 1 ? 'See results' : 'Next question'
              }</button>`
            : '<p class="quiz__score" style="opacity:.6">Choose an answer</p>'
        }
      </div>
    </div>
  `;

  root.querySelectorAll('.quiz__option').forEach((button) => {
    button.addEventListener('click', () => {
      picked = Number(button.dataset.choice);
      if (picked === question.answer) score += 1;
      render();
    });
  });

  const next = root.querySelector('[data-quiz="next"]');
  if (next) {
    next.addEventListener('click', () => {
      index += 1;
      picked = null;
      render();
    });
  }

  root.classList.remove('fade-in');
  void root.offsetWidth;
  root.classList.add('fade-in');
}

export function initQuiz() {
  render();
}
