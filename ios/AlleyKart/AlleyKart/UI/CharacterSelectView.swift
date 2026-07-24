import SwiftUI

struct CharacterSelectView: View {
    @ObservedObject var model: RaceModel

    var body: some View {
        ZStack {
            AlleyTheme.menuBackground.ignoresSafeArea()

            VStack(spacing: 16) {
                HStack {
                    Button(action: model.backToMenu) {
                        Image(systemName: "chevron.left")
                            .font(.system(size: 16, weight: .bold))
                            .foregroundStyle(AlleyTheme.hudInk)
                            .padding(12)
                            .background(Circle().fill(AlleyTheme.panel.opacity(0.6)))
                    }
                    .buttonStyle(.plain)

                    Spacer()

                    Text("Pick your cart")
                        .font(.system(size: 22, weight: .heavy, design: .rounded))
                        .foregroundStyle(AlleyTheme.hudInk)

                    Spacer()
                    Color.clear.frame(width: 40, height: 40)
                }
                .padding(.horizontal, 20)
                .padding(.top, 12)

                ScrollView(.horizontal, showsIndicators: false) {
                    HStack(spacing: 14) {
                        ForEach(Roster.all) { profile in
                            Button {
                                model.selectedProfile = profile
                            } label: {
                                CharacterCard(
                                    profile: profile,
                                    selected: model.selectedProfile.id == profile.id
                                )
                            }
                            .buttonStyle(.plain)
                        }
                    }
                    .padding(.horizontal, 20)
                }

                VStack(alignment: .leading, spacing: 10) {
                    Text("Track")
                        .font(.system(size: 13, weight: .bold, design: .rounded))
                        .foregroundStyle(AlleyTheme.hudInk.opacity(0.55))
                        .padding(.horizontal, 24)

                    ForEach(Array(Tracks.all.enumerated()), id: \.offset) { _, track in
                        Button {
                            model.selectedTrack = track
                        } label: {
                            HStack {
                                VStack(alignment: .leading, spacing: 2) {
                                    Text(track.name)
                                        .font(.system(size: 16, weight: .bold, design: .rounded))
                                    Text(track.subtitle)
                                        .font(.system(size: 12, weight: .medium, design: .rounded))
                                        .foregroundStyle(AlleyTheme.hudInk.opacity(0.55))
                                }
                                Spacer()
                                if model.selectedTrack.name == track.name {
                                    Image(systemName: "checkmark.circle.fill")
                                        .foregroundStyle(AlleyTheme.accent)
                                }
                            }
                            .foregroundStyle(AlleyTheme.hudInk)
                            .padding(14)
                            .background(
                                RoundedRectangle(cornerRadius: 14, style: .continuous)
                                    .fill(AlleyTheme.panel.opacity(model.selectedTrack.name == track.name ? 0.85 : 0.45))
                            )
                        }
                        .buttonStyle(.plain)
                        .padding(.horizontal, 20)
                    }
                }

                Spacer(minLength: 8)

                Button(action: model.startRace) {
                    Text("Lined up — Go")
                        .font(.system(size: 18, weight: .bold, design: .rounded))
                        .frame(maxWidth: .infinity)
                        .padding(.vertical, 16)
                        .foregroundStyle(AlleyTheme.panel)
                        .background(Capsule().fill(AlleyTheme.accent))
                }
                .buttonStyle(.plain)
                .padding(.horizontal, 40)
                .padding(.bottom, 36)
            }
        }
    }
}

private struct CharacterCard: View {
    let profile: RacerProfile
    let selected: Bool

    var body: some View {
        VStack(alignment: .leading, spacing: 10) {
            RoundedRectangle(cornerRadius: 16, style: .continuous)
                .fill(profile.color)
                .frame(width: 168, height: 110)
                .overlay {
                    VStack(spacing: 8) {
                        Image(systemName: "cart.fill")
                            .font(.system(size: 34))
                            .foregroundStyle(profile.accent)
                        HStack(spacing: 6) {
                            ForEach(profile.cargo) { item in
                                Image(systemName: item.symbol)
                                    .font(.system(size: 11, weight: .bold))
                                    .foregroundStyle(AlleyTheme.hudInk.opacity(0.9))
                            }
                        }
                    }
                }
                .overlay(
                    RoundedRectangle(cornerRadius: 16, style: .continuous)
                        .stroke(selected ? AlleyTheme.accent : .clear, lineWidth: 3)
                )

            Text(profile.name)
                .font(.system(size: 18, weight: .heavy, design: .rounded))
                .foregroundStyle(AlleyTheme.hudInk)
            Text(profile.tagline)
                .font(.system(size: 11, weight: .medium, design: .rounded))
                .foregroundStyle(AlleyTheme.hudInk.opacity(0.55))
                .lineLimit(2)
                .frame(width: 168, alignment: .leading)

            StatBar(label: "Speed", value: profile.speed)
            StatBar(label: "Grip", value: profile.handling)
            StatBar(label: "Luck", value: profile.luck)
        }
        .padding(12)
        .background(
            RoundedRectangle(cornerRadius: 18, style: .continuous)
                .fill(AlleyTheme.panel.opacity(selected ? 0.8 : 0.45))
        )
    }
}

private struct StatBar: View {
    let label: String
    let value: Double

    var body: some View {
        VStack(alignment: .leading, spacing: 3) {
            Text(label)
                .font(.system(size: 10, weight: .semibold, design: .rounded))
                .foregroundStyle(AlleyTheme.hudInk.opacity(0.45))
            GeometryReader { geo in
                ZStack(alignment: .leading) {
                    Capsule().fill(AlleyTheme.hudInk.opacity(0.12))
                    Capsule()
                        .fill(AlleyTheme.accent)
                        .frame(width: geo.size.width * value)
                }
            }
            .frame(height: 6)
        }
        .frame(width: 168)
    }
}
