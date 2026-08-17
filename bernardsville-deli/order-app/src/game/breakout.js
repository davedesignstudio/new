/** Mozzarella Breakout — pizza-themed brick breaker. */

export const CANVAS_W = 720;
export const CANVAS_H = 480;
export const PADDLE_W = 118;
export const PADDLE_H = 16;
export const BALL_R = 10;
export const STARTING_LIVES = 3;
export const HI_SCORE_KEY = 'bville-breakout-hi';

export const BRICK_KINDS = {
  tomato: { fill: '#b42318', stroke: '#7a140e', points: 10, hp: 1, label: 'sauce' },
  pepperoni: { fill: '#8b2500', stroke: '#5c1800', points: 20, hp: 1, label: 'pepperoni' },
  basil: { fill: '#3a6b35', stroke: '#244422', points: 15, hp: 1, label: 'basil' },
  mozzarella: { fill: '#f3e6b8', stroke: '#c9a227', points: 40, hp: 2, label: 'mozz' },
};

const ROW_KINDS = ['mozzarella', 'basil', 'pepperoni', 'tomato', 'pepperoni', 'tomato'];

export function loadHighScore() {
  try {
    const n = Number(localStorage.getItem(HI_SCORE_KEY));
    return Number.isFinite(n) ? n : 0;
  } catch {
    return 0;
  }
}

export function saveHighScore(score) {
  const prev = loadHighScore();
  if (score > prev) {
    try {
      localStorage.setItem(HI_SCORE_KEY, String(score));
    } catch {
      /* ignore quota */
    }
    return score;
  }
  return prev;
}

export function createBricks(level = 1) {
  const cols = 10;
  const rows = Math.min(5 + level, 6);
  const gutter = 8;
  const top = 56;
  const side = 16;
  const bw = (CANVAS_W - side * 2 - gutter * (cols - 1)) / cols;
  const bh = 22;
  const bricks = [];
  for (let r = 0; r < rows; r++) {
    const kind = ROW_KINDS[r % ROW_KINDS.length];
    const spec = BRICK_KINDS[kind];
    for (let c = 0; c < cols; c++) {
      bricks.push({
        x: side + c * (bw + gutter),
        y: top + r * (bh + gutter),
        w: bw,
        h: bh,
        kind,
        hp: spec.hp,
        points: spec.points,
        alive: true,
      });
    }
  }
  return bricks;
}

export function createState(level = 1) {
  const paddle = {
    x: (CANVAS_W - PADDLE_W) / 2,
    y: CANVAS_H - 42,
    w: Math.max(86, PADDLE_W - (level - 1) * 10),
    h: PADDLE_H,
  };
  return {
    w: CANVAS_W,
    h: CANVAS_H,
    level,
    lives: STARTING_LIVES,
    score: 0,
    status: 'ready',
    paddle,
    ball: serveBall(paddle),
    bricks: createBricks(level),
    combo: 0,
  };
}

export function serveBall(paddle) {
  return {
    x: paddle.x + paddle.w / 2,
    y: paddle.y - BALL_R - 1,
    vx: 0,
    vy: 0,
    r: BALL_R,
    stuck: true,
  };
}

export function launchBall(state) {
  if (!state.ball.stuck || state.status === 'won' || state.status === 'lost') return state;
  const dir = Math.random() < 0.5 ? -1 : 1;
  const speed = 5.1 + (state.level - 1) * 0.45;
  return {
    ...state,
    status: 'playing',
    ball: {
      ...state.ball,
      stuck: false,
      vx: dir * speed * 0.55,
      vy: -speed,
    },
  };
}

export function movePaddle(state, x) {
  const half = state.paddle.w / 2;
  const nx = Math.max(half, Math.min(state.w - half, x));
  const paddle = { ...state.paddle, x: nx - half };
  let ball = state.ball;
  if (ball.stuck) {
    ball = { ...ball, x: paddle.x + paddle.w / 2, y: paddle.y - ball.r - 1 };
  }
  return { ...state, paddle, ball };
}

function circleRectOverlap(cx, cy, r, rx, ry, rw, rh) {
  const nx = Math.max(rx, Math.min(cx, rx + rw));
  const ny = Math.max(ry, Math.min(cy, ry + rh));
  const dx = cx - nx;
  const dy = cy - ny;
  return dx * dx + dy * dy <= r * r;
}

export function bounceFromPaddle(ball, paddle) {
  const hit = (ball.x - (paddle.x + paddle.w / 2)) / (paddle.w / 2);
  const clamped = Math.max(-1, Math.min(1, hit));
  const speed = Math.max(5, Math.hypot(ball.vx, ball.vy));
  const angle = (-Math.PI / 2) + clamped * (Math.PI / 3);
  return {
    ...ball,
    x: ball.x,
    y: paddle.y - ball.r - 0.5,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
  };
}

