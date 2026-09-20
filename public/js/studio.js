(function () {
  var toggle = document.querySelector(".menu-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  var year = document.getElementById("y");
  if (year) year.textContent = String(new Date().getFullYear());

  var form = document.querySelector("[data-studio-form]");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var status = document.querySelector(".form-status");
      if (status) status.classList.add("is-visible");
      form.reset();
    });
  }
})();
