import { SIDES } from '../data/pizzas';
import { addToCart } from '../stores/orderStore';

function ItemGrid({ items, title, subtitle, type }) {
  const handleAdd = (item) => {
    addToCart({
      type,
      name: item.label,
      description: item.description,
      totalPrice: item.price,
      quantity: 1,
    });
  };

  return (
    <section class="menu-section">
      <div class="section-header">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>

      <div class="item-grid">
        {items.map((item) => (
          <article class="item-card" key={item.id}>
            <div class="item-emoji">{item.emoji}</div>
            <div class="item-info">
              <h2>{item.label}</h2>
              <p>{item.description}</p>
              <div class="item-footer">
                <span class="price">${item.price.toFixed(2)}</span>
                <button type="button" class="btn-primary btn-sm" onClick={() => handleAdd(item)}>
                  Add to Order
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function SidesGrid() {
  return (
    <ItemGrid
      items={SIDES}
      title="Sides & Desserts"
      subtitle="Perfect companions for your pizza"
      type="side"
    />
  );
}

export default SidesGrid;
