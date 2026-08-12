import { createSignal, createEffect, onCleanup, For, Show } from 'solid-js';
import { useCart } from '../store/cart';
import { formatPrice } from '../data/menu';
import { STORIES, getStoryById } from '../data/stories';
import { getMuseumAttribution } from '../data/museumArt';
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
  BAKE_TOLERANCE,
  CUSTOMERS,
  GAME_FEATURES,
  MASCOT_NAME,
  MASCOT_INTRO,
  STARTING_LIVES,
  scoreKnead,
  scoreStretch,
  scoreToppings,
  scoreBake,
  scoreOrderMatch,
  totalScore,
  starRating,
  verdict,
  mascotVerdict,
  customerReaction,
  calcTip,
  pickCustomer,
  getStageQuip,
  loadHighScore,
  saveHighScore,
  loadGameDay,
  advanceGameDay,
  loadTotalTips,
  addTips,
  loadLives,
  loseLife,
  gainLife,
  resetLives,
  GAME_RULES,
} from '../game/pizzaGame';
import {
  getStageChoices,
  scoreStoryChoice,
  totalStoryChoiceScore,
  isToppingStoryHighlighted,
  storyGuidesSauce,
  storyGuidesCheese,
  getCustomerStoryReaction,
} from '../game/storyChoices';
import { resolveStory } from '../data/storyBlend';
import { useStoryLang } from '../store/storyLang';
import RetroMascot from '../game/RetroMascot';
import '../game/game.css';

function MascotBubble(props) {
  return (
    <div class="game-mascot-bubble" aria-live="polite">
      <RetroMascot
        class="game-mascot-sprite"
        size={56}
        mood={props.mood}
        holdingPizza={props.holdingPizza}
        label={MASCOT_NAME}
        decorative={false}
      />
      <div class="game-mascot-speech">
        <span class="game-mascot-name">{MASCOT_NAME}</span>
        <p>{props.line}</p>
      </div>
    </div>
  );
}

function SegaHud(props) {
  return (
    <div class="game-sega-hud" aria-label="Punteggio arcade">
      <div class="game-hud-cell">
        <span class="game-hud-label">SCORE</span>
        <span class="game-hud-value">{props.score}</span>
      </div>
      <div class="game-hud-cell">
        <span class="game-hud-label">HI</span>
        <span class="game-hud-value">{props.highScore}</span>
      </div>
      <div class="game-hud-cell">
        <span class="game-hud-label">DAY</span>
        <span class="game-hud-value">{props.day}</span>
      </div>
      <div class="game-hud-cell game-hud-lives">
        <span class="game-hud-label">LIVES</span>
        <span class="game-hud-value">{'♥'.repeat(props.lives)}{'♡'.repeat(Math.max(0, STARTING_LIVES - props.lives))}</span>
      </div>
    </div>
  );
}

function StoryChoicePanel(props) {
  const { lang } = useStoryLang();
  const story = () => resolveStory(getStoryById(props.storyId), lang());
  const choices = () => getStageChoices(props.storyId, props.stage);

  return (
    <div class="game-story-choice" aria-label="Scelta narrativa">
      <p class="game-story-choice-tag">Capitolo: {story()?.title}</p>
      <p class="game-story-choice-intro story-blend-text">{story()?.excerpt}</p>
      <p class="game-story-choice-prompt">Come racconti questa storia?</p>
      <div class="game-story-choice-list">
        <For each={choices()}>
          {(choice) => (
            <button
              type="button"
              class="game-story-choice-btn"
              onClick={() => props.onPick(choice)}
            >
              <span class="game-story-choice-label">{choice.label}</span>
              <span class="game-story-choice-hint">{choice.hint}</span>
            </button>
          )}
        </For>
      </div>
    </div>
  );
}

