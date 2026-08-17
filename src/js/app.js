// Tunnel Test Pizzeria — light motion hooks
document.documentElement.classList.add("js");

const pie = document.querySelector(".hero-pie");
if (pie && window.matchMedia("(pointer:fine)").matches) {
  window.addEventListener(
    "pointermove",
    (event) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 8;
      const y = (event.clientY / window.innerHeight - 0.5) * 8;
      pie.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(0.92)`;
    },
    { passive: true }
  );
}
