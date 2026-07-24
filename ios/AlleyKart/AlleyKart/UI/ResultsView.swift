import SwiftUI

struct ResultsView: View {
    @ObservedObject var model: RaceModel

    var body: some View {
        ZStack {
            Color.black.opacity(0.55).ignoresSafeArea()

            VStack(spacing: 18) {
                Text("Finish line")
                    .font(.system(size: 28, weight: .black, design: .rounded))
                    .foregroundStyle(AlleyTheme.hudInk)

                Text(model.selectedTrack.name)
                    .font(.system(size: 13, weight: .semibold, design: .rounded))
                    .foregroundStyle(AlleyTheme.hudInk.opacity(0.55))

                VStack(spacing: 10) {
                    ForEach(Array(model.standings.enumerated()), id: \.element.id) { idx, kart in
                        HStack(spacing: 12) {
                            Text(place(idx + 1))
                                .font(.system(size: 16, weight: .black, design: .rounded))
                                .foregroundStyle(idx == 0 ? AlleyTheme.accent : AlleyTheme.hudInk.opacity(0.7))
                                .frame(width: 40, alignment: .leading)

                            Circle().fill(kart.profile.color).frame(width: 14, height: 14)

                            Text(kart.profile.name)
                                .font(.system(size: 16, weight: .bold, design: .rounded))
                                .foregroundStyle(AlleyTheme.hudInk)

                            if kart.isPlayer {
                                Text("YOU")
                                    .font(.system(size: 10, weight: .heavy, design: .rounded))
                                    .padding(.horizontal, 6)
                                    .padding(.vertical, 3)
                                    .background(Capsule().fill(AlleyTheme.accent.opacity(0.9)))
                                    .foregroundStyle(AlleyTheme.panel)
                            }

                            Spacer()

                            HStack(spacing: 4) {
                                ForEach(kart.profile.cargo.prefix(3)) { item in
                                    Image(systemName: item.symbol)
                                        .font(.system(size: 10, weight: .bold))
                                        .foregroundStyle(AlleyTheme.hudInk.opacity(0.55))
                                }
                            }
                        }
                        .padding(.horizontal, 14)
                        .padding(.vertical, 10)
                        .background(
                            RoundedRectangle(cornerRadius: 12, style: .continuous)
                                .fill(AlleyTheme.panel.opacity(kart.isPlayer ? 0.9 : 0.55))
                        )
                    }
                }
                .padding(.horizontal, 8)

                HStack(spacing: 12) {
                    Button(action: model.startRace) {
                        Text("Rematch")
                            .font(.system(size: 16, weight: .bold, design: .rounded))
                            .frame(maxWidth: .infinity)
                            .padding(.vertical, 14)
                            .foregroundStyle(AlleyTheme.panel)
                            .background(Capsule().fill(AlleyTheme.accent))
                    }
                    .buttonStyle(.plain)

                    Button(action: model.backToMenu) {
                        Text("Menu")
                            .font(.system(size: 16, weight: .bold, design: .rounded))
                            .frame(maxWidth: .infinity)
                            .padding(.vertical, 14)
                            .foregroundStyle(AlleyTheme.hudInk)
                            .background(Capsule().stroke(AlleyTheme.hudInk.opacity(0.35), lineWidth: 2))
                    }
                    .buttonStyle(.plain)
                }
                .padding(.top, 8)
            }
            .padding(22)
            .background(
                RoundedRectangle(cornerRadius: 24, style: .continuous)
                    .fill(Color(red: 0.10, green: 0.12, blue: 0.14).opacity(0.95))
            )
            .padding(.horizontal, 22)
        }
    }

    private func place(_ n: Int) -> String {
        switch n {
        case 1: return "1st"
        case 2: return "2nd"
        case 3: return "3rd"
        default: return "\(n)th"
        }
    }
}
