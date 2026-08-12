import UiImage from './UiImage';
import { getCategoryImage } from '../data/images';

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
                <span class="category-thumb">
                  <UiImage
                    class="category-photo"
                    src={getCategoryImage(cat.id)}
                    alt={cat.label}
                    loading="eager"
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