// #region agent log
const __dbgBrickPrev = { hitIndex: -1, vx: 0, vy: 0, stillOverlap: false, streak: 0, flips: 0 };
function __dbgBreakoutLog(hypothesisId, location, message, data) {
  const payload = {
    hypothesisId,
    location,
    message,
    data,
    timestamp: Date.now(),
    runId: 'pre-fix',
  };
  // eslint-disable-next-line no-console
  console.warn('[BREAKOUT-DBG]', message, data);
  try {
    if (typeof fetch === 'function') {
      fetch('http://127.0.0.1:7243/ingest/c2f0a0e0-breakout-dbg', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': 'breakout-loop' },
        body: JSON.stringify(payload),
      }).catch(() => {});
    }
  } catch {
    /* ignore */
  }
  try {
    if (typeof require === 'function') {
      require('fs').appendFileSync(
        '/opt/cursor/logs/debug.log',
        JSON.stringify(payload) + '\n'
      );
    }
  } catch {
    /* browser — fall through to localStorage ring */
  }
  try {
    if (typeof localStorage !== 'undefined') {
      const key = '__breakout_dbg_logs';
      const prev = JSON.parse(localStorage.getItem(key) || '[]');
      prev.push(payload);
      while (prev.length > 200) prev.shift();
      localStorage.setItem(key, JSON.stringify(prev));
    }
    if (typeof window !== 'undefined') {
      window.__BREAKOUT_DBG_DUMP__ = () => {
        try {
          return JSON.parse(localStorage.getItem('__breakout_dbg_logs') || '[]');
        } catch {
          return [];
        }
      };
      window.__BREAKOUT_DBG_CLEAR__ = () => {
        try {
          localStorage.removeItem('__breakout_dbg_logs');
        } catch {
          /* ignore */
        }
      };
    }
  } catch {
    /* ignore */
  }
}
// #endregion

