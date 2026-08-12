import { For, Show } from 'solid-js';
import { useCart } from '../store/cart';
import { CRUSTS } from '../data/menu';

export default function CrustSelector() {
  const cart = useCart();
  const isSmall = () => cart.builder().sizeId === 'small';

  return (
    <section class="builder-section">
      <h2 class="section-title">Choose Your Crust</h2>
      <p class="section-desc">Every crust is made fresh daily</p>
      <div class="option-grid crust-grid">
        <For each={CRUSTS}>
          {(crust) => {
            const disabled = () => crust.smallOnly && !isSmall();
            return (
              <button
                type="button"
                class="option-card crust-card"
                classList={{
                  selected: cart.builder().crustId === crust.id,
                  disabled: disabled(),
                }}
                disabled={disabled()}
                onClick={() => cart.updateBuilder({ crustId: crust.id })}
              >
                <span class="crust-label">{crust.label}</span>
                <span class="crust-desc">{crust.description}</span>
                <Show when={crust.price > 0}>
                  <span class="crust-price">+${crust.price.toFixed(2)}</span>
                </Show>
                <Show when={crust.smallOnly}>
                  <span class="crust-badge">Small only</span>
                </Show>
              </button>
            );
          }}
        </For>
      </div>
    </section>
  );
}
