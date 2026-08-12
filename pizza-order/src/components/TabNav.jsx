import { useCart } from '../store/cart';

const TABS = [
  { id: 'pizzas', label: 'Pizzas' },
  { id: 'build', label: 'Build Your Own' },
  { id: 'sides', label: 'Sides & Wings' },
  { id: 'drinks', label: 'Drinks' },
];

export default function TabNav() {
  const cart = useCart();

  return (
    <nav class="tab-nav" aria-label="Menu categories">
      <div class="container tab-nav-inner">
        {TABS.map((tab) => (
          <button
            type="button"
            class="tab-btn"
            classList={{ active: cart.activeTab() === tab.id }}
            onClick={() => cart.setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
