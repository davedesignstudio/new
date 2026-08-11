import { initCart } from './cart';
import { initPizzaBuilder } from './pizza-builder';

initCart();

if (document.querySelector('.pizza-menu')) {
  initPizzaBuilder();
}

if (document.querySelector('.gallery-carousel')) {
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

  const prev = document.querySelector('.prev');
  const next = document.querySelector('.next');

  if (prev) prev.addEventListener('click', () => mySiema.prev());
  if (next) next.addEventListener('click', () => mySiema.next());
}
