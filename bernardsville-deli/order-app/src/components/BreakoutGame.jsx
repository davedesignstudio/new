import { createSignal, onCleanup, onMount, Show } from 'solid-js';
import { useCart } from '../store/cart';
import {
  CANVAS_W,
  CANVAS_H,
  BRICK_KINDS,
  createState,
  launchBall,
  movePaddle,
  nextLevel,
  step,
  bricksLeft,
  loadHighScore,
  saveHighScore,
} from '../game/breakout';
import { formatPrice } from '../data/menu';
import '../game/game.css';

const OVEN = '/assets/photos/stone-oven.jpg';
const prizePrice = (score) => 8.95 + Math.min(6, Math.floor(score / 200));

let audioCtx;

function blip(freq, dur = 0.06) {
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    audioCtx = audioCtx || new Ctx();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.frequency.value = freq;
    osc.type = 'square';
    gain.gain.value = 0.05;
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + dur);
    osc.stop(audioCtx.currentTime + dur);
  } catch {
    /* ignore autoplay limits */
  }
}

function drawMozzarella(ctx, x, y, r) {
  const g = ctx.createRadialGradient(x - r * 0.3, y - r * 0.35, r * 0.15, x, y, r);
  g.addColorStop(0, '#fffaf0');
  g.addColorStop(0.55, '#f3e6b8');
  g.addColorStop(1, '#d4b56a');
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = g;
  ctx.fill();
  ctx.strokeStyle = '#c9a227';
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.fillStyle = 'rgba(201, 162, 39, 0.35)';
  ctx.beginPath();
  ctx.arc(x + r * 0.2, y + r * 0.15, r * 0.22, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(x - r * 0.25, y + r * 0.05, r * 0.14, 0, Math.PI * 2);
  ctx.fill();
}

function drawPeel(ctx, paddle) {
  const { x, y, w, h } = paddle;
  ctx.fillStyle = '#5c3a1e';
  ctx.strokeStyle = '#c9a227';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, 8);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = '#f3e6b8';
  ctx.fillRect(x + 8, y + 4, w - 16, 3);
}

