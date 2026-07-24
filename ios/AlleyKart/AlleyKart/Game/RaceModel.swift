import Foundation
import SwiftUI
import Combine
import UIKit

enum AppScreen: Equatable {
    case menu
    case characterSelect
    case countdown
    case racing
    case results
}

struct KartState: Identifiable, Equatable {
    let id: String
    var profile: RacerProfile
    var position: CGPoint
    var angle: CGFloat
    var speed: CGFloat
    var progress: CGFloat
    var lap: Int
    var finished: Bool
    var finishPlace: Int?
    var isPlayer: Bool
    var heldItem: PowerUpKind?
    var shieldUntil: TimeInterval
    var spinUntil: TimeInterval
    var boostUntil: TimeInterval
    var offroadFactor: CGFloat

    var raceMetric: CGFloat {
        CGFloat(lap) + progress
    }
}

@MainActor
final class RaceModel: ObservableObject {
    @Published var screen: AppScreen = .menu
    @Published var selectedProfile: RacerProfile = Roster.all[0]
    @Published var selectedTrack: TrackDefinition = Tracks.underpass
    @Published var karts: [KartState] = []
    @Published var itemBoxes: [ItemBox] = []
    @Published var slicks: [SlickSpot] = []
    @Published var projectiles: [Projectile] = []
    @Published var countdown: Int = 3
    @Published var raceTime: TimeInterval = 0
    @Published var camera: CGPoint = .zero
    @Published var steerInput: CGFloat = 0
    @Published var throttleHeld = false
    @Published var places: [String] = []

    private var lastTick: Date?
    private var countdownEnds: Date?
    private var worldSize = CGSize(width: 1040, height: 720)

    var player: KartState? {
        karts.first(where: \.isPlayer)
    }

    var standings: [KartState] {
        karts.sorted { a, b in
            if a.finished != b.finished {
                return (a.finishPlace ?? 99) < (b.finishPlace ?? 99)
            }
            return a.raceMetric > b.raceMetric
        }
    }

    func openCharacterSelect() {
        screen = .characterSelect
    }

    func backToMenu() {
        screen = .menu
        throttleHeld = false
        steerInput = 0
    }

    func startRace() {
        let track = selectedTrack
        var spawned: [KartState] = []
        let field = Roster.all
        let playerIndex = field.firstIndex(where: { $0.id == selectedProfile.id }) ?? 0

        for (offset, profile) in field.enumerated() {
            let startProgress = 1.0 - CGFloat(offset) * 0.012
            let sample = track.sample(progress: startProgress)
            let lateral = CGFloat(offset % 2 == 0 ? -18 : 18)
            let side = CGPoint(
                x: sample.position.x + cos(sample.angle + .pi / 2) * lateral,
                y: sample.position.y + sin(sample.angle + .pi / 2) * lateral
            )
            spawned.append(
                KartState(
                    id: profile.id,
                    profile: profile,
                    position: side,
                    angle: sample.angle,
                    speed: 0,
                    progress: startProgress,
                    lap: 1,
                    finished: false,
                    finishPlace: nil,
                    isPlayer: offset == playerIndex,
                    heldItem: nil,
                    shieldUntil: 0,
                    spinUntil: 0,
                    boostUntil: 0,
                    offroadFactor: 1
                )
            )
        }

        karts = spawned
        itemBoxes = makeItemBoxes(on: track)
        slicks = []
        projectiles = []
        raceTime = 0
        places = []
        finishTimes = [:]
        countdown = 3
        countdownEnds = Date().addingTimeInterval(3.2)
        lastTick = nil
        camera = spawned.first(where: \.isPlayer)?.position ?? .zero
        screen = .countdown
        UIImpactFeedbackGenerator(style: .medium).impactOccurred()
    }

    func useItem() {
        guard screen == .racing,
              let idx = karts.firstIndex(where: \.isPlayer),
              let item = karts[idx].heldItem else { return }
        activate(item: item, for: idx)
        karts[idx].heldItem = nil
        UIImpactFeedbackGenerator(style: .rigid).impactOccurred()
    }

