import { For, Show } from 'solid-js'
import {
  cartCount,
  cartOpen,
  serviceMethod,
  setCartOpen,
  setServiceMethod,
  type ServiceMethod,
} from '../store/cart'
import { Button, IconCarryout, IconCart, IconDelivery, Logo } from './ui'
import { categories } from '../data/menu'

export function Header() {
  const select = (method: ServiceMethod) => setServiceMethod(method)

  return (
    <header class="site-header">
      <div class="header-inner">
        <Logo />

        <div class="service-toggle" role="group" aria-label="Order method">
          <button
            type="button"
            classList={{ active: serviceMethod() === 'delivery' }}
            onClick={() => select('delivery')}
          >
            <IconDelivery />
            Delivery
          </button>
          <button
            type="button"
            classList={{ active: serviceMethod() === 'carryout' }}
            onClick={() => select('carryout')}
          >
            <IconCarryout />
            Carryout
          </button>
        </div>

        <nav class="header-nav" aria-label="Menu sections">
          <For each={categories}>
            {(cat) => (
              <a href={`#${cat.id}`}>{cat.label.replace(' Pizzas', '').replace(' Your Own', '')}</a>
            )}
          </For>
        </nav>

        <Button
          class="cart-trigger"
          variant="primary"
          ariaLabel="Open cart"
          onClick={() => setCartOpen(!cartOpen())}
        >
          <IconCart />
          <span class="cart-label">Cart</span>
          <Show when={cartCount() > 0}>
            <span class="cart-badge">{cartCount()}</span>
          </Show>
        </Button>
      </div>
    </header>
  )
}