function drawBrick(ctx, brick) {
  if (!brick.alive) return;
  const spec = BRICK_KINDS[brick.kind];
  ctx.fillStyle = brick.hp > 1 ? '#fff4d0' : spec.fill;
  ctx.strokeStyle = spec.stroke;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(brick.x, brick.y, brick.w, brick.h, 4);
  ctx.fill();
  ctx.stroke();
  if (brick.kind === 'pepperoni') {
    ctx.fillStyle = '#6b1c00';
    ctx.beginPath();
    ctx.arc(brick.x + brick.w / 2, brick.y + brick.h / 2, 5, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawFrame(ctx, state, oven) {
  ctx.clearRect(0, 0, state.w, state.h);
  if (oven && oven.complete && oven.naturalWidth) {
    ctx.drawImage(oven, 0, 0, state.w, state.h);
    ctx.fillStyle = 'rgba(18, 8, 4, 0.62)';
    ctx.fillRect(0, 0, state.w, state.h);
  } else {
    ctx.fillStyle = '#1a0e08';
    ctx.fillRect(0, 0, state.w, state.h);
  }

  ctx.strokeStyle = 'rgba(201, 162, 39, 0.45)';
  ctx.lineWidth = 3;
  ctx.strokeRect(6, 6, state.w - 12, state.h - 12);

  for (const brick of state.bricks) drawBrick(ctx, brick);
  drawPeel(ctx, state.paddle);
  drawMozzarella(ctx, state.ball.x, state.ball.y, state.ball.r);

  ctx.fillStyle = '#f8f4ee';
  ctx.font = '10px "Press Start 2P", monospace';
  ctx.fillText(`LV ${state.level}`, 16, 28);
  ctx.fillText(`${bricksLeft(state)} LEFT`, state.w - 148, 28);
}

export default function BreakoutGame() {
  const cart = useCart();
  const [started, setStarted] = createSignal(false);
  const [hud, setHud] = createSignal({
    score: 0,
    lives: 3,
    level: 1,
    status: 'ready',
    left: 0,
  });
  const [high, setHigh] = createSignal(0);
  let canvas;
  let state = createState(1);
  let ovenImg;
  let raf = 0;
  let last = 0;
  const keys = { left: false, right: false };

  const syncHud = () => {
    setHud({
      score: state.score,
      lives: state.lives,
      level: state.level,
      status: state.status,
      left: bricksLeft(state),
    });
  };

  const pointerToWorld = (event) => {
    const rect = canvas.getBoundingClientRect();
    const clientX = event.touches ? event.touches[0].clientX : event.clientX;
    return ((clientX - rect.left) / rect.width) * CANVAS_W;
  };

  const loop = (now) => {
    const dt = Math.min(32, now - last || 16) / 16;
    last = now;
    if (keys.left || keys.right) {
      const dir = (keys.left ? -1 : 0) + (keys.right ? 1 : 0);
      state = movePaddle(state, state.paddle.x + state.paddle.w / 2 + dir * 9 * dt);
    }
    const before = state;
    state = step(state, dt);
    if (state.score !== before.score) blip(660, 0.04);
    if (state.status === 'ready' && before.status === 'playing') blip(180, 0.12);
    if (state.status === 'won' && before.status !== 'won') {
      setHigh(saveHighScore(state.score));
      blip(880, 0.2);
    }
    if (state.status === 'lost' && before.status !== 'lost') {
      setHigh(saveHighScore(state.score));
      blip(110, 0.25);
    }
    const ctx = canvas.getContext('2d');
    drawFrame(ctx, state, ovenImg);
    syncHud();
    raf = requestAnimationFrame(loop);
  };

  const start = () => {
    state = createState(1);
    setStarted(true);
    syncHud();
    last = performance.now();
  };

  const serveOrAdvance = () => {
    if (state.status === 'ready') {
      state = launchBall(state);
      blip(440, 0.05);
      return;
    }
    if (state.status === 'won') {
      state = nextLevel(state);
      syncHud();
    }
  };

  const reset = () => {
    state = createState(1);
    setStarted(true);
    syncHud();
  };

  const addPrize = () => {
    cart.addCustomItem(`Breakout pie (${state.score} pts)`, prizePrice(state.score));
  };

  onMount(() => {
    setHigh(loadHighScore());
    ovenImg = new Image();
    ovenImg.src = OVEN;
    const onKey = (event) => {
      if (event.key === 'ArrowLeft' || event.key === 'a') keys.left = event.type === 'keydown';
      if (event.key === 'ArrowRight' || event.key === 'd') keys.right = event.type === 'keydown';
      if (event.type === 'keydown' && (event.key === ' ' || event.key === 'Enter')) {
        event.preventDefault();
        if (!started()) start();
        else serveOrAdvance();
      }
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('keyup', onKey);
    onCleanup(() => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('keyup', onKey);
      cancelAnimationFrame(raf);
    });
  });

  const bindCanvas = (el) => {
    canvas = el;
    if (!el) {
      cancelAnimationFrame(raf);
      return;
    }
    const ctx = el.getContext('2d');
    if (ctx && typeof ctx.roundRect !== 'function') {
      ctx.roundRect = function roundRect(x, y, w, h, r) {
        const rad = Math.min(r, w / 2, h / 2);
        this.beginPath();
        this.moveTo(x + rad, y);
        this.arcTo(x + w, y, x + w, y + h, rad);
        this.arcTo(x + w, y + h, x, y + h, rad);
        this.arcTo(x, y + h, x, y, rad);
        this.arcTo(x, y, x + w, y, rad);
        this.closePath();
      };
    }
    cancelAnimationFrame(raf);
    last = performance.now();
    raf = requestAnimationFrame(loop);
  };

  return (
    <section
      id="breakout"
      class="pizza-game-section pizza-game-section--sega breakout-section fresco-maiolica fresco-grain"
      aria-labelledby="breakout-heading"
    >
      <div class="container">
        <header class="game-header">
          <h2 id="breakout-heading">Mozzarella Breakout</h2>
          <p class="game-intro">
            Bounce a mozzarella off the peel. Clear the sauce, basil, and pepperoni bricks
            in the stone oven.
          </p>
          <Show when={high() > 0}>
            <p class="game-high-score">HI-SCORE: {high()}</p>
          </Show>
        </header>

        <Show when={!started()}>
          <div class="game-lobby fresco-card-bg game-lobby--sega">
            <p class="game-phone-tagline game-phone-tagline--retro">INSERT COIN</p>
            <p class="game-lobby-desc">
              Move with the mouse, finger, or ← →. Space or click serves the ball.
              Clear a board to keep the combo going.
            </p>
            <button type="button" class="btn-game-action btn-game-start btn-game-press-start" onClick={start}>
              ▶ PRESS START
            </button>
          </div>
        </Show>

        <Show when={started()}>
          <div class="game-sega-hud" aria-live="polite">
            <div class="game-hud-cell">
              <span class="game-hud-label">SCORE</span>
              <span class="game-hud-value">{hud().score}</span>
            </div>
            <div class="game-hud-cell">
              <span class="game-hud-label">LEVEL</span>
              <span class="game-hud-value">{hud().level}</span>
            </div>
            <div class="game-hud-cell">
              <span class="game-hud-label">LEFT</span>
              <span class="game-hud-value">{hud().left}</span>
            </div>
            <div class="game-hud-cell">
              <span class="game-hud-label">LIVES</span>
              <span class="game-hud-value">{'♥'.repeat(Math.max(0, hud().lives))}</span>
            </div>
          </div>

          <div class="breakout-cabinet game-board--sega">
            <div class="game-scanlines" aria-hidden="true" />
            <canvas
              ref={bindCanvas}
              class="breakout-canvas"
              width={CANVAS_W}
              height={CANVAS_H}
              role="img"
              aria-label="Mozzarella Breakout playfield"
              onMouseMove={(event) => {
                state = movePaddle(state, pointerToWorld(event));
              }}
              onClick={serveOrAdvance}
              onTouchStart={(event) => {
                state = movePaddle(state, pointerToWorld(event));
                serveOrAdvance();
              }}
              onTouchMove={(event) => {
                event.preventDefault();
                state = movePaddle(state, pointerToWorld(event));
              }}
            />
            <Show when={hud().status === 'ready'}>
              <p class="breakout-banner">CLICK / SPACE TO SERVE</p>
            </Show>
            <Show when={hud().status === 'won'}>
              <div class="breakout-banner breakout-banner--win">
                <p>OVEN CLEAR — LEVEL {hud().level}</p>
                <button type="button" class="btn-game-action" onClick={serveOrAdvance}>
                  Next pie
                </button>
                <button type="button" class="btn-game-action btn-game-start" onClick={addPrize}>
                  Add pie to cart — {formatPrice(prizePrice(hud().score))}
                </button>
              </div>
            </Show>
            <Show when={hud().status === 'lost'}>
              <div class="breakout-banner breakout-banner--lose">
                <p>BALL IN THE ASHES</p>
                <button type="button" class="btn-game-action btn-game-press-start" onClick={reset}>
                  Play again
                </button>
              </div>
            </Show>
          </div>
        </Show>
      </div>
    </section>
  );
}
