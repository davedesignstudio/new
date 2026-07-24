import Foundation
import SwiftUI

enum PowerUpKind: String, CaseIterable, Identifiable {
    case boost
    case slick
    case canToss
    case bagShield

    var id: String { rawValue }

    var title: String {
        switch self {
        case .boost: return "Dumpster Boost"
        case .slick: return "Soap Slick"
        case .canToss: return "Can Toss"
        case .bagShield: return "Bag Bubble"
        }
    }

    var symbol: String {
        switch self {
        case .boost: return "flame.fill"
        case .slick: return "drop.fill"
        case .canToss: return "circle.fill"
        case .bagShield: return "shield.fill"
        }
    }

    var tint: Color {
        switch self {
        case .boost: return Color(red: 1.0, green: 0.45, blue: 0.15)
        case .slick: return Color(red: 0.45, green: 0.85, blue: 0.95)
        case .canToss: return Color(red: 0.75, green: 0.78, blue: 0.82)
        case .bagShield: return Color(red: 0.55, green: 0.85, blue: 0.45)
        }
    }
}

struct ItemBox: Identifiable, Equatable {
    let id: UUID
    var progress: CGFloat
    var availableAt: TimeInterval
}

struct SlickSpot: Identifiable, Equatable {
    let id: UUID
    var position: CGPoint
    var expiresAt: TimeInterval
}

struct Projectile: Identifiable, Equatable {
    let id: UUID
    var position: CGPoint
    var velocity: CGVector
    var ownerID: String
    var expiresAt: TimeInterval
}
