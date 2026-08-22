function ready(fn) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", fn);
  } else {
    fn();
  }
}

function initNav() {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("site-nav");
  if (!header || !toggle || !nav) return;

  toggle.addEventListener("click", function() {
    const open = header.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  nav.querySelectorAll("a").forEach(function(link) {
    link.addEventListener("click", function() {
      header.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function initTriangle() {
  const root = document.querySelector("[data-triangle]");
  if (!root) return;

  const nodes = root.querySelectorAll("[data-node]");
  const panels = root.querySelectorAll("[data-panel]");

  function show(name) {
    nodes.forEach(function(btn) {
      const on = btn.getAttribute("data-node") === name;
      btn.classList.toggle("is-active", on);
      btn.setAttribute("aria-selected", on ? "true" : "false");
    });
    panels.forEach(function(panel) {
      panel.hidden = panel.getAttribute("data-panel") !== name;
    });
  }

  nodes.forEach(function(btn) {
    btn.addEventListener("click", function() {
      show(btn.getAttribute("data-node"));
    });
  });
}

function initBill() {
  const root = document.querySelector("[data-bill]");
  if (!root) return;

  const items = root.querySelectorAll("li");
  root.querySelectorAll("[data-step]").forEach(function(btn) {
    btn.addEventListener("click", function() {
      const index = Number(btn.getAttribute("data-step"));
      items.forEach(function(item, i) {
        item.classList.toggle("is-active", i === index);
      });
    });
  });
}

function initQuiz() {
  const form = document.querySelector("[data-quiz]");
  if (!form) return;
  const out = form.querySelector("[data-quiz-result]");

  form.addEventListener("submit", function(event) {
    event.preventDefault();
    const names = ["q1", "q2", "q3", "q4", "q5"];
    let score = 0;
    let answered = 0;

    names.forEach(function(name) {
      const picked = form.querySelector('input[name="' + name + '"]:checked');
      if (!picked) return;
      answered += 1;
      if (picked.value === "right") score += 1;
    });

    out.hidden = false;
    out.classList.remove("is-good", "is-ok", "is-low");

    if (answered < names.length) {
      out.textContent = "Answer every question first — five clauses, five choices.";
      out.classList.add("is-ok");
      return;
    }

    out.textContent = score + " out of 5. " + (
      score === 5 ? "You could have sat in the Philadelphia State House." :
      score >= 3 ? "A working knowledge of the machine. Read a branch page to sharpen it." :
      "The Framers left a map. Walk the three articles and try again."
    );
    out.classList.add(score === 5 ? "is-good" : score >= 3 ? "is-ok" : "is-low");
  });
}

ready(function() {
  initNav();
  initTriangle();
  initBill();
  initQuiz();
});
