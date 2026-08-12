import { createSignal, createEffect, onCleanup, For, Show } from 'solid-js';
import { useCart } from '../store/cart';
import { formatPrice } from '../data/menu';
import { STORIES, getStoryById } from '../data/stories';
import RenaissanceMedia from '../art/RenaissanceMedia';
import FrescoArt from '../art/FrescoArt';
import { RenaissanceOrnament } from '../art/RenaissanceOrnament';
import { getStoryVariant } from '../data/images';
import {
  STAGES,
  STAGE_LABELS,
  STAGE_STORIES,
  GAME_STORY_IDS,
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
  loadHighScore,
  saveHighScore,
  GAME_RULES,
} from '../game/pizzaGame';
import '../game/game.css';

function GameStoryPanel(props) {
  const config = () => STAGE_STORIES[props.stage] ?? STAGE_STORIES.knead;
  const story = () => getStoryById(config().storyId);

  return (
    <aside class="game-story-panel fresco-frame fresco-frame--arch">
      <div class="game-story-media">
        <RenaissanceMedia
          class="game-story-art ren-media--card"
          source="blend"
          variant={config().variant}
          storyId={config().storyId}
          type={config().type}
          scene={config().scene}
          frame="arch"
          geometry={config().geometry}
          label={story()?.title}
        />
      </div>
      <Show when={story()}>
        <div class="game-story-caption">
          <span class="story-tag">{story().tag}</span>
          <span class="story-year">{story().year}</span>
          <h3 class="game-story-title">{story().title}</h3>
          <p class="game-story-excerpt">{story().excerpt}</p>
          <Show when={props.onSelectStory}>
            <button
              type="button"
              class="game-story-read"
              onClick={() => props.onSelectStory(story())}
            >
              Leggi la storia →
            </button>
          </Show>
        </div>
      </Show>
    </aside>
  );
}

function GamePizzaStage(props) {
  const config = () => STAGE_STORIES[props.stage] ?? STAGE_STORIES.knead;
  const scale = () => 0.65 + ((props.stretch ?? 45) / 100) * 0.45;
  const showPizza = () => props.stage !== 'knead' || props.kneadProgress > 30;

  return (
    <div
      class="game-pizza-stage fresco-frame fresco-frame--round"
      classList={{
        'game-pizza-stage--interactive': props.stage === 'top' && props.hasCheese,
        'game-pizza-stage--baked': props.baked,
        'game-pizza-stage--knead-pop': props.kneadPop,
        'game-pizza-stage--baking': props.stage === 'bake',
      }}
      style={{ '--game-stretch': scale() }}
    >
      <Show when={props.stage === 'bake'}>
        <div class="game-pizza-scene" aria-hidden="true">
          <RenaissanceMedia
            class="game-oven-bg"
            source="blend"
            variant="hero-forno"
            type="scene"
            scene
            geometry="rose"
            label="Forno a legna"
          />
        </div>
      </Show>

      <Show when={showPizza()}>
        <div
          class="game-pizza-art"
          classList={{ 'game-pizza-art--stretch': props.stage === 'stretch' || props.stage === 'top' }}
        >
          <FrescoArt
            class="game-fresco-pizza"
            variant={config().artVariant}
            type={config().artType}
            scene={config().scene}
            label="La tua pizza"
          />
        </div>
      </Show>

      <Show when={props.stage === 'knead' && props.kneadProgress <= 30}>
        <div class="game-pizza-art game-pizza-art--dough">
          <FrescoArt variant="impasto" type="story" label="Impasto" />
        </div>
      </Show>

      <For each={props.toppings}>
        {(t) => (
          <span
            class="game-topping-marker"
            style={{ left: `${t.x}%`, top: `${t.y}%`, '--topping-color': t.color }}
            aria-hidden="true"
          >
            {t.emoji}
          </span>
        )}
      </For>

      <Show when={props.stage === 'knead'}>
        <div class="game-knead-hint">Clicca per impastare!</div>
      </Show>
    </div>
  );
}

