# Alley Kart

Mario Kart–style **shopping cart racing** for iOS (SwiftUI).

Race as curb-side cart pilots — Marty, Vera, Duke, and Pip — each hauling a cart stuffed with cans, sleeping bags, cardboard, boomboxes, and other classic cart cargo. Hit item boxes for Dumpster Boosts, Soap Slicks, Can Tosses, and Bag Bubbles.

## Requirements

- macOS with Xcode 15+
- iOS 17+ Simulator or device

## Open & run

```bash
open ios/AlleyKart/AlleyKart.xcodeproj
```

1. Select an iPhone simulator (or device)
2. Set your Development Team under **Signing & Capabilities** for device runs
3. Press **Run** (⌘R)

## Controls

| Control | Action |
|--------|--------|
| Left / Right | Steer |
| Gas (↑) | Hold to accelerate |
| Item button | Use held power-up |

## Tracks

- **Underpass Circuit** — freeway oval with wobble
- **Soup Line Speedway** — figure-eight chaos

## Project layout

```
AlleyKart/
  AlleyKartApp.swift
  ContentView.swift
  Theme/
  Models/   # racers, tracks, items
  Game/     # race loop + canvas renderer
  UI/       # menu, select, HUD, results
```
