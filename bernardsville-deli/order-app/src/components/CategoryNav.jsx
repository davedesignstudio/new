import { getCategoryPhotoUrl } from '../data/photos';

export default function CategoryNav(props) {
  return (
    <nav class="category-nav" aria-label="Menu categories">
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
                  <img
                    class="category-photo"
                    src={getCategoryPhotoUrl(cat.id)}
                    alt=""
                    width="72"
                    height="72"
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
