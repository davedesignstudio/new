import { formatPrice } from '../data/menu';
import { useCart } from '../store/cart';
import ProductImage from './ProductImage';

export default function ProductCard(props) {
  const cart = useCart();
  const item = () => props.item;

  const handleAction = () => {
    if (item().customizable) {
      cart.setBuilderItem(item());
    } else {
      cart.addItem(item());
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
        <div class="product-footer">
          <span class="product-price">da {formatPrice(item().basePrice)}</span>
          <button type="button" class="btn-add" onClick={handleAction}>
            {item().customizable ? 'Personalizza' : 'Aggiungi'}
          </button>
        </div>
      </div>
    </article>
  );
}
