import { For } from 'solid-js';
import { useCart } from '../store/cart';
import { TOPPINGS } from '../data/menu';

export default function ToppingSelector() {
  const cart = useCart();

  function toggleTopping(id) {
    const current = cart.builder().toppingIds;
    const next = current.includes(id)
      ? current.filter((t) => t !== id)
      : [...current, id];
    cart.updateBuilder({ toppingIds: next });
  }

  const meats = () => TOPPINGS.filter((t) => t.category === 'meat');
  const veggies = () => TOPPINGS.filter((t) => t.category === 'veggie');

  return (
    <section class="builder-section">
      <h2 class="section-title">Add Toppings</h2>
      <p class="section-desc">Tap to add or remove — first topping is free on large+</p>

      <h3 class="subsection-title">Meats</h3>
      <div class="topping-grid">
        <For each={meats()}>
          {(topping) => (
            <button
              type="button"
              class="topping-card"
              classList={{ selected: cart.builder().toppingIds.includes(topping.id) }}
              onClick={() => toggleTopping(topping.id)}
            >
              <span class="topping-emoji">{topping.emoji}</span>
              <span class="topping-label">{topping.label}</span>
              <span class="topping-price">+${topping.price.toFixed(2)}</span>
            </button>
          )}
        </For>
      </div>

      <h3 class="subsection-title">Veggies</h3>
      <div class="topping-grid">
        <For each={veggies()}>
          {(topping) => (
            <button
              type="button"
              class="topping-card"
              classList={{ selected: cart.builder().toppingIds.includes(topping.id) }}
              onClick={() => toggleTopping(topping.id)}
            >
              <span class="topping-emoji">{topping.emoji}</span>
              <span class="topping-label">{topping.label}</span>
              <span class="topping-price">+${topping.price.toFixed(2)}</span>
            </button>
          )}
        </For>
      </div>
    </section>
  );
}
