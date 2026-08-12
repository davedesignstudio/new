import { For } from 'solid-js';
import { useCart } from '../store/cart';
import { SAUCES, CHEESES } from '../data/menu';

export default function SauceCheeseSelector() {
  const cart = useCart();

  return (
    <section class="builder-section">
      <h2 class="section-title">Sauce & Cheese</h2>
      <p class="section-desc">Customize your base flavors</p>

      <h3 class="subsection-title">Sauce</h3>
      <div class="pill-group">
        <For each={SAUCES}>
          {(sauce) => (
            <button
              type="button"
              class="pill-btn"
              classList={{ selected: cart.builder().sauceId === sauce.id }}
              onClick={() => cart.updateBuilder({ sauceId: sauce.id })}
            >
              {sauce.label}
              {sauce.price > 0 && <span class="pill-price">+${sauce.price.toFixed(2)}</span>}
            </button>
          )}
        </For>
      </div>

      <h3 class="subsection-title">Cheese</h3>
      <div class="pill-group">
        <For each={CHEESES}>
          {(cheese) => (
            <button
              type="button"
              class="pill-btn"
              classList={{ selected: cart.builder().cheeseId === cheese.id }}
              onClick={() => cart.updateBuilder({ cheeseId: cheese.id })}
            >
              {cheese.label}
              {cheese.price > 0 && <span class="pill-price">+${cheese.price.toFixed(2)}</span>}
            </button>
          )}
        </For>
      </div>
    </section>
  );
}
