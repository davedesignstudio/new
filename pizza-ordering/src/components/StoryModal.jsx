import { Show, For } from 'solid-js';
import UiImage from './UiImage';
import { STORY_IMAGES } from '../data/stories';

export default function StoryModal(props) {
  const story = () => props.story;

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
          <div
            class="story-modal-hero"
            style={{ '--story-image': `url("${STORY_IMAGES[story().imageKey] ?? STORY_IMAGES.forno}")` }}
          >
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
            <p class="story-read-time">{story().readTime} di lettura</p>
          </div>
        </article>
      </div>
    </Show>
  );
}
