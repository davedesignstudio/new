import SwiftUI

struct ContentView: View {
    @StateObject private var model = RaceModel()

    var body: some View {
        GeometryReader { geo in
            ZStack {
                switch model.screen {
                case .menu:
                    MenuView(model: model)
                        .transition(.opacity)

                case .characterSelect:
                    CharacterSelectView(model: model)
                        .transition(.opacity)

                case .countdown, .racing, .results:
                    ZStack {
                        RaceCanvas(model: model, viewport: geo.size)
                            .ignoresSafeArea()

                        RaceHUD(model: model)

                        if model.screen == .results {
                            ResultsView(model: model)
                                .transition(.opacity)
                        }
                    }
                    .transition(.opacity)
                }
            }
            .animation(.easeInOut(duration: 0.25), value: model.screen)
        }
        .preferredColorScheme(.dark)
        .persistentSystemOverlays(.hidden)
    }
}

#Preview {
    ContentView()
}
