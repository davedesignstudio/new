import { createSignal, createMemo } from 'solid-js';
import { SIZES, CRUSTS, TOPPINGS } from '../data/pizzas';
import {
  customizingPizza,
  setCustomizingPizza,
  calculatePizzaPrice,
  addToCart,
} from '../stores/orderStore';

export default function CustomizeModal() {
  const pizza = customizingPizza();
  if (!pizza) return null;

  const [sizeId, setSizeId] = createSignal('medium');
  const [crustId, setCrustId] = createSignal('hand-tossed');
  const [selectedToppings, setSelectedToppings] = createSignal(
    pizza.toppings ? [...pizza.toppings] : []
  );
  const [quantity, setQuantity] = createSignal(1);

  const totalPrice = createMemo(() =>
    calculatePizzaPrice(sizeId(), crustId(), selectedToppings())
  );

  const toggleTopping = (id) => {
    setSelectedToppings((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const handleAdd = () => {
    const size = SIZES.find((s) => s.id === sizeId());
    const crust = CRUSTS.find((c) => c.id === crustId());
    const toppingLabels = selectedToppings()
      .map((id) => TOPPINGS.find((t) => t.id === id)?.label)
      .filter(Boolean);

    addToCart({
      type: 'pizza',
      name: pizza.name,
      description: `${size?.label} ${crust?.label}${toppingLabels.length ? ` — ${toppingLabels.join(', ')}` : ''}`,
      sizeId: sizeId(),
      crustId: crustId(),
      toppings: selectedToppings(),
      totalPrice: totalPrice(),
      quantity: quantity(),
    });

    setCustomizingPizza(null);
  };

  const meatToppings = TOPPINGS.filter((t) => t.category === 'meat');
  const veggieToppings = TOPPINGS.filter((t) => t.category === 'veggie');
  const cheeseToppings = TOPPINGS.filter((t) => t.category === 'cheese');

  return (
    <div class="modal-overlay" onClick={() => setCustomizingPizza(null)}>
      <div
        class="modal customize-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="customize-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div class="modal-header">
          <h2 id="customize-title">{pizza.name}</h2>
          <button
            type="button"
            class="modal-close"
            aria-label="Close"
            onClick={() => setCustomizingPizza(null)}
          >
            ✕
          </button>
        </div>

        <div class="modal-body">
          <div class="customize-preview">
            <span class="preview-emoji">{pizza.emoji}</span>
            <p class="preview-price">${totalPrice().toFixed(2)}</p>
          </div>

          <div class="customize-section">
            <h3>Size</h3>
            <div class="option-grid size-grid">
              {SIZES.map((size) => (
                <button
                  type="button"
                  key={size.id}
                  class={`option-btn ${sizeId() === size.id ? 'selected' : ''}`}
                  onClick={() => setSizeId(size.id)}
                >
                  <span class="option-label">{size.label}</span>
                  <span class="option-sub">{size.inches}</span>
                  <span class="option-price">${size.basePrice.toFixed(2)}</span>
                </button>
              ))}
            </div>
          </div>

          <div class="customize-section">
            <h3>Crust</h3>
            <div class="option-grid crust-grid">
              {CRUSTS.map((crust) => (
                <button
                  type="button"
                  key={crust.id}
                  class={`option-btn ${crustId() === crust.id ? 'selected' : ''}`}
                  onClick={() => setCrustId(crust.id)}
                >
                  <span class="option-label">{crust.label}</span>
                  {crust.price > 0 && (
                    <span class="option-price">+${crust.price.toFixed(2)}</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div class="customize-section">
            <h3>Toppings</h3>
            <div class="topping-category">
              <h4>Meats</h4>
              <div class="topping-grid">
                {meatToppings.map((t) => (
                  <label class="topping-chip" key={t.id}>
                    <input
                      type="checkbox"
                      checked={selectedToppings().includes(t.id)}
                      onChange={() => toggleTopping(t.id)}
                    />
                    <span>{t.label}</span>
                    <span class="topping-price">+${t.price.toFixed(2)}</span>
                  </label>
                ))}
              </div>
            </div>
            <div class="topping-category">
              <h4>Veggies</h4>
              <div class="topping-grid">
                {veggieToppings.map((t) => (
                  <label class="topping-chip" key={t.id}>
                    <input
                      type="checkbox"
                      checked={selectedToppings().includes(t.id)}
                      onChange={() => toggleTopping(t.id)}
                    />
                    <span>{t.label}</span>
                    <span class="topping-price">+${t.price.toFixed(2)}</span>
                  </label>
                ))}
              </div>
            </div>
            <div class="topping-category">
              <h4>Cheese</h4>
              <div class="topping-grid">
                {cheeseToppings.map((t) => (
                  <label class="topping-chip" key={t.id}>
                    <input
                      type="checkbox"
                      checked={selectedToppings().includes(t.id)}
                      onChange={() => toggleTopping(t.id)}
                    />
                    <span>{t.label}</span>
                    <span class="topping-price">+${t.price.toFixed(2)}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div class="customize-section quantity-section">
            <h3>Quantity</h3>
            <div class="quantity-control">
              <button
                type="button"
                class="qty-btn"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span class="qty-value">{quantity()}</span>
              <button
                type="button"
                class="qty-btn"
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn-secondary" onClick={() => setCustomizingPizza(null)}>
            Cancel
          </button>
          <button type="button" class="btn-primary btn-lg" onClick={handleAdd}>
            Add to Order — ${(totalPrice() * quantity()).toFixed(2)}
          </button>
        </div>
      </div>
    </div>
  );
}
