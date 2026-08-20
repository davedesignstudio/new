// JS Goes here - ES6 supported
const gallery = document.querySelector('.gallery-carousel');

if (gallery && typeof Siema !== 'undefined') {
  const caption = document.querySelector('.gallery-caption-current');
  const slides = gallery.querySelectorAll('img');

  const updateCaption = () => {
    if (!caption || !slides.length) return;
    const index = mySiema.currentSlide % slides.length;
    caption.textContent = slides[index].getAttribute('alt') || '';
  };

  const mySiema = new Siema({
    selector: '.gallery-carousel',
    duration: 400,
    easing: 'ease',
    perPage: 1,
    startIndex: 0,
    draggable: true,
    threshold: 20,
    loop: true,
    onInit: updateCaption,
    onChange: updateCaption
  });

  document.querySelector('.prev').addEventListener('click', () => mySiema.prev());
  document.querySelector('.next').addEventListener('click', () => mySiema.next());
}
