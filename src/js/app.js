// --- Mobile navigation -----------------------------------------------------

const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  navLinks.addEventListener('click', event => {
    if (event.target.tagName === 'A') {
      navLinks.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

// --- Scroll reveal ---------------------------------------------------------

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
} else {
  document.body.classList.add('no-observer');
}

// --- Checks & balances explorer ---------------------------------------------

const CHECKS = {
  legislative: {
    name: 'The Legislative Branch (Congress)',
    checksOnOthers: [
      '<strong>On the Executive:</strong> can override a presidential veto with a two-thirds vote in both chambers',
      '<strong>On the Executive:</strong> controls funding, confirms appointments, ratifies treaties, and can impeach and remove the President',
      '<strong>On the Judicial:</strong> confirms federal judges and can impeach and remove them',
      '<strong>On the Judicial:</strong> can propose constitutional amendments to respond to court rulings'
    ],
    checksOnIt: [
      'The <strong>President</strong> can veto bills passed by Congress',
      'The <strong>courts</strong> can strike down laws as unconstitutional through judicial review'
    ]
  },
  executive: {
    name: 'The Executive Branch (President)',
    checksOnOthers: [
      '<strong>On the Legislative:</strong> can veto bills passed by Congress',
      '<strong>On the Legislative:</strong> can call special sessions and recommend legislation',
      '<strong>On the Judicial:</strong> nominates Supreme Court justices and all federal judges',
      '<strong>On the Judicial:</strong> can grant pardons for federal offenses'
    ],
    checksOnIt: [
      '<strong>Congress</strong> can override vetoes, control the budget, reject appointments, and impeach and remove the President',
      'The <strong>courts</strong> can declare executive actions unconstitutional'
    ]
  },
  judicial: {
    name: 'The Judicial Branch (Courts)',
    checksOnOthers: [
      '<strong>On the Legislative:</strong> can declare laws unconstitutional through judicial review',
      '<strong>On the Executive:</strong> can declare executive actions and orders unconstitutional',
      'Lifetime tenure shields judges from political pressure by the other branches'
    ],
    checksOnIt: [
      'The <strong>President</strong> nominates all federal judges',
      'The <strong>Senate</strong> confirms or rejects judicial nominees',
      '<strong>Congress</strong> can impeach judges and propose amendments that override rulings'
    ]
  }
};

const checksTabs = document.querySelectorAll('.checks-tab');
const checksOutTitle = document.getElementById('checks-out-title');
const checksInTitle = document.getElementById('checks-in-title');
const checksOutList = document.getElementById('checks-out-list');
const checksInList = document.getElementById('checks-in-list');

function renderChecks(branch) {
  const data = CHECKS[branch];
  if (!data) return;

  checksOutTitle.textContent = `${data.name}: checks on the other branches`;
  checksInTitle.textContent = 'How the other branches check it';
  checksOutList.innerHTML = data.checksOnOthers.map(item => `<li>${item}</li>`).join('');
  checksInList.innerHTML = data.checksOnIt.map(item => `<li>${item}</li>`).join('');

  checksTabs.forEach(tab => {
    const active = tab.dataset.branch === branch;
    tab.classList.toggle('is-active', active);
    tab.setAttribute('aria-selected', active ? 'true' : 'false');
  });
}

if (checksTabs.length) {
  checksTabs.forEach(tab => {
    tab.addEventListener('click', () => renderChecks(tab.dataset.branch));
  });
  renderChecks('legislative');
}

// --- Quiz --------------------------------------------------------------------

const QUIZ = [
  {
    question: 'Which branch of government makes the laws?',
    answers: ['Executive', 'Legislative', 'Judicial'],
    correct: 1,
    explain: 'Article I gives lawmaking power to Congress: the Senate and the House.'
  },
  {
    question: 'How many justices serve on the U.S. Supreme Court?',
    answers: ['7', '9', '12'],
    correct: 1,
    explain: 'Nine: one Chief Justice and eight Associate Justices.'
  },
  {
    question: 'What can Congress do if the President vetoes a bill?',
    answers: [
      'Nothing — the veto is final',
      'Ask the Supreme Court to reverse it',
      'Override it with a two-thirds vote in both chambers'
    ],
    correct: 2,
    explain: 'A two-thirds vote in both the House and Senate overrides a veto.'
  },
  {
    question: 'Which case established judicial review?',
    answers: ['Marbury v. Madison', 'Brown v. Board of Education', 'McCulloch v. Maryland'],
    correct: 0,
    explain: 'Marbury v. Madison (1803) let courts strike down unconstitutional laws.'
  },
  {
    question: 'Who nominates federal judges, and who confirms them?',
    answers: [
      'The President nominates; the Senate confirms',
      'The Senate nominates; the President confirms',
      'The Supreme Court chooses its own members'
    ],
    correct: 0,
    explain: 'A classic check: the executive nominates, the legislative confirms.'
  }
];

const quizCard = document.getElementById('quiz-card');

if (quizCard) {
  const progressEl = document.getElementById('quiz-progress');
  const questionEl = document.getElementById('quiz-question');
  const answersEl = document.getElementById('quiz-answers');
  const feedbackEl = document.getElementById('quiz-feedback');
  const nextButton = document.getElementById('quiz-next');

  let current = 0;
  let score = 0;
  let answered = false;

  function renderQuestion() {
    const item = QUIZ[current];
    answered = false;

    progressEl.textContent = `Question ${current + 1} of ${QUIZ.length}`;
    questionEl.textContent = item.question;
    feedbackEl.textContent = '';
    feedbackEl.className = 'quiz-feedback';
    nextButton.disabled = true;
    nextButton.textContent = current === QUIZ.length - 1 ? 'See my score' : 'Next question';

    answersEl.innerHTML = '';
    item.answers.forEach((answer, index) => {
      const button = document.createElement('button');
      button.className = 'quiz-answer';
      button.type = 'button';
      button.textContent = answer;
      button.addEventListener('click', () => selectAnswer(index, button));
      answersEl.appendChild(button);
    });
  }

  function selectAnswer(index, button) {
    if (answered) return;
    answered = true;

    const item = QUIZ[current];
    const buttons = answersEl.querySelectorAll('.quiz-answer');
    buttons.forEach(b => (b.disabled = true));
    buttons[item.correct].classList.add('is-correct');

    if (index === item.correct) {
      score += 1;
      feedbackEl.textContent = `Correct! ${item.explain}`;
      feedbackEl.classList.add('is-correct');
    } else {
      button.classList.add('is-wrong');
      feedbackEl.textContent = `Not quite. ${item.explain}`;
      feedbackEl.classList.add('is-wrong');
    }

    nextButton.disabled = false;
  }

  function renderResults() {
    progressEl.textContent = 'Results';
    questionEl.textContent =
      score === QUIZ.length
        ? `Perfect score — ${score} of ${QUIZ.length}!`
        : `You scored ${score} of ${QUIZ.length}.`;
    answersEl.innerHTML = '';
    feedbackEl.className = 'quiz-feedback';
    feedbackEl.textContent =
      score === QUIZ.length
        ? 'You clearly know your separation of powers.'
        : 'Scroll back up to review the branches, then try again.';
    nextButton.textContent = 'Restart quiz';
    nextButton.disabled = false;
  }

  nextButton.addEventListener('click', () => {
    if (progressEl.textContent === 'Results') {
      current = 0;
      score = 0;
      renderQuestion();
      return;
    }

    if (current === QUIZ.length - 1) {
      renderResults();
    } else {
      current += 1;
      renderQuestion();
    }
  });

  renderQuestion();
}
