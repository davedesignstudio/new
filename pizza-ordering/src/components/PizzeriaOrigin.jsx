import RenaissanceMedia from '../art/RenaissanceMedia';
import { RenaissanceOrnament } from '../art/RenaissanceOrnament';
import { getFeaturedStory } from '../data/stories';
import { getStoryVariant } from '../data/images';
import { SITE } from '../data/site';

export default function PizzeriaOrigin(props) {
  const story = () => getFeaturedStory();

  return (
    <section id="la-nostra-storia" class="pizzeria-origin fresco-maiolica" aria-labelledby="origin-heading">
      <div class="container">
        <div class="origin-layout fresco-card-bg">
          <div class="origin-media fresco-frame fresco-frame--arch">
            <RenaissanceMedia
              class="origin-art ren-media--card"
              source="blend"
              variant={getStoryVariant(story().id)}
              storyId={story().id}
              type="story"
              scene
              frame="arch"
              geometry="mandorla"
              label={story().title}
            />
            <span class="origin-year">{story().year}</span>
          </div>

          <div class="origin-content">
            <div class="origin-ornament" aria-hidden="true">
              <RenaissanceOrnament variant="vitruvian" />
            </div>
            <p class="origin-eyebrow">{SITE.name} · {SITE.tagline}</p>
            <h2 id="origin-heading">{story().title}</h2>
            <p class="origin-subtitle">{story().subtitle}</p>

            <blockquote class="origin-pull-quote">
              <p>{SITE.origin.pullQuote}</p>
            </blockquote>

            <p class="origin-lead">{story().body[0]}</p>
            <p class="origin-lead">{story().body[1]}</p>

            <button
              type="button"
              class="btn-origin-story"
              onClick={() => props.onSelectStory(story())}
            >
              Leggi la storia completa →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
