#!/usr/bin/env python3
"""Render WIDER anthem: The Game Is Earth."""
from __future__ import annotations

import json
import math
import wave
from pathlib import Path

import numpy as np

SR = 44100
BPM = 92.0
BEAT = 60.0 / BPM
RNG = np.random.default_rng(21)

NOTES = {
    "C2": 36, "D2": 38, "E2": 40, "F2": 41, "G2": 43, "A2": 45, "Bb2": 46, "B2": 47,
    "C3": 48, "D3": 50, "E3": 52, "F3": 53, "G3": 55, "A3": 57, "Bb3": 58, "B3": 59,
    "C4": 60, "D4": 62, "E4": 64, "F4": 65, "G4": 67, "A4": 69, "Bb4": 70, "B4": 71,
    "C5": 72, "D5": 74, "E5": 76, "F5": 77, "G5": 79, "A5": 81,
}


def hz(midi: float) -> float:
    return 440.0 * (2.0 ** ((midi - 69.0) / 12.0))


def midi(name: str | None) -> float | None:
    if name is None:
        return None
    return float(NOTES[name])


def env_adsr(n: int, a: float, d: float, s: float, r: float) -> np.ndarray:
    e = np.ones(n, dtype=np.float64)
    na, nd, nr = int(a * n), int(d * n), int(r * n)
    na, nd, nr = max(na, 1), max(nd, 1), max(nr, 8)
    if na + nd + nr > n:
        scale = n / float(na + nd + nr)
        na, nd, nr = max(int(na * scale), 1), max(int(nd * scale), 1), max(int(nr * scale), 8)
        while na + nd + nr > n:
            nr = max(nr - 1, 1)
    ns = n - na - nd - nr
    e[:na] = np.linspace(0, 1, na, endpoint=False)
    e[na : na + nd] = np.linspace(1, s, nd, endpoint=False)
    e[na + nd : na + nd + ns] = s
    e[na + nd + ns :] = np.linspace(s, 0, nr)
    return e


def osc(freq: np.ndarray | float, n: int, kind: str = "sine", detune: float = 0.0) -> np.ndarray:
    t = np.arange(n, dtype=np.float64) / SR
    f = np.asarray(freq, dtype=np.float64)
    if f.ndim == 0:
        f = np.full(n, float(f) * (2.0 ** (detune / 1200.0)))
    else:
        f = f * (2.0 ** (detune / 1200.0))
    phase = np.cumsum(2.0 * math.pi * f / SR)
    if kind == "sine":
        return np.sin(phase)
    if kind == "tri":
        return 2.0 * np.abs(2.0 * (phase / (2.0 * math.pi) % 1.0) - 1.0) - 1.0
    if kind == "saw":
        return 2.0 * (phase / (2.0 * math.pi) % 1.0) - 1.0
    if kind == "square":
        return np.sign(np.sin(phase))
    raise ValueError(kind)


def lowpass(x: np.ndarray, cutoff: float) -> np.ndarray:
    spec = np.fft.rfft(x)
    freqs = np.fft.rfftfreq(x.size, 1.0 / SR)
    knee = np.clip((cutoff * 1.8 - freqs) / max(cutoff * 0.8, 1.0), 0.0, 1.0)
    spec *= knee * knee
    return np.fft.irfft(spec, n=x.size)


def add_at(buf: np.ndarray, start: int, sig: np.ndarray, gain: float = 1.0) -> None:
    if start >= len(buf):
        return
    end = min(len(buf), start + len(sig))
    buf[start:end] += sig[: end - start] * gain


def tone(note: str | None, beats: float, kind: str, a=0.02, d=0.12, s=0.72, r=0.22, vib=0.0) -> np.ndarray:
    n = int(beats * BEAT * SR)
    if note is None:
        return np.zeros(n)
    f0 = hz(midi(note))
    t = np.arange(n) / SR
    freq = f0 * (1.0 + vib * np.sin(2.0 * math.pi * 5.1 * t))
    wave_ = osc(freq, n, kind)
    if kind == "saw":
        wave_ = 0.55 * wave_ + 0.45 * osc(freq, n, "sine")
        wave_ = lowpass(wave_, min(2800.0, f0 * 6.5))
    return wave_ * env_adsr(n, a, d, s, r)


CHORDS = {
    "Dm": ["D2", "A2", "D3", "F3", "A3"],
    "Bb": ["Bb2", "F3", "Bb3", "D4"],
    "F": ["F2", "C3", "F3", "A3", "C4"],
    "C": ["C2", "G2", "C3", "E3", "G3"],
    "Gm": ["G2", "D3", "G3", "Bb3", "D4"],
    "A": ["A2", "E3", "A3", "C4", "E4"],
    "Csus": ["C2", "G2", "C3", "F3", "G3"],
}


