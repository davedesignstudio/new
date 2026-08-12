import { For } from 'solid-js';
import { useCart } from '../store/cart';
import { TOPPINGS } from '../data/menu';

export default function PizzaVisual() {
  const cart = useCart();
  const toppings = () =>
    cart.builder().toppingIds
      .map((id) => TOPPINGS.find((t) => t.id === id))
      .filter(Boolean);

  return (
    <div class="pizza-visual" aria-hidden="true">
      <div class="pizza-plate">
        <div
          class="pizza-base"
          classList={{
            small: cart.builder().sizeId === 'small',
            medium: cart.builder().sizeId === 'medium',
            large: cart.builder().sizeId === 'large',
            xlarge: cart.builder().sizeId === 'xlarge',
            thin: cart.builder().crustId === 'thin',
            pan: cart.builder().crustId === 'handmade-pan',
          }}
        >
          <div class="pizza-sauce" />
          <div
            class="pizza-cheese"
            classList={{
              light: cart.builder().cheeseId === 'light',
              extra: cart.builder().cheeseId === 'extra',
              none: cart.builder().cheeseId === 'none',
            }}
          />
          <div class="pizza-toppings">
            <For each={toppings()}>
              {(topping, i) => (
                <span
                  class="topping-dot"
                  classList={{ [topping.category]: true }}
                  style={{
                    '--i': i(),
                    '--n': toppings().length,
                  }}
                >
                  {topping.emoji}
                </span>
              )}
            </For>
          </div>
        </div>
      </div>
      <p class="pizza-visual-label">Live preview</p>
    </div>
  );
}
