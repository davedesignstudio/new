(function () {
  var frame = document.querySelector(".video-frame");
  var video = document.getElementById("hero-video");
  var toggle = document.querySelector(".video-toggle");

  if (!frame || !video || !toggle) return;

  function setPlaying(playing) {
    frame.classList.toggle("is-live", playing);
    video.classList.toggle("is-playing", playing);
    toggle.setAttribute("aria-pressed", playing ? "true" : "false");
    toggle.querySelector(".video-toggle-text").textContent = playing
      ? "Pause"
      : "Video";
  }

  toggle.addEventListener("click", function () {
    if (video.paused) {
      var playPromise = video.play();
      if (playPromise && typeof playPromise.then === "function") {
        playPromise
          .then(function () {
            setPlaying(true);
          })
          .catch(function () {
            setPlaying(false);
          });
      } else {
        setPlaying(true);
      }
    } else {
      video.pause();
      setPlaying(false);
    }
  });

  video.addEventListener("ended", function () {
    setPlaying(false);
  });
})();
