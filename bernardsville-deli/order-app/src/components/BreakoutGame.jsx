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
  // #region agent log
  let __dbgLoopTicks = 0;
  let __dbgLoopAliveAfterExit = 0;
  let __dbgExited = false;
  const __dbgUiLog = (hypothesisId, location, message, data) => {
    const payload = {
      hypothesisId,
      location,
      message,
      data,
      timestamp: Date.now(),
      runId: 'post-fix',
    };
    // eslint-disable-next-line no-console
    console.warn('[BREAKOUT-DBG]', message, data);
    try {
      fetch('http://127.0.0.1:7243/ingest/c2f0a0e0-breakout-dbg', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': 'breakout-loop' },
        body: JSON.stringify(payload),
      }).catch(() => {});
    } catch {
      /* ignore */
    }
    try {
      const key = '__breakout_dbg_logs';
      const prev = JSON.parse(localStorage.getItem(key) || '[]');
      prev.push(payload);
      while (prev.length > 200) prev.shift();
      localStorage.setItem(key, JSON.stringify(prev));
    } catch {
      /* ignore */
    }
  };
  // #endregion

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
    // #region agent log
    __dbgLoopTicks += 1;
    if (__dbgExited) {
      __dbgLoopAliveAfterExit += 1;
      if (__dbgLoopAliveAfterExit <= 5 || __dbgLoopAliveAfterExit % 60 === 0) {
        __dbgUiLog('D', 'BreakoutGame.jsx:loop:afterExit', '[BREAKOUT-DBG] RAF tick AFTER exitGame', {
          raf,
          hasCanvas: !!canvas,
          started: started(),
          ticksAfterExit: __dbgLoopAliveAfterExit,
          totalTicks: __dbgLoopTicks,
          status: state.status,
        });
      }
    } else if (__dbgLoopTicks <= 3 || __dbgLoopTicks % 120 === 0) {
      __dbgUiLog('D', 'BreakoutGame.jsx:loop', '[BREAKOUT-DBG] RAF tick', {
        raf,
        hasCanvas: !!canvas,
        started: started(),
        totalTicks: __dbgLoopTicks,
        status: state.status,
        ball: state.ball
          ? { x: state.ball.x, y: state.ball.y, vx: state.ball.vx, vy: state.ball.vy, stuck: state.ball.stuck }
          : null,
      });
    }
    // #endregion
    if (!canvas) return;
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
    // #region agent log
    __dbgExited = false;
    __dbgLoopAliveAfterExit = 0;
    __dbgLoopTicks = 0;
    try {
      localStorage.removeItem('__breakout_dbg_logs');
    } catch {
      /* ignore */
    }
    __dbgUiLog('E', 'BreakoutGame.jsx:start', '[BREAKOUT-DBG] start() — lobby → play', {
      rafBefore: raf,
      startedBefore: started(),
    });
    // #endregion
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

  const exitGame = () => {
    // #region agent log
    const rafBefore = raf;
    __dbgExited = true;
    __dbgUiLog('E', 'BreakoutGame.jsx:exitGame:before', '[BREAKOUT-DBG] exitGame() BEFORE cancel', {
      raf: rafBefore,
      hasCanvas: !!canvas,
      started: started(),
      status: state.status,
      score: state.score,
      loopTicks: __dbgLoopTicks,
    });
    // #endregion
    setHigh(saveHighScore(state.score));
    cancelAnimationFrame(raf);
    raf = 0;
    keys.left = false;
    keys.right = false;
    state = createState(1);
    setStarted(false);
    syncHud();
    // #region agent log
    __dbgUiLog('E', 'BreakoutGame.jsx:exitGame:after', '[BREAKOUT-DBG] exitGame() AFTER cancel + setStarted(false)', {
      rafAfter: raf,
      hasCanvas: !!canvas,
      startedSignal: started(),
      status: state.status,
      ticksAfterExitSoFar: __dbgLoopAliveAfterExit,
    });
    // schedule a probe: if RAF keeps firing, loop logs will show ticksAfterExit > 0
    setTimeout(() => {
      __dbgUiLog('E', 'BreakoutGame.jsx:exitGame:probe250ms', '[BREAKOUT-DBG] exitGame() +250ms probe', {
        raf,
        hasCanvas: !!canvas,
        started: started(),
        ticksAfterExit: __dbgLoopAliveAfterExit,
        lobbyVisible: !started(),
      });
    }, 250);
    // #endregion
  };

  const addPrize = () => {
    cart.addCustomItem(`Breakout pie (${state.score} pts)`, prizePrice(state.score));
  };

  onMount(() => {
    setHigh(loadHighScore());
    ovenImg = new Image();
    ovenImg.src = OVEN;
    const onKey = (event) => {
      if (!started()) return;
      if (event.key === 'Escape') {
        if (event.type === 'keydown') {
          event.preventDefault();
          exitGame();
        }
        return;
      }
      if (event.key === 'ArrowLeft' || event.key === 'a') keys.left = event.type === 'keydown';
      if (event.key === 'ArrowRight' || event.key === 'd') keys.right = event.type === 'keydown';
      if (event.type === 'keydown' && (event.key === ' ' || event.key === 'Enter')) {
        event.preventDefault();
        serveOrAdvance();
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
    // #region agent log
    __dbgUiLog('D', 'BreakoutGame.jsx:bindCanvas', '[BREAKOUT-DBG] bindCanvas()', {
      elPresent: !!el,
      rafBefore: raf,
      exited: __dbgExited,
      started: started(),
    });
    // #endregion
    canvas = el;
    if (!el) {
      cancelAnimationFrame(raf);
      // #region agent log
      __dbgUiLog('D', 'BreakoutGame.jsx:bindCanvas:unmount', '[BREAKOUT-DBG] canvas unmount — cancel RAF', {
        rafWas: raf,
      });
      // #endregion
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
    // #region agent log
    __dbgUiLog('D', 'BreakoutGame.jsx:bindCanvas:startRaf', '[BREAKOUT-DBG] canvas mount — RAF started', {
      raf,
    });
    // #endregion
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
              Esc or Exit leaves the oven. Clear a board to keep the combo going.
            </p>
            <div class="breakout-exits">
              <button type="button" class="btn-game-action btn-game-start btn-game-press-start" onClick={start}>
                ▶ PRESS START
              </button>
              <a class="btn-game-action breakout-exit-link" href="#menu">
                Order pizza →
              </a>
            </div>
          </div>
        </Show>

        <Show when={started()}>
          <div class="breakout-exits breakout-exits--play">
            <button type="button" class="btn-game-action breakout-exit" onClick={exitGame}>
              Exit
            </button>
            <a class="btn-game-action breakout-exit-link" href="#menu">
              Order pizza →
            </a>
            <span class="breakout-exit-hint">Esc also leaves</span>
          </div>
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
                <button type="button" class="btn-game-action breakout-exit" onClick={exitGame}>
                  Leave oven
                </button>
              </div>
            </Show>
            <Show when={hud().status === 'lost'}>
              <div class="breakout-banner breakout-banner--lose">
                <p>BALL IN THE ASHES</p>
                <button type="button" class="btn-game-action btn-game-press-start" onClick={reset}>
                  Play again
                </button>
                <button type="button" class="btn-game-action breakout-exit" onClick={exitGame}>
                  Leave oven
                </button>
              </div>
            </Show>
          </div>
        </Show>
      </div>
    </section>
  );
}
