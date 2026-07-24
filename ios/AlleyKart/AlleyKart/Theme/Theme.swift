import SwiftUI

enum AlleyTheme {
    static let asphalt = Color(red: 0.14, green: 0.15, blue: 0.17)
    static let asphaltLight = Color(red: 0.22, green: 0.23, blue: 0.26)
    static let curb = Color(red: 0.72, green: 0.68, blue: 0.58)
    static let grass = Color(red: 0.18, green: 0.42, blue: 0.28)
    static let dirt = Color(red: 0.36, green: 0.28, blue: 0.18)
    static let skyTop = Color(red: 0.45, green: 0.72, blue: 0.88)
    static let skyBot = Color(red: 0.92, green: 0.78, blue: 0.55)
    static let hudInk = Color(red: 0.98, green: 0.96, blue: 0.90)
    static let accent = Color(red: 0.95, green: 0.45, blue: 0.18)
    static let panel = Color(red: 0.10, green: 0.11, blue: 0.13)

    static var menuBackground: LinearGradient {
        LinearGradient(
            colors: [
                Color(red: 0.12, green: 0.18, blue: 0.22),
                Color(red: 0.22, green: 0.28, blue: 0.20),
                Color(red: 0.35, green: 0.28, blue: 0.16)
            ],
            startPoint: .topLeading,
            endPoint: .bottomTrailing
        )
    }
}