function GameStoryPanel(props) {
  const { lang } = useStoryLang();
  const storyId = () => props.storyId ?? STAGE_STORIES[props.stage]?.storyId;
  const config = () => ({
    ...(STAGE_STORIES[props.stage] ?? STAGE_STORIES.knead),
    storyId: storyId(),
  });
  const story = () => resolveStory(getStoryById(storyId()), lang());
  const stageChoice = () => props.stageChoice;
  const museumCredit = () => getMuseumAttribution(config().museumVariant);

  return (
    <aside class="game-story-panel fresco-frame fresco-frame--arch">
      <div class="game-story-media">
        <RenaissanceMedia
          class="game-story-art ren-media--card"
          source="blend"
          variant={getStoryVariant(storyId())}
          storyId={storyId()}
          type="story"
          scene={['forno-1738', 'vesuvio-vigilia', 'antica-pizzeria'].includes(storyId())}
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
          <p class="game-story-excerpt story-blend-text">{story().excerpt}</p>
          <Show when={stageChoice()}>
            <div class="game-story-pick">
              <span class="game-story-pick-label">La tua scelta</span>
              <p class="game-story-pick-text">{stageChoice().label}</p>
            </div>
          </Show>
          <Show when={config().heritage}>
            <p class="game-heritage-line">{config().heritage}</p>
          </Show>
          <Show when={museumCredit()}>
            <p class="game-museum-credit">{museumCredit()}</p>
          </Show>
          <Show when={props.onSelectStory}>
            <button
              type="button"
              class="game-story-read"
              onClick={() => props.onSelectStory(getStoryById(storyId()))}
            >
              Leggi la storia →
            </button>
          </Show>
        </div>
      </Show>
    </aside>
  );
}

