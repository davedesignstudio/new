import { PIZZAS } from '../data/pizzas';
import { setCustomizingPizza } from '../stores/orderStore';

export default function PizzaGrid() {
  return (
    <section class="menu-section">
      <div class="section-header">
        <h1>Choose Your Pizza</h1>
        <p>Handmade with fresh ingredients, baked to perfection</p>
      </div>

      <div class="pizza-grid">
        {PIZZAS.map((pizza) => (
          <article class="pizza-card" key={pizza.id}>
            {pizza.badge && <span class="pizza-badge">{pizza.badge}</span>}
            <div class="pizza-image">
              <span class="pizza-emoji">{pizza.emoji}</span>
            </div>
            <div class="pizza-info">
              <h2>{pizza.name}</h2>
              <p>{pizza.description}</p>
              <div class="pizza-footer">
                <span class="price">From ${pizza.price.toFixed(2)}</span>
                <button
                  type="button"
                  class="btn-primary"
                  onClick={() => setCustomizingPizza(pizza)}
                >
                  {pizza.isCustom ? 'Start Building' : 'Customize'}
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
