import { createSignal, createMemo, createEffect, For, Show } from 'solid-js';
import {
  SIZES,
  CRUSTS,
  SAUCES,
  CHEESE_LEVELS,
  TOPPINGS,
  calcPizzaPrice,
  formatPrice,
} from '../data/menu';
import RenaissanceMedia from '../art/RenaissanceMedia';
import { getItemVariant } from '../data/images';
import { useCart } from '../store/cart';

export default function PizzaBuilder() {
  const cart = useCart();
  const item = () => cart.builderItem();

  const [size, setSize] = createSignal('twelve');
  const [crust, setCrust] = createSignal('stone');
  const [sauce, setSauce] = createSignal('pizza');
  const [cheese, setCheese] = createSignal('normale');
  const [toppings, setToppings] = createSignal([]);

  createEffect(() => {
    const i = item();
    if (i) {
      setSize('twelve');
      setCrust('stone');
      setSauce('pizza');
      setCheese('normale');
      setToppings([...(i.defaultToppings ?? [])]);
    }
  });

  const toggleTopping = (id) => {
    setToppings((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const options = createMemo(() => ({
    size: size(),
    crust: crust(),
    sauce: sauce(),
    cheese: cheese(),
    toppings: toppings(),
  }));

  const price = createMemo(() => {
    const i = item();
    if (!i) return 0;
    return calcPizzaPrice(i, options());
  });

  const handleAdd = () => {
    const i = item();
    if (!i) return;
    cart.addItem(i, options());
    cart.setBuilderItem(null);
  };

  const close = () => cart.setBuilderItem(null);

  return (
    <Show when={item()}>
      <div class="modal-overlay" onClick={close} role="presentation">
        <div
          class="modal pizza-builder"
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="builder-title"
        >
          <div class="builder-header">
            <span class="builder-ornament" aria-hidden="true">❧</span>
            <h2 id="builder-title">Build your {item()?.name}</h2>
            <button type="button" class="btn-close" onClick={close} aria-label="Close">
              ✕
            </button>
          </div>

          <div class="builder-body">
            <div class="builder-preview">
              <div class="builder-pizza fresco-frame fresco-frame--round">
                <RenaissanceMedia
                  class="builder-art ren-media--card"
                  source="blend"
                  variant={getItemVariant(item())}
                  type="food"
                  frame="round"
                  geometry="mandorla"
                  label={item()?.name}
                />
              </div>
              <p class="builder-price">{formatPrice(price())}</p>
            </div>

            <div class="builder-options">
              <section class="option-section">
                <h3>Size</h3>
                <div class="option-grid size-grid">
                  <For each={SIZES}>
                    {(s) => (
                      <button
                        type="button"
                        class="option-btn"
                        classList={{ active: size() === s.id }}
                        onClick={() => setSize(s.id)}
                      >
                        <span class="option-label">{s.label}</span>
                        <span class="option-sub">{s.inches}</span>
                        {s.priceMod > 0 && (
                          <span class="option-price">+{formatPrice(s.priceMod)}</span>
                        )}
                      </button>
                    )}
                  </For>
                </div>
              </section>

              <section class="option-section">
                <h3>Crust</h3>
                <div class="option-list">
                  <For each={CRUSTS}>
                    {(c) => (
                      <button
                        type="button"
                        class="option-row"
                        classList={{ active: crust() === c.id }}
                        onClick={() => setCrust(c.id)}
                      >
                        <span>{c.label}</span>
                        {c.priceMod > 0 && (
                          <span class="option-price">+{formatPrice(c.priceMod)}</span>
                        )}
                      </button>
                    )}
                  </For>
                </div>
              </section>

              <section class="option-section">
                <h3>Sauce</h3>
                <div class="option-list">
                  <For each={SAUCES}>
                    {(s) => (
                      <button
                        type="button"
                        class="option-row"
                        classList={{ active: sauce() === s.id }}
                        onClick={() => setSauce(s.id)}
                      >
                        {s.label}
                      </button>
                    )}
                  </For>
                </div>
              </section>

              <section class="option-section">
                <h3>Cheese</h3>
                <div class="option-grid cheese-grid">
                  <For each={CHEESE_LEVELS}>
                    {(c) => (
                      <button
                        type="button"
                        class="option-btn"
                        classList={{ active: cheese() === c.id }}
                        onClick={() => setCheese(c.id)}
                      >
                        {c.label}
                        {(c.priceMod ?? 0) > 0 && (
                          <span class="option-price">+{formatPrice(c.priceMod)}</span>
                        )}
                      </button>
                    )}
                  </For>
                </div>
              </section>

              <section class="option-section">
                <h3>Toppings</h3>
                <div class="toppings-group">
                  <h4>Carni & Formaggi</h4>
                  <div class="topping-grid">
                    <For each={TOPPINGS.filter((t) => t.category === 'carne')}>
                      {(t) => (
                        <button
                          type="button"
                          class="topping-btn"
                          classList={{ active: toppings().includes(t.id) }}
                          onClick={() => toggleTopping(t.id)}
                        >
                          {t.label}
                          <span class="topping-price">+{formatPrice(t.price)}</span>
                        </button>
                      )}
                    </For>
                  </div>
                </div>
                <div class="toppings-group">
                  <h4>Verdure & Erbe</h4>
                  <div class="topping-grid">
                    <For each={TOPPINGS.filter((t) => t.category === 'verdura')}>
                      {(t) => (
                        <button
                          type="button"
                          class="topping-btn"
                          classList={{ active: toppings().includes(t.id) }}
                          onClick={() => toggleTopping(t.id)}
                        >
                          {t.label}
                          <span class="topping-price">+{formatPrice(t.price)}</span>
                        </button>
                      )}
                    </For>
                  </div>
                </div>
              </section>
            </div>
          </div>

          <div class="builder-footer">
            <button type="button" class="btn-secondary" onClick={close}>
              Annulla
            </button>
            <button type="button" class="btn-primary" onClick={handleAdd}>
              Add — {formatPrice(price())}
            </button>
          </div>
        </div>
      </div>
    </Show>
  );
}
