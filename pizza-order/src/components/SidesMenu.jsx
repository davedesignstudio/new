import { For } from 'solid-js';
import { useCart } from '../store/cart';
import { SIDES, DRINKS } from '../data/menu';

export default function SidesMenu(props) {
  const cart = useCart();
  const items = () => (props.type === 'drinks' ? DRINKS : SIDES);

  return (
    <section class="menu-section">
      <div class="menu-header">
        <h2 class="section-title">
          {props.type === 'drinks' ? 'Drinks' : 'Sides & Wings'}
        </h2>
        <p class="section-desc">Perfect additions to your order</p>
      </div>

      <div class="sides-grid">
        <For each={items()}>
          {(item) => (
            <article class="side-card">
              <div class="side-image">{item.image}</div>
              <div class="side-body">
                <h3>{item.name}</h3>
                <div class="side-footer">
                  <span class="menu-price">${item.price.toFixed(2)}</span>
                  <button
                    type="button"
                    class="btn btn-primary btn-sm"
                    onClick={() =>
                      cart.addSimpleItem({
                        ...item,
                        type: props.type === 'drinks' ? 'drink' : 'side',
                      })
                    }
                  >
                    Add
                  </button>
                </div>
              </div>
            </article>
          )}
        </For>
      </div>
    </section>
  );
}
