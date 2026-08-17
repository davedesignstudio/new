import { For } from 'solid-js';
import { listMuseumRecordsByMuseum } from '../data/museumArt';

export default function MuseumGallery() {
  const museums = () => listMuseumRecordsByMuseum();

  return (
    <section id="musei" class="museum-gallery fresco-grain" aria-labelledby="museum-gallery-title">
      <div class="container">
        <header class="museum-gallery-header">
          <p class="museum-gallery-eyebrow">Collezioni open access</p>
          <h2 id="museum-gallery-title">Arte dai Musei del Mondo</h2>
          <p class="museum-gallery-intro">
            Ogni immagine del menu, delle storie e del gioco è abbinata a un capolavoro
            di dominio pubblico da musei di New York, Cleveland, Chicago e Amsterdam —
            verificato tramite le API open access di ciascuna istituzione.
          </p>
        </header>

        <For each={museums()}>
          {(museum) => (
            <div class="museum-group">
              <h3 class="museum-group-title">
                <span class="museum-group-name">{museum.name}</span>
                <span class="museum-group-location">
                  {museum.city}, {museum.country}
                </span>
              </h3>
              <div class="museum-works">
                <For each={museum.works}>
                  {(work) => (
                    <article class="museum-work fresco-card-bg">
                      <a
                        class="museum-work-link"
                        href={work.objectURL}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div class="museum-work-image fresco-frame fresco-frame--octagon">
                          <img
                            src={work.thumb || work.image}
                            alt=""
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                        <div class="museum-work-body">
                          <h4>{work.title}</h4>
                          <p class="museum-work-artist">{work.artist || 'Artista sconosciuto'}</p>
                          <p class="museum-work-meta">
                            {[work.date, work.medium].filter(Boolean).join(' · ')}
                          </p>
                          <p class="museum-work-variant">Usato in: {work.key}</p>
                        </div>
                      </a>
                    </article>
                  )}
                </For>
              </div>
            </div>
          )}
        </For>
      </div>
    </section>
  );
}
