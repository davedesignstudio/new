// JS Goes here - ES6 supported
const carousel = document.querySelector('.gallery-carousel');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

if (carousel && prevButton && nextButton) {
  const gallerySlider = new Siema({
    selector: '.gallery-carousel',
    duration: 200,
    easing: 'ease',
    perPage: 1,
    startIndex: 0,
    draggable: true,
    threshold: 20,
    loop: true
  });

  prevButton.addEventListener('click', () => gallerySlider.prev());
  nextButton.addEventListener('click', () => gallerySlider.next());
}
