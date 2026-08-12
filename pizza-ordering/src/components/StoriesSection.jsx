import { For } from 'solid-js';
import UiImage from './UiImage';
import { STORIES, STORY_IMAGES } from '../data/stories';

const IMAGE_KEYS = {
  'forno-1738': 'forno',
  'regina-margherita': 'margherita',
  'via-tribunali': 'tribunali',
  'impasto-24-ore': 'impasto',
  'sfogliatella-mare': 'sfogliatella',
  'vesuvio-vigilia': 'vesuvio',
};

export default function StoriesSection(props) {
  return (
    <section id="storie" class="stories-section" aria-labelledby="stories-heading">
      <div class="container">
        <header class="stories-header">
          <span class="stories-ornament" aria-hidden="true">❧</span>
          <h2 id="stories-heading">Le Nostre Storie</h2>
          <p class="stories-intro">
            Tre secoli di forno, vicoli e ricordi — racconti scritti dal fuoco e dalla memoria di Napoli.
          </p>
        </header>

        <div class="stories-grid">
          <For each={STORIES}>
            {(story) => (
              <article class="story-card">
                <button
                  type="button"
                  class="story-card-btn"
                  onClick={() => props.onSelectStory({ ...story, imageKey: IMAGE_KEYS[story.id] })}
                >
                  <div class="story-card-image">
                    <UiImage
                      class="story-photo"
                      src={STORY_IMAGES[IMAGE_KEYS[story.id]]}
                      alt={story.title}
                    />
                    <span class="story-card-year">{story.year}</span>
                  </div>
                  <div class="story-card-body">
                    <span class="story-tag">{story.tag}</span>
                    <h3>{story.title}</h3>
                    <p class="story-excerpt">{story.excerpt}</p>
                    <span class="story-cta">Leggi la storia →</span>
                  </div>
                </button>
              </article>
            )}
          </For>
        </div>
      </div>
    </section>
  );
}
