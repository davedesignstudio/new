import SwiftUI

struct GameOverOverlay: View {
    @ObservedObject var model: GameModel

    var body: some View {
        ZStack {
            LumenTheme.deep.opacity(0.55)
                .ignoresSafeArea()

            VStack(spacing: 20) {
                Text("Out of phase")
                    .font(.system(size: 30, weight: .heavy, design: .rounded))
                    .foregroundStyle(LumenTheme.ink)

                VStack(spacing: 6) {
                    Text("\(model.score)")
                        .font(.system(size: 64, weight: .heavy, design: .rounded))
                        .foregroundStyle(LumenTheme.amber)
                    Text("best \(model.bestScore)")
                        .font(.system(size: 15, weight: .semibold, design: .rounded))
                        .foregroundStyle(LumenTheme.ink.opacity(0.55))
                }
                .padding(.vertical, 8)

                Button(action: model.startGame) {
                    Text("Again")
                        .font(.system(size: 18, weight: .bold, design: .rounded))
                        .foregroundStyle(LumenTheme.deep)
                        .frame(maxWidth: .infinity)
                        .padding(.vertical, 15)
                        .background(Capsule().fill(LumenTheme.amber))
                }
                .buttonStyle(.plain)
                .padding(.horizontal, 56)
                .padding(.top, 8)
            }
            .padding(28)
        }
        .transition(.opacity)
    }
}