    func tick(now: Date) {
        switch screen {
        case .countdown:
            updateCountdown(now: now)
        case .racing:
            stepRace(now: now)
        default:
            break
        }
    }

    private func updateCountdown(now: Date) {
        guard let countdownEnds else { return }
        let remaining = countdownEnds.timeIntervalSince(now)
        if remaining <= 0 {
            countdown = 0
            screen = .racing
            lastTick = now
            UINotificationFeedbackGenerator().notificationOccurred(.success)
            return
        }
        countdown = max(1, Int(ceil(remaining - 0.2)))
    }

    private func stepRace(now: Date) {
        let dt: CGFloat
        if let lastTick {
            dt = min(CGFloat(now.timeIntervalSince(lastTick)), 1.0 / 20.0)
        } else {
            dt = 1.0 / 60.0
        }
        lastTick = now
        raceTime += TimeInterval(dt)

        let track = selectedTrack
        for i in karts.indices {
            guard !karts[i].finished else { continue }
            if karts[i].isPlayer {
                stepPlayer(i, dt: dt, track: track, now: now)
            } else {
                stepAI(i, dt: dt, track: track, now: now)
            }
            applyWorldForces(i, dt: dt, track: track, now: now)
            updateProgressAndLaps(i, track: track)
        }

        updateItems(dt: dt, now: now, track: track)
        resolveKartCollisions()
        updateProjectiles(dt: dt, now: now)
        cleanupExpired(now: now)

        if let player {
            camera = CGPoint(
                x: camera.x + (player.position.x - camera.x) * min(1, dt * 8),
                y: camera.y + (player.position.y - camera.y) * min(1, dt * 8)
            )
        }

        // End once the player finishes and either everyone is done or a short grace period passes.
        if let player, player.finished {
            let graceOver = raceTime > finishTime(for: player.id) + 4
            if karts.allSatisfy(\.finished) || graceOver {
                for i in karts.indices where !karts[i].finished {
                    assignFinish(i)
                }
                screen = .results
            }
        }
    }

    private var finishTimes: [String: TimeInterval] = [:]

    private func finishTime(for id: String) -> TimeInterval {
        finishTimes[id] ?? raceTime
    }

    private func stepPlayer(_ i: Int, dt: CGFloat, track: TrackDefinition, now: Date) {
        let nowT = now.timeIntervalSinceReferenceDate
        let profile = karts[i].profile
        let spinning = nowT < karts[i].spinUntil
        let boosting = nowT < karts[i].boostUntil

        if spinning {
            karts[i].angle += 7 * dt
            karts[i].speed *= max(0, 1 - 1.8 * dt)
            integrate(i, dt: dt)
            return
        }

        let handling = 2.4 * profile.handling
        karts[i].angle += steerInput * handling * dt * (0.55 + min(1, abs(karts[i].speed) / 140))

        let maxSpeed: CGFloat = 165 * profile.speed * karts[i].offroadFactor * (boosting ? 1.35 : 1)
        let accel: CGFloat = throttleHeld ? 150 * profile.speed : -120
        karts[i].speed += accel * dt
        if !throttleHeld && karts[i].speed > 0 {
            karts[i].speed = max(0, karts[i].speed)
        }
        karts[i].speed = max(-40, min(maxSpeed, karts[i].speed))
        integrate(i, dt: dt)
        _ = track
    }

    private func stepAI(_ i: Int, dt: CGFloat, track: TrackDefinition, now: Date) {
        let nowT = now.timeIntervalSinceReferenceDate
        if nowT < karts[i].spinUntil {
            karts[i].angle += 7 * dt
            karts[i].speed *= max(0, 1 - 1.8 * dt)
            integrate(i, dt: dt)
            maybeAIUseItem(i, now: nowT)
            return
        }

        let lookAhead = min(0.08, 0.03 + karts[i].speed / 2500)
        let target = track.sample(progress: karts[i].progress + lookAhead)
        var desired = atan2(target.position.y - karts[i].position.y, target.position.x - karts[i].position.x)
        var delta = desired - karts[i].angle
        while delta > .pi { delta -= 2 * .pi }
        while delta < -.pi { delta += 2 * .pi }

        let handling = 2.1 * karts[i].profile.handling
        karts[i].angle += max(-handling * dt, min(handling * dt, delta * 4 * dt))

        let boosting = nowT < karts[i].boostUntil
        let maxSpeed: CGFloat = (140 + CGFloat(i) * 4) * karts[i].profile.speed * karts[i].offroadFactor * (boosting ? 1.3 : 1)
        // Personality: slightly uneven throttle
        let push = 130 * karts[i].profile.speed
        karts[i].speed += push * dt
        karts[i].speed = min(maxSpeed, karts[i].speed)
        integrate(i, dt: dt)
        maybeAIUseItem(i, now: nowT)
    }