def pad_chord(name: str, beats: float) -> np.ndarray:
    n = int(beats * BEAT * SR)
    out = np.zeros(n)
    for i, nt in enumerate(CHORDS[name]):
        det = (-7.0, 0.0, 6.0, -4.0, 9.0)[i % 5]
        sig = tone(nt, beats, "saw", a=0.18, d=0.2, s=0.62, r=0.35, vib=0.0018)
        mix = 0.55 * sig + 0.45 * tone(nt, beats, "sine", a=0.2, d=0.2, s=0.7, r=0.35)
        add_at(out, 0, mix, 0.22 if i == 0 else 0.16)
        add_at(out, 0, osc(hz(midi(nt)) * (2 ** (det / 1200.0)), n, "sine") * env_adsr(n, 0.2, 0.2, 0.5, 0.4), 0.08)
    return out * 0.9


def bass_note(note: str, beats: float) -> np.ndarray:
    return 0.7 * tone(note, beats, "sine", a=0.01, d=0.08, s=0.85, r=0.18) + 0.3 * tone(
        note, beats, "tri", a=0.01, d=0.1, s=0.6, r=0.2
    )


def kick(beats: float = 0.5) -> np.ndarray:
    n = int(beats * BEAT * SR)
    t = np.arange(n) / SR
    freq = 118.0 * (0.35 ** (t / max(t[-1], 1e-6)))
    sig = np.sin(np.cumsum(2 * math.pi * freq / SR))
    click = np.sin(2 * math.pi * 900 * t) * np.exp(-t * 80)
    return (0.85 * sig + 0.12 * click) * env_adsr(n, 0.002, 0.08, 0.2, 0.7)


def hat(beats: float = 0.25) -> np.ndarray:
    n = int(beats * BEAT * SR)
    noise = RNG.normal(0, 0.35, n)
    spec = np.fft.rfft(noise)
    freqs = np.fft.rfftfreq(n, 1.0 / SR)
    spec[freqs < 4000] *= 0.08
    y = np.fft.irfft(spec, n=n)
    return y * env_adsr(n, 0.001, 0.04, 0.05, 0.7) * 0.35


def snare(beats: float = 0.35) -> np.ndarray:
    n = int(beats * BEAT * SR)
    t = np.arange(n) / SR
    tone_ = np.sin(2 * math.pi * 186 * t) * np.exp(-t * 14)
    noise = RNG.normal(0, 0.5, n) * np.exp(-t * 18)
    return (0.35 * tone_ + 0.65 * noise) * env_adsr(n, 0.001, 0.05, 0.1, 0.6) * 0.45


# score: (beat, kind, payload)
# melody: (beat, note, dur, lyric_or_None)
MELODY = []
LYRICS = []
beat_cursor = 0.0


def rest(beats: float) -> None:
    global beat_cursor
    beat_cursor += beats


def sing(note: str | None, beats: float, word: str | None = None) -> None:
    global beat_cursor
    MELODY.append((beat_cursor, note, beats, word))
    if word:
        LYRICS.append({"t": round(beat_cursor * BEAT, 3), "line": word})
    beat_cursor += beats


def phrase(items: list[tuple[str | None, float, str | None]]) -> None:
    for note, dur, word in items:
        sing(note, dur, word)


# --- Form ---
# Intro 8 beats
INTRO_BEATS = 8.0
rest(INTRO_BEATS)

CHORUS_A = [
    ("D4", 1.0, "The game is Earth."),
    ("D4", 1.0, None),
    ("F4", 1.0, None),
    ("A4", 5.0, None),
    ("Bb4", 1.5, "Earth does not end."),
    ("A4", 1.5, None),
    ("G4", 2.0, None),
    ("F4", 3.0, None),
    ("G4", 1.0, "Set a table in the lightning."),
    ("A4", 1.0, None),
    ("Bb4", 1.5, None),
    ("C5", 1.5, None),
    ("D5", 2.0, None),
    ("C5", 1.0, None),
    ("A4", 2.0, "Call the stranger friend."),
    ("G4", 2.0, None),
    ("F4", 2.0, None),
    ("D4", 2.0, None),
]

REFRAIN = [
    ("D5", 2.0, "WIDER, WIDER —"),
    ("F5", 2.0, None),
    ("E5", 2.0, None),
    ("D5", 2.0, None),
    ("C5", 2.0, "walk on, walk on."),
    ("A4", 2.0, None),
    ("G4", 2.0, None),
    ("A4", 2.0, None),
    ("Bb4", 2.0, "The tower falls to supper."),
    ("A4", 2.0, None),
    ("G4", 2.0, None),
    ("F4", 2.0, None),
    ("A4", 2.0, "The star is anyone."),
    ("F4", 2.0, None),
    ("E4", 2.0, None),
    ("D4", 2.0, None),
]

VERSE = [
    ("D4", 2.0, "A rail-splitter said: spend three hours on the table."),
    ("E4", 2.0, None),
    ("F4", 2.0, None),
    ("A4", 2.0, None),
    ("G4", 2.0, "The road says fate is a guest — so seat it."),
    ("F4", 2.0, None),
    ("E4", 2.0, None),
    ("F4", 2.0, None),
    ("Bb4", 2.0, "Black bread taught a palace how to kneel."),
    ("A4", 2.0, None),
    ("G4", 2.0, None),
    ("F4", 2.0, None),
    ("E4", 2.0, "Never count the stars till the loaf has a name."),
    ("F4", 2.0, None),
    ("G4", 2.0, None),
    ("A4", 2.0, None),
]

