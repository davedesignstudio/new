(function () {
  var root = document.getElementById("wider-novel");
  if (!root || !window.WIDERNOVEL) return;

  var N = window.WIDERNOVEL;
  var state = N.loadState();

  function esc(s) {
    return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function pageFromHash() {
    var h = (window.location.hash || "").replace(/^#/, "");
    if (h && N.PAGES.some(function (p) { return p.id === h; })) return h;
    return null;
  }

  var hashed = pageFromHash();
  if (hashed) state = N.go(state, hashed);

  function setHash(id) {
    if (window.history && window.history.replaceState) {
      window.history.replaceState(null, "", "#" + id);
    } else {
      window.location.hash = id;
    }
  }

  function paint() {
    var sc = N.scene(state);
    setHash(sc.id);

    var html = "";
    html += '<article class="gn-page" aria-label="Page ' + sc.n + " of " + sc.total + '">';
    html += '<div class="gn-art">';
    html += '<img src="' + esc(sc.art) + '" alt="' + esc(sc.alt) + '">';
    if (sc.caption) html += '<p class="gn-caption">' + esc(sc.caption) + "</p>";
    html += "</div>";
    html += '<div class="gn-voice">';
    html += '<p class="gn-kicker">Zorya</p>';
    html += "<h1>" + esc(sc.title) + "</h1>";
    html += '<p class="gn-teller">' + esc(sc.teller) + "</p>";
    html += '<p class="gn-count">Page ' + sc.n + " of " + sc.total + "</p>";

    html += '<div class="gn-nav">';
    html +=
      '<button type="button" class="gn-btn gn-back" data-gn-back' +
      (sc.canBack ? "" : " disabled") +
      ">Back</button>";

    if (sc.choices && sc.choices.length) {
      html += '<div class="gn-choices">';
      sc.choices.forEach(function (c, i) {
        if (c.href) {
          html +=
            '<a class="gn-btn gn-choice" href="' +
            esc(c.href) +
            '">' +
            esc(c.label) +
            "</a>";
          return;
        }
        html +=
          '<button type="button" class="gn-btn gn-choice" data-gn-choice="' +
          i +
          '">' +
          esc(c.label) +
          "</button>";
      });
      html += "</div>";
    } else if (sc.next) {
      html += '<button type="button" class="gn-btn gn-next" data-gn-next>Next page</button>';
    }
    html += "</div>";

    html += '<p class="gn-hint">Arrow keys turn pages. Numbers pick a choice.</p>';
    html += '<p class="gn-rooms">Same story, other rooms: ';
    html += '<a href="/adventure">the van</a> · ';
    html += '<a href="/table">the table</a> · ';
    html += '<a href="/road">the small road</a> · ';
    html += '<a href="/world">the trail</a> · ';
    html += '<a href="/sample">the first drawing</a>';
    html += "</p>";
    html += "</div></article>";

    root.innerHTML = html;

    var back = root.querySelector("[data-gn-back]");
    if (back) {
      back.addEventListener("click", function () {
        goBack();
      });
    }
    var next = root.querySelector("[data-gn-next]");
    if (next) {
      next.addEventListener("click", function () {
        goNext();
      });
    }
    var picks = root.querySelectorAll("[data-gn-choice]");
    var p;
    for (p = 0; p < picks.length; p++) {
      picks[p].addEventListener("click", function () {
        var idx = parseInt(this.getAttribute("data-gn-choice"), 10);
        pick(idx);
      });
    }
  }

  function goNext() {
    var sc = N.scene(state);
    if (sc.next) {
      state = N.go(state, sc.next);
      paint();
    }
  }

  function goBack() {
    var sc = N.scene(state);
    if (!sc.canBack) return;
    var prev = N.PAGES[sc.index - 1];
    if (prev) {
      state = N.go(state, prev.id);
      paint();
    }
  }

  function pick(idx) {
    var sc = N.scene(state);
    if (!sc.choices || !sc.choices[idx]) return;
    var c = sc.choices[idx];
    if (c.href) {
      window.location.href = c.href;
      return;
    }
    state = N.choose(state, c);
    paint();
  }

  document.addEventListener("keydown", function (e) {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    var tag = (e.target && e.target.tagName) || "";
    if (tag === "INPUT" || tag === "TEXTAREA") return;
    if (e.key === "ArrowRight" || e.key === " ") {
      var sc = N.scene(state);
      if (sc.next && !sc.choices) {
        e.preventDefault();
        goNext();
      }
      return;
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      goBack();
      return;
    }
    var n = parseInt(e.key, 10);
    if (n >= 1 && n <= 9) pick(n - 1);
  });

  var touchX = null;
  root.addEventListener("touchstart", function (e) {
    if (!e.changedTouches || !e.changedTouches[0]) return;
    touchX = e.changedTouches[0].clientX;
  });
  root.addEventListener("touchend", function (e) {
    if (touchX == null || !e.changedTouches || !e.changedTouches[0]) return;
    var dx = e.changedTouches[0].clientX - touchX;
    touchX = null;
    if (dx > 60) goBack();
    if (dx < -60) {
      var sc = N.scene(state);
      if (sc.next && !sc.choices) goNext();
    }
  });

  window.addEventListener("hashchange", function () {
    var id = pageFromHash();
    if (id && id !== state.page) {
      state = N.go(state, id);
      paint();
    }
  });

  paint();
})();
