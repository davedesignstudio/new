document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const id = link.getAttribute('href');
    if (!id || id === '#') return;
    const target = document.querySelector(id);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth' });
  });
});

const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('#site-nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

document.querySelector('.btn-signup')?.addEventListener('click', () => {
  alert('Thanks for signing up! 15% off your first order.');
});

const storiesDataEl = document.getElementById('stories-data');
const storyModal = document.getElementById('story-modal');

if (storiesDataEl && storyModal) {
  const stories = JSON.parse(storiesDataEl.textContent || '[]');
  const storyMap = Object.fromEntries(stories.map((story) => [story.id, story]));
  const langKey = 'bville-story-lang';
  let currentLang = localStorage.getItem(langKey) || 'en';

  const langButtons = document.querySelectorAll('.lang-btn');

  function mergedStory(story, lang) {
    if (lang !== 'blend' || !story.blend) return story;
    return {
      ...story,
      tag: story.blend.tag || story.tag,
      title: story.blend.title || story.title,
      subtitle: story.blend.subtitle || story.subtitle,
      excerpt: story.blend.excerpt || story.excerpt,
      quote: story.blend.quote || story.quote,
      body: story.blend.body || story.body,
    };
  }

  function applyLanguage(lang) {
    currentLang = lang;
    localStorage.setItem(langKey, lang);
    langButtons.forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    document.body.classList.toggle('story-blend-text', lang === 'blend');

    document.querySelectorAll('.story-text').forEach((el) => {
      const id = el.dataset.storyId;
      const story = storyMap[id];
      if (!story) return;
      const merged = mergedStory(story, lang);
      const field = el.dataset.field;
      const index = el.dataset.index;

      if (field === 'quote') {
        el.textContent = `"${merged.quote || ''}"`;
      } else if (field === 'excerpt') {
        el.textContent = merged.excerpt || '';
      } else if (field === 'body' && index !== undefined) {
        el.textContent = merged.body?.[Number(index)] || '';
      } else if (!field) {
        el.textContent = merged.title || '';
      }
    });
  }

  langButtons.forEach((btn) => {
    btn.addEventListener('click', () => applyLanguage(btn.dataset.lang || 'en'));
  });

  applyLanguage(currentLang);

  const modalImage = document.getElementById('story-modal-image');
  const modalTag = document.getElementById('story-modal-tag');
  const modalTitle = document.getElementById('story-modal-title');
  const modalSubtitle = document.getElementById('story-modal-subtitle');
  const modalQuote = document.getElementById('story-modal-quote');
  const modalBody = document.getElementById('story-modal-body');
  const modalCta = document.getElementById('story-modal-cta');

  function openStory(id) {
    const story = mergedStory(storyMap[id], currentLang);
    if (!story) return;

    modalImage.src = story.image;
    modalImage.alt = story.title;
    modalTag.textContent = `${story.tag} · ${story.year}`;
    modalTitle.textContent = story.title;
    modalSubtitle.textContent = story.subtitle || '';
    modalQuote.textContent = story.quote ? `"${story.quote}"` : '';
    modalQuote.hidden = !story.quote;
    modalBody.innerHTML = (story.body || []).map((p) => `<p>${p}</p>`).join('');

    if (story.related_category === 'cafe') {
      modalCta.href = 'cafe.php';
      modalCta.textContent = 'View coffee menu';
    } else if (story.related_category) {
      modalCta.href = `menu.php#${story.related_category}`;
      modalCta.textContent = 'Order from the menu';
    } else {
      modalCta.href = 'menu.php';
      modalCta.textContent = 'Explore the menu';
    }

    storyModal.hidden = false;
    storyModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeStory() {
    storyModal.hidden = true;
    storyModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.story-open').forEach((btn) => {
    btn.addEventListener('click', () => openStory(btn.dataset.storyId || ''));
  });

  storyModal.querySelectorAll('[data-close-modal]').forEach((el) => {
    el.addEventListener('click', closeStory);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !storyModal.hidden) closeStory();
  });
}
