import SwiftUI

struct ContentView: View {
    @StateObject private var model = GameModel()

    var body: some View {
        GeometryReader { geo in
            let size = geo.size

            ZStack {
                LumenTheme.background
                    .ignoresSafeArea()

                // Atmospheric particles / depth layers
                AtmosphereLayer()
                    .ignoresSafeArea()
                    .opacity(0.7)

                GameCanvas(model: model, size: size)
                    .ignoresSafeArea()
                    .onAppear { model.updateSize(size) }
                    .onChange(of: size) { _, newSize in
                        model.updateSize(newSize)
                    }

                if model.phase == .playing {
                    HUDView(model: model)
                        .transition(.opacity)
                }

                if model.phase == .menu {
                    MenuOverlay(model: model)
                }

                if model.phase == .gameOver {
                    GameOverOverlay(model: model)
                }
            }
            .contentShape(Rectangle())
            .onTapGesture {
                model.cycleColor()
            }
            .animation(.easeInOut(duration: 0.25), value: model.phase)
        }
        .preferredColorScheme(.dark)
        .persistentSystemOverlays(.hidden)
    }
}

private struct AtmosphereLayer: View {
    @State private var drift = false

    var body: some View {
        ZStack {
            Circle()
                .fill(LumenTheme.glow.opacity(0.08))
                .frame(width: 280, height: 280)
                .blur(radius: 50)
                .offset(x: drift ? 40 : -30, y: drift ? -80 : -40)

            Circle()
                .fill(LumenTheme.rose.opacity(0.07))
                .frame(width: 220, height: 220)
                .blur(radius: 45)
                .offset(x: drift ? -50 : 20, y: drift ? 180 : 140)

            Circle()
                .fill(LumenTheme.amber.opacity(0.06))
                .frame(width: 180, height: 180)
                .blur(radius: 40)
                .offset(x: 60, y: drift ? 320 : 280)
        }
        .onAppear {
            withAnimation(.easeInOut(duration: 7).repeatForever(autoreverses: true)) {
                drift = true
            }
        }
    }
}

#Preview {
    ContentView()
}
