// Philhower & O’Krogly — Design + Build theme song (Web Audio jingle)

function initNav() {
  var toggle = document.querySelector(".menu-toggle");
  var nav = document.getElementById("site-nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", function () {
    var open = document.body.classList.toggle("nav-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      document.body.classList.remove("nav-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function initYear() {
  var el = document.getElementById("year");
  if (el) el.textContent = String(new Date().getFullYear());
}

function ThemeSong() {
  this.ctx = null;
  this.playing = false;
  this.timers = [];
  this.buttons = [];
}

ThemeSong.prototype.ensureCtx = function () {
  if (!this.ctx) {
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    this.ctx = new AC();
  }
  if (this.ctx.state === "suspended") this.ctx.resume();
  return this.ctx;
};

ThemeSong.prototype.stop = function () {
  this.timers.forEach(function (id) {
    clearTimeout(id);
  });
  this.timers = [];
  this.playing = false;
  this.buttons.forEach(function (btn) {
    btn.setAttribute("aria-pressed", "false");
    var label = btn.querySelector(".play-label");
    if (label) {
      label.textContent = btn.classList.contains("play-theme-lg")
        ? "Play the theme song"
        : "Play theme";
    }
  });
};

ThemeSong.prototype.tone = function (freq, start, dur, type, gainVal) {
  var ctx = this.ctx;
  var osc = ctx.createOscillator();
  var gain = ctx.createGain();
  var filter = ctx.createBiquadFilter();

  osc.type = type || "triangle";
  osc.frequency.value = freq;
  filter.type = "lowpass";
  filter.frequency.value = 2200;

  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(gainVal || 0.12, start + 0.03);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + dur);

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  osc.start(start);
  osc.stop(start + dur + 0.05);
};

ThemeSong.prototype.kick = function (start) {
  var ctx = this.ctx;
  var osc = ctx.createOscillator();
  var gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(140, start);
  osc.frequency.exponentialRampToValueAtTime(45, start + 0.18);
  gain.gain.setValueAtTime(0.18, start);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.2);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(start);
  osc.stop(start + 0.22);
};

// Melody: D major — verse pulse then rising chorus “Design + Build”
ThemeSong.prototype.play = function () {
  var ctx = this.ensureCtx();
  if (!ctx) return;

  this.stop();
  this.playing = true;
  this.buttons.forEach(function (btn) {
    btn.setAttribute("aria-pressed", "true");
    var label = btn.querySelector(".play-label");
    if (label) label.textContent = "Playing…";
  });

  var now = ctx.currentTime + 0.05;
  var beat = 0.28;
  // D4 E4 F#4 G4 A4 B4 C#5 D5
  var D = 293.66;
  var E = 329.63;
  var Fs = 369.99;
  var G = 392.0;
  var A = 440.0;
  var B = 493.88;
  var Cs = 554.37;
  var D5 = 587.33;
  var Fs5 = 739.99;
  var A5 = 880.0;

  var self = this;

  // Soft kick pulse under verse
  for (var i = 0; i < 16; i++) {
    self.kick(now + i * beat * 2);
  }

  // Verse motif — workbench pulse
  var verse = [D, D, Fs, A, G, Fs, E, D, A, A, B, A, G, Fs, E, D];
  verse.forEach(function (freq, idx) {
    self.tone(freq, now + idx * beat, beat * 0.9, "triangle", 0.09);
  });

  // Chorus lift — company name
  var chorusStart = now + verse.length * beat;
  var chorus = [
    D5, D5, Cs, B, A, Fs, G, A,
    B, A, Fs, D, A, A, Fs5, D5
  ];
  chorus.forEach(function (freq, idx) {
    self.tone(freq, chorusStart + idx * beat, beat * 0.95, "sawtooth", 0.055);
    self.tone(freq / 2, chorusStart + idx * beat, beat * 0.95, "triangle", 0.05);
  });

  // Final tag — “build it true”
  var tagStart = chorusStart + chorus.length * beat;
  [A, B, D5, Fs5, A5].forEach(function (freq, idx) {
    self.tone(freq, tagStart + idx * beat * 0.85, beat * 1.1, "triangle", 0.08);
  });
  self.tone(D5, tagStart + 5 * beat * 0.85, beat * 2.2, "triangle", 0.1);
  self.tone(A, tagStart + 5 * beat * 0.85, beat * 2.2, "sine", 0.05);

  var totalMs = ((verse.length + chorus.length + 7) * beat + 0.4) * 1000;
  var done = setTimeout(function () {
    self.stop();
  }, totalMs);
  this.timers.push(done);
};

ThemeSong.prototype.toggle = function () {
  if (this.playing) this.stop();
  else this.play();
};

ThemeSong.prototype.bind = function () {
  var self = this;
  this.buttons = Array.prototype.slice.call(
    document.querySelectorAll("[data-play-theme]")
  );
  this.buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      self.toggle();
    });
  });
};

document.addEventListener("DOMContentLoaded", function () {
  initNav();
  initYear();
  var song = new ThemeSong();
  song.bind();
});
