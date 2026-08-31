/**
 * Pass HS · Survey · Spectrum Match + Catalog Contract
 * Pattern 2: progressive fill streaming with deterministic fallback.
 * Pattern 4: predictable surface envelopes (hoop never streams).
 * Pattern 5: user steering via optional filters (ARIA).
 * Pattern 7: component telemetry on rail completion.
 * Outermost aria-live only; children are ordinary DOM.
 * Envelope stays; fill hydrates via data-path.
 * Survey seal unlocks when joints stamp.
 */
(function () {
  const rail = document.querySelector("[data-stream-rail]");
  const fill = document.querySelector("[data-stream-fill]");
  const seal = document.querySelector("[data-practice-seal]");
  const primary = document.querySelector("[data-primary-cta]");
  const stakeReady = document.querySelector("[data-stakes]");
  const drill = document.querySelector("[data-practice-drill]");
  const telemetry = document.querySelector("[data-telemetry]");

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

  function jointState() {
    const fittsOk = (() => {
      if (!primary) return false;
      const r = primary.getBoundingClientRect();
      return r.height >= 48;
    })();
    return {
      J1: rail.dataset.state === "complete" || rail.dataset.state === "fallback",
      J2: Boolean(stakeReady) && fittsOk,
      J3: document.querySelectorAll(".place-credit").length >= 1,
      J4: document.querySelectorAll("[data-ail]").length >= 1,
      J5: document.querySelectorAll(".two-ways").length >= 1,
      J6: Boolean(seal),
    };
  }

  function stampDrills(ready) {
    if (!drill) return;
    const joints = jointState();
    const keys = Object.keys(joints);
    let stamped = 0;
    keys.forEach((k) => {
      const li = drill.querySelector('[data-joint="' + k + '"]');
      if (!li) return;
      const ok = joints[k];
      li.dataset.stamped = ok ? "true" : "false";
      li.setAttribute("aria-checked", ok ? "true" : "false");
      if (ok) stamped += 1;
    });
    drill.dataset.stampedCount = String(stamped);
    drill.dataset.state = ready && stamped === keys.length ? "sealed" : "drilling";
  }

  function updateSeal(ready) {
    if (!seal || !primary) return;
    const joints = jointState();
    const allJoints = Object.values(joints).every(Boolean);
    const sealed = ready && allJoints;
    seal.dataset.state = sealed ? "ready" : "locked";
    seal.textContent = sealed
      ? "Survey seal · spectrum matched"
      : "Survey seal · await joint stamps";
    primary.setAttribute("aria-disabled", sealed ? "false" : "true");
    if (sealed) {
      primary.removeAttribute("tabindex");
    } else {
      primary.setAttribute("tabindex", "-1");
    }
    stampDrills(sealed);
    if (telemetry) {
      telemetry.dataset.state = sealed ? "ok" : "pending";
      telemetry.textContent = sealed
        ? "telemetry · catalog hydrate ok · joints 6/6 · Pattern 7"
        : "telemetry · awaiting hydrate";
    }
  }

  function hydrate() {
    fill.innerHTML = "";
    setRail(
      "streaming",
      "dataModelUpdate · Component System fill · Chat Components hold the stakes…"
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
            " exampleData · Survey HS"
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
