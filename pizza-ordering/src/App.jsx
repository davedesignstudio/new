import Header from './components/Header';
import OrderTypeBar from './components/OrderTypeBar';
import MenuGrid from './components/MenuGrid';
import PizzaBuilder from './components/PizzaBuilder';
import Cart from './components/Cart';
import UiImage from './components/UiImage';
import { CartProvider, useCart } from './store/cart';
import { HERO_IMAGE, FOOTER_IMAGE, DEALS, getDealImage } from './data/images';
import './App.css';

function HeroBanner() {
  return (
    <section
      class="hero-banner"
      aria-label="Benvenuti"
      style={{ '--hero-image': `url("${HERO_IMAGE}")` }}
    >
      <div class="hero-columns" aria-hidden="true">
        <div class="column" />
        <div class="column" />
      </div>
      <div class="container hero-inner">
        <div class="hero-arch-frame">
          <div class="hero-content">
            <p class="hero-eyebrow">Via dei Tribunali · Napoli</p>
            <h1 class="hero-title">L'Arte della Pizza Napoletana</h1>
            <p class="hero-subtitle">
              Forno a legna · Impasto lievitato 24 ore · Ingredienti DOP
            </p>
            <div class="hero-divider" aria-hidden="true">
              <span>✦</span>
              <span class="divider-line" />
              <span>✦</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DealsBanner() {
  return (
    <div class="deals-banner">
      <div class="container">
        <h2 class="deals-title">
          <span class="deals-ornament" aria-hidden="true">❧</span>
          Le Nostre Offerte
          <span class="deals-ornament" aria-hidden="true">❧</span>
        </h2>
        <div class="deals-inner">
          {DEALS.map((deal) => (
            <article class="deal-card" classList={{ featured: deal.featured }}>
              <div class="deal-image-wrap">
                <UiImage
                  class="deal-photo"
                  src={getDealImage(deal.id)}
                  alt={deal.title}
                />
              </div>
              <div class="deal-body">
                <span class="deal-tag">{deal.tag}</span>
                <h3>{deal.title}</h3>
                <p>
                  {deal.description}{' '}
                  <strong>{deal.price ?? deal.priceLabel}</strong>
                  {deal.priceSuffix ? ` ${deal.priceSuffix}` : ''}
                </p>
                <button type="button" class="btn-deal">{deal.cta}</button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

function CheckoutBar() {
  const cart = useCart();

  return (
    <div class="checkout-bar" classList={{ visible: cart.itemCount() > 0 }}>
      <div class="container checkout-bar-inner">
        <span class="checkout-items">
          {cart.itemCount()} {cart.itemCount() === 1 ? 'articolo' : 'articoli'}
        </span>
        <button type="button" class="btn-checkout-bar" onClick={() => cart.setCartOpen(true)}>
          Carrello — €{cart.subtotal().toFixed(2).replace('.', ',')}
        </button>
      </div>
    </div>
  );
}

function AppContent() {
  return (
    <div class="app">
      <Header />
      <OrderTypeBar />
      <HeroBanner />
      <DealsBanner />
      <main>
        <MenuGrid />
      </main>
      <PizzaBuilder />
      <Cart />
      <CheckoutBar />
      <footer
        class="site-footer"
        style={{ '--footer-image': `url("${FOOTER_IMAGE}")` }}
      >
        <div class="footer-ornament" aria-hidden="true">✦ ✦ ✦</div>
        <div class="container">
          <p class="footer-name">Antica Pizzeria Napoletana</p>
          <p class="footer-sub">Via dei Tribunali, 32 · 80138 Napoli · Realizzato con SolidJS</p>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
