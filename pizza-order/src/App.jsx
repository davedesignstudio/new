import { createSignal, Show } from 'solid-js';
import { CartProvider } from './store/cart';
import Header from './components/Header';
import CategoryNav from './components/CategoryNav';
import MenuGrid from './components/MenuGrid';
import PizzaBuilder from './components/PizzaBuilder';
import Cart from './components/Cart';

export default function App() {
  const [activeCategory, setActiveCategory] = createSignal('pizza');
  const [selectedItem, setSelectedItem] = createSignal(null);

  function handleSelectItem(item) {
    setSelectedItem(item);
  }

  function handleCloseBuilder() {
    setSelectedItem(null);
  }

  return (
    <CartProvider>
      <div class="app">
        <Header />
        <CategoryNav
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
        <main>
          <MenuGrid
            activeCategory={activeCategory}
            onSelectItem={handleSelectItem}
          />
        </main>

        <footer class="footer">
          <div class="container footer-inner">
            <p>© 2026 Domino's Pizza Demo — Built with SolidJS</p>
            <p class="footer-note">This is a demo UI and not affiliated with Domino's Pizza.</p>
          </div>
        </footer>

        <Cart />

        <Show when={selectedItem()}>
          <PizzaBuilder item={selectedItem()} onClose={handleCloseBuilder} />
        </Show>
      </div>
    </CartProvider>
  );
}
