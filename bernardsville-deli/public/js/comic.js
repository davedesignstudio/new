(() => {
  const root = document.querySelector("[data-comic-reader]");
  if (!root) return;

  const pages = [...root.querySelectorAll("[data-comic-page]")];
  const dots = [...root.querySelectorAll("[data-comic-goto]")];
  const prev = root.querySelector("[data-comic-prev]");
  const next = root.querySelector("[data-comic-next]");
  let index = 0;

  function show(nextIndex) {
    index = (nextIndex + pages.length) % pages.length;
    pages.forEach((page, i) => {
      const on = i === index;
      page.classList.toggle("is-active", on);
      page.toggleAttribute("hidden", !on);
    });
    dots.forEach((dot, i) => dot.classList.toggle("is-active", i === index));
    const active = pages[index];
    if (active) {
      active.querySelector("img")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    history.replaceState(null, "", `#p${index + 1}`);
    if (prev) prev.disabled = index === 0;
    if (next) next.disabled = index === pages.length - 1;
  }

  prev?.addEventListener("click", () => show(index - 1));
  next?.addEventListener("click", () => show(index + 1));
  dots.forEach((dot) => {
    dot.addEventListener("click", () => show(Number(dot.dataset.comicGoto || 0)));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") show(index + 1);
    if (event.key === "ArrowLeft") show(index - 1);
  });

  const hash = window.location.hash.match(/^#p(\d+)$/);
  if (hash) {
    show(Math.max(0, Number(hash[1]) - 1));
  }

  const langKey = "bville-story-lang";

  function applyCaptions(lang) {
    const blend = lang === "blend";
    document.querySelectorAll("[data-caption-en]").forEach((el) => {
      const en = el.getAttribute("data-caption-en") || "";
      const mixed = el.getAttribute("data-caption-blend") || en;
      el.textContent = blend ? mixed : en;
    });
  }

  applyCaptions(localStorage.getItem(langKey) || "en");
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => applyCaptions(btn.dataset.lang || "en"));
  });
})();
