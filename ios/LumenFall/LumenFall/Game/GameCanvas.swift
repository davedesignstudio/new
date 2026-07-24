import SwiftUI

struct GameCanvas: View {
    @ObservedObject var model: GameModel
    let size: CGSize

    var body: some View {
        TimelineView(.animation(minimumInterval: 1.0 / 60.0, paused: model.phase != .playing)) { timeline in
            Canvas { context, canvasSize in
                drawAtmosphere(context: &context, size: canvasSize)
                drawRings(context: &context, size: canvasSize)
                drawBall(context: &context, size: canvasSize)
            }
            .onChange(of: timeline.date) { _, date in
                model.tick(now: date, size: size)
            }
        }
        .allowsHitTesting(false)
    }

    private func drawAtmosphere(context: inout GraphicsContext, size: CGSize) {
        let rect = CGRect(origin: .zero, size: size)

        // Soft radial glow behind the play lane
        let glow = Gradient(colors: [
            LumenTheme.glow.opacity(0.16),
            LumenTheme.amber.opacity(0.05),
            .clear
        ])
        context.fill(
            Path(ellipseIn: CGRect(
                x: size.width * 0.5 - 160,
                y: size.height * 0.28 - 160,
                width: 320,
                height: 320
            )),
            with: .radialGradient(
                glow,
                center: CGPoint(x: size.width * 0.5, y: size.height * 0.34),
                startRadius: 10,
                endRadius: 180
            )
        )

        // Subtle vertical lane
        var lane = Path()
        lane.addRoundedRect(
            in: CGRect(x: size.width * 0.5 - 4, y: 0, width: 8, height: size.height),
            cornerSize: CGSize(width: 4, height: 4)
        )
        context.fill(lane, with: .color(LumenTheme.ink.opacity(0.04)))

        _ = rect
    }

    private func drawRings(context: inout GraphicsContext, size: CGSize) {
        let centerX = size.width * model.ballXRatio

        for ring in model.rings {
            let center = CGPoint(x: centerX, y: ring.y)
            let outer = model.ringRadius
            let inner = outer - model.ringThickness
            let count = ring.segments.count
            let slice = (2 * Double.pi) / Double(count)

            for (index, segment) in ring.segments.enumerated() {
                let start = ring.rotation + Double(index) * slice
                let end = start + slice

                var path = Path()
                path.addArc(
                    center: center,
                    radius: (outer + inner) / 2,
                    startAngle: .radians(start),
                    endAngle: .radians(end),
                    clockwise: false
                )

                context.stroke(
                    path,
                    with: .color(segment.color.opacity(ring.passed ? 0.35 : 0.95)),
                    style: StrokeStyle(lineWidth: model.ringThickness, lineCap: .butt)
                )
            }

            // Inner dark rim for depth
            var rim = Path()
            rim.addEllipse(in: CGRect(
                x: center.x - inner + 2,
                y: center.y - inner + 2,
                width: (inner - 2) * 2,
                height: (inner - 2) * 2
            ))
            context.stroke(rim, with: .color(LumenTheme.deep.opacity(0.55)), lineWidth: 2)
        }
    }

    private func drawBall(context: inout GraphicsContext, size: CGSize) {
        let center = CGPoint(x: size.width * model.ballXRatio, y: model.ballY)
        let r = model.ballRadius

        let halo = Path(ellipseIn: CGRect(
            x: center.x - r * 2.2,
            y: center.y - r * 2.2,
            width: r * 4.4,
            height: r * 4.4
        ))
        context.fill(
            halo,
            with: .radialGradient(
                Gradient(colors: [model.ballColor.color.opacity(0.45), .clear]),
                center: center,
                startRadius: 2,
                endRadius: r * 2.4
            )
        )

        let body = Path(ellipseIn: CGRect(
            x: center.x - r,
            y: center.y - r,
            width: r * 2,
            height: r * 2
        ))
        context.fill(body, with: .color(model.ballColor.color))

        let shine = Path(ellipseIn: CGRect(
            x: center.x - r * 0.55,
            y: center.y - r * 0.7,
            width: r * 0.7,
            height: r * 0.45
        ))
        context.fill(shine, with: .color(.white.opacity(0.35)))
    }
}
