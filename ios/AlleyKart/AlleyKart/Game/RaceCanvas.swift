import SwiftUI

struct RaceCanvas: View {
    @ObservedObject var model: RaceModel
    let viewport: CGSize

    var body: some View {
        TimelineView(.animation(minimumInterval: 1.0 / 60.0, paused: !(model.screen == .racing || model.screen == .countdown))) { timeline in
            Canvas { context, size in
                drawWorld(context: &context, size: size)
            }
            .onChange(of: timeline.date) { _, date in
                model.tick(now: date)
            }
        }
        .allowsHitTesting(false)
    }

    private func worldToScreen(_ point: CGPoint, size: CGSize) -> CGPoint {
        let zoom: CGFloat = 1.15
        return CGPoint(
            x: size.width * 0.5 + (point.x - model.camera.x) * zoom,
            y: size.height * 0.55 + (point.y - model.camera.y) * zoom
        )
    }

    private func drawWorld(context: inout GraphicsContext, size: CGSize) {
        // Ground
        context.fill(
            Path(CGRect(origin: .zero, size: size)),
            with: .linearGradient(
                Gradient(colors: [
                    Color(red: 0.20, green: 0.38, blue: 0.26),
                    Color(red: 0.28, green: 0.34, blue: 0.20),
                    Color(red: 0.34, green: 0.30, blue: 0.18)
                ]),
                startPoint: .zero,
                endPoint: CGPoint(x: size.width, y: size.height)
            )
        )

        drawTrack(context: &context, size: size)
        drawSlicks(context: &context, size: size)
        drawItemBoxes(context: &context, size: size)
        drawProjectiles(context: &context, size: size)

        let ordered = model.karts.sorted { $0.position.y < $1.position.y }
        for kart in ordered {
            drawKart(kart, context: &context, size: size)
        }
    }

    private func drawTrack(context: inout GraphicsContext, size: CGSize) {
        let track = model.selectedTrack
        let pts = track.points
        guard pts.count > 2 else { return }

        // Outer curb
        var outer = Path()
        var inner = Path()
        var center = Path()
        let half = track.width * 0.5
        let curb: CGFloat = 10

        for i in 0..<pts.count {
            let p = pts[i]
            let ang = p.angle
            let nx = cos(ang + .pi / 2)
            let ny = sin(ang + .pi / 2)
            let ox = CGPoint(x: p.x + nx * (half + curb), y: p.y + ny * (half + curb))
            let ix = CGPoint(x: p.x - nx * (half + curb), y: p.y - ny * (half + curb))
            let o = worldToScreen(ox, size: size)
            let inn = worldToScreen(ix, size: size)
            let c = worldToScreen(CGPoint(x: p.x, y: p.y), size: size)
            if i == 0 {
                outer.move(to: o)
                inner.move(to: inn)
                center.move(to: c)
            } else {
                outer.addLine(to: o)
                inner.addLine(to: inn)
                center.addLine(to: c)
            }
        }
        outer.closeSubpath()
        inner.closeSubpath()
        center.closeSubpath()

        context.fill(outer, with: .color(AlleyTheme.curb.opacity(0.9)))
        context.fill(inner, with: .color(AlleyTheme.grass.opacity(0.35)))

        // Asphalt band approximated by stroking center with thick line
        context.stroke(
            center,
            with: .color(AlleyTheme.asphalt),
            style: StrokeStyle(lineWidth: track.width * 1.15, lineCap: .round, lineJoin: .round)
        )
        context.stroke(
            center,
            with: .color(AlleyTheme.asphaltLight.opacity(0.35)),
            style: StrokeStyle(lineWidth: 2, dash: [16, 18])
        )

        // Start/finish
        let start = track.sample(progress: 0)
        let sx = cos(start.angle + .pi / 2)
        let sy = sin(start.angle + .pi / 2)
        let a = worldToScreen(CGPoint(x: start.position.x + sx * half, y: start.position.y + sy * half), size: size)
        let b = worldToScreen(CGPoint(x: start.position.x - sx * half, y: start.position.y - sy * half), size: size)
        var finish = Path()
        finish.move(to: a)
        finish.addLine(to: b)
        context.stroke(finish, with: .color(.white.opacity(0.85)), style: StrokeStyle(lineWidth: 5, dash: [8, 6]))
    }

    private func drawItemBoxes(context: inout GraphicsContext, size: CGSize) {
        let now = Date().timeIntervalSinceReferenceDate
        for box in model.itemBoxes {
            guard now >= box.availableAt else { continue }
            let pos = model.selectedTrack.sample(progress: box.progress).position
            let screen = worldToScreen(pos, size: size)
            let rect = CGRect(x: screen.x - 12, y: screen.y - 12, width: 24, height: 24)
            context.fill(Path(roundedRect: rect, cornerRadius: 5), with: .color(Color(red: 0.2, green: 0.85, blue: 0.55)))
            context.stroke(Path(roundedRect: rect, cornerRadius: 5), with: .color(.white.opacity(0.8)), lineWidth: 2)
            context.draw(
                Text("?").font(.system(size: 14, weight: .black, design: .rounded)).foregroundColor(.white),
                at: screen,
                anchor: .center
            )
        }
    }

    private func drawSlicks(context: inout GraphicsContext, size: CGSize) {
        for slick in model.slicks {
            let screen = worldToScreen(slick.position, size: size)
            let rect = CGRect(x: screen.x - 18, y: screen.y - 10, width: 36, height: 20)
            context.fill(Path(ellipseIn: rect), with: .color(Color(red: 0.55, green: 0.85, blue: 0.95).opacity(0.75)))
        }
    }

