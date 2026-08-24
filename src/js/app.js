const rails = document.querySelectorAll(".service-rail");
const hash = window.location.hash.replace("#", "");

if (hash) {
  rails.forEach(rail => {
    const href = rail.getAttribute("href") || "";
    if (href.indexOf("#" + hash) !== -1) {
      rail.classList.add("is-active");
    }
  });
}

const video = document.getElementById("home_video");
if (video) {
  video.addEventListener("click", () => {
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  });
}