function CustomerTicket(props) {
  const { lang } = useStoryLang();
  const customer = () => props.customer;
  const story = () => resolveStory(getStoryById(customer()?.storyId), lang());

  return (
    <Show when={customer()}>
      <div class="game-order-ticket" aria-label="Ordine del cliente">
        <div class="game-ticket-header">
          <span class="game-ticket-emoji">{customer().emoji}</span>
          <div>
            <p class="game-ticket-name">{customer().name}</p>
            <p class="game-ticket-location">{customer().location}</p>
          </div>
          <span class="game-ticket-day">Giorno {props.day}</span>
        </div>
        <p class="game-ticket-order">«{customer().order}»</p>
        <p class="game-ticket-quirk">{customer().quirk}</p>
        <Show when={story()}>
          <p class="game-ticket-story story-blend-text">
            Storia: <strong>{story().title}</strong> — {story().excerpt}
          </p>
        </Show>
      </div>
    </Show>
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
        'game-pizza-stage--interactive': props.stage === 'top' && props.canTop,
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
  const [gameDay, setGameDay] = createSignal(loadGameDay());
  const [totalTips, setTotalTips] = createSignal(loadTotalTips());
  const [lives, setLives] = createSignal(loadLives());
  const [mascotLine, setMascotLine] = createSignal(MASCOT_INTRO[0]);
  const [mascotMood, setMascotMood] = createSignal('idle');
  const [scorePop, setScorePop] = createSignal(null);
  const [customer, setCustomer] = createSignal(pickCustomer(loadGameDay()));
  const [storyChoices, setStoryChoices] = createSignal({});
  const [storyScore, setStoryScore] = createSignal(0);
  const [storyReaction, setStoryReaction] = createSignal(null);
  const [bakeIdeal, setBakeIdeal] = createSignal(BAKE_IDEAL);
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
  const [orderMatch, setOrderMatch] = createSignal(0);
  const [tipEarned, setTipEarned] = createSignal(0);
  const [finalScore, setFinalScore] = createSignal(0);
  const [reaction, setReaction] = createSignal(null);

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

  createEffect(() => {
    const s = stage();
    setMascotLine(getStageQuip(s));
    setMascotMood(s === 'bake' ? 'excited' : s === 'result' ? 'happy' : 'idle');
  });

  const showScorePop = (label, points) => {
    setScorePop({ label, points });
    setTimeout(() => setScorePop(null), 1200);
  };

  const kneadProgress = () => Math.min(100, (kneadClicks() / KNEAD_TARGET) * 100);
  const stageChoice = () => storyChoices()[stage()] ?? null;
  const needsStoryChoice = () => stage() !== 'result' && !stageChoice();
  const topChoice = () => storyChoices().top ?? null;
  const needsCheeseForPizza = () => {
    const c = topChoice();
    if (c && storyGuidesCheese(c) === false) return false;
    return true;
  };
  const canAddToppings = () => {
    if (stage() !== 'top') return false;
    if (!hasSauce()) return false;
    if (needsCheeseForPizza()) return hasCheese();
    return true;
  };
  const canConfirmToppings = () => {
    if (!hasSauce()) return false;
    if (needsCheeseForPizza() && !hasCheese()) return false;
    const min = needsCheeseForPizza() ? 2 : 1;
    return toppings().length >= min;
  };

  const pickStoryChoice = (choice) => {
    const s = stage();
    setStoryChoices((prev) => ({ ...prev, [s]: choice }));
    if (choice.stretchHint != null) setStretch(choice.stretchHint);
    if (choice.bakeHint != null) setBakeIdeal(choice.bakeHint);
    const bonus = scoreStoryChoice(choice);
    setStoryScore((prev) => prev + bonus);
    showScorePop(choice.correct ? 'STORIA ✓' : 'STORIA', bonus);
    setMascotLine(choice.hint);
    setMascotMood(choice.correct ? 'happy' : 'sad');
  };

  const choiceBonus = () => scoreStoryChoice(stageChoice());

  const handleKnead = () => {
    if (kneadClicks() >= KNEAD_TARGET) return;
    setKneadPop(true);
    setTimeout(() => setKneadPop(false), 180);
    const next = kneadClicks() + 1;
    setKneadClicks(next);
    if (next >= KNEAD_TARGET) {
      const pts = scoreKnead(next) + choiceBonus();
      setScores((s) => ({ ...s, knead: pts }));
      showScorePop('IMPASTO', pts);
      setTimeout(() => setStage('stretch'), 400);
    }
  };

  const confirmStretch = () => {
    const pts = scoreStretch(stretch()) + choiceBonus();
    setScores((s) => ({ ...s, stretch: pts }));
    showScorePop('STESURA', pts);
    setStage('top');
  };

  const addTopping = (e) => {
    if (!canAddToppings()) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    const opt = TOPPING_OPTIONS.find((t) => t.id === selectedTopping());
    if (!opt || toppings().length >= 8) return;
    setToppings((prev) => [...prev, { ...opt, x, y, key: prev.length }]);
  };

  const confirmToppings = () => {
    if (!canConfirmToppings()) return;
    const pts = scoreToppings(toppings()) + choiceBonus();
    setScores((s) => ({ ...s, top: pts }));
    showScorePop('TOPPING', pts);
    setStage('bake');
    setBaking(true);
  };

  const stopBake = () => {
    if (!baking()) return;
    setBaking(false);
    const bakeScore = scoreBake(needle(), bakeIdeal()) + choiceBonus();
    const all = { ...scores(), bake: bakeScore };
    const match = scoreOrderMatch(customer(), {
      hasSauce: hasSauce(),
      hasCheese: hasCheese(),
      toppings: toppings(),
    });
    const storyTotal = totalStoryChoiceScore(storyChoices());
    const total = totalScore(all, match, storyTotal);
    const react = customerReaction(total);
    const tip = calcTip(total);

    setScores(all);
    setOrderMatch(match);
    setFinalScore(total);
    setReaction(react);
    setTipEarned(tip);
    setHighScore(saveHighScore(total));
    setTotalTips(addTips(tip));
    if (total < 40) setLives(loseLife());
    else if (total >= 90) setLives(gainLife());
    setMascotLine(mascotVerdict(total));
    setMascotMood(total >= 75 ? 'happy' : 'sad');
    setStoryReaction(getCustomerStoryReaction(customer(), storyTotal, match));
    setBaked(true);
    setStage('result');
  };

  const startGame = () => {
    resetGame();
    setLives(resetLives());
    setMascotLine(MASCOT_INTRO[Math.floor(Math.random() * MASCOT_INTRO.length)]);
    setStarted(true);
  };

  const resetGame = () => {
    const day = loadGameDay();
    setGameDay(day);
    setCustomer(pickCustomer(day));
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
    setOrderMatch(0);
    setTipEarned(0);
    setFinalScore(0);
    setStoryChoices({});
    setStoryScore(0);
    setStoryReaction(null);
    setBakeIdeal(BAKE_IDEAL);
    setReaction(null);
    bakeDir = 1;
  };

  const nextDay = () => {
    const next = advanceGameDay();
    setGameDay(next);
    setCustomer(pickCustomer(next));
    resetGame();
  };

  const addToCart = () => {
    cart.addCustomItem(
      `Pizza per ${customer().name} (${finalScore()} pts)`,
      9.5 + (finalScore() / 100) * 3
    );
  };

  const stageIndex = () => STAGES.indexOf(stage());
  const gameStories = () => STORIES.filter((s) => GAME_STORY_IDS.includes(s.id));

  return (
    <section id="gioco" class="pizza-game-section pizza-game-section--sega fresco-maiolica fresco-grain" aria-labelledby="game-heading">
      <div class="container">
        <header class="game-header">
          <div class="game-header-rose" aria-hidden="true">
            <RenaissanceOrnament variant="rose" />
          </div>
          <h2 id="game-heading">Il Gioco del Pizzaiolo</h2>
          <p class="game-intro">
            Impasta, stendi, condisci e inforna — con {MASCOT_NAME}, 9 vite arcade e vibes Sega Genesis nel cuore di Napoli.
          </p>
          <div class="game-stats-bar">
            <Show when={highScore() > 0}>
              <span class="game-stat">HI-SCORE: <strong>{highScore()}</strong></span>
            </Show>
            <span class="game-stat">DAY <strong>{gameDay()}</strong></span>
            <span class="game-stat">TIPS <strong>€{totalTips().toFixed(2)}</strong></span>
            <span class="game-stat">LIVES <strong>{'♥'.repeat(lives())}</strong></span>
          </div>
        </header>

        <Show when={!started()}>
          <div class="game-lobby fresco-card-bg game-lobby--sega">
            <MascotBubble line={MASCOT_INTRO[1]} mood="happy" holdingPizza />
            <div class="game-phone-preview">
              <div class="game-phone-frame game-phone-frame--sega">
                <div class="game-sega-logo" aria-hidden="true">SEGA</div>
                <div class="game-phone-screen">
                  <div class="game-lobby-art fresco-frame fresco-frame--round">
                    <FrescoArt variant="margherita" type="food" label="Pizza" />
                  </div>
                  <p class="game-phone-tagline game-phone-tagline--retro">PRESS START</p>
                </div>
              </div>
            </div>
            <h3 class="game-lobby-title">Gatto Bubù's Pizza Quest</h3>
            <p class="game-lobby-desc">
              Leggi l'ordine del cliente, cucina la pizza perfetta, guadagna mance e avanza di giorno in giorno.
            </p>
            <div class="game-features">
              <For each={GAME_FEATURES}>
                {(feat) => (
                  <div class="game-feature-chip">
                    <span class="game-feature-icon">{feat.icon}</span>
                    <div>
                      <span class="game-feature-label">{feat.label}</span>
                      <span class="game-feature-detail">{feat.detail}</span>
                    </div>
                  </div>
                )}
              </For>
            </div>
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
            <div class="game-customers-preview">
              <p class="game-customers-label">Clienti di Napoli</p>
              <div class="game-customers-row">
                <For each={CUSTOMERS}>
                  {(c) => (
                    <span class="game-customer-avatar" title={c.name}>
                      {c.emoji}
                    </span>
                  )}
                </For>
              </div>
            </div>
            <button type="button" class="btn-game-action btn-game-start btn-game-press-start" onClick={startGame}>
              ▶ PRESS START
            </button>
          </div>
        </Show>

        <Show when={started()}>
        <SegaHud
          score={stage() === 'result' ? finalScore() : Object.values(scores()).reduce((a, b) => a + b, 0)}
          highScore={highScore()}
          day={gameDay()}
          lives={lives()}
        />

        <MascotBubble
          line={mascotLine()}
          mood={mascotMood()}
          holdingPizza={stage() === 'result' && finalScore() >= 60}
        />

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

        <div class="game-board fresco-card-bg game-board--sega">
          <div class="game-scanlines" aria-hidden="true" />
          <Show when={scorePop()}>
            <div class="game-score-pop" aria-live="assertive">
              <span class="game-score-pop-label">{scorePop().label}</span>
              <span class="game-score-pop-pts">+{scorePop().points}</span>
            </div>
          </Show>
          <div class="game-workspace">
            <GameStoryPanel
              stage={stage()}
              storyId={customer().storyId}
              stageChoice={stageChoice()}
              onSelectStory={props.onSelectStory}
            />

            <div class="game-center">
              <div class="game-phone-active">
                <div class="game-phone-frame game-phone-frame--compact">
                  <div class="game-phone-notch" aria-hidden="true" />
                  <div class="game-phone-screen">
                    <CustomerTicket customer={customer()} day={gameDay()} />
                    <button
                      type="button"
                      class="game-pizza-hitarea"
                      onClick={addTopping}
                      disabled={stage() !== 'top' || !canAddToppings()}
                      aria-label="Area pizza"
                    >
                      <GamePizzaStage
                        stage={stage()}
                        stretch={stretch()}
                        kneadProgress={kneadProgress()}
                        canTop={canAddToppings()}
                        toppings={toppings()}
                        baked={baked()}
                        kneadPop={kneadPop()}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div class="game-controls">
              <Show when={needsStoryChoice()}>
                <StoryChoicePanel
                  storyId={customer().storyId}
                  stage={stage()}
                  onPick={pickStoryChoice}
                />
              </Show>

              <Show when={!needsStoryChoice() && stage() === 'knead'}>
                <p class="game-instruction">
                  {customer().name} aspetta — impasta <strong>{KNEAD_TARGET}</strong> volte. La tua scelta: «{stageChoice()?.label}».
                </p>
                <div class="game-meter">
                  <div class="game-meter-fill" style={{ width: `${kneadProgress()}%` }} />
                </div>
                <p class="game-meter-label">{kneadClicks()} / {KNEAD_TARGET}</p>
                <button type="button" class="btn-game-action" onClick={handleKnead}>
                  🖐️ Impasta!
                </button>
              </Show>

              <Show when={!needsStoryChoice() && stage() === 'stretch'}>
                <p class="game-instruction">
                  Stendi come nella storia — «{stageChoice()?.label}». Punta a <strong>{stretch()}%</strong>.
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

              <Show when={!needsStoryChoice() && stage() === 'top'}>
                <p class="game-instruction">
                  Segui la storia e l'ordine: {customer().order}
                </p>
                <Show when={topChoice()}>
                  <p class="game-story-guide">
                    <Show when={storyGuidesSauce(topChoice()) === false}>
                      📖 La storia suggerisce: <strong>senza formaggio</strong>
                    </Show>
                    <Show when={storyGuidesSauce(topChoice()) !== false && storyGuidesCheese(topChoice())}>
                      📖 Ingredienti della storia evidenziati in oro
                    </Show>
                  </p>
                </Show>
                <div class="game-topping-actions">
                  <button
                    type="button"
                    class="btn-game-chip"
                    classList={{
                      done: hasSauce(),
                      'btn-game-chip--story': topChoice() && storyGuidesSauce(topChoice()) !== false,
                    }}
                    disabled={hasSauce()}
                    onClick={() => setHasSauce(true)}
                  >
                    🍅 Salsa
                  </button>
                  <button
                    type="button"
                    class="btn-game-chip"
                    classList={{
                      done: hasCheese(),
                      'btn-game-chip--story': topChoice() && storyGuidesCheese(topChoice()) === true,
                      'btn-game-chip--warn': topChoice() && storyGuidesCheese(topChoice()) === false,
                    }}
                    disabled={!hasSauce() || hasCheese() || (topChoice() && storyGuidesCheese(topChoice()) === false)}
                    onClick={() => setHasCheese(true)}
                  >
                    🧀 Formaggio
                  </button>
                </div>
                <Show when={canAddToppings()}>
                  <div class="game-topping-palette" role="toolbar" aria-label="Condimenti">
                    <For each={TOPPING_OPTIONS}>
                      {(t) => (
                        <button
                          type="button"
                          class="btn-topping-pick"
                          classList={{
                            active: selectedTopping() === t.id,
                            'btn-topping-pick--story': isToppingStoryHighlighted(t.id, topChoice()),
                          }}
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
                  disabled={!canConfirmToppings()}
                  onClick={confirmToppings}
                >
                  🔥 Al forno!
                </button>
              </Show>

              <Show when={!needsStoryChoice() && stage() === 'bake'}>
                <p class="game-instruction">
                  «{stageChoice()?.label}» — forno a 485°C. Ferma l'ago nella zona dorata!
                </p>
                <div class="game-oven-meter" role="meter" aria-valuenow={needle()} aria-valuemin={0} aria-valuemax={100}>
                  <div class="game-oven-zone" style={{ left: `${bakeIdeal() - 14}%`, width: '28%' }} />
                  <div class="game-oven-needle" style={{ left: `${needle()}%` }} />
                </div>
                <p class="game-meter-label">Temperatura cottura</p>
                <button type="button" class="btn-game-action btn-game-bake" onClick={stopBake}>
                  ⏱️ Togli dal forno!
                </button>
              </Show>

              <Show when={stage() === 'result'}>
                <div class="game-result">
                  <div class="game-customer-reaction" aria-live="polite">
                    <span class="game-reaction-mood">{reaction()?.mood}</span>
                    <p class="game-reaction-label">{reaction()?.label}</p>
                    <p class="game-reaction-customer">— {customer().name}</p>
                  </div>
                  <div class="game-result-art fresco-frame fresco-frame--octagon">
                    <RenaissanceMedia
                      class="ren-media--card"
                      source="blend"
                      variant={getStoryVariant(customer().storyId)}
                      storyId={customer().storyId}
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
                  <p class="game-tip-earned">Mancia: <strong>€{tipEarned().toFixed(2)}</strong></p>
                  <p class="game-verdict">{verdict(finalScore())}</p>
                  <p class="game-mascot-verdict">{mascotLine()}</p>
                  <Show when={storyReaction()}>
                    <p class="game-story-reaction">
                      <span>{storyReaction().mood}</span> {storyReaction().line}
                    </p>
                  </Show>
                  <Show when={finalScore() < 40 && lives() < STARTING_LIVES}>
                    <p class="game-life-lost">💔 -1 LIFE</p>
                  </Show>
                  <Show when={finalScore() >= 90 && lives() <= STARTING_LIVES}>
                    <p class="game-life-gained">💚 +1 LIFE!</p>
                  </Show>
                  <Show when={finalScore() >= highScore() && finalScore() > 0}>
                    <p class="game-new-record">🏆 Nuovo record!</p>
                  </Show>
                  <dl class="game-breakdown">
                    <div><dt>Impasto</dt><dd>{scores().knead}</dd></div>
                    <div><dt>Stesura</dt><dd>{scores().stretch}</dd></div>
                    <div><dt>Condimenti</dt><dd>{scores().top}</dd></div>
                    <div><dt>Forno</dt><dd>{scores().bake}</dd></div>
                    <div><dt>Ordine</dt><dd>{orderMatch()}</dd></div>
                    <div><dt>Storia</dt><dd>{totalStoryChoiceScore(storyChoices())}</dd></div>
                  </dl>
                  <div class="game-result-actions">
                    <button type="button" class="btn-game-action" onClick={addToCart}>
                      🛒 Ordina — {formatPrice(9.5 + (finalScore() / 100) * 3)}
                    </button>
                    <button type="button" class="btn-game-secondary" onClick={resetGame}>
                      ↺ Riprova
                    </button>
                    <button type="button" class="btn-game-secondary btn-game-next-day" onClick={nextDay}>
                      ☀️ Giorno successivo
                    </button>
                  </div>
                </div>
              </Show>
            </div>
          </div>
        </div>

        <div class="game-stories-strip">
          <h3 class="game-stories-strip-title">Storie del gioco — tutte e 7</h3>
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
