(function () {
  const board = document.querySelector('[data-stream-board]');
  const status = document.querySelector('[data-status-rail]');
  const seals = document.querySelectorAll('[data-practice-seal]');
  const holdBtn = document.querySelector('[data-hold-cta]');
  const cfg = window.__PRACTICE__ || {};

  function setAIL(action, item, limit) {
    if (!status) return;
    const a = status.querySelector('[data-ail="action"]');
    const i = status.querySelector('[data-ail="item"]');
    const l = status.querySelector('[data-ail="limit"]');
    if (a) a.textContent = action;
    if (i) i.textContent = item;
    if (l) l.textContent = limit;
    status.dataset.state = 'ready';
  }

  function stampSeals() {
    const stakes = document.querySelector('[data-stakes]');
    const fittsOk = holdBtn && holdBtn.getBoundingClientRect().height >= 47;
    const ailOk = status && status.querySelector('[data-ail="action"]').textContent.trim().length > 0;
    const ok = !!(stakes && ailOk && fittsOk);
    seals.forEach((el) => {
      el.dataset.stamped = ok ? 'true' : 'false';
      el.querySelector('.label').textContent = ok ? 'Practice sealed' : 'Joints open';
    });
    if (holdBtn) {
      holdBtn.disabled = !ok;
      holdBtn.setAttribute('aria-disabled', ok ? 'false' : 'true');
    }
    return ok;
  }

  function runStream() {
    if (!board) {
      setAIL('Ready', cfg.defaultItem || 'Board', cfg.defaultLimit || '—');
      stampSeals();
      return;
    }
    const cards = [...board.querySelectorAll('[data-stream-card]')];
    setAIL('Streaming', 'Board fill', 'skeleton');
    cards.forEach((c) => { c.dataset.state = 'skeleton'; });

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const t1 = reduce ? 80 : 450;
    const t2 = reduce ? 160 : 900;

    window.setTimeout(() => {
      cards.forEach((c, idx) => {
        c.dataset.state = 'partial';
        const title = c.querySelector('[data-title]');
        if (title) title.textContent = cfg.streamItems?.[idx] || title.dataset.fallback || 'Item';
      });
      setAIL('Streaming', 'Board fill', 'partial');
      stampSeals();
    }, t1);

    window.setTimeout(() => {
      cards.forEach((c) => {
        c.dataset.state = 'ready';
        const price = c.querySelector('[data-price]');
        if (price) price.hidden = false;
      });
      setAIL('Ready', cfg.defaultItem || 'Board live', cfg.defaultLimit || 'open');
      stampSeals();
      board.dataset.streamState = 'ready';
    }, t2);
  }

  if (holdBtn) {
    holdBtn.addEventListener('click', () => {
      if (holdBtn.disabled) return;
      setAIL(
        cfg.holdAction || 'Holding',
        cfg.holdItem || 'Selection',
        cfg.holdLimit || 'timed hold'
      );
      stampSeals();
      holdBtn.textContent = cfg.heldLabel || 'Hold placed';
    });
  }

  // Deterministic fallback if stream script errors
  try {
    runStream();
  } catch (e) {
    setAIL('Ready', cfg.defaultItem || 'Fallback board', cfg.defaultLimit || 'deterministic');
    if (board) {
      board.querySelectorAll('[data-stream-card]').forEach((c) => { c.dataset.state = 'ready'; });
      board.dataset.streamState = 'fallback';
    }
    stampSeals();
  }

  // Re-stamp on resize for Fitts
  window.addEventListener('resize', stampSeals);
})();
