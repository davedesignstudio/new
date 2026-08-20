// Site interactions
const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const open = siteNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });
}

const carousel = document.querySelector(".gallery-carousel");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");

if (carousel && typeof Siema !== "undefined") {
  const mySiema = new Siema({
    selector: ".gallery-carousel",
    duration: 280,
    easing: "ease",
    perPage: 1,
    startIndex: 0,
    draggable: true,
    threshold: 20,
    loop: true
  });

  if (prev) prev.addEventListener("click", () => mySiema.prev());
  if (next) next.addEventListener("click", () => mySiema.next());
}
