import { For, createMemo } from 'solid-js';
import ProductCard from './ProductCard';
import { menuItems } from '../data/menu';

export default function MenuGrid(props) {
  const filteredItems = createMemo(() =>
    menuItems.filter((item) => item.category === props.activeCategory())
  );

  const categoryLabel = createMemo(() => {
    const labels = {
      pizza: 'Pizzas',
      sides: 'Sides & Breads',
      wings: 'Chicken Wings',
      sandwiches: 'Oven-Baked Sandwiches',
      pasta: 'Pasta',
      desserts: 'Desserts',
      drinks: 'Drinks',
    };
    return labels[props.activeCategory()] || 'Menu';
  });

  return (
    <section class="menu-section">
      <div class="container">
        <div class="menu-header">
          <h2 class="menu-title">{categoryLabel()}</h2>
          <p class="menu-subtitle">
            {props.activeCategory() === 'pizza'
              ? 'Build your perfect pizza or choose from our specialty pizzas'
              : 'Add something delicious to your order'}
          </p>
        </div>

        <div class="promo-banner">
          <div class="promo-content">
            <span class="promo-tag">Limited Time</span>
            <h3 class="promo-title">Mix & Match — 2 or More Medium 2-Topping Pizzas for $6.99 each</h3>
            <p class="promo-code">Use code: <strong>PIZZA50</strong></p>
          </div>
        </div>

        <div class="product-grid">
          <For each={filteredItems()}>
            {(item) => <ProductCard item={item} onSelect={props.onSelectItem} />}
          </For>
        </div>

        {filteredItems().length === 0 && (
          <p class="empty-menu">No items in this category.</p>
        )}
      </div>
    </section>
  );
}
