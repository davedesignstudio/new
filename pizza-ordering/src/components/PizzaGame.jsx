import { createSignal, createEffect, onCleanup, For, Show } from 'solid-js';
import { useCart } from '../store/cart';
import { formatPrice } from '../data/menu';
import {
  STAGES,
  STAGE_LABELS,
  TOPPING_OPTIONS,
  KNEAD_TARGET,
  STRETCH_IDEAL,
  BAKE_IDEAL,
  scoreKnead,
  scoreStretch,
  scoreToppings,
  scoreBake,
  totalScore,
  starRating,
  verdict,
} from '../game/pizzaGame';
import '../game/game.css';

function PizzaCanvas(props) {
  const stretch = () => props.stretch ?? 40;
  const baked = () => props.baked ?? false;
  const toppings = () => props.toppings ?? [];

  const radius = () => 28 + (stretch() / 100) * 18;

  return (
    <svg class="game-pizza-svg" viewBox="0 0 100 100" aria-hidden="true">
      <defs>
        <radialGradient id="gameCrust" cx="40%" cy="35%">
          <stop offset="0%" stop-color="#E8C878" />
          <stop offset="100%" stop-color="#C49A30" />
        </radialGradient>
        <radialGradient id="gameSauce" cx="45%" cy="40%">
          <stop offset="0%" stop-color="#D4845C" />
          <stop offset="100%" stop-color="#A03020" />
        </radialGradient>
        <radialGradient id="gameCheese" cx="50%" cy="45%">
          <stop offset="0%" stop-color="#FFF8E0" />
          <stop offset="100%" stop-color="#E8C878" />
        </radialGradient>
      </defs>

      <Show when={props.stage === 'knead'}>
        <ellipse cx="50" cy="58" rx="22" ry="14" fill="#F5EDE0" stroke="#3D2914" stroke-width="1.5" />
        <ellipse cx="50" cy="52" rx="18" ry="10" fill="#EDE4D3" stroke="#3D2914" stroke-width="1" opacity="0.8" />
      </Show>

      <Show when={props.stage !== 'knead'}>
        <circle
          cx="50"
          cy="50"
          r={radius() + 4}
          fill="url(#gameCrust)"
          stroke="#3D2914"
          stroke-width="1.5"
          classList={{ 'game-pizza--baked': baked() }}
        />
        <Show when={props.hasSauce}>
          <circle cx="50" cy="50" r={radius()} fill="url(#gameSauce)" />
        </Show>
        <Show when={props.hasCheese}>
          <circle cx="50" cy="50" r={radius() - 2} fill="url(#gameCheese)" opacity="0.92" />
        </Show>
        <For each={toppings()}>
          {(t) => (
            <g>
              <circle cx={t.x} cy={t.y} r="3.5" fill={t.color} stroke="#3D2914" stroke-width="0.6" />
              <text x={t.x} y={t.y + 1} text-anchor="middle" font-size="4">{t.emoji}</text>
            </g>
          )}
        </For>
        <Show when={baked()}>
          <circle cx="50" cy="50" r={radius() + 4} fill="none" stroke="#C9A227" stroke-width="0.8" opacity="0.5" />
        </Show>
      </Show>
    </svg>
  );
}

