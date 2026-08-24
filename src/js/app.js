const reel = document.querySelector(".showreel");

if (reel) {
  const video = reel.querySelector("video");
  const play = reel.querySelector(".showreel-play");

  const playReel = function() {
    reel.classList.add("is-playing");
    if (video) {
      const start = video.play();
      if (start && start.catch) {
        start.catch(function() {
          reel.classList.remove("is-playing");
        });
      }
    }
  };

  const stopReel = function() {
    reel.classList.remove("is-playing");
  };

  if (play) {
    play.addEventListener("click", playReel);
  }

  if (video) {
    video.addEventListener("pause", stopReel);
    video.addEventListener("click", function() {
      if (!video.paused) {
        video.pause();
      }
    });
  }
}

const markRail = function() {
  const hash = window.location.hash.replace("#", "");
  const panels = document.querySelectorAll(".rail-panel");
  for (let i = 0; i < panels.length; i += 1) {
    const id = panels[i].getAttribute("data-service");
    if (hash && id === hash) {
      panels[i].classList.add("is-active");
    } else {
      panels[i].classList.remove("is-active");
    }
  }
};

markRail();
window.addEventListener("hashchange", markRail);
