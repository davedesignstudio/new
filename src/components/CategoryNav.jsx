import { For } from 'solid-js'
import './CategoryNav.css'

export default function CategoryNav(props) {
  return (
    <div class="cat-nav" role="navigation" aria-label="Menu categories">
      <div class="cat-nav__track">
        <For each={props.categories}>
          {(cat) => (
            <button
              type="button"
              class="cat-nav__item"
              classList={{ active: props.active === cat.id }}
              onClick={() => props.onSelect(cat.id)}
            >
              {cat.label}
            </button>
          )}
        </For>
      </div>
    </div>
  )
}
