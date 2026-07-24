import SwiftUI

struct MenuOverlay: View {
    @ObservedObject var model: GameModel

    var body: some View {
        VStack(spacing: 0) {
            Spacer(minLength: 48)

            VStack(spacing: 10) {
                Text("LUMEN")
                    .font(.system(size: 54, weight: .heavy, design: .rounded))
                    .tracking(8)
                    .foregroundStyle(LumenTheme.ink)
                    .shadow(color: LumenTheme.glow.opacity(0.45), radius: 18, y: 2)

                Text("FALL")
                    .font(.system(size: 28, weight: .semibold, design: .rounded))
                    .tracking(14)
                    .foregroundStyle(LumenTheme.glow)
            }
            .padding(.top, 36)

            Text("Match the ring. Tap to shift color.")
                .font(.system(size: 16, weight: .medium, design: .rounded))
                .foregroundStyle(LumenTheme.ink.opacity(0.72))
                .multilineTextAlignment(.center)
                .padding(.top, 18)
                .padding(.horizontal, 36)

            Spacer()

            VStack(spacing: 18) {
                Button(action: model.startGame) {
                    Text("Play")
                        .font(.system(size: 20, weight: .bold, design: .rounded))
                        .tracking(1)
                        .foregroundStyle(LumenTheme.deep)
                        .frame(maxWidth: .infinity)
                        .padding(.vertical, 16)
                        .background(
                            Capsule()
                                .fill(LumenTheme.glow)
                                .shadow(color: LumenTheme.glow.opacity(0.4), radius: 16, y: 6)
                        )
                }
                .buttonStyle(.plain)
                .padding(.horizontal, 48)

                if model.bestScore > 0 {
                    Text("Best \(model.bestScore)")
                        .font(.system(size: 15, weight: .semibold, design: .rounded))
                        .foregroundStyle(LumenTheme.ink.opacity(0.55))
                }
            }
            .padding(.bottom, 56)
        }
        .transition(.opacity.combined(with: .scale(scale: 0.98)))
    }
}
