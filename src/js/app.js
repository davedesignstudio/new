// Site behaviour: mobile navigation, header state and scroll-in reveals.
// Everything here is progressive; the site is fully usable without it.

const header = document.querySelector("[data-header]");
const toggle = document.querySelector("[data-nav-toggle]");
const label = document.querySelector("[data-nav-label]");
const nav = document.getElementById("site-nav");

function setNav(open) {
  document.body.classList.toggle("nav-open", open);
  toggle.setAttribute("aria-expanded", String(open));
  label.textContent = open ? "Close" : "Menu";
}

if (toggle && nav) {
  toggle.addEventListener("click", () =>
    setNav(!document.body.classList.contains("nav-open"))
  );

  nav.addEventListener("click", e => {
    if (e.target.closest("a")) setNav(false);
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && document.body.classList.contains("nav-open")) {
      setNav(false);
      toggle.focus();
    }
  });

  // Reset when resizing past the desktop breakpoint so the overlay never sticks.
  const mq = window.matchMedia("(min-width: 60em)");
  const onChange = () => {
    if (mq.matches) setNav(false);
  };
  if (mq.addEventListener) mq.addEventListener("change", onChange);
  else mq.addListener(onChange);
}

if (header) {
  let lastKnown = 0;
  let ticking = false;
  const update = () => {
    header.classList.toggle("is-scrolled", lastKnown > 8);
    ticking = false;
  };
  window.addEventListener(
    "scroll",
    () => {
      lastKnown = window.scrollY || window.pageYOffset;
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    },
    { passive: true }
  );
  update();
}

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealables = Array.prototype.slice.call(document.querySelectorAll(".reveal"));

if (revealables.length) {
  if (!("IntersectionObserver" in window) || reduceMotion) {
    revealables.forEach(el => el.classList.add("is-visible"));
  } else {
    const io = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 }
    );
    // Anything already on screen shows immediately; the rest waits for scroll.
    const viewport = window.innerHeight || document.documentElement.clientHeight;
    revealables.forEach(el => {
      if (el.getBoundingClientRect().top < viewport) {
        el.classList.add("is-visible");
      } else {
        io.observe(el);
      }
    });
  }
}
