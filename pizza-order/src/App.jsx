import { Show } from 'solid-js';
import { CartProvider, useCart } from './store/cart';
import Header from './components/Header';
import TabNav from './components/TabNav';
import MenuGrid from './components/MenuGrid';
import PizzaBuilder from './components/PizzaBuilder';
import SidesMenu from './components/SidesMenu';
import OrderSummary from './components/OrderSummary';
import CheckoutModal from './components/CheckoutModal';
import OrderConfirmation from './components/OrderConfirmation';
import './index.css';

function MainContent() {
  const cart = useCart();

  return (
    <main class="main-content">
      <div class="container content-layout">
        <div class="menu-area">
          <Show when={cart.activeTab() === 'pizzas'}>
            <MenuGrid />
          </Show>
          <Show when={cart.activeTab() === 'build'}>
            <PizzaBuilder />
          </Show>
          <Show when={cart.activeTab() === 'sides'}>
            <SidesMenu type="sides" />
          </Show>
          <Show when={cart.activeTab() === 'drinks'}>
            <SidesMenu type="drinks" />
          </Show>
        </div>
        <OrderSummary />
      </div>
    </main>
  );
}

function App() {
  return (
    <CartProvider>
      <div class="app">
        <Header />
        <TabNav />
        <MainContent />
        <CheckoutModal />
        <OrderConfirmation />
      </div>
    </CartProvider>
  );
}

export default App;
