function formatTime(seconds) {
  if (!isFinite(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return m + ":" + (s < 10 ? "0" : "") + s;
}

function initNav() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");
  if (!toggle || !nav) return;
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
}

function initPlayer(root) {
  const audio = root.querySelector("audio");
  const button = root.querySelector(".play-btn");
  const elapsed = root.querySelector("[data-elapsed]");
  const duration = root.querySelector("[data-duration]");
  const bar = root.querySelector("[data-progress]");
  const progress = root.querySelector(".player-progress");
  const lines = Array.prototype.slice.call(root.querySelectorAll("[data-lyrics] li"));

  if (!audio || !button) return;

  let lastActive = -1;
  const sync = () => {
    const t = audio.currentTime || 0;
    const d = audio.duration || 0;
    if (elapsed) elapsed.textContent = formatTime(t);
    if (duration && d) duration.textContent = formatTime(d);
    if (bar && d) bar.style.width = (t / d) * 100 + "%";

    if (lines.length) {
      let active = -1;
      lines.forEach((line, i) => {
        const start = parseFloat(line.getAttribute("data-t"));
        if (t >= start) active = i;
      });
      if (active !== lastActive) {
        lastActive = active;
        lines.forEach((line, i) => {
          const on = i === active;
          line.classList.toggle("is-active", on);
          if (on) {
            const list = line.parentNode;
            const top = line.offsetTop - list.clientHeight / 2 + line.offsetHeight / 2;
            list.scrollTop = Math.max(0, top);
          }
        });
      }
    }
  };

  button.addEventListener("click", () => {
    if (audio.paused) {
      document.querySelectorAll("[data-theme-player] audio").forEach((other) => {
        if (other !== audio) other.pause();
      });
      audio.play();
    } else {
      audio.pause();
    }
  });

  audio.addEventListener("play", () => root.classList.add("is-playing"));
  audio.addEventListener("pause", () => root.classList.remove("is-playing"));
  audio.addEventListener("ended", () => root.classList.remove("is-playing"));
  audio.addEventListener("timeupdate", sync);
  audio.addEventListener("loadedmetadata", sync);

  if (progress) {
    const seek = (event) => {
      const rect = progress.getBoundingClientRect();
      const ratio = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
      if (audio.duration) audio.currentTime = ratio * audio.duration;
    };
    progress.addEventListener("click", seek);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  document.querySelectorAll("[data-theme-player]").forEach(initPlayer);
});
