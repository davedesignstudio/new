import { formatPrice } from '../data/menu';
import { getStoryForDish } from '../data/stories';
import { useCart } from '../store/cart';
import ProductImage from './ProductImage';

export default function ProductCard(props) {
  const cart = useCart();
  const item = () => props.item;
  const story = () => getStoryForDish(item().id);

  const handleAction = () => {
    if (item().customizable) {
      cart.setBuilderItem(item());
    } else {
      cart.addItem(item());
    }
  };

  const handleStory = (e) => {
    e.stopPropagation();
    const s = story();
    if (s && props.onSelectStory) {
      props.onSelectStory(s);
    }
  };

  return (
    <article class="product-card fresco-card">
      <div class="card-cornice" aria-hidden="true" />
      <div class="product-image">
        <ProductImage item={item()} />
        {item().badge && <span class="product-badge">{item().badge}</span>}
      </div>
      <div class="product-body">
        <h3 class="product-name">{item().name}</h3>
        <p class="product-desc">{item().description}</p>
        {story() && (
          <button type="button" class="product-story-link" onClick={handleStory}>
            Dish story →
          </button>
        )}
        <div class="product-footer">
          <span class="product-price">from {formatPrice(item().basePrice)}</span>
          <button type="button" class="btn-add" onClick={handleAction}>
            {item().customizable ? 'Customize' : 'Add'}
          </button>
        </div>
      </div>
    </article>
  );
}
