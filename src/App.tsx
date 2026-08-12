import { createMemo, createSignal, Show, type Component } from 'solid-js'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { CategoryNav } from './components/CategoryNav'
import { DealsSection } from './components/DealsSection'
import { MenuGrid } from './components/MenuGrid'
import { PizzaBuilder } from './components/PizzaBuilder'
import { CartDrawer } from './components/CartDrawer'
import { menuItems, type CategoryId } from './data/menu'
import { cartStore } from './store/cart'

const App: Component = () => {
  const [category, setCategory] = createSignal<CategoryId>('pizza')
  const { builderItem } = cartStore

  const visibleItems = createMemo(() => {
    const cat = category()
    if (cat === 'deals') {
      return menuItems.filter((i) => i.category === 'pizza')
    }
    return menuItems.filter((i) => i.category === cat)
  })

  function selectCategory(id: CategoryId) {
    setCategory(id)
    if (id === 'deals') {
      document.getElementById('deals')?.scrollIntoView({ behavior: 'smooth' })
    } else {
      document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <Header />
      <Hero />
      <CategoryNav active={category()} onSelect={selectCategory} />
      <DealsSection />
      <MenuGrid items={visibleItems()} category={category()} />

      <footer class="site-footer">
        <div class="footer-inner">
          <div>
            <div class="footer-brand">Domino's</div>
            <p class="footer-note">
              Demo pizza ordering UI built with SolidJS — inspired by the Domino's
              online menu, deals, and pizza builder experience.
            </p>
          </div>
          <p class="footer-note">© {new Date().getFullYear()} Demo only. Not affiliated with Domino's Pizza.</p>
        </div>
      </footer>

      <Show when={builderItem()}>
        <PizzaBuilder />
      </Show>
      <CartDrawer />
    </>
  )
}

export default App
