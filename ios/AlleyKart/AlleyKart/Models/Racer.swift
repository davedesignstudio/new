import SwiftUI

enum CartCargo: String, CaseIterable, Identifiable {
    case cans
    case sleepingBag
    case cardboard
    case plasticBags
    case boombox
    case bottles
    case blanket
    case sign

    var id: String { rawValue }

    var label: String {
        switch self {
        case .cans: return "Cans"
        case .sleepingBag: return "Sleeping bag"
        case .cardboard: return "Cardboard"
        case .plasticBags: return "Bags"
        case .boombox: return "Boombox"
        case .bottles: return "Bottles"
        case .blanket: return "Blanket"
        case .sign: return "Sign"
        }
    }

    var symbol: String {
        switch self {
        case .cans: return "cylinder.fill"
        case .sleepingBag: return "bed.double.fill"
        case .cardboard: return "shippingbox.fill"
        case .plasticBags: return "bag.fill"
        case .boombox: return "radio.fill"
        case .bottles: return "wineglass.fill"
        case .blanket: return "rectangle.compress.vertical"
        case .sign: return "signpost.right.fill"
        }
    }
}

struct RacerProfile: Identifiable, Equatable {
    let id: String
    let name: String
    let tagline: String
    let color: Color
    let accent: Color
    let cargo: [CartCargo]
    let speed: Double
    let handling: Double
    let luck: Double
}

enum Roster {
    static let all: [RacerProfile] = [
        RacerProfile(
            id: "marty",
            name: "Marty",
            tagline: "Can king of the curb",
            color: Color(red: 0.20, green: 0.55, blue: 0.85),
            accent: Color(red: 0.85, green: 0.90, blue: 0.95),
            cargo: [.cans, .bottles, .plasticBags],
            speed: 0.92,
            handling: 0.78,
            luck: 0.70
        ),
        RacerProfile(
            id: "vera",
            name: "Vera",
            tagline: "Blanket drift specialist",
            color: Color(red: 0.78, green: 0.32, blue: 0.48),
            accent: Color(red: 0.95, green: 0.75, blue: 0.82),
            cargo: [.sleepingBag, .blanket, .sign],
            speed: 0.80,
            handling: 0.95,
            luck: 0.85
        ),
        RacerProfile(
            id: "duke",
            name: "Duke",
            tagline: "Cardboard aero package",
            color: Color(red: 0.55, green: 0.42, blue: 0.28),
            accent: Color(red: 0.90, green: 0.82, blue: 0.65),
            cargo: [.cardboard, .sign, .cans],
            speed: 0.88,
            handling: 0.72,
            luck: 0.60
        ),
        RacerProfile(
            id: "pip",
            name: "Pip",
            tagline: "Boombox slipstream",
            color: Color(red: 0.95, green: 0.62, blue: 0.18),
            accent: Color(red: 1.00, green: 0.90, blue: 0.55),
            cargo: [.boombox, .plasticBags, .bottles],
            speed: 0.85,
            handling: 0.86,
            luck: 0.95
        )
    ]
}
