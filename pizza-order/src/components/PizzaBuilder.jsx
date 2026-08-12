import { createSignal, createMemo, For, Show } from 'solid-js';
import {
  sizes,
  crusts,
  sauces,
  cheeses,
  toppings,
  calculatePizzaPrice,
  formatPrice,
} from '../data/menu';
import { useCart } from '../store/cart';

export default function PizzaBuilder(props) {
  const cart = useCart();
  const item = () => props.item;

  const [size, setSize] = createSignal('medium');
  const [crust, setCrust] = createSignal('hand-tossed');
  const [sauce, setSauce] = createSignal('robust');
  const [cheese, setCheese] = createSignal('normal');
  const [selectedToppings, setSelectedToppings] = createSignal([]);
  const [quantity, setQuantity] = createSignal(1);

  const price = createMemo(() =>
    calculatePizzaPrice(item(), {
      size: size(),
      crust: crust(),
      cheese: cheese(),
      selectedToppings: selectedToppings(),
    })
  );

  function toggleTopping(toppingId) {
    setSelectedToppings((prev) =>
      prev.includes(toppingId)
        ? prev.filter((id) => id !== toppingId)
        : [...prev, toppingId]
    );
  }

  function handleAddToCart() {
    const sizeLabel = sizes.find((s) => s.id === size())?.label;
    const crustLabel = crusts.find((c) => c.id === crust())?.label;
    const sauceLabel = sauces.find((s) => s.id === sauce())?.label;
    const cheeseLabel = cheeses.find((c) => c.id === cheese())?.label;

    const allToppings = [...toppings.meats, ...toppings.veggies];
    const toppingLabels = selectedToppings()
      .map((id) => allToppings.find((t) => t.id === id)?.label)
      .filter(Boolean);

    cart.addItem({
      menuItemId: item().id,
      name: item().name,
      price: price(),
      quantity: quantity(),
      image: item().image,
      customizations: {
        size: sizeLabel,
        crust: crustLabel,
        sauce: sauceLabel,
        cheese: cheeseLabel,
        toppings: toppingLabels,
      },
    });

    props.onClose();
  }

  function handleQuickAdd() {
    cart.addItem({
      menuItemId: item().id,
      name: item().name,
      price: item().basePrice,
      quantity: 1,
      image: item().image,
      customizations: null,
    });
    props.onClose();
  }

  return (
    <div class="modal-overlay" onClick={props.onClose}>
      <div class="modal pizza-builder" onClick={(e) => e.stopPropagation()}>
        <button class="modal-close" onClick={props.onClose} aria-label="Close">
          ✕
        </button>

        <div class="builder-header">
          <img src={item().image} alt={item().name} class="builder-image" />
          <div class="builder-header-info">
            <h2 class="builder-title">{item().name}</h2>
            <p class="builder-description">{item().description}</p>
          </div>
        </div>

        <Show
          when={item().isCustomizable}
          fallback={
            <div class="builder-simple">
              <div class="builder-price-row">
                <span class="builder-price">{formatPrice(item().basePrice)}</span>
                <div class="quantity-control">
                  <button onClick={() => setQuantity(Math.max(1, quantity() - 1))}>−</button>
                  <span>{quantity()}</span>
                  <button onClick={() => setQuantity(quantity() + 1)}>+</button>
                </div>
              </div>
              <button class="btn-primary btn-full" onClick={handleQuickAdd}>
                Add to Cart — {formatPrice(item().basePrice * quantity())}
              </button>
            </div>
          }
        >
          <div class="builder-body">
            <section class="builder-section">
              <h3 class="section-title">Size</h3>
              <div class="option-grid size-grid">
                <For each={sizes}>
                  {(s) => (
                    <button
                      class={`option-btn ${size() === s.id ? 'selected' : ''}`}
                      onClick={() => setSize(s.id)}
                    >
                      <span class="option-label">{s.label}</span>
                      <span class="option-sub">{s.inches}</span>
                    </button>
                  )}
                </For>
              </div>
            </section>

            <section class="builder-section">
              <h3 class="section-title">Crust</h3>
              <div class="option-list">
                <For each={crusts}>
                  {(c) => (
                    <button
                      class={`option-row ${crust() === c.id ? 'selected' : ''}`}
                      onClick={() => setCrust(c.id)}
                    >
                      <span>{c.label}</span>
                      {c.price > 0 && <span class="option-price">+{formatPrice(c.price)}</span>}
                    </button>
                  )}
                </For>
              </div>
            </section>

            <section class="builder-section">
              <h3 class="section-title">Sauce</h3>
              <div class="option-list">
                <For each={sauces}>
                  {(s) => (
                    <button
                      class={`option-row ${sauce() === s.id ? 'selected' : ''}`}
                      onClick={() => setSauce(s.id)}
                    >
                      {s.label}
                    </button>
                  )}
                </For>
              </div>
            </section>

            <section class="builder-section">
              <h3 class="section-title">Cheese</h3>
              <div class="option-list">
                <For each={cheeses}>
                  {(c) => (
                    <button
                      class={`option-row ${cheese() === c.id ? 'selected' : ''}`}
                      onClick={() => setCheese(c.id)}
                    >
                      <span>{c.label}</span>
                      {c.price > 0 && <span class="option-price">+{formatPrice(c.price)}</span>}
                    </button>
                  )}
                </For>
              </div>
            </section>

            <section class="builder-section">
              <h3 class="section-title">Meats</h3>
              <div class="topping-grid">
                <For each={toppings.meats}>
                  {(t) => (
                    <button
                      class={`topping-btn ${selectedToppings().includes(t.id) ? 'selected' : ''}`}
                      onClick={() => toggleTopping(t.id)}
                    >
                      <span>{t.label}</span>
                      <span class="topping-price">+{formatPrice(t.price)}</span>
                    </button>
                  )}
                </For>
              </div>
            </section>

            <section class="builder-section">
              <h3 class="section-title">Veggies</h3>
              <div class="topping-grid">
                <For each={toppings.veggies}>
                  {(t) => (
                    <button
                      class={`topping-btn ${selectedToppings().includes(t.id) ? 'selected' : ''}`}
                      onClick={() => toggleTopping(t.id)}
                    >
                      <span>{t.label}</span>
                      <span class="topping-price">+{formatPrice(t.price)}</span>
                    </button>
                  )}
                </For>
              </div>
            </section>
          </div>

          <div class="builder-footer">
            <div class="quantity-control">
              <button onClick={() => setQuantity(Math.max(1, quantity() - 1))}>−</button>
              <span>{quantity()}</span>
              <button onClick={() => setQuantity(quantity() + 1)}>+</button>
            </div>
            <button class="btn-primary" onClick={handleAddToCart}>
              Add to Cart — {formatPrice(price() * quantity())}
            </button>
          </div>
        </Show>
      </div>
    </div>
  );
}
