export default function Hero(props) {
  return (
    <section class="hero">
      <div class="hero__media" aria-hidden="true">
        <img
          src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1800&q=80"
          alt=""
        />
        <div class="hero__veil" />
      </div>

      <div class="hero__content">
        <p class="hero__brand">Dommino's</p>
        <h1>Pizza that hits different — hot, custom, ready when you are.</h1>
        <p class="hero__sub">
          Delivery or carryout. Build your pie, snag a deal, and track every bite from oven to door.
        </p>

        <div class="hero__cta">
          <div class="hero-toggle" role="group" aria-label="Order type">
            <button
              type="button"
              classList={{ active: props.orderType === 'delivery' }}
              onClick={() => props.onOrderType('delivery')}
            >
              Delivery
            </button>
            <button
              type="button"
              classList={{ active: props.orderType === 'carryout' }}
              onClick={() => props.onOrderType('carryout')}
            >
              Carryout
            </button>
          </div>
          <button type="button" class="hero__start" onClick={props.onStart}>
            Start Your Order
          </button>
        </div>
      </div>
    </section>
  )
}
