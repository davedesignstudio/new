import { createSignal, createMemo, For, Show } from 'solid-js';
import { CATEGORIES, MENU_ITEMS } from '../data/menu';
import { getCategoryPhotoUrl } from '../data/photos';
import { getCategoryVariant } from '../data/images';
import CategoryNav from './CategoryNav';
import ProductCard from './ProductCard';
import RenaissanceMedia from '../art/RenaissanceMedia';

export default function MenuGrid(props) {
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

  const categoryPhoto = createMemo(() => getCategoryPhotoUrl(activeCategory()));

  return (
    <section class="menu-section">
      <CategoryNav
        categories={CATEGORIES}
        active={activeCategory()}
        onSelect={setActiveCategory}
      />
      <div class="container">
        <div class="section-header">
          <div class="section-header-art fresco-scene-bg">
            <Show
              when={categoryPhoto()}
              fallback={
                <RenaissanceMedia
                  class="section-art ren-media--scene"
                  source="blend"
                  variant={getCategoryVariant(activeCategory())}
                  type="category"
                  geometry="frieze"
                  label={categoryLabel()}
                />
              }
            >
              <img
                class="section-photo"
                src={categoryPhoto()}
                alt=""
                width="1200"
                height="400"
                loading="lazy"
                decoding="async"
              />
            </Show>
          </div>
          <div class="fresco-scene-overlay section-header-overlay" />
          <div class="section-header-content">
            <h2 class="section-title">{categoryLabel()}</h2>
            <p class="section-sublabel">{categorySublabel()}</p>
          </div>
        </div>
        <div class="product-grid">
          <For each={filteredItems()}>
            {(item) => <ProductCard item={item} onSelectStory={props.onSelectStory} />}
          </For>
        </div>
      </div>
    </section>
  );
}
