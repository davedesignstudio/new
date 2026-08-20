// Soma site interactions
const navToggle = document.querySelector("[data-nav-toggle]");
const header = document.querySelector(".site-header");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    const open = document.body.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });

  document.querySelectorAll(".site-nav a").forEach((link) => {
    link.addEventListener("click", () => {
      document.body.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Open menu");
    });
  });
}

if (header) {
  const onScroll = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

const revealEls = document.querySelectorAll(".reveal");
if (revealEls.length && "IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
  );
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("is-visible"));
}

const gallery = document.querySelector(".gallery-carousel");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");

if (gallery && prev && next && typeof Siema !== "undefined") {
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

  prev.addEventListener("click", () => mySiema.prev());
  next.addEventListener("click", () => mySiema.next());
}
