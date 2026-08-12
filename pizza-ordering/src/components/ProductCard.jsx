import { For } from 'solid-js';
import { formatPrice } from '../data/menu';
import { useCart } from '../store/cart';

function PizzaVisual(props) {
  const toppings = () => props.toppings ?? [];

  return (
    <div class="pizza-visual medallion-frame" aria-hidden="true">
      <div class="medallion-ring" />
      <div class="pizza-base" />
      <div class="pizza-sauce" />
      <div class="pizza-cheese" />
      <For each={toppings()}>
        {(t, i) => (
          <span
            class={`pizza-topping topping-${t}`}
            style={{ '--i': i() }}
          />
        )}
      </For>
    </div>
  );
}

const CATEGORY_EMOJI = {
  antipasti: '🫒',
  secondi: '🍖',
  contorni: '🥗',
  dolci: '🍰',
  bevande: '🍷',
};

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
        {item().category === 'pizza' ? (
          <PizzaVisual toppings={item().defaultToppings?.slice(0, 6)} />
        ) : (
          <div class={`food-placeholder food-${item().category} medallion-frame`}>
            <span class="food-emoji">{CATEGORY_EMOJI[item().category]}</span>
          </div>
        )}
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
