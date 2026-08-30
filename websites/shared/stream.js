/**
 * Pass HN · Catalog Contract stream helper
 * Pattern 2: progressive fill streaming with deterministic fallback.
 * Outermost aria-live only; children are ordinary DOM.
 */
(function () {
  const rail = document.querySelector("[data-stream-rail]");
  const fill = document.querySelector("[data-stream-fill]");
  const seal = document.querySelector("[data-practice-seal]");
  const primary = document.querySelector("[data-primary-cta]");
  const stakeReady = document.querySelector("[data-stakes]");

  if (!rail || !fill) return;

  const items = JSON.parse(fill.getAttribute("data-catalog") || "[]");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function setRail(state, detail) {
    rail.dataset.state = state;
    rail.textContent = detail || "";
    if (state === "streaming" && !reduceMotion) {
      const shimmer = document.createElement("span");
      shimmer.className = "stream-shimmer";
      shimmer.setAttribute("aria-hidden", "true");
      rail.appendChild(shimmer);
    }
  }

  function renderItem(item) {
    const card = document.createElement("article");
    card.className = "interact-card";
    card.innerHTML =
      "<h3>" +
      item.title +
      "</h3><p>" +
      item.blurb +
      "</p>" +
      (item.meta
        ? '<p class="catalog-note">' + item.meta + "</p>"
        : "");
    if (item.href) {
      const a = document.createElement("a");
      a.className = "btn btn-ghost";
      a.href = item.href;
      a.textContent = item.cta || "Open";
      a.style.color = "var(--ink)";
      a.style.borderColor = "var(--line)";
      a.style.justifySelf = "start";
      card.appendChild(a);
    }
    fill.appendChild(card);
  }

  function updateSeal(ready) {
    if (!seal || !primary) return;
    seal.dataset.state = ready ? "ready" : "locked";
    seal.textContent = ready
      ? "Practice seal · ready"
      : "Practice seal · await stakes + catalog";
    primary.setAttribute("aria-disabled", ready ? "false" : "true");
    if (ready) {
      primary.removeAttribute("tabindex");
    } else {
      primary.setAttribute("tabindex", "-1");
    }
  }

  function hydrate() {
    fill.innerHTML = "";
    setRail("streaming", "Composing from registered catalog…");
    updateSeal(false);

    let i = 0;
    const step = () => {
      if (i >= items.length) {
        setRail("complete", items.length + " registered components hydrated");
        updateSeal(Boolean(stakeReady));
        return;
      }
      renderItem(items[i]);
      i += 1;
      window.setTimeout(step, reduceMotion ? 0 : 220);
    };

    try {
      if (!items.length) throw new Error("empty catalog");
      step();
    } catch (err) {
      setRail("fallback", "Static menu restored");
      fill.innerHTML =
        '<article class="interact-card"><h3>House selection</h3><p>Deterministic fallback — catalog unavailable.</p></article>';
      updateSeal(Boolean(stakeReady));
    }
  }

  // Initial seal locked until stakes present + stream completes
  updateSeal(false);
  hydrate();

  // Optional filter progressive disclosure — does not affect stakes visibility
  document.querySelectorAll("[data-filter]").forEach((input) => {
    input.addEventListener("change", () => {
      const active = [...document.querySelectorAll("[data-filter]:checked")].map(
        (el) => el.value
      );
      [...fill.children].forEach((card) => {
        const tags = (card.querySelector(".catalog-note")?.textContent || "")
          .toLowerCase()
          .split(/[^a-z0-9+]+/);
        const show =
          !active.length || active.some((t) => tags.includes(t.toLowerCase()));
        card.hidden = !show;
      });
    });
  });
})();
