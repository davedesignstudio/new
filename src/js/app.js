// Home interactions for D Hülhower Studio
document.addEventListener("DOMContentLoaded", () => {
  const panels = document.querySelectorAll(".services__panel");
  panels.forEach((panel) => {
    panel.addEventListener("mouseenter", () => {
      panel.classList.add("is-hot");
    });
    panel.addEventListener("mouseleave", () => {
      panel.classList.remove("is-hot");
    });
  });
});
