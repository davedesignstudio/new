// Highlight the sidebar link that matches the current page.
document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname.replace(/\/+$/, '') || '/';

  document.querySelectorAll('.sidebar-nav a').forEach((link) => {
    const href = link.getAttribute('href').replace(/\/+$/, '') || '/';
    if (href === path) {
      link.classList.add('active');
    }
  });
});
