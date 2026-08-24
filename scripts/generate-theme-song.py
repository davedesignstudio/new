#!/usr/bin/env python3
"""Generate the Philhower & Okrogly theme song: Grain & Grid."""
from __future__ import print_function

import math
import os
import struct
import wave

import numpy as np

SR = 44100
BPM = 96.0
BEAT = 60.0 / BPM
MASTER = 0.78

PITCH = {
    "C3": 130.81, "D3": 146.83, "E3": 164.81, "F3": 174.61, "F#3": 185.00,
    "G3": 196.00, "A3": 220.00, "B3": 246.94,
    "C4": 261.63, "D4": 293.66, "E4": 329.63, "F4": 349.23, "F#4": 369.99,
    "G4": 392.00, "A4": 440.00, "B4": 493.88,
    "C5": 523.25, "D5": 587.33, "E5": 659.25, "F#5": 739.99, "G5": 783.99,
    "A5": 880.00,
}


def adsr(n, sr, dur, a=0.02, d=0.08, s=0.7, r=0.12):
    t = np.arange(n) / float(sr)
    env = np.zeros(n)
    a_n = int(a * sr)
    d_n = int(d * sr)
    r_n = int(r * sr)
    if a_n > 0:
        env[:a_n] = np.linspace(0, 1, a_n, endpoint=False)
    else:
        env[:1] = 1
    d_end = a_n + d_n
    if d_n > 0:
        env[a_n:d_end] = np.linspace(1, s, d_n, endpoint=False)
    sustain_end = max(d_end, n - r_n)
    env[d_end:sustain_end] = s
    if r_n > 0 and sustain_end < n:
        env[sustain_end:] = np.linspace(s, 0, n - sustain_end)
    env[t > dur] = 0
    return env


def mix(L, R, i0, wave_l, wave_r):
    i1 = min(len(L), i0 + len(wave_l))
    if i1 <= i0:
        return
    sl = i1 - i0
    L[i0:i1] += wave_l[:sl]
    R[i0:i1] += wave_r[:sl]


def pan_pair(mono, pan):
    pan = max(-1.0, min(1.0, pan))
    return mono * math.sqrt(0.5 * (1.0 - pan)), mono * math.sqrt(0.5 * (1.0 + pan))


class Song(object):
    def __init__(self):
        self.events = []

    def add(self, start_beats, dur_beats, kind, **kwargs):
        self.events.append((start_beats, dur_beats, kind, kwargs))


