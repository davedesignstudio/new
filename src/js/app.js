document.addEventListener("DOMContentLoaded", function () {
  var frame = document.querySelector("[data-video-frame]");
  var video = document.getElementById("studio-video");

  if (!frame || !video) {
    return;
  }

  function markPlaying() {
    frame.classList.add("is-playing");
  }

  function markPaused() {
    if (video.paused) {
      frame.classList.remove("is-playing");
    }
  }

  frame.addEventListener("click", function () {
    if (video.paused) {
      var playPromise = video.play();
      if (playPromise && typeof playPromise.then === "function") {
        playPromise.then(markPlaying).catch(function () {});
      } else {
        markPlaying();
      }
    } else {
      video.pause();
      markPaused();
    }
  });

  video.addEventListener("play", markPlaying);
  video.addEventListener("pause", markPaused);
  video.addEventListener("ended", markPaused);
});