TAG = [
    ("A4", 2.0, "The game is Earth."),
    ("Bb4", 2.0, None),
    ("C5", 2.0, None),
    ("D5", 2.0, None),
    ("F5", 4.0, "Earth does not end."),
    ("D5", 4.0, None),
]

phrase(CHORUS_A)
phrase(REFRAIN)
phrase(VERSE)
phrase(CHORUS_A)
phrase(REFRAIN)
phrase(TAG)
OUTRO_BEATS = 8.0
TOTAL_BEATS = beat_cursor + OUTRO_BEATS
N = int(TOTAL_BEATS * BEAT * SR) + SR  # 1s tail

# Harmony bed: 4-beat bars
PROGRESSION = (
    ["Dm", "Dm"]  # intro
    + ["Dm", "Bb", "F", "C", "Gm", "Bb", "A", "Dm"]  # chorus A (8 bars)
    + ["Bb", "F", "C", "Dm", "Gm", "Bb", "C", "Dm"]  # refrain
    + ["Dm", "C", "Bb", "A", "Gm", "Bb", "C", "Dm"]  # verse
    + ["Dm", "Bb", "F", "C", "Gm", "Bb", "A", "Dm"]  # chorus A
    + ["Bb", "F", "C", "Dm", "Gm", "Bb", "C", "Dm"]  # refrain
    + ["Bb", "F", "C", "Dm"]  # tag
    + ["Dm", "Dm"]  # outro
)

mix = np.zeros(N)

# pads + bass
b = 0.0
for i, ch in enumerate(PROGRESSION):
    start = int(b * BEAT * SR)
    add_at(mix, start, pad_chord(ch, 4.0), 0.9)
    root = {"Dm": "D2", "Bb": "Bb2", "F": "F2", "C": "C2", "Gm": "G2", "A": "A2", "Csus": "C2"}[ch]
    add_at(mix, start, bass_note(root, 4.0), 0.85)
    # kick on 1 and 3 after intro
    if i >= 2:
        add_at(mix, start, kick(0.55), 0.7)
        add_at(mix, start + int(2 * BEAT * SR), kick(0.45), 0.45)
        add_at(mix, start + int(1 * BEAT * SR), hat(0.22), 0.5)
        add_at(mix, start + int(3 * BEAT * SR), hat(0.22), 0.35)
        if i % 2 == 1:
            add_at(mix, start + int(2 * BEAT * SR), snare(0.4), 0.55)
    b += 4.0

# lead + fifth on chorus/refrain/tag
chorus_windows = [(8.0, 8.0 + 64.0), (8.0 + 96.0, TOTAL_BEATS - OUTRO_BEATS)]
for start_beat, note, dur, _word in MELODY:
    st = int(start_beat * BEAT * SR)
    lead = tone(note, dur, "tri", a=0.02, d=0.1, s=0.7, r=0.18, vib=0.004)
    lead += 0.35 * tone(note, dur, "sine", a=0.03, d=0.1, s=0.65, r=0.2, vib=0.003)
    add_at(mix, st, lead, 0.95)
    in_big = any(lo <= start_beat < hi for lo, hi in chorus_windows)
    if in_big and note:
        fifth_name = None
        # sing a fifth above when in refrain/chorus holds
        idx = NOTES[note] + 7
        inv = {v: k for k, v in NOTES.items()}
        fifth_name = inv.get(idx)
        if fifth_name:
            add_at(mix, st, tone(fifth_name, dur, "sine", a=0.05, d=0.12, s=0.45, r=0.25, vib=0.002), 0.32)

# soft noise bed
noise = RNG.normal(0, 0.02, N)
mix += lowpass(noise, 700.0) * 0.15

# fade in/out
fade_in = int(0.8 * SR)
fade_out = int(2.4 * SR)
mix[:fade_in] *= np.linspace(0, 1, fade_in)
mix[-fade_out:] *= np.linspace(1, 0, fade_out)

peak = np.max(np.abs(mix)) or 1.0
mix = mix / peak * 0.89
# gentle saturate
mix = np.tanh(mix * 1.15) / np.tanh(1.15)

pcm = np.clip(mix * 32767.0, -32768, 32767).astype("<i2")
out_wav = Path("/tmp/wider-anthem.wav")
with wave.open(str(out_wav), "w") as w:
    w.setnchannels(1)
    w.setsampwidth(2)
    w.setframerate(SR)
    w.writeframes(pcm.tobytes())

cues = {"bpm": BPM, "duration": round(len(mix) / SR, 3), "lyrics": LYRICS}
print(json.dumps(cues, indent=2))
print("WAV", out_wav, "seconds", cues["duration"], "peak", float(peak))