def build_song():
    s = Song()
    intro, verse, chorus, bridge, outro = 8, 32, 32, 16, 8
    t_intro = 0.0
    t_v1 = t_intro + intro
    t_c1 = t_v1 + verse
    t_v2 = t_c1 + chorus
    t_c2 = t_v2 + verse
    t_br = t_c2 + chorus
    t_c3 = t_br + bridge
    t_out = t_c3 + chorus
    end = t_out + outro

    verse_chords = [("G3", "B3", "D4", "G4"), ("E3", "G3", "B3", "E4"),
                    ("C3", "G3", "C4", "E4"), ("D3", "A3", "D4", "F#4")]
    chorus_chords = [("G3", "B3", "D4", "G4"), ("D3", "A3", "D4", "F#4"),
                     ("E3", "G3", "B3", "E4"), ("C3", "G3", "C4", "E4")]
    bridge_chords = [("A3", "C4", "E4", "A4"), ("E3", "G3", "B3", "E4"),
                     ("C3", "G3", "C4", "E4"), ("D3", "A3", "D4", "F#4")]

    def lay_chords(start, length, pattern, pad_gain=0.18):
        bars = int(length / 4)
        for i in range(bars):
            chord = pattern[i % len(pattern)]
            b = start + i * 4
            s.add(b, 4.0, "pad", notes=chord, gain=pad_gain)
            s.add(b, 4.0, "bass", note=chord[0], gain=0.28)
            arp = [chord[0], chord[1], chord[2], chord[3], chord[2], chord[1]]
            for j, n in enumerate(arp):
                s.add(b + j * (4.0 / 6.0), 0.7, "pluck", note=n, gain=0.16)

    def lay_drums(start, length, with_snare=True, hat_open=False):
        beats = int(length)
        for i in range(beats):
            b = start + i
            s.add(b, 0.18, "hat", gain=0.055 if not hat_open else 0.07)
            if hat_open:
                s.add(b + 0.5, 0.12, "hat", gain=0.04)
            if i % 2 == 0:
                s.add(b, 0.35, "kick", gain=0.4)
            if with_snare and i % 2 == 1:
                s.add(b, 0.28, "snare", gain=0.2)

    def melody(start, notes):
        cursor = start
        for n, dur in notes:
            if n and n != "REST":
                s.add(cursor, dur * 0.96, "lead", note=n, gain=0.24)
                s.add(cursor, dur * 0.96, "lead2", note=n, gain=0.1)
            cursor += dur

    lay_chords(t_intro, intro, chorus_chords, pad_gain=0.14)
    lay_drums(t_intro, intro, with_snare=False)

    lay_chords(t_v1, verse, verse_chords)
    lay_drums(t_v1, verse, hat_open=True)
    melody(t_v1, [
        ("D4", 1), ("E4", 1), ("G4", 1), ("A4", 1),
        ("B4", 1.5), ("A4", 0.5), ("G4", 2),
        ("G4", 1), ("A4", 1), ("B4", 1), ("D5", 1),
        ("B4", 1), ("A4", 1), ("G4", 2),
        ("E4", 1), ("E4", 1), ("G4", 1), ("A4", 1),
        ("B4", 2), ("A4", 2),
        ("G4", 1), ("A4", 1), ("B4", 1), ("D5", 1),
        ("A4", 1), ("G4", 1), ("D4", 1), ("G4", 1),
    ])

    lay_chords(t_c1, chorus, chorus_chords, pad_gain=0.22)
    lay_drums(t_c1, chorus, hat_open=True)
    melody(t_c1, [
        ("D4", 0.5), ("E4", 0.5), ("G4", 1), ("A4", 1), ("B4", 1),
        ("A4", 1), ("G4", 3),
        ("G4", 0.5), ("A4", 0.5), ("B4", 1), ("D5", 1), ("B4", 1),
        ("A4", 1), ("G4", 3),
        ("E4", 1), ("G4", 1), ("A4", 1), ("B4", 1),
        ("A4", 2), ("G4", 2),
        ("G4", 1), ("A4", 1), ("B4", 1), ("D5", 1),
        ("C5", 1), ("B4", 1), ("A4", 1), ("G4", 1),
    ])

    lay_chords(t_v2, verse, verse_chords)
    lay_drums(t_v2, verse, hat_open=True)
    melody(t_v2, [
        ("E4", 1), ("G4", 1), ("A4", 1), ("B4", 1),
        ("D5", 1.5), ("B4", 0.5), ("A4", 2),
        ("G4", 1), ("A4", 1), ("B4", 1), ("D5", 1),
        ("E5", 1), ("D5", 1), ("B4", 2),
        ("A4", 1), ("G4", 1), ("E4", 1), ("G4", 1),
        ("A4", 2), ("B4", 2),
        ("D5", 1), ("B4", 1), ("A4", 1), ("G4", 1),
        ("E4", 1), ("D4", 1), ("G4", 2),
    ])

    lay_chords(t_c2, chorus, chorus_chords, pad_gain=0.24)
    lay_drums(t_c2, chorus, hat_open=True)
    melody(t_c2, [
        ("D5", 0.5), ("B4", 0.5), ("A4", 1), ("G4", 1), ("E4", 1),
        ("D4", 1), ("G4", 3),
        ("G4", 0.5), ("A4", 0.5), ("B4", 1), ("D5", 1), ("B4", 1),
        ("A4", 1), ("G4", 3),
        ("E4", 1), ("G4", 1), ("A4", 1), ("B4", 1),
        ("D5", 2), ("B4", 2),
        ("G4", 1), ("A4", 1), ("B4", 1), ("D5", 1),
        ("A4", 1), ("G4", 1), ("D4", 1), ("G4", 1),
    ])

    lay_chords(t_br, bridge, bridge_chords, pad_gain=0.16)
    lay_drums(t_br, bridge, with_snare=False, hat_open=True)
    melody(t_br, [
        ("A4", 1), ("B4", 1), ("C5", 1), ("B4", 1),
        ("A4", 2), ("G4", 2),
        ("E4", 1), ("G4", 1), ("A4", 1), ("B4", 1),
        ("A4", 1), ("G4", 1), ("D4", 2),
    ])

    lay_chords(t_c3, chorus, chorus_chords, pad_gain=0.26)
    lay_drums(t_c3, chorus, hat_open=True)
    melody(t_c3, [
        ("G4", 0.5), ("A4", 0.5), ("B4", 1), ("D5", 1), ("E5", 1),
        ("D5", 1), ("B4", 3),
        ("G4", 0.5), ("A4", 0.5), ("B4", 1), ("D5", 1), ("G5", 1),
        ("E5", 1), ("D5", 3),
        ("E4", 1), ("G4", 1), ("A4", 1), ("B4", 1),
        ("D5", 2), ("G5", 2),
        ("D5", 1), ("B4", 1), ("A4", 1), ("G4", 1),
        ("A4", 1), ("B4", 1), ("D5", 1), ("G5", 1),
    ])

    lay_chords(t_out, outro, [("G3", "B3", "D4", "G4"), ("G3", "B3", "D4", "G4")], pad_gain=0.12)
    melody(t_out, [
        ("G4", 2), ("D4", 2),
        ("G3", 4),
    ])
    s.add(t_out + 4, 4.0, "pad", notes=("G3", "B3", "D4", "G4"), gain=0.1)
    return s, end


