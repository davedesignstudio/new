(function () {
  var root = document.getElementById("road-wisdom");
  if (!root || !window.ROADCORE) return;

  var R = window.ROADCORE;
  var state = R.newState();
  var audio = document.getElementById("road-ambience");
  var muted = false;

  function blip() {
    try {
      var ctx = window.__roadAudio || (window.__roadAudio = new (window.AudioContext || window.webkitAudioContext)());
      var o = ctx.createOscillator();
      var g = ctx.createGain();
      o.type = "square";
      o.frequency.value = 220;
      g.gain.value = 0.04;
      o.connect(g);
      g.connect(ctx.destination);
      o.start();
      o.stop(ctx.currentTime + 0.05);
    } catch (e) {}
  }

  function setAmbience(on) {
    if (!audio) return;
    if (muted || !on) {
      audio.pause();
      return;
    }
    audio.loop = true;
    var p = audio.play();
    if (p && p.catch) p.catch(function () {});
  }

  function paint() {
    var sc = R.scene(state);
    root.setAttribute("data-art", sc.art);
    root.setAttribute("data-screen", sc.screen);
    var day = root.querySelector("[data-gb-day]");
    if (day) day.textContent = sc.screen === "title" ? "ROAD-WISDOM" : "DAY " + sc.day;
    var art = root.querySelector("[data-gb-art]");
    if (art) art.setAttribute("data-show", sc.art);
    var text = root.querySelector("[data-gb-text]");
    if (text) {
      text.innerHTML = sc.lines
        .map(function (ln) {
          return "<div>" + ln.replace(/</g, "&lt;") + "</div>";
        })
        .join("");
    }
    var box = root.querySelector("[data-gb-choices]");
    if (box) {
      box.innerHTML = "";
      sc.choices.forEach(function (c, i) {
        var b = document.createElement("button");
        b.type = "button";
        b.className = "gb-btn" + (i === 0 ? " is-a" : i === 1 ? " is-b" : " is-c");
        b.textContent = (i === 0 ? "A  " : i === 1 ? "B  " : "C  ") + c.label;
        b.addEventListener("click", function () {
          pick(c.id);
        });
        box.appendChild(b);
      });
    }
    setAmbience(sc.ambience);
  }

  function pick(id) {
    blip();
    if (id === "wider") {
      window.location.href = "/play/";
      return;
    }
    state = R.act(state, id);
    paint();
  }

  var mem = root.querySelector("[data-gb-mem]");
  if (mem) {
    mem.addEventListener("click", function () {
      pick(state.screen === "memory" ? "mem-back" : "mem");
    });
  }
  var mute = root.querySelector("[data-gb-mute]");
  if (mute) {
    mute.addEventListener("click", function () {
      muted = !muted;
      mute.textContent = muted ? "SOUND OFF" : "SOUND";
      setAmbience(R.scene(state).ambience && !muted);
    });
  }

  var q = window.location.search || "";
  if (/\bmeet=princess\b/.test(q) && R.meetPrincess) {
    state = R.meetPrincess(state);
  } else if (/\bwalk=/.test(q)) {
    var walk = /(?:\?|&)walk=([^&]+)/.exec(q);
    state = R.act(state, "begin");
    if (walk) {
      var steps = decodeURIComponent(walk[1]).split(",");
      var i;
      for (i = 0; i < steps.length; i++) {
        if (steps[i]) state = R.act(state, steps[i]);
      }
    }
  }
  paint();
})();
