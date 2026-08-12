import type { Component } from 'solid-js'
import { For } from 'solid-js'
import { categories, type CategoryId } from '../data/menu'

interface Props {
  active: CategoryId
  onSelect: (id: CategoryId) => void
}

export const CategoryNav: Component<Props> = (props) => {
  return (
    <div class="cat-nav-wrap">
      <nav class="cat-nav" aria-label="Menu categories">
        <For each={categories}>
          {(cat) => (
            <button
              type="button"
              class="cat-btn"
              classList={{ active: props.active === cat.id }}
              onClick={() => props.onSelect(cat.id)}
            >
              {cat.label}
            </button>
          )}
        </For>
      </nav>
    </div>
  )
}
