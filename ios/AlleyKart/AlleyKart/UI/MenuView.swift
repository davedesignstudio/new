import SwiftUI

struct MenuView: View {
    @ObservedObject var model: RaceModel

    var body: some View {
        ZStack {
            AlleyTheme.menuBackground.ignoresSafeArea()
            AtmosphereWash()

            VStack(spacing: 0) {
                Spacer(minLength: 40)

                VStack(spacing: 8) {
                    Text("ALLEY")
                        .font(.system(size: 56, weight: .black, design: .rounded))
                        .tracking(6)
                        .foregroundStyle(AlleyTheme.hudInk)
                    Text("KART")
                        .font(.system(size: 42, weight: .heavy, design: .rounded))
                        .tracking(14)
                        .foregroundStyle(AlleyTheme.accent)
                }

                Text("Shopping-cart grand prix. Load up. Don't spill the boombox.")
                    .font(.system(size: 15, weight: .medium, design: .rounded))
                    .foregroundStyle(AlleyTheme.hudInk.opacity(0.75))
                    .multilineTextAlignment(.center)
                    .padding(.horizontal, 36)
                    .padding(.top, 16)

                CargoPreviewRow()
                    .padding(.top, 28)

                Spacer()

                VStack(spacing: 14) {
                    Button(action: model.openCharacterSelect) {
                        Text("Race")
                            .font(.system(size: 20, weight: .bold, design: .rounded))
                            .frame(maxWidth: .infinity)
                            .padding(.vertical, 16)
                            .foregroundStyle(AlleyTheme.panel)
                            .background(Capsule().fill(AlleyTheme.accent))
                    }
                    .buttonStyle(.plain)
                    .padding(.horizontal, 48)

                    Text("3 laps · item boxes · no entry fee")
                        .font(.system(size: 12, weight: .semibold, design: .rounded))
                        .foregroundStyle(AlleyTheme.hudInk.opacity(0.45))
                }
                .padding(.bottom, 48)
            }
        }
    }
}

private struct CargoPreviewRow: View {
    var body: some View {
        HStack(spacing: 18) {
            ForEach([CartCargo.cans, .sleepingBag, .cardboard, .boombox]) { item in
                VStack(spacing: 6) {
                    Image(systemName: item.symbol)
                        .font(.system(size: 18, weight: .bold))
                        .foregroundStyle(AlleyTheme.hudInk)
                        .frame(width: 44, height: 44)
                        .background(Circle().fill(AlleyTheme.panel.opacity(0.55)))
                    Text(item.label)
                        .font(.system(size: 10, weight: .semibold, design: .rounded))
                        .foregroundStyle(AlleyTheme.hudInk.opacity(0.6))
                }
            }
        }
    }
}

private struct AtmosphereWash: View {
    @State private var drift = false

    var body: some View {
        ZStack {
            Circle()
                .fill(AlleyTheme.accent.opacity(0.18))
                .frame(width: 260, height: 260)
                .blur(radius: 40)
                .offset(x: drift ? 50 : -20, y: -120)
            Circle()
                .fill(Color.cyan.opacity(0.12))
                .frame(width: 220, height: 220)
                .blur(radius: 36)
                .offset(x: -40, y: drift ? 220 : 180)
        }
        .ignoresSafeArea()
        .onAppear {
            withAnimation(.easeInOut(duration: 6).repeatForever(autoreverses: true)) {
                drift = true
            }
        }
    }
}
