+++
date = "2026-08-21"
title = "The Trail"
url = "/world"
kicker = "A hiking game"
summary = "No boss to beat. Walk a seeded Earth, rest at wonderful views, and meet the crew on the way — the story is who you find."
fullbleed = true
world = true
+++

<div id="wider-world" class="wider-world">
  <div class="world-stage" data-world-canvas></div>
  <div class="world-hud">
    <div class="world-brand">
      <p class="world-kicker">WIDER</p>
      <h1 class="world-title">The Trail</h1>
      <p class="world-tag">No boss. Just nature, views, and people who tell the story when you stop.</p>
    </div>
    <div class="world-tools">
      <label class="world-seed">
        <span>Seed</span>
        <input type="text" value="WIDER" data-world-seed maxlength="48" autocomplete="off" />
      </label>
      <button type="button" class="btn" data-world-reshape>New trail</button>
      <button type="button" class="btn btn-ghost" data-world-random>Random</button>
    </div>
    <div class="world-journal" data-world-journal></div>
    <p class="world-compass" data-world-compass></p>
    <p class="world-status" data-world-status>Shaping the trail…</p>
  </div>
  <p class="world-prompt" data-world-prompt hidden></p>
  <aside class="world-panel" data-world-panel hidden></aside>
  <p class="world-hint">Click to look · WASD walk · Shift slow · E talk or rest at a vista</p>
</div>
