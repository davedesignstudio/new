const header = document.querySelector(".header");
const toggle = document.querySelector(".nav-toggle");

if (header && toggle) {
  toggle.addEventListener("click", function () {
    const open = header.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.textContent = open ? "Close" : "Menu";
  });

  header.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      header.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.textContent = "Menu";
    });
  });
}

if (header) {
  var compact = false;
  function onScroll() {
    var next = window.scrollY > 48;
    if (next === compact) return;
    compact = next;
    header.classList.toggle("is-compact", compact);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}
