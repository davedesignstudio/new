const BPM = 100;
const BEAT = 60 / BPM;
const BARS = 24;
const DURATION = BARS * 4 * BEAT;

const CHORDS = {
  G: [43, 55, 59, 62],
  C: [48, 55, 60, 64],
  D: [50, 57, 62, 66],
  Em: [40, 55, 59, 64]
};

// One chord per bar
const PROGRESSION = [
  "G", "D",
  "C", "G", "D", "G", "C", "G", "D", "G",
  "Em", "C", "G", "D",
  "C", "G", "D", "G", "C", "G", "D", "G",
  "D", "G"
];

// [startBeat, midi, durationBeats]
const MELODY = [
  // Sonic logo
  [0, 67, 0.5], [0.5, 71, 0.5], [1, 74, 1],
  [2, 74, 0.5], [2.5, 71, 0.5], [3, 67, 1],
  [4, 55, 0.5], [4.5, 59, 0.5], [5, 62, 1],
  [6, 62, 0.5], [6.5, 59, 0.5], [7, 55, 1],

  // Chorus A — Philhower and Okrogly / grain to the grid
  [8, 64, 0.5], [8.5, 64, 0.5], [9, 62, 0.5], [9.5, 60, 0.5],
  [10, 59, 0.75], [10.75, 62, 0.75], [11.5, 67, 2.5],
  [16, 69, 0.5], [16.5, 67, 0.5], [17, 66, 0.5], [17.5, 69, 0.5],
  [18, 67, 1], [19, 62, 1],
  [20, 64, 0.5], [20.5, 62, 0.5], [21, 60, 0.5], [21.5, 64, 0.5],
  [22, 62, 0.5], [22.5, 59, 0.5], [23, 55, 1],
  [24, 57, 0.5], [24.5, 59, 0.5], [25, 60, 0.5], [25.5, 62, 0.5],
  [26, 64, 1], [27, 67, 5],

  // Bridge
  [40, 67, 1], [41, 69, 1], [42, 71, 1], [43, 72, 1],
  [44, 74, 1], [45, 76, 1], [46, 74, 1], [47, 71, 1],
  [48, 67, 2], [50, 69, 1], [51, 71, 1],
  [52, 69, 1], [53, 66, 1], [54, 67, 2],

  // Chorus B — hammer, cursor / design and build
  [56, 64, 0.5], [56.5, 64, 0.5], [57, 62, 0.5], [57.5, 60, 0.5],
  [58, 59, 1], [59, 67, 1],
  [60, 69, 0.5], [60.5, 67, 0.5], [61, 64, 0.5], [61.5, 62, 0.5],
  [62, 64, 1], [63, 67, 1],
  [64, 64, 0.5], [64.5, 64, 0.5], [65, 62, 0.5], [65.5, 60, 0.5],
  [66, 59, 0.75], [66.75, 62, 0.75], [67.5, 67, 2.5],
  [72, 69, 0.5], [72.5, 71, 0.5], [73, 72, 0.5], [73.5, 74, 0.5],
  [74, 76, 1], [75, 79, 1],
  [76, 74, 0.5], [76.5, 71, 0.5], [77, 69, 0.5], [77.5, 66, 0.5],
  [78, 67, 2],

  // Outro motif
  [88, 67, 0.5], [88.5, 71, 0.5], [89, 74, 1],
  [90, 74, 0.5], [90.5, 71, 0.5], [91, 67, 5]
];

const LYRIC_CUES = [
  { beat: 0, text: "Grain & Grid — the sonic logo" },
  { beat: 8, text: "Philhower and Okrogly" },
  { beat: 16, text: "From the grain to the grid" },
  { beat: 20, text: "We design it, we build it" },
  { beat: 24, text: "That’s the way that we live" },
  { beat: 40, text: "Two crafts, one shop — woodshop and workshop" },
  { beat: 48, text: "Sawdust and wire, spark and fire" },
  { beat: 56, text: "Hammer, cursor, heart, and square" },
  { beat: 64, text: "Philhower and Okrogly" },
  { beat: 72, text: "Design and build — everywhere" },
  { beat: 88, text: "From the grain to the grid" }
];

function midiToFreq(midi) {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

function envGain(ctx, start, attack, hold, release, peak) {
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, start);
  g.gain.exponentialRampToValueAtTime(peak, start + attack);
  g.gain.setValueAtTime(peak, start + attack + hold);
  g.gain.exponentialRampToValueAtTime(0.0001, start + attack + hold + release);
  return g;
}

let ctx = null;
let master = null;
let analyser = null;
let noiseBuffer = null;
let startAt = 0;
let playing = false;
let ended = false;
let raf = null;

function ensureContext() {
  if (ctx) return;
  const AC = window.AudioContext || window.webkitAudioContext;
  ctx = new AC();
  master = ctx.createGain();
  master.gain.value = 0.55;
  const compressor = ctx.createDynamicsCompressor();
  compressor.threshold.value = -18;
  compressor.ratio.value = 3;
  analyser = ctx.createAnalyser();
  analyser.fftSize = 256;
  master.connect(compressor);
  compressor.connect(analyser);
  analyser.connect(ctx.destination);

  noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 1.5, ctx.sampleRate);
  const data = noiseBuffer.getChannelData(0);
  for (let i = 0; i < data.length; i += 1) {
    data[i] = Math.random() * 2 - 1;
  }
}

function tone(freq, type, start, dur, peak, dest) {
  const osc = ctx.createOscillator();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, start);
  const g = envGain(ctx, start, 0.02, Math.max(0.01, dur - 0.12), 0.12, peak);
  osc.connect(g);
  g.connect(dest);
  osc.start(start);
  osc.stop(start + dur + 0.14);
  return osc;
}

