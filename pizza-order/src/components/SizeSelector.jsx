import { For } from 'solid-js';
import { useCart } from '../store/cart';
import { SIZES } from '../data/menu';

export default function SizeSelector() {
  const cart = useCart();

  return (
    <section class="builder-section">
      <h2 class="section-title">Choose Your Size</h2>
      <p class="section-desc">Select a size to get started</p>
      <div class="option-grid size-grid">
        <For each={SIZES}>
          {(size) => (
            <button
              type="button"
              class="option-card size-card"
              classList={{ selected: cart.builder().sizeId === size.id }}
              onClick={() => cart.updateBuilder({ sizeId: size.id })}
            >
              <span class="size-inches">{size.inches}</span>
              <span class="size-label">{size.label}</span>
              <span class="size-meta">{size.slices} slices</span>
              <span class="size-price">from ${size.basePrice.toFixed(2)}</span>
            </button>
          )}
        </For>
      </div>
    </section>
  );
}
