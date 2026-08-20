// JS Goes here - ES6 supported
const galleryCarousel = document.querySelector('.gallery-carousel');
const previousButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

if (galleryCarousel && previousButton && nextButton) {
  const mySiema = new Siema({
    selector: galleryCarousel,
    duration: 200,
    easing: 'ease',
    perPage: 1,
    startIndex: 0,
    draggable: true,
    threshold: 20,
    loop: true
  });

  previousButton.addEventListener('click', () => mySiema.prev());
  nextButton.addEventListener('click', () => mySiema.next());
}
