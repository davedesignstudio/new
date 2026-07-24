import SwiftUI

struct RaceHUD: View {
    @ObservedObject var model: RaceModel

    var body: some View {
        VStack {
            HStack(alignment: .top) {
                VStack(alignment: .leading, spacing: 4) {
                    Text(placeLabel)
                        .font(.system(size: 28, weight: .black, design: .rounded))
                        .foregroundStyle(AlleyTheme.hudInk)
                    Text("Lap \(min(model.player?.lap ?? 1, model.selectedTrack.lapCount))/\(model.selectedTrack.lapCount)")
                        .font(.system(size: 14, weight: .bold, design: .rounded))
                        .foregroundStyle(AlleyTheme.hudInk.opacity(0.7))
                }

                Spacer()

                VStack(alignment: .trailing, spacing: 6) {
                    ForEach(Array(model.standings.prefix(4).enumerated()), id: \.element.id) { idx, kart in
                        HStack(spacing: 6) {
                            Text("\(idx + 1)")
                                .font(.system(size: 11, weight: .bold, design: .rounded))
                                .foregroundStyle(AlleyTheme.hudInk.opacity(0.5))
                            Circle().fill(kart.profile.color).frame(width: 10, height: 10)
                            Text(kart.profile.name)
                                .font(.system(size: 12, weight: .bold, design: .rounded))
                                .foregroundStyle(kart.isPlayer ? AlleyTheme.accent : AlleyTheme.hudInk.opacity(0.85))
                        }
                    }
                }
                .padding(10)
                .background(.ultraThinMaterial.opacity(0.35), in: RoundedRectangle(cornerRadius: 12, style: .continuous))
            }
            .padding(.horizontal, 18)
            .padding(.top, 10)

            Spacer()

            if model.screen == .countdown {
                Text(model.countdown == 0 ? "GO" : "\(model.countdown)")
                    .font(.system(size: 84, weight: .black, design: .rounded))
                    .foregroundStyle(AlleyTheme.hudInk)
                    .shadow(color: .black.opacity(0.35), radius: 8, y: 4)
                    .transition(.scale)
            }

            Spacer()

            HStack(alignment: .bottom, spacing: 16) {
                // Steer pad
                VStack(spacing: 10) {
                    Text("STEER")
                        .font(.system(size: 10, weight: .bold, design: .rounded))
                        .foregroundStyle(AlleyTheme.hudInk.opacity(0.4))
                    HStack(spacing: 12) {
                        HoldButton(symbol: "arrow.left", pressed: model.steerInput < 0) {
                            model.steerInput = -1
                        } onRelease: {
                            if model.steerInput < 0 { model.steerInput = 0 }
                        }
                        HoldButton(symbol: "arrow.right", pressed: model.steerInput > 0) {
                            model.steerInput = 1
                        } onRelease: {
                            if model.steerInput > 0 { model.steerInput = 0 }
                        }
                    }
                }

                Spacer()

                // Item button
                Button(action: model.useItem) {
                    ZStack {
                        RoundedRectangle(cornerRadius: 16, style: .continuous)
                            .fill(AlleyTheme.panel.opacity(0.7))
                            .frame(width: 64, height: 64)
                        if let item = model.player?.heldItem {
                            VStack(spacing: 4) {
                                Image(systemName: item.symbol)
                                    .foregroundStyle(item.tint)
                                Text("USE")
                                    .font(.system(size: 9, weight: .bold, design: .rounded))
                                    .foregroundStyle(AlleyTheme.hudInk.opacity(0.7))
                            }
                        } else {
                            Text("—")
                                .foregroundStyle(AlleyTheme.hudInk.opacity(0.35))
                        }
                    }
                }
                .buttonStyle(.plain)
                .disabled(model.player?.heldItem == nil || model.screen != .racing)

                // Gas
                VStack(spacing: 10) {
                    Text("GAS")
                        .font(.system(size: 10, weight: .bold, design: .rounded))
                        .foregroundStyle(AlleyTheme.hudInk.opacity(0.4))
                    HoldButton(symbol: "arrow.up", pressed: model.throttleHeld, wide: true) {
                        model.throttleHeld = true
                    } onRelease: {
                        model.throttleHeld = false
                    }
                }
            }
            .padding(.horizontal, 20)
            .padding(.bottom, 24)
        }
    }

    private var placeLabel: String {
        guard let player = model.player else { return "—" }
        let place = (model.standings.firstIndex(where: { $0.id == player.id }) ?? 0) + 1
        switch place {
        case 1: return "1st"
        case 2: return "2nd"
        case 3: return "3rd"
        default: return "\(place)th"
        }
    }
}

private struct HoldButton: View {
    let symbol: String
    var pressed: Bool = false
    var wide: Bool = false
    let onPress: () -> Void
    let onRelease: () -> Void

    var body: some View {
        Image(systemName: symbol)
            .font(.system(size: 22, weight: .black))
            .foregroundStyle(pressed ? AlleyTheme.panel : AlleyTheme.hudInk)
            .frame(width: wide ? 88 : 64, height: 64)
            .background(
                RoundedRectangle(cornerRadius: 16, style: .continuous)
                    .fill(pressed ? AlleyTheme.accent : AlleyTheme.panel.opacity(0.7))
            )
            .gesture(
                DragGesture(minimumDistance: 0)
                    .onChanged { _ in onPress() }
                    .onEnded { _ in onRelease() }
            )
    }
}