export default function PizzaGame(props) {
  const cart = useCart();

  const [started, setStarted] = createSignal(false);
  const [highScore, setHighScore] = createSignal(loadHighScore());
  const [kneadPop, setKneadPop] = createSignal(false);
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
    setKneadPop(true);
    setTimeout(() => setKneadPop(false), 180);
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
    if (stage() !== 'top' || !hasCheese()) return;
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
    const total = totalScore(all);
    setFinalScore(total);
    setHighScore(saveHighScore(total));
    setStage('result');
  };

  const startGame = () => {
    resetGame();
    setStarted(true);
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
  const gameStories = () => STORIES.filter((s) => GAME_STORY_IDS.includes(s.id));

  return (
    <section id="gioco" class="pizza-game-section fresco-maiolica fresco-grain" aria-labelledby="game-heading">
      <div class="container">
        <header class="game-header">
          <div class="game-header-rose" aria-hidden="true">
            <RenaissanceOrnament variant="rose" />
          </div>
          <h2 id="game-heading">Il Gioco del Pizzaiolo</h2>
          <p class="game-intro">
            Impasta, stendi, condisci e inforna — le stesse storie e immagini della nostra pizzeria prendono vita tra le tue mani.
          </p>
          <Show when={highScore() > 0}>
            <p class="game-high-score">Record: <strong>{highScore()}</strong> punti</p>
          </Show>
        </header>

        <Show when={!started()}>
          <div class="game-lobby fresco-card-bg">
            <div class="game-lobby-art fresco-frame fresco-frame--round">
              <FrescoArt variant="margherita" type="food" label="Pizza" />
            </div>
            <h3 class="game-lobby-title">Diventa Pizzaiolo per un giorno</h3>
            <p class="game-lobby-desc">
              Quattro fasi, un forno a legna, un giudizio finale. Vinci stelle e aggiungi la tua creazione al carrello.
            </p>
            <ol class="game-rules">
              <For each={GAME_RULES}>
                {(rule) => (
                  <li>
                    <span class="game-rule-stage">{rule.stage}</span>
                    <span class="game-rule-tip">{rule.tip}</span>
                  </li>
                )}
              </For>
            </ol>
            <button type="button" class="btn-game-action btn-game-start" onClick={startGame}>
              🔥 Inizia a cucinare
            </button>
          </div>
        </Show>

        <Show when={started()}>
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
            <GameStoryPanel stage={stage()} onSelectStory={props.onSelectStory} />

            <div class="game-center">
              <button
                type="button"
                class="game-pizza-hitarea"
                onClick={addTopping}
                disabled={stage() !== 'top' || !hasCheese()}
                aria-label="Area pizza"
              >
                <GamePizzaStage
                  stage={stage()}
                  stretch={stretch()}
                  kneadProgress={kneadProgress()}
                  hasCheese={hasCheese()}
                  toppings={toppings()}
                  baked={baked()}
                  kneadPop={kneadPop()}
                />
              </button>
            </div>

            <div class="game-controls">
              <Show when={stage() === 'knead'}>
                <p class="game-instruction">
                  Il lievito madre aspetta le tue mani — come racconta la storia dell'impasto. Impasta <strong>{KNEAD_TARGET}</strong> volte.
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
                  Stendi dal centro verso il bordo. Punta a <strong>{STRETCH_IDEAL}%</strong> per il cornicione perfetto.
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
                  Come la Regina Margherita del 1889: salsa, formaggio e almeno 2 condimenti sulla pizza.
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
                  <p class="game-meter-label">{toppings().length} / 8 condimenti — clicca sulla pizza</p>
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
                  Il forno del 1738 è a 485°C. Ferma l'ago nella zona dorata!
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
                  <div class="game-result-art fresco-frame fresco-frame--octagon">
                    <RenaissanceMedia
                      class="ren-media--card"
                      source="blend"
                      variant="margherita"
                      storyId="regina-margherita"
                      type="story"
                      frame="octagon"
                      geometry="mandorla"
                      label="Pizza del Maestro"
                    />
                  </div>
                  <p class="game-score">{finalScore()}<span>/100</span></p>
                  <p class="game-stars" aria-label={`${starRating(finalScore())} stelle`}>
                    {'★'.repeat(starRating(finalScore()))}
                    <span class="game-stars-dim">{'★'.repeat(5 - starRating(finalScore()))}</span>
                  </p>
                  <p class="game-verdict">{verdict(finalScore())}</p>
                  <Show when={finalScore() >= highScore() && finalScore() > 0}>
                    <p class="game-new-record">🏆 Nuovo record!</p>
                  </Show>
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

        <div class="game-stories-strip">
          <h3 class="game-stories-strip-title">Storie del gioco</h3>
          <div class="game-stories-row">
            <For each={gameStories()}>
              {(story) => (
                <button
                  type="button"
                  class="game-story-chip fresco-card-bg"
                  onClick={() => props.onSelectStory?.(story)}
                >
                  <div class="game-story-chip-art fresco-frame fresco-frame--octagon">
                    <RenaissanceMedia
                      class="ren-media--card"
                      source="blend"
                      variant={getStoryVariant(story.id)}
                      storyId={story.id}
                      type="story"
                      frame="octagon"
                      geometry="rose"
                      scene={['forno-1738', 'vesuvio-vigilia'].includes(story.id)}
                      label={story.title}
                    />
                  </div>
                  <span class="game-story-chip-tag">{story.tag}</span>
                  <span class="game-story-chip-title">{story.title}</span>
                </button>
              )}
            </For>
          </div>
        </div>
        </Show>
      </div>
    </section>
  );
}
