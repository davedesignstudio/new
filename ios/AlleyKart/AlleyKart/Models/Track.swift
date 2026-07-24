import Foundation
import CoreGraphics

struct TrackPoint {
    var x: CGFloat
    var y: CGFloat
    var angle: CGFloat
}

struct TrackDefinition {
    let name: String
    let subtitle: String
    let width: CGFloat
    let points: [TrackPoint]
    let lapCount: Int

    var length: CGFloat {
        guard points.count > 1 else { return 0 }
        var total: CGFloat = 0
        for i in 0..<(points.count - 1) {
            let a = points[i]
            let b = points[i + 1]
            total += hypot(b.x - a.x, b.y - a.y)
        }
        let first = points[0]
        let last = points[points.count - 1]
        total += hypot(first.x - last.x, first.y - last.y)
        return total
    }

    func sample(progress: CGFloat) -> (position: CGPoint, angle: CGFloat) {
        let count = points.count
        guard count > 1 else {
            return (.zero, 0)
        }

        var t = progress.truncatingRemainder(dividingBy: 1)
        if t < 0 { t += 1 }

        let scaled = t * CGFloat(count)
        let i0 = Int(floor(scaled)) % count
        let i1 = (i0 + 1) % count
        let local = scaled - floor(scaled)

        let p0 = points[i0]
        let p1 = points[i1]
        let x = p0.x + (p1.x - p0.x) * local
        let y = p0.y + (p1.y - p0.y) * local

        var a0 = p0.angle
        var a1 = p1.angle
        var delta = a1 - a0
        while delta > .pi { delta -= 2 * .pi }
        while delta < -.pi { delta += 2 * .pi }
        let angle = a0 + delta * local
        return (CGPoint(x: x, y: y), angle)
    }

    func nearestProgress(to point: CGPoint, around hint: CGFloat? = nil) -> CGFloat {
        if let hint {
            var best = hint
            var bestDist = CGFloat.greatestFiniteMagnitude
            // Local window search for runtime performance
            for i in -18...18 {
                var p = hint + CGFloat(i) * 0.004
                p = p.truncatingRemainder(dividingBy: 1)
                if p < 0 { p += 1 }
                let sample = sample(progress: p).position
                let d = hypot(sample.x - point.x, sample.y - point.y)
                if d < bestDist {
                    bestDist = d
                    best = p
                }
            }
            // If we drifted far off, fall back to coarse global search
            if bestDist > width {
                return nearestProgressGlobal(to: point)
            }
            return best
        }
        return nearestProgressGlobal(to: point)
    }

    private func nearestProgressGlobal(to point: CGPoint) -> CGFloat {
        var best: CGFloat = 0
        var bestDist = CGFloat.greatestFiniteMagnitude
        let samples = 180
        for i in 0..<samples {
            let p = CGFloat(i) / CGFloat(samples)
            let sample = sample(progress: p).position
            let d = hypot(sample.x - point.x, sample.y - point.y)
            if d < bestDist {
                bestDist = d
                best = p
            }
        }
        return best
    }

    func distanceFromCenter(at point: CGPoint, around hint: CGFloat? = nil) -> CGFloat {
        let p = nearestProgress(to: point, around: hint)
        let center = sample(progress: p).position
        return hypot(point.x - center.x, point.y - center.y)
    }
}

enum Tracks {
    static let underpass: TrackDefinition = makeOvalish(
        name: "Underpass Circuit",
        subtitle: "Three laps under the freeway",
        cx: 520,
        cy: 360,
        rx: 340,
        ry: 220,
        width: 78,
        wobble: 28
    )

    static let soupLine: TrackDefinition = makeFigureEight(
        name: "Soup Line Speedway",
        subtitle: "Don't cut the queue",
        cx: 520,
        cy: 360,
        radius: 210,
        width: 72
    )

    static let all: [TrackDefinition] = [underpass, soupLine]

    private static func makeOvalish(
        name: String,
        subtitle: String,
        cx: CGFloat,
        cy: CGFloat,
        rx: CGFloat,
        ry: CGFloat,
        width: CGFloat,
        wobble: CGFloat
    ) -> TrackDefinition {
        let count = 96
        var points: [TrackPoint] = []
        for i in 0..<count {
            let t = CGFloat(i) / CGFloat(count) * 2 * .pi
            let bump = sin(t * 3) * wobble
            let x = cx + cos(t) * (rx + bump)
            let y = cy + sin(t) * (ry + bump * 0.55)
            let angle = t + .pi / 2
            points.append(TrackPoint(x: x, y: y, angle: angle))
        }
        return TrackDefinition(name: name, subtitle: subtitle, width: width, points: points, lapCount: 3)
    }

    private static func makeFigureEight(
        name: String,
        subtitle: String,
        cx: CGFloat,
        cy: CGFloat,
        radius: CGFloat,
        width: CGFloat
    ) -> TrackDefinition {
        let count = 120
        var points: [TrackPoint] = []
        for i in 0..<count {
            let t = CGFloat(i) / CGFloat(count) * 2 * .pi
            // Lemniscate of Bernoulli-ish
            let scale = radius
            let denom = 1 + sin(t) * sin(t)
            let x = cx + (scale * cos(t)) / denom
            let y = cy + (scale * sin(t) * cos(t)) / denom
            let nextT = t + 0.02
            let nextDenom = 1 + sin(nextT) * sin(nextT)
            let nx = cx + (scale * cos(nextT)) / nextDenom
            let ny = cy + (scale * sin(nextT) * cos(nextT)) / nextDenom
            let angle = atan2(ny - y, nx - x)
            points.append(TrackPoint(x: x, y: y, angle: angle))
        }
        return TrackDefinition(name: name, subtitle: subtitle, width: width, points: points, lapCount: 3)
    }
}
