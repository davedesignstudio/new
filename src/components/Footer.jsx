export default function Footer() {
  return (
    <footer class="site-footer">
      <div class="site-footer__inner">
        <div class="site-footer__brand">
          <span class="logo__mark" aria-hidden="true">
            <span class="logo__dot" />
            <span class="logo__dot" />
          </span>
          <div>
            <strong>Dommino's</strong>
            <p>A Domino's-inspired ordering demo built with SolidJS.</p>
          </div>
        </div>
        <div class="site-footer__cols">
          <div>
            <h3>Order</h3>
            <p>Delivery</p>
            <p>Carryout</p>
            <p>Tracking</p>
          </div>
          <div>
            <h3>Menu</h3>
            <p>Pizza</p>
            <p>Wings</p>
            <p>Deals</p>
          </div>
          <div>
            <h3>Help</h3>
            <p>Nutrition</p>
            <p>Allergens</p>
            <p>Contact</p>
          </div>
        </div>
      </div>
      <p class="site-footer__note">Demo only — not affiliated with Domino's Pizza.</p>
    </footer>
  )
}
