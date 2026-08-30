/**
 * Pass HO · Deepen · ExampleData Pedagogy + Bound DataModel
 * Pattern 2: progressive fill streaming with deterministic fallback.
 * Outermost aria-live only; children are ordinary DOM.
 * Envelope stays; fill hydrates via data-path (A2UI dataModelUpdate metaphor).
 */
(function () {
  const rail = document.querySelector("[data-stream-rail]");
  const fill = document.querySelector("[data-stream-fill]");
  const seal = document.querySelector("[data-practice-seal]");
  const primary = document.querySelector("[data-primary-cta]");
  const stakeReady = document.querySelector("[data-stakes]");

  if (!rail || !fill) return;

  const items = JSON.parse(fill.getAttribute("data-catalog") || "[]");
  const examples = JSON.parse(fill.getAttribute("data-examples") || "[]");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const catalogId = fill.getAttribute("data-catalog-id") || "board";

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

  function renderItem(item, index, isExample) {
    const card = document.createElement("article");
    card.className = "interact-card";
    card.setAttribute("data-path", "/fill/" + catalogId + "/" + index);
    card.setAttribute("data-bound", "true");
    if (isExample) {
      card.setAttribute("data-example", "true");
      card.classList.add("is-example");
    }

    let badge = "";
    if (isExample) {
      badge =
        '<p class="example-badge" data-example-badge>exampleData · guild teaching piece</p>';
    }

    card.innerHTML =
      badge +
      "<h3>" +
      item.title +
      "</h3><p>" +
      item.blurb +
      "</p>" +
      (item.meta
        ? '<p class="catalog-note">' + item.meta + "</p>"
        : "") +
      '<p class="data-path" data-path-label>/fill/' +
      catalogId +
      "/" +
      index +
      "</p>";

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
    setRail(
      "streaming",
      "dataModelUpdate · composing from registered catalog + exampleData…"
    );
    updateSeal(false);

    const queue = [];
    examples.forEach((ex, i) => queue.push({ item: ex, example: true, i }));
    items.forEach((it, i) =>
      queue.push({ item: it, example: false, i: examples.length + i })
    );

    let i = 0;
    const step = () => {
      if (i >= queue.length) {
        setRail(
          "complete",
          queue.length +
            " bound paths hydrated · " +
            examples.length +
            " exampleData"
        );
        updateSeal(Boolean(stakeReady));
        return;
      }
      const entry = queue[i];
      renderItem(entry.item, entry.i, entry.example);
      i += 1;
      window.setTimeout(step, reduceMotion ? 0 : 200);
    };

    try {
      if (!queue.length) throw new Error("empty catalog");
      step();
    } catch (err) {
      setRail("fallback", "Static menu restored · unmarked metal rejected");
      fill.innerHTML =
        '<article class="interact-card"><h3>House selection</h3><p>Deterministic fallback — catalog unavailable.</p></article>';
      updateSeal(Boolean(stakeReady));
    }
  }

  updateSeal(false);
  hydrate();

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
