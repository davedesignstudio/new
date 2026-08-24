(function () {
  var form = document.querySelector("[data-contact-form]");
  if (!form) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var status = form.querySelector("[data-form-status]");
    if (status) {
      status.hidden = false;
      status.textContent =
        "Got it — the studio will follow up. Wire this form to your inbox before launch.";
    }
    form.reset();
  });
})();
