// JS Goes here - ES6 supported

function initGallery() {
  const carousel = document.querySelector(".gallery-carousel");
  const prev = document.querySelector(".prev");
  const next = document.querySelector(".next");

  if (!carousel || !prev || !next || typeof Siema === "undefined") {
    return;
  }

  const mySiema = new Siema({
    selector: ".gallery-carousel",
    duration: 200,
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

initGallery();
