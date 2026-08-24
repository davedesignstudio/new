/**
 * Philhower & O'Krogly theme song — "Design + Build"
 * Lightweight Web Audio jingle: brass-leaning melody over a warm drone.
 */
(() => {
  const playBtn = document.getElementById("play-theme");
  const bars = document.getElementById("song-bars");
  const blocks = document.querySelectorAll(".lyric-block");
  if (!playBtn) return;

  let ctx = null;
  let playing = false;
  let stoppers = [];
  let highlightTimer = null;

  const NOTES = {
    G3: 196.0,
    Bb3: 233.08,
    C4: 261.63,
    D4: 293.66,
    Eb4: 311.13,
    F4: 349.23,
    G4: 392.0,
    Bb4: 466.16,
    C5: 523.25,
    D5: 587.33,
  };

  // Melody phrase: warm minor march that resolves bright
  const MELODY = [
    ["G4", 0.0, 0.35],
    ["Bb4", 0.35, 0.35],
    ["C5", 0.7, 0.45],
    ["Bb4", 1.2, 0.3],
    ["G4", 1.5, 0.45],
    ["F4", 2.0, 0.35],
    ["Eb4", 2.4, 0.35],
    ["D4", 2.8, 0.55],
    ["G4", 3.5, 0.35],
    ["Bb4", 3.85, 0.35],
    ["C5", 4.2, 0.4],
    ["D5", 4.65, 0.55],
    ["Bb4", 5.3, 0.4],
    ["G4", 5.75, 0.7],
    ["C5", 6.6, 0.4],
    ["Bb4", 7.05, 0.35],
    ["G4", 7.45, 0.9],
  ];

  function ensureCtx() {
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      ctx = new AC();
    }
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  }

  function tone(freq, start, dur, type, gainVal) {
    const c = ensureCtx();
    const osc = c.createOscillator();
    const gain = c.createGain();
    const filter = c.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 1800;
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(gainVal, start + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + dur);
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(c.destination);
    osc.start(start);
    osc.stop(start + dur + 0.05);
    stoppers.push(osc);
  }

  function drone(freq, start, dur) {
    const c = ensureCtx();
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = "triangle";
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(0.045, start + 0.4);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + dur);
    osc.connect(gain);
    gain.connect(c.destination);
    osc.start(start);
    osc.stop(start + dur + 0.1);
    stoppers.push(osc);
  }

  function playSong() {
    const c = ensureCtx();
    const t0 = c.currentTime + 0.05;
    stoppers = [];

    drone(NOTES.G3, t0, 8.6);
    drone(NOTES.D4, t0 + 0.1, 8.5);

    MELODY.forEach(([name, offset, dur]) => {
      const f = NOTES[name];
      tone(f, t0 + offset, dur, "sawtooth", 0.07);
      tone(f * 2, t0 + offset, dur * 0.85, "triangle", 0.028);
    });

    // Soft cadence hit
    tone(NOTES.G3, t0 + 8.2, 0.6, "square", 0.03);

    playing = true;
    playBtn.classList.add("is-playing");
    playBtn.setAttribute("aria-pressed", "true");
    playBtn.querySelector(".play-label").textContent = "Playing…";
    if (bars) bars.classList.add("is-live");

    // Highlight lyric sections in sequence
    const order = Array.from(blocks);
    order.forEach((b) => b.classList.remove("is-active"));
    let i = 0;
    const step = () => {
      order.forEach((b) => b.classList.remove("is-active"));
      if (order[i]) order[i].classList.add("is-active");
      i += 1;
      if (i < order.length) {
        highlightTimer = setTimeout(step, 2100);
      }
    };
    step();

    const totalMs = 8800;
    setTimeout(() => {
      if (!playing) return;
      stopPlayback(false);
    }, totalMs);
  }

  function stopPlayback(manual) {
    playing = false;
    playBtn.classList.remove("is-playing");
    playBtn.setAttribute("aria-pressed", "false");
    playBtn.querySelector(".play-label").textContent = manual ? "Play theme" : "Play again";
    if (bars) bars.classList.remove("is-live");
    if (highlightTimer) clearTimeout(highlightTimer);
    stoppers.forEach((osc) => {
      try {
        osc.stop();
      } catch (_) {
        /* already stopped */
      }
    });
    stoppers = [];
    blocks.forEach((b) => b.classList.remove("is-active"));
  }

  playBtn.addEventListener("click", () => {
    if (playing) {
      stopPlayback(true);
      return;
    }
    playSong();
  });
})();
