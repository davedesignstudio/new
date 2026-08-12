import FrescoArt from '../art/FrescoArt';
import { getCategoryVariant } from '../data/images';

export default function CategoryNav(props) {
  return (
    <nav class="category-nav" aria-label="Categorie menu">
      <div class="container">
        <ul class="category-list">
          {props.categories.map((cat) => (
            <li>
              <button
                type="button"
                class="category-btn"
                classList={{ active: props.active === cat.id }}
                onClick={() => props.onSelect(cat.id)}
              >
                <span class="category-thumb fresco-frame fresco-frame--round">
                  <FrescoArt
                    class="category-art"
                    variant={getCategoryVariant(cat.id)}
                    type="category"
                    label={cat.label}
                  />
                </span>
                <span class="category-label">{cat.label}</span>
                <span class="category-sublabel">{cat.sublabel}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
