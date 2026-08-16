// JS Goes here - ES6 supported
const galleryCarousel = document.querySelector('.gallery-carousel');

if (galleryCarousel) {
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

  const prevButton = document.querySelector('.prev');
  const nextButton = document.querySelector('.next');

  if (prevButton && nextButton) {
    prevButton.addEventListener('click', () => mySiema.prev());
    nextButton.addEventListener('click', () => mySiema.next());
  }
}
