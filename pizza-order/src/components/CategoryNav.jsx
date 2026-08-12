import { For } from 'solid-js';
import { categories } from '../data/menu';

export default function CategoryNav(props) {
  return (
    <nav class="category-nav">
      <div class="container">
        <ul class="category-list">
          <For each={categories}>
            {(category) => (
              <li>
                <button
                  class={`category-btn ${props.activeCategory() === category.id ? 'active' : ''}`}
                  onClick={() => props.setActiveCategory(category.id)}
                >
                  <span class="category-icon">{category.icon}</span>
                  <span class="category-label">{category.label}</span>
                </button>
              </li>
            )}
          </For>
        </ul>
      </div>
    </nav>
  );
}