    private func integrate(_ i: Int, dt: CGFloat) {
        karts[i].position.x += cos(karts[i].angle) * karts[i].speed * dt
        karts[i].position.y += sin(karts[i].angle) * karts[i].speed * dt
    }

    private func applyWorldForces(_ i: Int, dt: CGFloat, track: TrackDefinition, now: Date) {
        let nowT = now.timeIntervalSinceReferenceDate
        let dist = track.distanceFromCenter(at: karts[i].position, around: karts[i].progress)
        let half = track.width * 0.5
        if dist > half {
            karts[i].offroadFactor = 0.55
            karts[i].speed *= max(0.2, 1 - 1.6 * dt)
            // Soft push back toward track
            let center = track.sample(progress: karts[i].progress).position
            let vx = center.x - karts[i].position.x
            let vy = center.y - karts[i].position.y
            let len = max(1, hypot(vx, vy))
            karts[i].position.x += (vx / len) * 40 * dt
            karts[i].position.y += (vy / len) * 40 * dt
        } else {
            karts[i].offroadFactor = 1
        }

        for slick in slicks where nowT < slick.expiresAt {
            if hypot(karts[i].position.x - slick.position.x, karts[i].position.y - slick.position.y) < 28 {
                if nowT > karts[i].shieldUntil {
                    karts[i].spinUntil = nowT + 0.9
                    karts[i].speed *= 0.4
                }
            }
        }
    }

    private func updateProgressAndLaps(_ i: Int, track: TrackDefinition) {
        let previous = karts[i].progress
        let nearest = track.nearestProgress(to: karts[i].position, around: previous)

        var delta = nearest - previous
        if delta < -0.5 {
            karts[i].lap += 1
            if karts[i].isPlayer {
                UIImpactFeedbackGenerator(style: .soft).impactOccurred()
            }
            if karts[i].lap > track.lapCount {
                karts[i].lap = track.lapCount
                karts[i].progress = 0.999
                assignFinish(i)
                return
            }
        } else if delta > 0.5 {
            karts[i].progress = nearest
            return
        }
        karts[i].progress = nearest
    }

    private func assignFinish(_ i: Int) {
        guard !karts[i].finished else { return }
        karts[i].finished = true
        karts[i].speed = 0
        let place = places.count + 1
        karts[i].finishPlace = place
        places.append(karts[i].id)
        finishTimes[karts[i].id] = raceTime
        if karts[i].isPlayer {
            UINotificationFeedbackGenerator().notificationOccurred(.success)
        }
    }

    private func makeItemBoxes(on track: TrackDefinition) -> [ItemBox] {
        let slots: [CGFloat] = [0.18, 0.37, 0.55, 0.73, 0.90]
        return slots.map { p in
            ItemBox(id: UUID(), progress: p, availableAt: 0)
        }
    }

    private func updateItems(dt: CGFloat, now: Date, track: TrackDefinition) {
        let nowT = now.timeIntervalSinceReferenceDate
        for i in karts.indices {
            guard !karts[i].finished, karts[i].heldItem == nil else { continue }
            for b in itemBoxes.indices {
                guard nowT >= itemBoxes[b].availableAt else { continue }
                let pos = track.sample(progress: itemBoxes[b].progress).position
                if hypot(karts[i].position.x - pos.x, karts[i].position.y - pos.y) < 26 {
                    let roll = PowerUpKind.allCases.randomElement() ?? .boost
                    // Luck biases toward boost/shield
                    if Double.random(in: 0...1) < karts[i].profile.luck * 0.25 {
                        karts[i].heldItem = Bool.random() ? .boost : .bagShield
                    } else {
                        karts[i].heldItem = roll
                    }
                    itemBoxes[b].availableAt = nowT + 4.5
                    if karts[i].isPlayer {
                        UIImpactFeedbackGenerator(style: .light).impactOccurred()
                    }
                    break
                }
            }
        }
        _ = dt
    }

