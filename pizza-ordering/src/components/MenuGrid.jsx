import { createSignal, createMemo, For } from 'solid-js';
import { CATEGORIES, MENU_ITEMS } from '../data/menu';
import CategoryNav from './CategoryNav';
import ProductCard from './ProductCard';

export default function MenuGrid() {
  const [activeCategory, setActiveCategory] = createSignal('pizza');

  const filteredItems = createMemo(() =>
    MENU_ITEMS.filter((item) => item.category === activeCategory())
  );

  const categoryLabel = createMemo(
    () => CATEGORIES.find((c) => c.id === activeCategory())?.label ?? 'Menu'
  );

  const categorySublabel = createMemo(
    () => CATEGORIES.find((c) => c.id === activeCategory())?.sublabel ?? ''
  );

  return (
    <section class="menu-section">
      <CategoryNav
        categories={CATEGORIES}
        active={activeCategory()}
        onSelect={setActiveCategory}
      />
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">{categoryLabel()}</h2>
          <p class="section-sublabel">{categorySublabel()}</p>
        </div>
        <div class="product-grid">
          <For each={filteredItems()}>
            {(item) => <ProductCard item={item} />}
          </For>
        </div>
      </div>
    </section>
  );
}
