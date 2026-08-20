// Only initialise the carousel on pages where its markup is present.
const gallery = document.querySelector('.gallery-carousel');

if (gallery) {
  const mySiema = new Siema({
    selector: '.gallery-carousel',
    duration: 320,
    easing: 'ease-out',
    perPage: 1,
    startIndex: 0,
    draggable: true,
    threshold: 20,
    loop: true
  });

  document.querySelector('.prev').addEventListener('click', () => mySiema.prev());
  document.querySelector('.next').addEventListener('click', () => mySiema.next());
}