def render(song, total_beats):
    n = int((total_beats * BEAT + 1.6) * SR)
    L = np.zeros(n, dtype=np.float64)
    R = np.zeros(n, dtype=np.float64)
    rng = np.random.RandomState(42)

    for start_b, dur_b, kind, kw in song.events:
        start = start_b * BEAT
        dur = dur_b * BEAT
        gain = kw.get("gain", 0.2)
        i0 = int(start * SR)
        samples = int(dur * SR)
        t = np.arange(samples) / float(SR)

        if kind == "kick":
            freq = 120.0 - 82.0 * np.minimum(1.0, t / 0.08)
            v = np.sin(2 * np.pi * freq * t) * adsr(samples, SR, dur, 0.004, 0.06, 0.2, 0.18) * gain
            l, r = pan_pair(v, 0.0)
            mix(L, R, i0, l, r)
        elif kind == "snare":
            v = (0.35 * np.sin(2 * np.pi * 180 * t) + 0.65 * rng.uniform(-1, 1, samples))
            v *= adsr(samples, SR, dur, 0.002, 0.04, 0.15, 0.12) * gain
            l, r = pan_pair(v, 0.05)
            mix(L, R, i0, l, r)
        elif kind == "hat":
            v = rng.uniform(-1, 1, samples) * adsr(samples, SR, dur, 0.001, 0.02, 0.05, 0.04) * gain
            l, r = pan_pair(v, 0.28)
            mix(L, R, i0, l, r)
        elif kind == "bass":
            hz = PITCH[kw["note"]]
            ph = hz * t
            v = (0.72 * np.sin(2 * np.pi * ph) + 0.18 * (2 * (ph % 1.0) - 1.0))
            v *= adsr(samples, SR, dur, 0.01, 0.12, 0.75, 0.2) * gain
            l, r = pan_pair(v, 0.0)
            mix(L, R, i0, l, r)
        elif kind == "pad":
            for ni, name in enumerate(kw["notes"]):
                hz = PITCH[name]
                pan = np.linspace(-0.4, 0.4, len(kw["notes"]))[ni]
                ph = hz * t
                tri = np.where((ph % 1.0) < 0.5, 4 * (ph % 1.0) - 1, 3 - 4 * (ph % 1.0))
                v = (0.5 * tri + 0.3 * np.sin(2 * np.pi * ph * 1.003))
                v *= adsr(samples, SR, dur, 0.25, 0.3, 0.55, 0.45) * gain * 0.45
                l, r = pan_pair(v, float(pan))
                mix(L, R, i0, l, r)
        elif kind == "pluck":
            hz = PITCH[kw["note"]]
            ph = hz * t
            v = np.sin(2 * np.pi * ph) * np.exp(-t * 4.2)
            v += 0.15 * np.sin(2 * np.pi * ph * 2) * np.exp(-t * 6.0)
            v *= adsr(samples, SR, dur, 0.004, 0.08, 0.2, 0.15) * gain
            l, r = pan_pair(v, -0.22)
            mix(L, R, i0, l, r)
        elif kind in ("lead", "lead2"):
            hz = PITCH[kw["note"]]
            detune = 1.0 if kind == "lead" else 1.006
            pan = -0.05 if kind == "lead" else 0.35
            vib = 1.0 + 0.008 * np.sin(2 * np.pi * 5.2 * t)
            ph = hz * detune * vib * t
            tri = np.where((ph % 1.0) < 0.5, 4 * (ph % 1.0) - 1, 3 - 4 * (ph % 1.0))
            v = (0.62 * np.sin(2 * np.pi * ph) + 0.22 * tri)
            v *= adsr(samples, SR, dur, 0.02, 0.08, 0.7, 0.12) * gain
            l, r = pan_pair(v, pan)
            mix(L, R, i0, l, r)

    peak = max(np.max(np.abs(L)), np.max(np.abs(R)), 1e-9)
    scale = MASTER / peak if peak > MASTER else 1.0
    fade_in = np.linspace(0, 1, int(0.04 * SR))
    fade_out = np.linspace(1, 0, int(0.9 * SR))
    L[: len(fade_in)] *= fade_in
    R[: len(fade_in)] *= fade_in
    L[-len(fade_out):] *= fade_out
    R[-len(fade_out):] *= fade_out
    L = np.clip(L * scale, -1, 1)
    R = np.clip(R * scale, -1, 1)
    return L, R


def write_wav(path, L, R):
    with wave.open(path, "w") as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(SR)
        pcm = np.empty(L.size * 2, dtype=np.int16)
        pcm[0::2] = (L * 32767).astype(np.int16)
        pcm[1::2] = (R * 32767).astype(np.int16)
        w.writeframes(pcm.tobytes())


def main():
    out_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "site", "static", "audio"))
    os.makedirs(out_dir, exist_ok=True)
    wav_path = os.path.join(out_dir, "grain-and-grid.wav")
    song, end = build_song()
    print("Rendering %.1f seconds..." % (end * BEAT))
    L, R = render(song, end)
    write_wav(wav_path, L, R)
    print("Wrote", wav_path, "duration", "%.1fs" % (len(L) / float(SR)))


if __name__ == "__main__":
    main()