export default function PizzaGame() {
  const cart = useCart();

  const [stage, setStage] = createSignal('knead');
  const [kneadClicks, setKneadClicks] = createSignal(0);
  const [stretch, setStretch] = createSignal(45);
  const [hasSauce, setHasSauce] = createSignal(false);
  const [hasCheese, setHasCheese] = createSignal(false);
  const [toppings, setToppings] = createSignal([]);
  const [selectedTopping, setSelectedTopping] = createSignal(TOPPING_OPTIONS[0].id);
  const [needle, setNeedle] = createSignal(0);
  const [baking, setBaking] = createSignal(false);
  const [baked, setBaked] = createSignal(false);
  const [scores, setScores] = createSignal({ knead: 0, stretch: 0, top: 0, bake: 0 });
  const [finalScore, setFinalScore] = createSignal(0);

  let bakeFrame;
  let bakeDir = 1;

  createEffect(() => {
    if (!baking()) {
      cancelAnimationFrame(bakeFrame);
      return;
    }
    const tick = () => {
      setNeedle((n) => {
        let next = n + bakeDir * 1.8;
        if (next >= 100) { next = 100; bakeDir = -1; }
        if (next <= 0) { next = 0; bakeDir = 1; }
        return next;
      });
      bakeFrame = requestAnimationFrame(tick);
    };
    bakeFrame = requestAnimationFrame(tick);
    onCleanup(() => cancelAnimationFrame(bakeFrame));
  });

  const kneadProgress = () => Math.min(100, (kneadClicks() / KNEAD_TARGET) * 100);

  const handleKnead = () => {
    if (kneadClicks() >= KNEAD_TARGET) return;
    const next = kneadClicks() + 1;
    setKneadClicks(next);
    if (next >= KNEAD_TARGET) {
      setScores((s) => ({ ...s, knead: scoreKnead(next) }));
      setTimeout(() => setStage('stretch'), 400);
    }
  };

  const confirmStretch = () => {
    setScores((s) => ({ ...s, stretch: scoreStretch(stretch()) }));
    setStage('top');
  };

  const addTopping = (e) => {
    if (!hasCheese()) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    const opt = TOPPING_OPTIONS.find((t) => t.id === selectedTopping());
    if (!opt || toppings().length >= 8) return;
    setToppings((prev) => [...prev, { ...opt, x, y, key: prev.length }]);
  };

  const confirmToppings = () => {
    if (!hasCheese() || toppings().length < 2) return;
    setScores((s) => ({ ...s, top: scoreToppings(toppings()) }));
    setStage('bake');
    setBaking(true);
  };

  const stopBake = () => {
    if (!baking()) return;
    setBaking(false);
    const bakeScore = scoreBake(needle());
    setScores((s) => ({ ...s, bake: bakeScore }));
    setBaked(true);
    const all = { ...scores(), bake: bakeScore };
    setFinalScore(totalScore(all));
    setStage('result');
  };

  const resetGame = () => {
    setStage('knead');
    setKneadClicks(0);
    setStretch(45);
    setHasSauce(false);
    setHasCheese(false);
    setToppings([]);
    setNeedle(0);
    setBaking(false);
    setBaked(false);
    setScores({ knead: 0, stretch: 0, top: 0, bake: 0 });
    setFinalScore(0);
    bakeDir = 1;
  };

  const addToCart = () => {
    cart.addCustomItem(
      `Pizza del Maestro (${finalScore()} pts)`,
      9.5 + (finalScore() / 100) * 3
    );
  };

  const stageIndex = () => STAGES.indexOf(stage());

  return (
    <section id="gioco" class="pizza-game-section fresco-grain" aria-labelledby="game-heading">
      <div class="container">
        <header class="game-header">
          <span class="game-ornament" aria-hidden="true">❧</span>
          <h2 id="game-heading">Il Gioco del Pizzaiolo</h2>
          <p class="game-intro">
            Impasta, stendi, condisci e inforna — diventa maestro come Vincenzo nel 1889.
          </p>
        </header>

        <div class="game-progress" aria-label="Progresso">
          <For each={STAGES.filter((s) => s !== 'result')}>
            {(s, i) => (
              <div
                class="game-step"
                classList={{
                  active: stage() === s,
                  done: stageIndex() > STAGES.indexOf(s),
                }}
              >
                <span class="game-step-num">{i() + 1}</span>
                <span class="game-step-label">{STAGE_LABELS[s]}</span>
              </div>
            )}
          </For>
        </div>

        <div class="game-board fresco-card-bg">
          <div class="game-workspace">
            <button
              type="button"
              class="game-pizza-stage"
              classList={{ 'game-pizza-stage--interactive': stage() === 'top' && hasCheese() }}
              onClick={addTopping}
              disabled={stage() !== 'top' || !hasCheese()}
              aria-label="Area pizza"
            >
              <PizzaCanvas
                stage={stage()}
                stretch={stretch()}
                hasSauce={hasSauce()}
                hasCheese={hasCheese()}
                toppings={toppings()}
                baked={baked()}
              />
              <Show when={stage() === 'knead'}>
                <div class="game-knead-hint">Clicca per impastare!</div>
              </Show>
            </button>

            <div class="game-controls">
              <Show when={stage() === 'knead'}>
                <p class="game-instruction">
                  Il lievito madre aspetta le tue mani. Impasta <strong>{KNEAD_TARGET}</strong> volte con ritmo costante.
                </p>
                <div class="game-meter">
                  <div class="game-meter-fill" style={{ width: `${kneadProgress()}%` }} />
                </div>
                <p class="game-meter-label">{kneadClicks()} / {KNEAD_TARGET}</p>
                <button type="button" class="btn-game-action" onClick={handleKnead}>
                  🖐️ Impasta!
                </button>
              </Show>

              <Show when={stage() === 'stretch'}>
                <p class="game-instruction">
                  Stendi l'impasto dal centro verso il bordo. Punta a <strong>{STRETCH_IDEAL}%</strong> per il cornicione perfetto.
                </p>
                <input
                  type="range"
                  class="game-slider"
                  min="30"
                  max="95"
                  value={stretch()}
                  onInput={(e) => setStretch(Number(e.target.value))}
                  aria-label="Stendi impasto"
                />
                <p class="game-meter-label">Diametro: {stretch()}%</p>
                <button type="button" class="btn-game-action" onClick={confirmStretch}>
                  ✓ Impasto pronto
                </button>
              </Show>

              <Show when={stage() === 'top'}>
                <p class="game-instruction">
                  Aggiungi salsa, formaggio e almeno 2 condimenti. Clicca sulla pizza per posizionarli.
                </p>
                <div class="game-topping-actions">
                  <button
                    type="button"
                    class="btn-game-chip"
                    classList={{ done: hasSauce() }}
                    disabled={hasSauce()}
                    onClick={() => setHasSauce(true)}
                  >
                    🍅 Salsa
                  </button>
                  <button
                    type="button"
                    class="btn-game-chip"
                    classList={{ done: hasCheese() }}
                    disabled={!hasSauce() || hasCheese()}
                    onClick={() => setHasCheese(true)}
                  >
                    🧀 Formaggio
                  </button>
                </div>
                <Show when={hasCheese()}>
                  <div class="game-topping-palette" role="toolbar" aria-label="Condimenti">
                    <For each={TOPPING_OPTIONS}>
                      {(t) => (
                        <button
                          type="button"
                          class="btn-topping-pick"
                          classList={{ active: selectedTopping() === t.id }}
                          onClick={() => setSelectedTopping(t.id)}
                          aria-pressed={selectedTopping() === t.id}
                        >
                          {t.emoji} {t.label}
                        </button>
                      )}
                    </For>
                  </div>
                  <p class="game-meter-label">{toppings().length} / 8 condimenti</p>
                </Show>
                <button
                  type="button"
                  class="btn-game-action"
                  disabled={!hasCheese() || toppings().length < 2}
                  onClick={confirmToppings}
                >
                  🔥 Al forno!
                </button>
              </Show>

              <Show when={stage() === 'bake'}>
                <p class="game-instruction">
                  Il forno a legna è a 485°C. Ferma l'ago nella zona dorata!
                </p>
                <div class="game-oven-meter" role="meter" aria-valuenow={needle()} aria-valuemin={0} aria-valuemax={100}>
                  <div class="game-oven-zone" style={{ left: `${BAKE_IDEAL - 14}%`, width: '28%' }} />
                  <div class="game-oven-needle" style={{ left: `${needle()}%` }} />
                </div>
                <p class="game-meter-label">Temperatura cottura</p>
                <button type="button" class="btn-game-action btn-game-bake" onClick={stopBake}>
                  ⏱️ Togli dal forno!
                </button>
              </Show>

              <Show when={stage() === 'result'}>
                <div class="game-result">
                  <p class="game-score">{finalScore()}<span>/100</span></p>
                  <p class="game-stars" aria-label={`${starRating(finalScore())} stelle`}>
                    {'★'.repeat(starRating(finalScore()))}
                    <span class="game-stars-dim">{'★'.repeat(5 - starRating(finalScore()))}</span>
                  </p>
                  <p class="game-verdict">{verdict(finalScore())}</p>
                  <dl class="game-breakdown">
                    <div><dt>Impasto</dt><dd>{scores().knead}</dd></div>
                    <div><dt>Stesura</dt><dd>{scores().stretch}</dd></div>
                    <div><dt>Condimenti</dt><dd>{scores().top}</dd></div>
                    <div><dt>Forno</dt><dd>{scores().bake}</dd></div>
                  </dl>
                  <div class="game-result-actions">
                    <button type="button" class="btn-game-action" onClick={addToCart}>
                      🛒 Ordina — {formatPrice(9.5 + (finalScore() / 100) * 3)}
                    </button>
                    <button type="button" class="btn-game-secondary" onClick={resetGame}>
                      ↺ Riprova
                    </button>
                  </div>
                </div>
              </Show>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
