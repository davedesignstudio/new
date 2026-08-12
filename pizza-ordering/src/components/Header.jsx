import UiImage from './UiImage';
import { LOGO_IMAGE } from '../data/images';
import { useCart } from '../store/cart';

export default function Header() {
  const cart = useCart();

  return (
    <header class="header">
      <div class="header-ornament" aria-hidden="true">
        <span class="ornament-left">❧</span>
        <span class="ornament-center">✦ ✦ ✦</span>
        <span class="ornament-right">❧</span>
      </div>
      <div class="header-top">
        <div class="container header-top-inner">
          <a href="#" class="logo" aria-label="Antica Pizzeria Napoletana">
            <span class="logo-emblem">
              <UiImage
                class="logo-photo"
                src={LOGO_IMAGE}
                alt=""
                loading="eager"
              />
            </span>
            <span class="logo-text">
              <span class="logo-name">Antica Pizzeria</span>
              <span class="logo-sub">Napoletana · dal 1738</span>
            </span>
          </a>
          <nav class="header-nav" aria-label="Main navigation">
            <a href="#menu" class="nav-link">Menu</a>
            <a href="#storie" class="nav-link">La Storia</a>
            <a href="#offerte" class="nav-link">Offerte</a>
            <a href="#contatti" class="nav-link">Contatti</a>
          </nav>
          <div class="header-actions">
            <button type="button" class="btn-sign-in">Accedi</button>
            <button
              type="button"
              class="btn-cart"
              onClick={() => cart.setCartOpen(true)}
              aria-label={`Carrello, ${cart.itemCount()} articoli`}
            >
              <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
                <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1 1 0 0020 4H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
              </svg>
              <span class="cart-count">{cart.itemCount()}</span>
            </button>
          </div>
        </div>
      </div>
      <div class="header-arch" aria-hidden="true">
        <div class="arch-shape" />
      </div>
    </header>
  );
}
