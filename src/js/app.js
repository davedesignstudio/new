// Navigation + gallery controls
(function () {
  const toggle = document.querySelector('[data-nav-toggle]');
  const nav = document.querySelector('[data-nav]');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      document.body.classList.toggle('nav-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        document.body.classList.remove('nav-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open menu');
      });
    });
  }

  const carousel = document.querySelector('.gallery-carousel');
  const prev = document.querySelector('.prev');
  const next = document.querySelector('.next');

  if (carousel && typeof Siema !== 'undefined' && prev && next) {
    const mySiema = new Siema({
      selector: '.gallery-carousel',
      duration: 280,
      easing: 'ease',
      perPage: 1,
      startIndex: 0,
      draggable: true,
      threshold: 20,
      loop: true
    });

    prev.addEventListener('click', () => mySiema.prev());
    next.addEventListener('click', () => mySiema.next());
  }
})();
