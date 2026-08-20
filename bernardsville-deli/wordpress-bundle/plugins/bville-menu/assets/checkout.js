document.addEventListener("DOMContentLoaded", function () {
  var select = document.getElementById("bville_fulfillment");
  var field = document.getElementById("bville_delivery_address_field");
  if (!select || !field) {
    return;
  }

  function toggle() {
    var delivery = select.value === "delivery";
    field.style.display = delivery ? "" : "none";
    var input = field.querySelector("input");
    if (input) {
      input.required = delivery;
    }
  }

  select.addEventListener("change", toggle);
  toggle();
});
