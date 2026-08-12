import { For, Show } from 'solid-js';
import { useCart } from '../store/cart';
import { SPECIALTY_PIZZAS } from '../data/menu';

export default function MenuGrid() {
  const cart = useCart();

  function addSpecialty(pizza) {
    cart.addPizzaToCart({
      sizeId: 'medium',
      crustId: 'hand-tossed',
      sauceId: 'robust',
      cheeseId: 'normal',
      toppingIds: [...pizza.toppings],
      quantity: 1,
      name: pizza.name,
    });
  }

  return (
    <section class="menu-section">
      <div class="menu-header">
        <h2 class="section-title">Specialty Pizzas</h2>
        <p class="section-desc">Chef-crafted favorites — medium hand tossed included</p>
      </div>

      <div class="menu-grid">
        <For each={SPECIALTY_PIZZAS}>
          {(pizza) => (
            <article class="menu-card">
              <Show when={pizza.badge}>
                <span class="menu-badge">{pizza.badge}</span>
              </Show>
              <div class="menu-card-image">{pizza.image}</div>
              <div class="menu-card-body">
                <h3>{pizza.name}</h3>
                <p>{pizza.description}</p>
                <div class="menu-card-footer">
                  <span class="menu-price">${pizza.basePrice.toFixed(2)}</span>
                  <button
                    type="button"
                    class="btn btn-primary btn-sm"
                    onClick={() => addSpecialty(pizza)}
                  >
                    Add to Order
                  </button>
                </div>
              </div>
            </article>
          )}
        </For>
      </div>
    </section>
  );
}
