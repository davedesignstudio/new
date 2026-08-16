import { createSignal, For } from 'solid-js';
import Header from './components/Header';
import OrderTypeBar from './components/OrderTypeBar';
import MenuGrid from './components/MenuGrid';
import StoriesSection from './components/StoriesSection';
import PizzeriaOrigin from './components/PizzeriaOrigin';
import StoryModal from './components/StoryModal';
import PizzaBuilder from './components/PizzaBuilder';
import PizzaGame from './components/PizzaGame';
import MuseumGallery from './components/MuseumGallery';
import Cart from './components/Cart';
import RenaissanceMedia from './art/RenaissanceMedia';
import { RenaissanceOrnament } from './art/RenaissanceOrnament';
import { CartProvider, useCart } from './store/cart';
import { StoryLangProvider, useStoryLang } from './store/storyLang';
import { resolveSiteOrigin } from './data/storyBlend';
import { SCENE_VARIANTS } from './data/images';
import { SITE } from './data/site';
import { DEALS } from './data/deals';
import './art/patterns.css';
import './art/photoTreatment.css';
import './App.css';

function HeroBanner() {
  const { lang } = useStoryLang();
  const copy = () => resolveSiteOrigin(lang());

  return (
    <section class="hero-banner fresco-grain" aria-label="Welcome">
      <div class="fresco-scene-bg hero-scene-bg">
        <RenaissanceMedia
          class="ren-media--scene"
          source="blend"
          variant={SCENE_VARIANTS.hero}
          type="scene"
          scene
          geometry="mandorla"
          label="Bville stone oven"
        />
      </div>
      <div class="fresco-scene-overlay hero-overlay" />
      <div class="hero-columns" aria-hidden="true">
        <div class="column" />
        <div class="column" />
      </div>
      <div class="container hero-inner">
        <div class="hero-arch-frame fresco-frame fresco-frame--arch fresco-frame--octagon">
          <div class="hero-content">
            <p class="hero-eyebrow">159 Morristown Rd · Bernardsville</p>
            <h1 class="hero-title">Order Online</h1>
            <p class="hero-subtitle">
              {copy().headline || SITE.origin.headline}
            </p>
            <div class="hero-divider" aria-hidden="true">
              <span>✦</span>
              <span class="divider-line" />
              <span>✦</span>
            </div>
            <a href="#menu" class="hero-story-link">Start an order</a>
            <a href={`tel:${SITE.phone.replace(/\D/g, '')}`} class="hero-story-link hero-story-link--secondary">Call {SITE.phone}</a>
            <a href={SITE.menuPage} class="hero-story-link hero-story-link--secondary">Full printed menu</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function DealsBanner() {
  return (
    <div id="offerte" class="deals-banner">
      <div class="container">
        <h2 class="deals-title">
          <span class="deals-ornament" aria-hidden="true">❧</span>
          Specials
          <span class="deals-ornament" aria-hidden="true">❧</span>
        </h2>
        <div class="deals-inner">
          {DEALS.map((deal) => (
            <article class="deal-card fresco-card-bg" classList={{ featured: deal.featured }}>
              <div class="deal-image-wrap fresco-frame fresco-frame--octagon">
                <RenaissanceMedia
                  class="deal-art ren-media--card"
                  source="blend"
                  variant={deal.id}
                  type="deal"
                  frame="octagon"
                  geometry="rose"
                  label={deal.title}
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
          {cart.itemCount()} {cart.itemCount() === 1 ? 'item' : 'items'}
        </span>
        <button type="button" class="btn-checkout-bar" onClick={() => cart.setCartOpen(true)}>
          Cart — ${cart.subtotal().toFixed(2)}
        </button>
      </div>
    </div>
  );
}

function AppContent() {
  const [activeStory, setActiveStory] = createSignal(null);

  return (
    <div class="app fresco-maiolica">
      <Header />
      <OrderTypeBar />
      <HeroBanner />
      <RenaissanceOrnament variant="frieze" className="section-ornament" />
      <PizzeriaOrigin onSelectStory={setActiveStory} />
      <PizzaGame onSelectStory={setActiveStory} />
      <StoriesSection onSelectStory={setActiveStory} />
      <RenaissanceOrnament variant="mandorla" className="section-ornament section-ornament--compact" />
      <MuseumGallery />
      <RenaissanceOrnament variant="rose" className="section-ornament section-ornament--compact" />
      <DealsBanner />
      <RenaissanceOrnament variant="vitruvian" className="section-ornament" />
      <main id="menu">
        <MenuGrid onSelectStory={setActiveStory} />
      </main>
      <StoryModal story={activeStory()} onClose={() => setActiveStory(null)} />
      <PizzaBuilder />
      <Cart />
      <CheckoutBar />
      <footer id="contatti" class="site-footer fresco-grain">
        <div class="fresco-scene-bg footer-scene-bg">
          <RenaissanceMedia
            class="ren-media--scene"
            source="blend"
            variant={SCENE_VARIANTS.footer}
            type="scene"
            scene
            geometry="vitruvian"
            label="Bernardsville"
          />
        </div>
        <div class="fresco-scene-overlay footer-overlay" />
        <div class="footer-ornament" aria-hidden="true">✦ ✦ ✦</div>
        <div class="container">
          <p class="footer-name">{SITE.name}</p>
          <p class="footer-sub">
            {SITE.address} · {SITE.city}
          </p>
          <p class="footer-contact">
            <a href={`tel:${SITE.phone.replace(/\D/g, '')}`}>{SITE.phone}</a>
            {' · '}
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </p>
          <div class="footer-hours">
            <p class="footer-hours-title">{SITE.hours.label}</p>
            <ul>
              <For each={SITE.hours.schedule}>
                {(row) => (
                  <li>
                    <span>{row.days}</span> {row.time}
                  </li>
                )}
              </For>
            </ul>
          </div>
          <ul class="footer-heritage" aria-label="About Bville">
            <For each={SITE.heritage}>
              {(line) => <li>{line}</li>}
            </For>
          </ul>
          <p class="footer-credit">{SITE.photoCredit}</p>
          <p class="footer-tech"><a href={SITE.website}>← Back to Bville site</a> · Ordering UI with SolidJS</p>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <StoryLangProvider>
        <AppContent />
      </StoryLangProvider>
    </CartProvider>
  );
}
