/* Pass HK — Pattern 2 progressive fill streaming (chrome never streams away) */
(function () {
  const rail = document.querySelector("[data-stream-rail]");
  const cards = Array.from(document.querySelectorAll("[data-fill-card]"));
  const fallback = document.querySelector("[data-fallback]");
  if (!rail || !cards.length) return;

  const phases = ["loading", "partial", "ready"];
  const labels = {
    loading: "Streaming · Board · Skeleton props landing",
    partial: "Assembling · Partial board · Envelope unchanged",
    ready: "Assembled · Full board · Envelope unchanged",
    error: "Fallback · Static board · Envelope unchanged",
  };

  function setRail(state) {
    rail.dataset.state = state;
    const text = rail.querySelector("[data-stream-text]");
    if (text) text.textContent = labels[state] || labels.ready;
  }

  function fillCard(card, state, html) {
    card.dataset.state = state;
    if (html != null) card.innerHTML = html;
  }

  const catalog = window.__BOARD__ || [];

  setRail("streaming");
  cards.forEach((c) => fillCard(c, "loading", '<p class="meta">Loading…</p><h3>&nbsp;</h3><p>&nbsp;</p>'));

  let i = 0;
  const tick = () => {
    if (i >= cards.length) {
      setRail("ready");
      if (fallback) fallback.hidden = true;
      return;
    }
    const card = cards[i];
    const item = catalog[i] || { title: "Item", body: "Details arriving.", meta: "Ready" };
    fillCard(
      card,
      "partial",
      `<p class="meta">${item.meta || "Partial"}</p><h3>${item.title}</h3><p>${item.body}</p>`
    );
    setRail("partial");
    setTimeout(() => {
      fillCard(
        card,
        "ready",
        `<p class="meta">${item.meta || "Ready"}</p><h3>${item.title}</h3><p>${item.body}</p>`
      );
      i += 1;
      setTimeout(tick, 180);
    }, 220);
  };

  // Deterministic fallback if generative layer "fails"
  const failToggle = document.querySelector("[data-force-fallback]");
  if (failToggle) {
    failToggle.addEventListener("click", () => {
      setRail("error");
      cards.forEach((c, idx) => {
        const item = catalog[idx] || { title: "Board item", body: "Static fallback copy.", meta: "Fallback" };
        fillCard(c, "error", `<p class="meta">Fallback</p><h3>${item.title}</h3><p>${item.body}</p>`);
      });
      if (fallback) fallback.hidden = false;
    });
  }

  setTimeout(tick, 350);

  // Hold / Reserve A+I+L
  const form = document.querySelector("[data-hold-form]");
  const ail = document.querySelector("[data-ail]");
  if (form && ail) {
    const update = () => {
      const action = form.dataset.actionLabel || "Holding";
      const item = form.querySelector("[name=item]")?.value || "selection";
      const limit = form.querySelector("[name=limit]")?.value || "24h";
      ail.textContent = `${action} · ${item} · ${limit}`;
    };
    form.addEventListener("input", update);
    form.addEventListener("change", update);
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      update();
    });
    update();
  }

  // Optional filters only (progressive disclosure OK here)
  document.querySelectorAll("[data-filter]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const pressed = btn.getAttribute("aria-pressed") === "true";
      btn.setAttribute("aria-pressed", pressed ? "false" : "true");
    });
  });
})();