function leadNote(midi, start, beats) {
  const dur = beats * BEAT;
  const freq = midiToFreq(midi);
  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(1800, start);
  filter.frequency.exponentialRampToValueAtTime(900, start + dur);
  filter.connect(master);

  tone(freq, "triangle", start, dur, 0.22, filter);
  tone(freq * 2.002, "sine", start, dur, 0.05, filter);
}

function strum(notes, start, peak) {
  notes.forEach((midi, i) => {
    const t = start + i * 0.018;
    tone(midiToFreq(midi), "triangle", t, 1.6, peak * (i === 0 ? 0.7 : 0.35), master);
  });
}

function kick(time) {
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.frequency.setValueAtTime(140, time);
  osc.frequency.exponentialRampToValueAtTime(42, time + 0.12);
  g.gain.setValueAtTime(0.9, time);
  g.gain.exponentialRampToValueAtTime(0.0001, time + 0.18);
  osc.connect(g);
  g.connect(master);
  osc.start(time);
  osc.stop(time + 0.2);
}

function noiseHit(time, dur, peak, hpFreq) {
  const src = ctx.createBufferSource();
  src.buffer = noiseBuffer;
  const hp = ctx.createBiquadFilter();
  hp.type = "highpass";
  hp.frequency.value = hpFreq;
  const g = ctx.createGain();
  g.gain.setValueAtTime(peak, time);
  g.gain.exponentialRampToValueAtTime(0.0001, time + dur);
  src.connect(hp);
  hp.connect(g);
  g.connect(master);
  src.start(time);
  src.stop(time + dur + 0.02);
}

function schedule() {
  startAt = ctx.currentTime + 0.08;
  ended = false;

  PROGRESSION.forEach((name, bar) => {
    const t = startAt + bar * 4 * BEAT;
    const notes = CHORDS[name];
    const drums = bar >= 2 && bar < 22;
    strum(notes, t, bar < 2 || bar >= 22 ? 0.12 : 0.18);
    strum(notes, t + 2 * BEAT, 0.1);
    tone(midiToFreq(notes[0]), "sine", t, 2 * BEAT, 0.22, master);
    tone(midiToFreq(notes[0] + 12), "sine", t + 2 * BEAT, 1.6 * BEAT, 0.12, master);

    if (drums) {
      kick(t);
      kick(t + 2 * BEAT);
      noiseHit(t + BEAT, 0.16, 0.22, 1200);
      noiseHit(t + 3 * BEAT, 0.16, 0.22, 1200);
      for (let i = 0; i < 8; i += 1) {
        noiseHit(t + i * (BEAT / 2), 0.04, i % 2 === 0 ? 0.04 : 0.025, 6000);
      }
    }
  });

  MELODY.forEach(note => {
    leadNote(note[1], startAt + note[0] * BEAT, note[2]);
  });
}

function buttons() {
  const nodes = document.querySelectorAll("[data-theme-play]");
  for (let i = 0; i < nodes.length; i += 1) {
    nodes[i].textContent = playing ? "Pause" : "Play";
  }
  const mini = document.getElementById("mini-player");
  if (mini) {
    if (playing || !ended && startAt) mini.removeAttribute("hidden");
    if (ended) mini.setAttribute("hidden", "hidden");
  }
}

function lyricFor(beat) {
  let text = LYRIC_CUES[0].text;
  for (let i = 0; i < LYRIC_CUES.length; i += 1) {
    if (beat >= LYRIC_CUES[i].beat) text = LYRIC_CUES[i].text;
  }
  return text;
}

function draw() {
  const elapsed = ctx.currentTime - startAt;
  const beat = elapsed / BEAT;
  const progress = Math.min(1, Math.max(0, elapsed / DURATION));

  const bar = document.getElementById("theme-progress");
  if (bar) bar.style.width = progress * 100 + "%";
  const minis = document.querySelectorAll(".mini-progress i");
  for (let i = 0; i < minis.length; i += 1) {
    minis[i].style.width = progress * 100 + "%";
  }

  const now = document.getElementById("now-playing");
  if (now && playing) now.textContent = lyricFor(beat);

  const canvas = document.getElementById("theme-canvas");
  if (canvas && analyser) {
    const c = canvas.getContext("2d");
    const w = canvas.width;
    const h = canvas.height;
    const data = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(data);
    c.fillStyle = "#2a1c10";
    c.fillRect(0, 0, w, h);
    const n = 48;
    const gap = 2;
    const bw = (w - gap * n) / n;
    for (let i = 0; i < n; i += 1) {
      const v = data[i] / 255;
      const bh = Math.max(2, v * h);
      c.fillStyle = i % 8 === 0 ? "#c9a227" : "#c4a574";
      c.fillRect(i * (bw + gap), h - bh, bw, bh);
    }
  }

  if (elapsed >= DURATION) {
    playing = false;
    ended = true;
    buttons();
    const nowEl = document.getElementById("now-playing");
    if (nowEl) nowEl.textContent = "From the grain to the grid.";
    return;
  }

  raf = requestAnimationFrame(draw);
}

function toggle() {
  ensureContext();
  if (ctx.state === "suspended") ctx.resume();

  if (playing) {
    ctx.suspend();
    playing = false;
    buttons();
    return;
  }

  if (ended || startAt === 0) {
    schedule();
  } else {
    ctx.resume();
  }
  playing = true;
  ended = false;
  buttons();
  cancelAnimationFrame(raf);
  raf = requestAnimationFrame(draw);
}

export function initThemeSong() {
  const nodes = document.querySelectorAll("[data-theme-play]");
  for (let i = 0; i < nodes.length; i += 1) {
    nodes[i].addEventListener("click", toggle);
  }
}
