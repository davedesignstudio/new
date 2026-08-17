// JS Goes here - ES6 supported
(function () {
  const carousel = document.querySelector('.gallery-carousel');
  const prev = document.querySelector('.prev');
  const next = document.querySelector('.next');

  if (carousel && typeof Siema !== 'undefined') {
    const mySiema = new Siema({
      selector: '.gallery-carousel',
      duration: 200,
      easing: 'ease',
      perPage: 1,
      startIndex: 0,
      draggable: true,
      threshold: 20,
      loop: true
    });

    if (prev) prev.addEventListener('click', () => mySiema.prev());
    if (next) next.addEventListener('click', () => mySiema.next());
  }

  requestAnimationFrame(() => {
    document.body.classList.add('is-ready');
  });
})();
