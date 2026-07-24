import SwiftUI

struct HUDView: View {
    @ObservedObject var model: GameModel

    var body: some View {
        VStack {
            HStack(alignment: .firstTextBaseline) {
                VStack(alignment: .leading, spacing: 2) {
                    Text("SCORE")
                        .font(.system(size: 11, weight: .bold, design: .rounded))
                        .tracking(2)
                        .foregroundStyle(LumenTheme.ink.opacity(0.45))
                    Text("\(model.score)")
                        .font(.system(size: 34, weight: .heavy, design: .rounded))
                        .foregroundStyle(LumenTheme.ink)
                        .contentTransition(.numericText())
                }

                Spacer()

                HStack(spacing: 8) {
                    ForEach(BallColor.allCases) { color in
                        Circle()
                            .fill(color.color)
                            .frame(width: color == model.ballColor ? 16 : 10,
                                   height: color == model.ballColor ? 16 : 10)
                            .opacity(color == model.ballColor ? 1 : 0.35)
                            .animation(.spring(response: 0.28, dampingFraction: 0.7), value: model.ballColor)
                    }
                }
                .padding(.horizontal, 12)
                .padding(.vertical, 8)
                .background(.ultraThinMaterial.opacity(0.35), in: Capsule())
            }
            .padding(.horizontal, 24)
            .padding(.top, 16)

            Spacer()

            Text("TAP")
                .font(.system(size: 13, weight: .bold, design: .rounded))
                .tracking(4)
                .foregroundStyle(LumenTheme.ink.opacity(0.28))
                .padding(.bottom, 28)
        }
        .allowsHitTesting(false)
    }
}
