const filterStatus = document.querySelector("[data-filter-status]");
const workCards = Array.prototype.slice.call(document.querySelectorAll(".work-card"));
const serviceLinks = Array.prototype.slice.call(document.querySelectorAll(".service"));

const labels = {
  "web-design": "Web Design projects.",
  print: "Print projects.",
  advertising: "Advertising + Marketing projects."
};

function currentFilter() {
  return (window.location.hash || "").replace("#", "");
}

function applyWorkFilter() {
  const filter = currentFilter();

  workCards.forEach(function (card) {
    const match = !filter || card.getAttribute("data-category") === filter;
    if (match) {
      card.classList.remove("is-hidden");
    } else {
      card.classList.add("is-hidden");
    }
  });

  serviceLinks.forEach(function (link) {
    const isActive = link.getAttribute("data-filter") === filter;
    if (isActive) {
      link.classList.add("is-active");
    } else {
      link.classList.remove("is-active");
    }
  });

  if (filterStatus) {
    filterStatus.textContent = labels[filter] || "Selected projects across web, print, and campaigns.";
  }
}

window.addEventListener("hashchange", applyWorkFilter);
applyWorkFilter();

const contactForm = document.querySelector("[data-contact-form]");
const formSuccess = document.querySelector("[data-form-success]");

if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    if (contactForm.getAttribute("data-netlify") === "true") {
      return;
    }
    event.preventDefault();
    contactForm.hidden = true;
    if (formSuccess) {
      formSuccess.hidden = false;
    }
  });
}
