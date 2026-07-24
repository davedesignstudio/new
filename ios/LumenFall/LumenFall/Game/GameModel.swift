import Foundation
import SwiftUI
import Combine
import UIKit

enum GamePhase: Equatable {
    case menu
    case playing
    case gameOver
}

struct RingObstacle: Identifiable, Equatable {
    let id: UUID
    var y: CGFloat
    var rotation: Double
    var angularVelocity: Double
    /// Segment colors in clockwise order starting at angle 0.
    let segments: [BallColor]
    var passed: Bool

    init(
        id: UUID = UUID(),
        y: CGFloat,
        rotation: Double = Double.random(in: 0...(2 * .pi)),
        angularVelocity: Double,
        segments: [BallColor] = BallColor.allCases.shuffled(),
        passed: Bool = false
    ) {
        self.id = id
        self.y = y
        self.rotation = rotation
        self.angularVelocity = angularVelocity
        self.segments = segments
        self.passed = passed
    }
}

@MainActor
final class GameModel: ObservableObject {
    @Published var phase: GamePhase = .menu
    @Published var score = 0
    @Published var bestScore = 0
    @Published var ballColor: BallColor = .cyan
    @Published var ballY: CGFloat = 0
    @Published var rings: [RingObstacle] = []
    @Published var pulse: Bool = false

    let ballXRatio: CGFloat = 0.5
    let ballRadius: CGFloat = 14
    let ringThickness: CGFloat = 18
    let ringRadius: CGFloat = 86

    private var fallSpeed: CGFloat = 170
    private var lastTick: Date?
    private var spawnDistance: CGFloat = 280
    private var nextSpawnY: CGFloat = 0
    private var size: CGSize = .zero

    private let bestScoreKey = "lumenfall.bestScore"

    init() {
        bestScore = UserDefaults.standard.integer(forKey: bestScoreKey)
    }

    func updateSize(_ size: CGSize) {
        self.size = size
        if phase == .menu && ballY == 0 {
            ballY = size.height * 0.42
        }
    }

    func startGame() {
        guard size != .zero else { return }
        score = 0
        ballColor = .cyan
        fallSpeed = 170
        spawnDistance = 280
        ballY = size.height * 0.28
        rings = []
        nextSpawnY = ballY + spawnDistance
        lastTick = nil
        phase = .playing
        spawnInitialRings()
    }

    func cycleColor() {
        guard phase == .playing else {
            if phase == .menu || phase == .gameOver {
                startGame()
            }
            return
        }
        ballColor = ballColor.next()
        pulse.toggle()
        UIImpactFeedbackGenerator(style: .light).impactOccurred()
    }

    func tick(now: Date, size: CGSize) {
        updateSize(size)
        guard phase == .playing else { return }

        let dt: CGFloat
        if let lastTick {
            dt = CGFloat(now.timeIntervalSince(lastTick))
        } else {
            dt = 1.0 / 60.0
        }
        lastTick = now
        let clamped = min(dt, 1.0 / 20.0)

        ballY += fallSpeed * clamped

        // Keep ball visually near upper-middle by scrolling world upward.
        let targetBallY = size.height * 0.38
        let scroll = max(0, ballY - targetBallY)
        if scroll > 0 {
            ballY -= scroll
            for i in rings.indices {
                rings[i].y -= scroll
            }
            nextSpawnY -= scroll
        }

        for i in rings.indices {
            rings[i].rotation += rings[i].angularVelocity * Double(clamped)
        }

        while nextSpawnY < size.height + 200 {
            spawnRing(at: nextSpawnY)
            nextSpawnY += spawnDistance
        }

        rings.removeAll { $0.y < -160 }

        checkCollisions()
        fallSpeed = min(340, 170 + CGFloat(score) * 4.5)
        spawnDistance = max(210, 280 - CGFloat(score) * 2.2)
    }

    private func spawnInitialRings() {
        for i in 0..<4 {
            spawnRing(at: ballY + spawnDistance * CGFloat(i + 1))
        }
        nextSpawnY = ballY + spawnDistance * 5
    }

    private func spawnRing(at y: CGFloat) {
        let speedBase = 0.9 + Double(score) * 0.035
        let velocity = Double.random(in: speedBase...(speedBase + 0.7))
            * (Bool.random() ? 1 : -1)
        rings.append(
            RingObstacle(
                y: y,
                angularVelocity: velocity,
                segments: BallColor.allCases.shuffled()
            )
        )
    }

    private func checkCollisions() {
        let ballCenterY = ballY
        for i in rings.indices {
            let ring = rings[i]
            let dy = abs(ring.y - ballCenterY)
            let passBand = ringThickness * 0.55

            if !ring.passed && dy < passBand {
                let segment = segmentAtTop(for: ring)
                if segment == ballColor {
                    rings[i].passed = true
                    score += 1
                    UIImpactFeedbackGenerator(style: .soft).impactOccurred()
                    if score > bestScore {
                        bestScore = score
                        UserDefaults.standard.set(bestScore, forKey: bestScoreKey)
                    }
                } else {
                    phase = .gameOver
                    UINotificationFeedbackGenerator().notificationOccurred(.error)
                    return
                }
            }
        }
    }

    /// Which color occupies the top of the ring (where the ball passes).
    func segmentAtTop(for ring: RingObstacle) -> BallColor {
        // Top of screen is angle -π/2 in standard math coords used by our drawing.
        let local = normalizeAngle(-Double.pi / 2 - ring.rotation)
        let slice = (2 * Double.pi) / Double(ring.segments.count)
        let index = Int(floor(local / slice)) % ring.segments.count
        return ring.segments[(index + ring.segments.count) % ring.segments.count]
    }

    private func normalizeAngle(_ angle: Double) -> Double {
        var a = angle.truncatingRemainder(dividingBy: 2 * .pi)
        if a < 0 { a += 2 * .pi }
        return a
    }
}
