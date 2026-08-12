import { For } from 'solid-js';
import RenaissanceMedia from '../art/RenaissanceMedia';
import { RenaissanceOrnament } from '../art/RenaissanceOrnament';
import { STORIES } from '../data/stories';
import { getStoryVariant } from '../data/images';

export default function StoriesSection(props) {
  return (
    <section id="storie" class="stories-section fresco-maiolica" aria-labelledby="stories-heading">
      <div class="container">
        <header class="stories-header">
          <div class="stories-header-rose" aria-hidden="true">
            <RenaissanceOrnament variant="rose" />
          </div>
          <h2 id="stories-heading">Le Nostre Storie</h2>
          <p class="stories-intro">
            Sette racconti — dalla fondazione al Vesuvio — scritti dal fuoco e dalla memoria di Napoli.
          </p>
        </header>

        <div class="stories-grid">
          <For each={STORIES.filter((s) => !s.featured)}>
            {(story) => (
              <article class="story-card fresco-card-bg">
                <button
                  type="button"
                  class="story-card-btn"
                  onClick={() => props.onSelectStory(story)}
                >
                  <div class="story-card-image fresco-frame fresco-frame--octagon">
                    <RenaissanceMedia
                      class="story-art ren-media--card"
                      source="blend"
                      variant={getStoryVariant(story.id)}
                      storyId={story.id}
                      type="story"
                      frame="octagon"
                      geometry="mandorla"
                      scene={['forno', 'tribunali', 'vesuvio'].includes(getStoryVariant(story.id))}
                      label={story.title}
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
