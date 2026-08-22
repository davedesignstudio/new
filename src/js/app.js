// Highlight the current page in the sidebar navigation
const currentPath = window.location.pathname.replace(/\/+$/, "") || "/";

document.querySelectorAll(".sidebar-nav a").forEach(link => {
  const linkPath = link.getAttribute("href").replace(/\/+$/, "") || "/";
  if (linkPath === currentPath) {
    link.classList.add("active");
    link.setAttribute("aria-current", "page");
  }
});
