// JS Goes here - ES6 supported
const carousel = document.querySelector('.gallery-carousel');
const previousButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

if (carousel && previousButton && nextButton && typeof Siema !== 'undefined') {
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

  previousButton.addEventListener('click', () => mySiema.prev());
  nextButton.addEventListener('click', () => mySiema.next());
}
