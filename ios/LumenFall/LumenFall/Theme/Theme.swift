import SwiftUI

enum LumenTheme {
    static let deep = Color(red: 0.02, green: 0.08, blue: 0.12)
    static let mid = Color(red: 0.04, green: 0.18, blue: 0.22)
    static let glow = Color(red: 0.20, green: 0.92, blue: 0.78)
    static let amber = Color(red: 1.00, green: 0.62, blue: 0.28)
    static let rose = Color(red: 1.00, green: 0.38, blue: 0.48)
    static let violet = Color(red: 0.55, green: 0.42, blue: 1.00)
    static let ink = Color(red: 0.90, green: 0.96, blue: 0.98)

    static let palette: [Color] = [glow, amber, rose, violet]

    static var background: LinearGradient {
        LinearGradient(
            colors: [
                Color(red: 0.01, green: 0.05, blue: 0.08),
                mid,
                Color(red: 0.03, green: 0.12, blue: 0.18)
            ],
            startPoint: .topLeading,
            endPoint: .bottomTrailing
        )
    }
}

enum BallColor: Int, CaseIterable, Identifiable {
    case cyan = 0
    case amber = 1
    case rose = 2
    case violet = 3

    var id: Int { rawValue }

    var color: Color {
        LumenTheme.palette[rawValue]
    }

    func next() -> BallColor {
        BallColor(rawValue: (rawValue + 1) % BallColor.allCases.count) ?? .cyan
    }
}
