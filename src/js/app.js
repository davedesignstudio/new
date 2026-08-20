const body = document.body;
const navToggle = document.querySelector(".nav-toggle");
const nav = document.getElementById("site-nav");

if (navToggle && nav) {
  const setOpen = open => {
    body.classList.toggle("nav-open", open);
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
  };

  navToggle.addEventListener("click", () => {
    setOpen(!body.classList.contains("nav-open"));
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => setOpen(false));
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      setOpen(false);
    }
  });
}

const video = document.getElementById("home_video");
if (video && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  video.pause();
  video.removeAttribute("autoplay");
}

const carousel = document.querySelector(".gallery-carousel");
if (carousel) {
  const slides = Array.from(carousel.querySelectorAll(".gallery-slide"));
  const prev = document.querySelector(".gallery-prev");
  const next = document.querySelector(".gallery-next");
  const count = document.querySelector(".gallery-count");
  let index = 0;

  const render = () => {
    slides.forEach((slide, i) => {
      slide.hidden = i !== index;
    });
    if (count && slides.length) {
      count.textContent = `${index + 1} / ${slides.length}`;
    }
  };

  if (prev) {
    prev.addEventListener("click", () => {
      index = (index - 1 + slides.length) % slides.length;
      render();
    });
  }

  if (next) {
    next.addEventListener("click", () => {
      index = (index + 1) % slides.length;
      render();
    });
  }

  render();
}
