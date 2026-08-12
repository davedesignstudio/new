import { For, Show } from 'solid-js';
import RenaissanceMedia from '../art/RenaissanceMedia';
import { getStoryVariant } from '../data/images';
import { getMenuItemById, formatPrice } from '../data/menu';

export default function StoryModal(props) {
  const story = () => props.story;
  const relatedItem = () => getMenuItemById(story()?.relatedDish);

  return (
    <Show when={story()}>
      <div class="modal-overlay" onClick={props.onClose} role="presentation">
        <article
          class="modal story-modal"
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="story-title"
        >
          <div class="story-modal-hero">
            <div class="story-modal-art fresco-scene-bg">
              <RenaissanceMedia
                class="ren-media--scene"
                source="blend"
                variant={getStoryVariant(story().id)}
                storyId={story().id}
                type="story"
                scene={['forno', 'tribunali', 'vesuvio'].includes(getStoryVariant(story().id))}
                geometry="rose"
                label={story().title}
              />
            </div>
            <div class="fresco-scene-overlay" />
            <button type="button" class="btn-close story-close" onClick={props.onClose} aria-label="Chiudi">
              ✕
            </button>
            <div class="story-modal-hero-content">
              <span class="story-tag">{story().tag}</span>
              <span class="story-year">{story().year}</span>
              <h2 id="story-title">{story().title}</h2>
              <p class="story-subtitle">{story().subtitle}</p>
            </div>
          </div>

          <div class="story-modal-body">
            <For each={story().body}>
              {(paragraph) => <p>{paragraph}</p>}
            </For>
            <Show when={relatedItem()}>
              <p class="story-related-dish">
                <a href="#menu" class="story-dish-link" onClick={props.onClose}>
                  Ordina {relatedItem().name} — da {formatPrice(relatedItem().basePrice)}
                </a>
              </p>
            </Show>
            <p class="story-read-time">{story().readTime} di lettura</p>
          </div>
        </article>
      </div>
    </Show>
  );
}
