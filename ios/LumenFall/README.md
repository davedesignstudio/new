# Lumen Fall

A one-thumb iOS arcade game built with **SwiftUI**.

Tap to cycle your orb’s color and fall through matching segments of spinning rings. Miss a match and you’re out of phase.

## Requirements

- macOS with Xcode 15+
- iOS 17+ Simulator or device

## Open & run

```bash
open ios/LumenFall/LumenFall.xcodeproj
```

1. Select an iPhone simulator (or a connected device)
2. Set your Development Team under **Signing & Capabilities** if running on device
3. Press **Run** (⌘R)

## How to play

- **Tap** anywhere to change the orb color (cyan → amber → rose → violet)
- Pass through the **top** segment of each ring when colors match
- Score climbs; rings spin faster and spawn closer as you go
- Best score is saved on device

## Project layout

```
LumenFall/
  LumenFallApp.swift      # App entry
  ContentView.swift       # Shell, input, overlays
  Theme/Theme.swift       # Colors & palette
  Game/
    GameModel.swift       # Loop, scoring, collisions
    GameCanvas.swift      # Canvas rendering
  UI/
    MenuOverlay.swift
    HUDView.swift
    GameOverOverlay.swift
```
