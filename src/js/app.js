// Homepage interactions — keep safe when gallery carousel is absent
document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.querySelector(".gallery-carousel");
  if (carousel && typeof Siema !== "undefined") {
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

    const prev = document.querySelector(".prev");
    const next = document.querySelector(".next");
    if (prev) prev.addEventListener("click", () => mySiema.prev());
    if (next) next.addEventListener("click", () => mySiema.next());
  }

  // Soft reveal for video once it can play
  const video = document.querySelector(".video-frame__media");
  if (video) {
    const show = () => video.classList.add("is-ready");
    if (video.readyState >= 2) {
      show();
    } else {
      video.addEventListener("loadeddata", show, { once: true });
    }
  }
});
