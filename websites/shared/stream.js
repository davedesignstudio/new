/**
 * Pass HM · Integrate · Pattern 2 progressive component streaming
 * Envelope (chrome) never streams away. Fill cards: skeleton → partial → ready | error.
 * Outermost aria-live only; deterministic fallback after timeout.
 */
(function () {
  const board = document.querySelector("[data-stream-board]");
  const rail = document.querySelector("[data-stream-rail]");
  if (!board) return;

  const items = (() => {
    try {
      return JSON.parse(board.getAttribute("data-items") || "[]");
    } catch {
      return [];
    }
  })();

  const fallback = (() => {
    try {
      return JSON.parse(board.getAttribute("data-fallback") || "[]");
    } catch {
      return items;
    }
  })();

  const phases = ["skeleton", "partial", "ready"];
  let failed = false;

  function setRail(action, item, limit, busy) {
    if (!rail) return;
    rail.setAttribute("aria-busy", busy ? "true" : "false");
    rail.innerHTML = `
      <div class="ail" role="status">
        <span><strong>Action</strong>${action}</span>
        <span><strong>Item</strong>${item}</span>
        <span><strong>Limit</strong>${limit}</span>
      </div>`;
  }

  function renderSkeleton() {
    board.innerHTML = items
      .map(
        () =>
          `<article class="stream-card is-loading" aria-hidden="true">
            <div class="skel" style="width:55%"></div>
            <div class="skel" style="width:80%"></div>
            <div class="skel" style="width:40%"></div>
          </article>`
      )
      .join("");
  }

  function renderPartial(count) {
    board.innerHTML = items
      .map((it, i) => {
        if (i < count) {
          return `<article class="stream-card is-partial">
            <h4>${it.title}</h4>
            <p>${it.teaser || "…"}</p>
          </article>`;
        }
        return `<article class="stream-card is-loading" aria-hidden="true">
          <div class="skel" style="width:50%"></div>
          <div class="skel" style="width:70%"></div>
        </article>`;
      })
      .join("");
  }

  function renderReady(source) {
    const list = source && source.length ? source : fallback;
    board.innerHTML = list
      .map(
        (it) =>
          `<article class="stream-card is-ready">
            <h4>${it.title}</h4>
            <p>${it.body || it.teaser || ""}</p>
          </article>`
      )
      .join("");
  }

  function renderError() {
    failed = true;
    board.innerHTML = `<article class="stream-card is-error" role="alert">
      <h4>Board delayed</h4>
      <p>Showing the sealed afternoon board (deterministic fallback).</p>
    </article>`;
    renderReady(fallback);
    setRail("Showing fallback board", "sealed menu", "live stream paused", false);
  }

  // Practice seal: stamp when stakes + AIL + Fitts present
  function stampSeals() {
    const stakes = document.querySelector(".stakes");
    const ail = document.querySelector(".ail");
    const btns = [...document.querySelectorAll(".btn-primary, [data-cta]")];
    const fittsOk = btns.every((b) => b.getBoundingClientRect().height >= 47);
    const ready = !!(stakes && ail && fittsOk);
    document.querySelectorAll(".practice-seal").forEach((el) => {
      el.dataset.sealed = ready ? "true" : "false";
      el.textContent = ready ? "Practice sealed · Integrate" : "Joints open";
    });
    document.querySelectorAll("[data-requires-seal]").forEach((el) => {
      if (ready) {
        el.removeAttribute("disabled");
        el.setAttribute("aria-disabled", "false");
      } else {
        el.setAttribute("disabled", "disabled");
        el.setAttribute("aria-disabled", "true");
      }
    });
    return ready;
  }

  // Hold / Reserve A+I+L narration
  document.querySelectorAll("[data-hold], [data-reserve]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      if (btn.getAttribute("aria-disabled") === "true" || btn.disabled) {
        e.preventDefault();
        return;
      }
      const item = btn.getAttribute("data-item") || "selection";
      const limit = btn.getAttribute("data-limit") || "standard window";
      const action = btn.hasAttribute("data-hold") ? "Hold started" : "Reserve requested";
      setRail(action, item, limit, false);
      const status = document.querySelector("[data-hold-status]");
      if (status) {
        status.innerHTML = `<div class="ail" role="status">
          <span><strong>Action</strong>${action}</span>
          <span><strong>Item</strong>${item}</span>
          <span><strong>Limit</strong>${limit}</span>
        </div>`;
      }
    });
  });

  // Stream sequence
  setRail("Streaming board", "menu fill", "chrome stable", true);
  renderSkeleton();
  stampSeals();

  const t1 = setTimeout(() => {
    if (failed) return;
    renderPartial(Math.max(1, Math.ceil(items.length / 2)));
    setRail("Streaming board", "partial cards", "chrome stable", true);
    stampSeals();
  }, 450);

  const t2 = setTimeout(() => {
    if (failed) return;
    renderReady(items);
    setRail("Board ready", board.getAttribute("data-board-name") || "today’s board", "live", false);
    stampSeals();
  }, 1100);

  // Deterministic fallback if something stalls
  const guard = setTimeout(() => {
    if (board.querySelector(".is-loading")) {
      clearTimeout(t1);
      clearTimeout(t2);
      renderError();
      stampSeals();
    }
  }, 4000);

  window.addEventListener("load", () => {
    stampSeals();
    clearTimeout(guard);
  });
})();
