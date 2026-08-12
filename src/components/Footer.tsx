import './Footer.css'

export default function Footer() {
  return (
    <footer class="site-footer">
      <div class="site-footer__inner">
        <div class="site-footer__brand">
          <span class="brand__diamond brand__diamond--sm" aria-hidden="true">
            <span class="brand__dot" />
          </span>
          <span>Domino’s Pizza Ordering UI</span>
        </div>
        <p>SolidJS demo inspired by the Domino’s online ordering experience.</p>
      </div>
    </footer>
  )
}
