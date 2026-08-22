function initNavToggle() {
  const toggle = document.querySelector('[data-nav-toggle]');
  const nav = document.getElementById('site-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
  });
}

function initBranchExplorer() {
  const explorer = document.querySelector('[data-explorer]');
  if (!explorer) return;

  const nodes = Array.prototype.slice.call(explorer.querySelectorAll('[data-branch]'));
  const panels = Array.prototype.slice.call(explorer.querySelectorAll('[data-panel]'));
  const arrows = Array.prototype.slice.call(explorer.querySelectorAll('[data-arrow-from]'));

  const setState = (el, on) => {
    if (on) {
      el.classList.add('is-active');
    } else {
      el.classList.remove('is-active');
    }
  };

  const select = slug => {
    nodes.forEach(node => {
      const on = node.getAttribute('data-branch') === slug;
      setState(node, on);
      node.setAttribute('aria-pressed', String(on));
    });
    panels.forEach(panel => setState(panel, panel.getAttribute('data-panel') === slug));
    arrows.forEach(arrow => setState(arrow, arrow.getAttribute('data-arrow-from') === slug));
  };

  nodes.forEach(node => {
    const slug = node.getAttribute('data-branch');
    node.addEventListener('click', () => select(slug));
    node.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ' || event.key === 'Spacebar') {
        event.preventDefault();
        select(slug);
      }
    });
  });

  const initial = panels.filter(panel => panel.classList.contains('is-active'))[0];
  select(initial ? initial.getAttribute('data-panel') : nodes[0].getAttribute('data-branch'));
}

function initMatrixFilter() {
  const matrix = document.querySelector('[data-matrix]');
  if (!matrix) return;

  const buttons = Array.prototype.slice.call(matrix.querySelectorAll('[data-filter]'));
  const cards = Array.prototype.slice.call(matrix.querySelectorAll('[data-pair]'));
  const count = matrix.querySelector('[data-matrix-count]');

  const apply = filter => {
    let shown = 0;

    cards.forEach(card => {
      const match = filter === 'all' || card.getAttribute('data-from') === filter;
      card.classList.toggle('is-hidden', !match);
      if (match) shown += 1;
    });

    buttons.forEach(button => {
      button.classList.toggle('is-active', button.getAttribute('data-filter') === filter);
      button.setAttribute('aria-pressed', String(button.getAttribute('data-filter') === filter));
    });

    if (count) count.textContent = String(shown);
  };

  buttons.forEach(button => {
    button.addEventListener('click', () => apply(button.getAttribute('data-filter')));
  });

  apply('all');
}

function initQuiz() {
  const quiz = document.querySelector('[data-quiz]');
  if (!quiz) return;

  const cards = Array.prototype.slice.call(quiz.querySelectorAll('[data-question]'));
  const correctOut = quiz.querySelector('[data-quiz-correct]');
  const answeredOut = quiz.querySelector('[data-quiz-answered]');
  const resetButton = quiz.querySelector('[data-quiz-reset]');

  let correct = 0;
  let answered = 0;

  const render = () => {
    if (correctOut) correctOut.textContent = String(correct);
    if (answeredOut) answeredOut.textContent = String(answered);
  };

  const answer = (card, button) => {
    if (card.getAttribute('data-answered') === 'true') return;

    const expected = card.getAttribute('data-answer');
    const chosen = button.getAttribute('data-choice');
    const wasRight = chosen === expected;
    const options = Array.prototype.slice.call(card.querySelectorAll('[data-choice]'));

    options.forEach(option => {
      option.disabled = true;
      if (option === button) {
        option.classList.add(wasRight ? 'is-correct' : 'is-wrong');
      } else if (!wasRight && option.getAttribute('data-choice') === expected) {
        option.classList.add('is-revealed');
      }
    });

    const feedback = card.querySelector('[data-feedback]');
    const verdict = card.querySelector('[data-verdict]');

    if (verdict) {
      verdict.textContent = wasRight ? 'Correct.' : 'Not quite.';
      verdict.classList.add(wasRight ? 'is-correct' : 'is-wrong');
    }
    if (feedback) feedback.hidden = false;

    card.setAttribute('data-answered', 'true');
    answered += 1;
    if (wasRight) correct += 1;
    render();
  };

  cards.forEach(card => {
    Array.prototype.slice.call(card.querySelectorAll('[data-choice]')).forEach(button => {
      button.addEventListener('click', () => answer(card, button));
    });
  });

  if (resetButton) {
    resetButton.addEventListener('click', () => {
      correct = 0;
      answered = 0;

      cards.forEach(card => {
        card.removeAttribute('data-answered');

        Array.prototype.slice.call(card.querySelectorAll('[data-choice]')).forEach(button => {
          button.disabled = false;
          button.classList.remove('is-correct', 'is-wrong', 'is-revealed');
        });

        const feedback = card.querySelector('[data-feedback]');
        const verdict = card.querySelector('[data-verdict]');
        if (feedback) feedback.hidden = true;
        if (verdict) verdict.classList.remove('is-correct', 'is-wrong');
      });

      render();
      cards[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  render();
}

initNavToggle();
initBranchExplorer();
initMatrixFilter();
initQuiz();