    private func drawProjectiles(context: inout GraphicsContext, size: CGSize) {
        for shot in model.projectiles {
            let screen = worldToScreen(shot.position, size: size)
            context.fill(
                Path(ellipseIn: CGRect(x: screen.x - 6, y: screen.y - 6, width: 12, height: 12)),
                with: .color(Color(red: 0.75, green: 0.78, blue: 0.82))
            )
        }
    }

    private func drawKart(_ kart: KartState, context: inout GraphicsContext, size: CGSize) {
        let screen = worldToScreen(kart.position, size: size)
        var cartContext = context
        cartContext.translateBy(x: screen.x, y: screen.y)
        cartContext.rotate(by: .radians(Double(kart.angle + .pi / 2)))

        // Shadow
        cartContext.fill(
            Path(ellipseIn: CGRect(x: -16, y: 8, width: 32, height: 12)),
            with: .color(.black.opacity(0.25))
        )

        // Basket
        let body = CGRect(x: -16, y: -22, width: 32, height: 34)
        cartContext.fill(Path(roundedRect: body, cornerRadius: 4), with: .color(kart.profile.color))
        cartContext.stroke(Path(roundedRect: body, cornerRadius: 4), with: .color(.white.opacity(0.35)), lineWidth: 1.5)

        // Wire cage look
        for y in stride(from: -16.0, through: 6.0, by: 6.0) {
            var line = Path()
            line.move(to: CGPoint(x: -14, y: y))
            line.addLine(to: CGPoint(x: 14, y: y))
            cartContext.stroke(line, with: .color(.white.opacity(0.2)), lineWidth: 1)
        }

        // Cargo pile
        drawCargo(kart.profile.cargo, in: &cartContext)

        // Wheels
        cartContext.fill(Path(ellipseIn: CGRect(x: -18, y: 8, width: 10, height: 10)), with: .color(.black.opacity(0.8)))
        cartContext.fill(Path(ellipseIn: CGRect(x: 8, y: 8, width: 10, height: 10)), with: .color(.black.opacity(0.8)))
        cartContext.fill(Path(ellipseIn: CGRect(x: -18, y: -20, width: 9, height: 9)), with: .color(.black.opacity(0.75)))
        cartContext.fill(Path(ellipseIn: CGRect(x: 9, y: -20, width: 9, height: 9)), with: .color(.black.opacity(0.75)))

        // Driver blob
        cartContext.fill(
            Path(ellipseIn: CGRect(x: -7, y: -8, width: 14, height: 14)),
            with: .color(kart.profile.accent)
        )

        if Date().timeIntervalSinceReferenceDate < kart.shieldUntil {
            cartContext.stroke(
                Path(ellipseIn: CGRect(x: -24, y: -28, width: 48, height: 48)),
                with: .color(Color.green.opacity(0.7)),
                lineWidth: 3
            )
        }

        if kart.isPlayer {
            var arrow = Path()
            arrow.move(to: CGPoint(x: 0, y: -36))
            arrow.addLine(to: CGPoint(x: -6, y: -28))
            arrow.addLine(to: CGPoint(x: 6, y: -28))
            arrow.closeSubpath()
            cartContext.fill(arrow, with: .color(AlleyTheme.accent))
        }

        // Name tag in screen space
        context.draw(
            Text(kart.profile.name)
                .font(.system(size: 10, weight: .bold, design: .rounded))
                .foregroundColor(.white.opacity(0.9)),
            at: CGPoint(x: screen.x, y: screen.y + 28),
            anchor: .center
        )
    }

    private func drawCargo(_ cargo: [CartCargo], in context: inout GraphicsContext) {
        let offsets: [CGPoint] = [CGPoint(x: -6, y: -14), CGPoint(x: 5, y: -16), CGPoint(x: 0, y: -22)]
        for (index, item) in cargo.prefix(3).enumerated() {
            let o = offsets[index]
            switch item {
            case .cans:
                context.fill(Path(ellipseIn: CGRect(x: o.x - 4, y: o.y - 4, width: 8, height: 10)), with: .color(.gray))
            case .bottles:
                context.fill(Path(roundedRect: CGRect(x: o.x - 2, y: o.y - 6, width: 4, height: 12), cornerRadius: 1), with: .color(Color(red: 0.4, green: 0.7, blue: 0.5)))
            case .sleepingBag:
                context.fill(Path(roundedRect: CGRect(x: o.x - 8, y: o.y - 3, width: 16, height: 7), cornerRadius: 3), with: .color(Color(red: 0.2, green: 0.35, blue: 0.55)))
            case .blanket:
                context.fill(Path(roundedRect: CGRect(x: o.x - 7, y: o.y - 4, width: 14, height: 8), cornerRadius: 2), with: .color(Color(red: 0.7, green: 0.25, blue: 0.25)))
            case .cardboard:
                context.fill(Path(CGRect(x: o.x - 7, y: o.y - 5, width: 14, height: 10)), with: .color(Color(red: 0.72, green: 0.55, blue: 0.28)))
            case .sign:
                context.fill(Path(CGRect(x: o.x - 6, y: o.y - 6, width: 12, height: 9)), with: .color(.white))
            case .plasticBags:
                context.fill(Path(ellipseIn: CGRect(x: o.x - 6, y: o.y - 5, width: 12, height: 10)), with: .color(Color(red: 0.7, green: 0.85, blue: 0.9).opacity(0.85)))
            case .boombox:
                context.fill(Path(roundedRect: CGRect(x: o.x - 7, y: o.y - 5, width: 14, height: 9), cornerRadius: 1), with: .color(Color(red: 0.15, green: 0.15, blue: 0.18)))
            }
        }
    }
}
