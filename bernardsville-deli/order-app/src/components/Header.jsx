import { SITE } from '../data/site';
import { useCart } from '../store/cart';
import { useStoryLang } from '../store/storyLang';

export default function Header() {
  const cart = useCart();
  const { lang, setLang } = useStoryLang();

  return (
    <header class="header fresco-grain">
      <div class="header-ornament" aria-hidden="true">
        <span class="ornament-left">❧</span>
        <span class="ornament-center">✦ ✦ ✦</span>
        <span class="ornament-right">❧</span>
      </div>
      <div class="header-top">
        <div class="container header-top-inner">
          <a href={SITE.website} class="logo" aria-label={SITE.name}>
            <span class="logo-emblem fresco-frame fresco-frame--round">
              <img
                class="logo-photo"
                src={`${import.meta.env.BASE_URL}logo.png`}
                alt=""
                width="48"
                height="48"
              />
            </span>
            <span class="logo-text">
              <span class="logo-name">Bville</span>
              <span class="logo-sub">{SITE.tagline}</span>
            </span>
          </a>
          <nav class="header-nav" aria-label="Main navigation">
            <a href={SITE.website} class="nav-link">Home</a>
            <a href="#menu" class="nav-link">Order</a>
            <a href={SITE.menuPage} class="nav-link">Full Menu</a>
            <a href="#gioco" class="nav-link">Pizza Game</a>
            <a href="#breakout" class="nav-link">Breakout</a>
            <a href="#contatti" class="nav-link">Contact</a>
          </nav>
          <div class="header-actions">
            <div class="lang-toggle" role="group" aria-label="Story language">
              <button
                type="button"
                class="lang-toggle-btn"
                classList={{ active: lang() === 'it' }}
                onClick={() => setLang('it')}
                aria-pressed={lang() === 'it'}
              >
                EN
              </button>
              <button
                type="button"
                class="lang-toggle-btn"
                classList={{ active: lang() === 'blend' }}
                onClick={() => setLang('blend')}
                aria-pressed={lang() === 'blend'}
              >
                EN·RU
              </button>
            </div>
            <a class="btn-sign-in" href={`tel:${SITE.phone.replace(/\D/g, '')}`}>Call</a>
            <button
              type="button"
              class="btn-cart"
              onClick={() => cart.setCartOpen(true)}
              aria-label={`Cart, ${cart.itemCount()} items`}
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
