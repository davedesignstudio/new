import { createSignal } from 'solid-js';
import { formatPrice, isPizzaItem } from '../data/menu';
import { getStoryForDish } from '../data/stories';
import { useCart } from '../store/cart';
import ProductImage from './ProductImage';

export default function ProductCard(props) {
  const cart = useCart();
  const item = () => props.item;
  const story = () => getStoryForDish(item().id);
  const canCustomize = () => isPizzaItem(item());
  const [justAdded, setJustAdded] = createSignal(false);

  const addDish = () => {
    if (canCustomize()) {
      cart.setBuilderItem(item());
      return;
    }
    cart.addItem(item());
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 900);
  };

  const handleKey = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      addDish();
    }
  };

  const handleStory = (event) => {
    event.stopPropagation();
    const s = story();
    if (s && props.onSelectStory) {
      props.onSelectStory(s);
    }
  };

  return (
    <article
      id={`item-${item().id}`}
      class="product-card fresco-card dish-line-card product-card--clickable"
      classList={{ 'is-added': justAdded() }}
      role="button"
      tabIndex={0}
      aria-label={canCustomize() ? `Customize ${item().name}` : `Add ${item().name} to cart`}
      onClick={addDish}
      onKeyDown={handleKey}
    >
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
          <span class="product-price">
            {canCustomize() ? `from ${formatPrice(item().basePrice)}` : formatPrice(item().basePrice)}
          </span>
          <span class="btn-add" aria-hidden="true">
            {justAdded() ? 'Added' : canCustomize() ? 'Customize' : 'Add'}
          </span>
        </div>
      </div>
    </article>
  );
}
