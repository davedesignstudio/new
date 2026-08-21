+++
date = "2026-08-21"
title = "Soundtrack"
url = "/soundtrack"
kicker = "Suno tape"
summary = "Dashboard mix for the mystery van. Embed your track, or generate these prompts on Suno."
+++

The footer player uses a public Suno embed as a placeholder orbital theme. Paste **your** song UUID into `params.sunoId` in `site/config.toml`.

Full song links look like `https://suno.com/song/YOUR-UUID` — short `/s/` links will not embed.

## Prompts to generate the WIDER mix

Copy these into [Suno](https://suno.com/create). Keep vocals a little raspy. Keep the van in the mix.

### 1. Theme — “Meddling Kids in a Mystery Van”
**Style:** stoner funk + synthwave road trip, 108 BPM, analog keys, tape hiss, talking-bass, hungry backup vocals, Scooby-chase organ stabs, Bill-and-Ted guitar hero moment in the chorus.

**Lyrics:**
Like, zoinks — the map is edible /
Couch to the Castle, we ride /
Grub in the back with the last of the gems /
Bodie says destined, Klax says hide /
Unmask the dinner, pass the fries /
The universe is just a kitchen with better stars /

### 2. Night market — “Steam Over Dustport”
**Style:** lo-fi night-drive, street-vendor percussion, pentatonic keys, distant choir, rain on a food-stall awning, 92 BPM.

### 3. Munchies ballad — “Split the Last Slider”
**Style:** slow jam, Rhodes, analog chorus, two voices arguing in harmony about sharing food, 78 BPM.

### 4. End credits — “Table at the Edge”
**Style:** excellent-adventure fanfare melting into diner jukebox, 100 BPM, hopeful, greasy, kind.

When a track is done, copy the UUID, drop it in config, rebuild. The van will play whatever you cooked.
