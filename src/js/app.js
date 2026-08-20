// JS Goes here - ES6 supported
const galleryCarousel = document.querySelector('.gallery-carousel');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

if (galleryCarousel && prevButton && nextButton) {
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

  prevButton.addEventListener('click', () => mySiema.prev());
  nextButton.addEventListener('click', () => mySiema.next());
}
