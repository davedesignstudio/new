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
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
              <path d="M18 18.5a1.5 1.5 0 01-1.5-1.5 1.5 1.5 0 011.5-1.5 1.5 1.5 0 011.5 1.5 1.5 1.5 0 01-1.5 1.5m1.5-9l1.96 2.5H17V9.5m-11 9A1.5 1.5 0 01.5 17 1.5 1.5 0 012 15.5 1.5 1.5 0 013.5 17 1.5 1.5 0 013 18.5M20 8h-3V4H3c-1.11 0-2 .89-2 2v11h2a3 3 0 003 3 3 3 0 003-3h6a3 3 0 003 3 3 3 0 003-3h2v-5l-3-4z" />
            </svg>
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
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
              <path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z" />
            </svg>
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