export function step(state, dtScale = 1) {
  if (state.status !== 'playing' || state.ball.stuck) return state;

  let { ball, paddle, bricks, score, lives, combo } = state;
  let vx = ball.vx * dtScale;
  let vy = ball.vy * dtScale;
  let x = ball.x + vx;
  let y = ball.y + vy;
  const r = ball.r;
  // #region agent log
  const __prePos = { x: ball.x, y: ball.y, vx: ball.vx, vy: ball.vy, dtScale };
  // #endregion

  if (x - r < 0) {
    x = r;
    vx = Math.abs(vx);
  } else if (x + r > state.w) {
    x = state.w - r;
    vx = -Math.abs(vx);
  }
  if (y - r < 0) {
    y = r;
    vy = Math.abs(vy);
  }

  // Nudge a flat bounce so the ball can find a way out of a wall trap.
  // #region agent log
  let __nudgeVy = false;
  let __nudgeVx = false;
  // #endregion
  if (Math.abs(vy) < 1.6) {
    // #region agent log
    __nudgeVy = true;
    // #endregion
    vy = vy <= 0 ? -2.4 : 2.4;
  }
  if (Math.abs(vx) < 0.4) {
    // #region agent log
    __nudgeVx = true;
    // #endregion
    vx = (x < state.w / 2 ? 1 : -1) * 1.8;
  }

  ball = { ...ball, x, y, vx, vy };

  if (vy > 0 && circleRectOverlap(ball.x, ball.y, r, paddle.x, paddle.y, paddle.w, paddle.h)) {
    ball = bounceFromPaddle(ball, paddle);
    combo = 0;
  }

  let hitIndex = -1;
  for (let i = 0; i < bricks.length; i++) {
    const b = bricks[i];
    if (!b.alive) continue;
    if (circleRectOverlap(ball.x, ball.y, r, b.x, b.y, b.w, b.h)) {
      hitIndex = i;
      break;
    }
  }

  if (hitIndex !== -1) {
    const b = bricks[hitIndex];
    const overlapLeft = ball.x + r - b.x;
    const overlapRight = b.x + b.w - (ball.x - r);
    const overlapTop = ball.y + r - b.y;
    const overlapBottom = b.y + b.h - (ball.y - r);
    const minX = Math.min(overlapLeft, overlapRight);
    const minY = Math.min(overlapTop, overlapBottom);
    // #region agent log
    const __vxBefore = ball.vx;
    const __vyBefore = ball.vy;
    const __axis = minX < minY ? 'x' : 'y';
    // #endregion
    if (minX < minY) {
      ball = { ...ball, vx: -ball.vx };
    } else {
      ball = { ...ball, vy: -ball.vy };
    }
    const hp = b.hp - 1;
    const alive = hp > 0;
    combo += 1;
    const gained = alive ? 0 : b.points + Math.max(0, combo - 1) * 2;
    score += gained;
    bricks = bricks.map((brick, i) =>
      i === hitIndex ? { ...brick, hp, alive } : brick
    );
    // #region agent log
    const stillOverlap = circleRectOverlap(ball.x, ball.y, r, b.x, b.y, b.w, b.h);
    const sameBrick = __dbgBrickPrev.hitIndex === hitIndex;
    const flippedVx = sameBrick && Math.sign(__vxBefore) !== 0 && Math.sign(ball.vx) === -Math.sign(__dbgBrickPrev.vx);
    const flippedVy = sameBrick && Math.sign(__vyBefore) !== 0 && Math.sign(ball.vy) === -Math.sign(__dbgBrickPrev.vy);
    const oscillating =
      sameBrick &&
      __dbgBrickPrev.stillOverlap &&
      stillOverlap &&
      (flippedVx || flippedVy || Math.sign(ball.vx) !== Math.sign(__vxBefore) || Math.sign(ball.vy) !== Math.sign(__vyBefore));
    if (sameBrick && stillOverlap) {
      __dbgBrickPrev.streak += 1;
      if (flippedVx || flippedVy || Math.sign(ball.vx) !== Math.sign(__vxBefore) || Math.sign(ball.vy) !== Math.sign(__vyBefore)) {
        __dbgBrickPrev.flips += 1;
      }
    } else {
      __dbgBrickPrev.streak = stillOverlap ? 1 : 0;
      __dbgBrickPrev.flips = 0;
    }
    __dbgBrickPrev.hitIndex = hitIndex;
    __dbgBrickPrev.vx = ball.vx;
    __dbgBrickPrev.vy = ball.vy;
    __dbgBrickPrev.stillOverlap = stillOverlap;
    if (stillOverlap || oscillating || __dbgBrickPrev.streak >= 2 || __nudgeVx || __nudgeVy) {
      __dbgBreakoutLog(
        oscillating || __dbgBrickPrev.streak >= 3 ? 'A' : alive && stillOverlap ? 'B' : __nudgeVx || __nudgeVy ? 'C' : 'A',
        'breakout.js:step:brickHit',
        '[BREAKOUT-DBG] brick hit — post-bounce overlap check',
        {
          hitIndex,
          kind: b.kind,
          hpBefore: b.hp,
          hpAfter: hp,
          alive,
          axis: __axis,
          minX,
          minY,
          prePos: __prePos,
          postPos: { x: ball.x, y: ball.y, vx: ball.vx, vy: ball.vy },
          vxBefore: __vxBefore,
          vyBefore: __vyBefore,
          stillOverlap,
          sameBrick,
          oscillating,
          streak: __dbgBrickPrev.streak,
          flips: __dbgBrickPrev.flips,
          nudgeVx: __nudgeVx,
          nudgeVy: __nudgeVy,
          noSeparation: true,
        }
      );
    }
    // #endregion
  } else {
    // #region agent log
    if (__dbgBrickPrev.streak > 0) {
      __dbgBreakoutLog('A', 'breakout.js:step:noHit', '[BREAKOUT-DBG] overlap streak ended', {
        prevHitIndex: __dbgBrickPrev.hitIndex,
        streak: __dbgBrickPrev.streak,
        flips: __dbgBrickPrev.flips,
        pos: { x: ball.x, y: ball.y, vx: ball.vx, vy: ball.vy },
      });
    }
    __dbgBrickPrev.hitIndex = -1;
    __dbgBrickPrev.stillOverlap = false;
    __dbgBrickPrev.streak = 0;
    __dbgBrickPrev.flips = 0;
    // #endregion
  }

  const remaining = bricks.some((b) => b.alive);
  if (!remaining) {
    return {
      ...state,
      ball,
      bricks,
      score,
      combo,
      status: 'won',
    };
  }

  if (ball.y - r > state.h) {
    lives -= 1;
    if (lives <= 0) {
      return {
        ...state,
        lives: 0,
        ball,
        bricks,
        score,
        combo: 0,
        status: 'lost',
      };
    }
    const nextPaddle = { ...paddle, x: (state.w - paddle.w) / 2 };
    return {
      ...state,
      lives,
      paddle: nextPaddle,
      ball: serveBall(nextPaddle),
      bricks,
      score,
      combo: 0,
      status: 'ready',
    };
  }

  return { ...state, ball, bricks, score, combo };
}

export function nextLevel(state) {
  const level = state.level + 1;
  const fresh = createState(level);
  return {
    ...fresh,
    lives: state.lives,
    score: state.score,
  };
}

export function bricksLeft(state) {
  return state.bricks.filter((b) => b.alive).length;
}