    private func activate(item: PowerUpKind, for i: Int) {
        let nowT = Date().timeIntervalSinceReferenceDate
        switch item {
        case .boost:
            karts[i].boostUntil = nowT + 1.4
            karts[i].speed = max(karts[i].speed, 180 * karts[i].profile.speed)
        case .slick:
            let behind = CGPoint(
                x: karts[i].position.x - cos(karts[i].angle) * 40,
                y: karts[i].position.y - sin(karts[i].angle) * 40
            )
            slicks.append(SlickSpot(id: UUID(), position: behind, expiresAt: nowT + 6))
        case .canToss:
            projectiles.append(
                Projectile(
                    id: UUID(),
                    position: karts[i].position,
                    velocity: CGVector(dx: cos(karts[i].angle) * 260, dy: sin(karts[i].angle) * 260),
                    ownerID: karts[i].id,
                    expiresAt: nowT + 1.6
                )
            )
        case .bagShield:
            karts[i].shieldUntil = nowT + 3.2
        }
    }

    private func maybeAIUseItem(_ i: Int, now _: TimeInterval) {
        guard let item = karts[i].heldItem else { return }
        let myMetric = karts[i].raceMetric
        let leader = standings.first?.raceMetric ?? myMetric
        let behind = myMetric + 0.04 < leader
        let roll = Double.random(in: 0...1)

        let shouldUse: Bool
        switch item {
        case .boost:
            shouldUse = behind && roll < 0.04
        case .bagShield:
            shouldUse = roll < 0.015
        case .slick:
            shouldUse = roll < 0.02
        case .canToss:
            shouldUse = roll < 0.025
        }

        if shouldUse {
            activate(item: item, for: i)
            karts[i].heldItem = nil
        }
    }

    private func updateProjectiles(dt: CGFloat, now: Date) {
        let nowT = now.timeIntervalSinceReferenceDate
        for p in projectiles.indices {
            projectiles[p].position.x += projectiles[p].velocity.dx * dt
            projectiles[p].position.y += projectiles[p].velocity.dy * dt
        }

        for p in projectiles where nowT < p.expiresAt {
            for i in karts.indices where karts[i].id != p.ownerID && !karts[i].finished {
                if hypot(karts[i].position.x - p.position.x, karts[i].position.y - p.position.y) < 24 {
                    if nowT > karts[i].shieldUntil {
                        karts[i].spinUntil = nowT + 1.1
                        karts[i].speed *= 0.35
                    }
                    if let idx = projectiles.firstIndex(where: { $0.id == p.id }) {
                        projectiles[idx].expiresAt = 0
                    }
                }
            }
        }
    }

    private func resolveKartCollisions() {
        guard karts.count > 1 else { return }
        for i in 0..<karts.count {
            for j in (i + 1)..<karts.count {
                let dx = karts[j].position.x - karts[i].position.x
                let dy = karts[j].position.y - karts[i].position.y
                let dist = hypot(dx, dy)
                let minDist: CGFloat = 34
                if dist > 0 && dist < minDist {
                    let push = (minDist - dist) * 0.5
                    let nx = dx / dist
                    let ny = dy / dist
                    karts[i].position.x -= nx * push
                    karts[i].position.y -= ny * push
                    karts[j].position.x += nx * push
                    karts[j].position.y += ny * push
                    karts[i].speed *= 0.92
                    karts[j].speed *= 0.92
                }
            }
        }
    }

    private func cleanupExpired(now: Date) {
        let nowT = now.timeIntervalSinceReferenceDate
        slicks.removeAll { $0.expiresAt < nowT }
        projectiles.removeAll { $0.expiresAt < nowT }
    }
}
