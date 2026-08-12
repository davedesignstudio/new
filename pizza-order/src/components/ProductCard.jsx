import { formatPrice } from '../data/menu';

export default function ProductCard(props) {
  const item = () => props.item;

  return (
    <article class="product-card" onClick={() => props.onSelect(item())}>
      <div class="product-image-wrap">
        <img src={item().image} alt={item().name} class="product-image" loading="lazy" />
        {item().badge && <span class="product-badge">{item().badge}</span>}
      </div>
      <div class="product-body">
        <h3 class="product-name">{item().name}</h3>
        <p class="product-description">{item().description}</p>
        <div class="product-footer">
          <span class="product-price">From {formatPrice(item().basePrice)}</span>
          <button class="add-btn" onClick={(e) => { e.stopPropagation(); props.onSelect(item()); }}>
            {item().isCustomizable ? 'Customize' : 'Add'}
          </button>
        </div>
      </div>
    </article>
  );
}
