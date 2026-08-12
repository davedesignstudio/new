import UiImage from './UiImage';
import { ORDER_IMAGES } from '../data/images';
import { useCart } from '../store/cart';

export default function OrderTypeBar() {
  const cart = useCart();

  return (
    <div class="order-bar">
      <div class="container order-bar-inner">
        <div class="order-type-toggle" role="tablist" aria-label="Tipo di ordine">
          <button
            type="button"
            role="tab"
            class="order-type-btn"
            classList={{ active: cart.orderType() === 'delivery' }}
            aria-selected={cart.orderType() === 'delivery'}
            onClick={() => cart.setOrderType('delivery')}
          >
            <UiImage
              class="order-type-photo"
              src={ORDER_IMAGES.delivery}
              alt=""
              loading="eager"
            />
            Consegna
          </button>
          <button
            type="button"
            role="tab"
            class="order-type-btn"
            classList={{ active: cart.orderType() === 'carryout' }}
            aria-selected={cart.orderType() === 'carryout'}
            onClick={() => cart.setOrderType('carryout')}
          >
            <UiImage
              class="order-type-photo"
              src={ORDER_IMAGES.carryout}
              alt=""
              loading="eager"
            />
            Asporto
          </button>
        </div>

        <div class="address-input-wrap">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" class="address-icon" aria-hidden="true">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z" />
          </svg>
          <input
            type="text"
            class="address-input"
            placeholder={
              cart.orderType() === 'delivery'
                ? 'Inserisci il tuo indirizzo a Napoli'
                : 'Via dei Tribunali o codice postale'
            }
            value={cart.address()}
            onInput={(e) => cart.setAddress(e.currentTarget.value)}
            aria-label="Indirizzo"
          />
          <button type="button" class="btn-locate">Trova</button>
        </div>
      </div>
    </div>
  );
}
