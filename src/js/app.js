const header = document.querySelector(".header");
const toggle = document.querySelector(".nav-toggle");

if (header && toggle) {
  toggle.addEventListener("click", function () {
    const open = header.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.textContent = open ? "Close" : "Menu";
  });

  header.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      header.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.textContent = "Menu";
    });
  });
}

if (header) {
  var compact = false;
  function onScroll() {
    var next = window.scrollY > 48;
    if (next === compact) return;
    compact = next;
    header.classList.toggle("is-compact", compact);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

(function bindMenuTitleScroll() {
  var body = document.body;
  if (!body || body.className.indexOf("is-menu") === -1) return;

  function barOffset() {
    var header = document.querySelector(".header");
    var jump = document.querySelector(".menu-jump");
    var y = 18;
    if (header) y += header.getBoundingClientRect().height;
    if (jump) y += jump.getBoundingClientRect().height;
    return y;
  }

  function scrollToTitle(id) {
    if (!id) return false;
    var el = document.getElementById(id);
    if (!el) return false;
    var top = el.getBoundingClientRect().top + window.pageYOffset - barOffset();
    window.scrollTo(0, Math.max(0, top));
    return true;
  }

  function fromHash() {
    var id = window.location.hash.replace(/^#/, "");
    if (!id) return;
    try {
      id = decodeURIComponent(id);
    } catch (err) {}
    scrollToTitle(id);
  }

  window.addEventListener("hashchange", fromHash);
  window.addEventListener("load", fromHash);
  document.addEventListener("DOMContentLoaded", fromHash);
  setTimeout(fromHash, 0);
  setTimeout(fromHash, 160);
  setTimeout(fromHash, 480);

  document.querySelectorAll('.menu-jump a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      var id = (link.getAttribute("href") || "").replace(/^#/, "");
      if (!id || !document.getElementById(id)) return;
      e.preventDefault();
      if (history.replaceState) {
        history.replaceState(null, "", "#" + id);
      }
      scrollToTitle(id);
    });
  });
})();

document.querySelectorAll("video[autoplay]").forEach(function (video) {
  if (video.classList.contains("js-scroll-walk")) return;
  video.muted = true;
  video.setAttribute("playsinline", "");
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    video.removeAttribute("autoplay");
    video.pause();
    return;
  }
  var play = video.play();
  if (play && play.catch) {
    play.catch(function () {});
  }
});

(function bindScrollWalk() {
  var video = document.querySelector(".js-scroll-walk");
  if (!video) return;

  video.muted = true;
  video.defaultMuted = true;
  video.loop = false;
  video.setAttribute("playsinline", "");
  video.removeAttribute("autoplay");

  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    try {
      video.pause();
    } catch (err) {}
    return;
  }

  var seeking = false;
  var pending = null;
  var ticking = false;

  function maxScroll() {
    return Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  }

  function progress() {
    return Math.min(1, Math.max(0, window.pageYOffset / maxScroll()));
  }

  function duration() {
    var d = video.duration;
    if (d && isFinite(d) && d > 0) return d;
    return 14;
  }

  function applyTime(t) {
    if (seeking) {
      pending = t;
      return;
    }
    if (Math.abs(video.currentTime - t) < 0.02) return;
    seeking = true;
    try {
      video.currentTime = t;
    } catch (err) {
      seeking = false;
    }
  }

  video.addEventListener("seeked", function () {
    seeking = false;
    if (pending !== null) {
      var next = pending;
      pending = null;
      applyTime(next);
    }
  });

  function scrub() {
    ticking = false;
    if (video.readyState < 1) return;
    applyTime(progress() * duration());
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(scrub);
    }
  }

  var started = false;
  function start() {
    if (started) {
      scrub();
      return;
    }
    started = true;
    var kick = video.play();
    function ready() {
      try {
        video.pause();
      } catch (err) {}
      scrub();
    }
    if (kick && kick.then) {
      kick.then(ready).catch(ready);
    } else {
      ready();
    }
  }

  video.addEventListener("loadedmetadata", start);
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  if (video.readyState >= 1) start();
})();
