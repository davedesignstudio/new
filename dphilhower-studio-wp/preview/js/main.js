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

  var form = document.querySelector(".contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var box = document.querySelector(".form-success");
      if (!box) {
        box = document.createElement("p");
        box.className = "form-success";
        form.parentNode.insertBefore(box, form);
      }
      box.textContent =
        "Thanks — your project note is ready. On the live WordPress site this form emails hello@dphilhower.com.";
      form.reset();
    });
  }
})();
