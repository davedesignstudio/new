import { Show } from 'solid-js';
import { useCart } from '../store/cart';
import PizzaVisual from './PizzaVisual';
import SizeSelector from './SizeSelector';
import CrustSelector from './CrustSelector';
import SauceCheeseSelector from './SauceCheeseSelector';
import ToppingSelector from './ToppingSelector';

const STEPS = ['Size', 'Crust', 'Sauce & Cheese', 'Toppings'];

export default function PizzaBuilder() {
  const cart = useCart();
  const step = () => cart.builderStep();

  function next() {
    if (step() < STEPS.length - 1) {
      cart.setBuilderStep(step() + 1);
    }
  }

  function back() {
    if (step() > 0) {
      cart.setBuilderStep(step() - 1);
    }
  }

  return (
    <div class="builder-layout">
      <div class="builder-main">
        <div class="step-indicator" role="tablist" aria-label="Pizza builder steps">
          {STEPS.map((label, i) => (
            <button
              type="button"
              role="tab"
              class="step-dot"
              classList={{
                active: step() === i,
                completed: step() > i,
              }}
              aria-selected={step() === i}
              onClick={() => cart.setBuilderStep(i)}
            >
              <span class="step-num">{i + 1}</span>
              <span class="step-label">{label}</span>
            </button>
          ))}
        </div>

        <Show when={step() === 0}><SizeSelector /></Show>
        <Show when={step() === 1}><CrustSelector /></Show>
        <Show when={step() === 2}><SauceCheeseSelector /></Show>
        <Show when={step() === 3}><ToppingSelector /></Show>

        <div class="builder-actions">
          <button
            type="button"
            class="btn btn-secondary"
            disabled={step() === 0}
            onClick={back}
          >
            Back
          </button>

          <Show
            when={step() < STEPS.length - 1}
            fallback={
              <button
                type="button"
                class="btn btn-primary"
                onClick={() => cart.addPizzaToCart()}
              >
                Add to Order — ${cart.builderPrice().toFixed(2)}
              </button>
            }
          >
            <button type="button" class="btn btn-primary" onClick={next}>
              Continue
            </button>
          </Show>
        </div>
      </div>

      <aside class="builder-preview">
        <PizzaVisual />
        <div class="builder-summary">
          <h3>Your Pizza</h3>
          <p class="builder-price">${cart.builderPrice().toFixed(2)}</p>
          <dl class="builder-details">
            <div>
              <dt>Size</dt>
              <dd>{cart.builder().sizeId}</dd>
            </div>
            <div>
              <dt>Crust</dt>
              <dd>{cart.builder().crustId.replace('-', ' ')}</dd>
            </div>
            <div>
              <dt>Toppings</dt>
              <dd>{cart.builder().toppingIds.length || 'None'}</dd>
            </div>
          </dl>
        </div>
      </aside>
    </div>
  );
}
