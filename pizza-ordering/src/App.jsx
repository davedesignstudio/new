import Header from './components/Header';
import OrderTypeBar from './components/OrderTypeBar';
import MenuGrid from './components/MenuGrid';
import PizzaBuilder from './components/PizzaBuilder';
import Cart from './components/Cart';
import { CartProvider, useCart } from './store/cart';
import './App.css';

function HeroBanner() {
  return (
    <section class="hero-banner" aria-label="Benvenuti">
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
          <div class="deal-card featured">
            <span class="deal-tag">Menu Degustazione</span>
            <h3>Pizza + Antipasto + Dolce</h3>
            <p>Margherita, bruschetta e sfogliatella — <strong>€16,90</strong></p>
            <button type="button" class="btn-deal">Scopri</button>
          </div>
          <div class="deal-card">
            <span class="deal-tag">Asporto</span>
            <h3>Due Pizze al Prezzo di Una</h3>
            <p>Ogni martedì, dalle 18:00 — <strong>asporto</strong></p>
            <button type="button" class="btn-deal">Scopri</button>
          </div>
          <div class="deal-card">
            <span class="deal-tag">Consegna</span>
            <h3>Consegna Gratuita</h3>
            <p>Per ordini superiori a <strong>€25</strong> in centro Napoli</p>
            <button type="button" class="btn-deal">Ordina Ora</button>
          </div>
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
      <footer class="site-footer">
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
