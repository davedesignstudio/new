(function () {
  document.documentElement.classList.add("js");

  var toggle = document.querySelector(".menu-toggle");
  var nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  var items = document.querySelectorAll(".work-item");
  items.forEach(function (item) {
    item.classList.add("is-visible");
  });

  var year = document.getElementById("dps-year");
  if (year) {
    year.textContent = String(new Date().getFullYear());
  }
})();
