import { For, Show } from 'solid-js'
import './MenuCard.css'

export default function MenuCard(props) {
  const item = () => props.item

  return (
    <article class="menu-card">
      <button type="button" class="menu-card__hit" onClick={props.onAction}>
        <div class="menu-card__media">
          <img src={item().image} alt="" loading="lazy" />
          <Show when={item().tags?.length}>
            <div class="menu-card__tags">
              <For each={item().tags}>{(tag) => <span>{tag}</span>}</For>
            </div>
          </Show>
        </div>
        <div class="menu-card__body">
          <h3>{item().name}</h3>
          <p>{item().desc}</p>
          <div class="menu-card__row">
            <span class="price">${item().basePrice.toFixed(2)}</span>
            <span class="menu-card__cta">{props.cta}</span>
          </div>
        </div>
      </button>
    </article>
  )
}
