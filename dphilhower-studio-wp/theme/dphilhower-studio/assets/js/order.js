(function () {
  var fallbackMenu = {
    "ember-plain": { name: "Plain pie", kitchen: "Plain pie", price: 16, category: "Pies" },
    "ember-pepperoni": { name: "Pepperoni pie", kitchen: "Pepperoni pie", price: 18, category: "Pies" },
    "ember-margherita": { name: "Margherita pie", kitchen: "Margherita pie", price: 19, category: "Pies" },
    "ember-slice": { name: "Cheese slice", kitchen: "Cheese slice", price: 4, category: "After 4" },
    "ember-salad": { name: "Green salad", kitchen: "Green salad", price: 8, category: "After 4" }
  };
  var menu = (window.dpsOrder && window.dpsOrder.menu) || fallbackMenu;
  var cart = {};
  var list = document.getElementById("order-lines");
  var totalEl = document.getElementById("order-total");
  var form = document.getElementById("order-form");
  var itemsField = document.getElementById("order-items");
  var printer = document.getElementById("printer-received");
  var ticketEl = document.getElementById("printer-ticket");
  var statusEl = document.getElementById("order-status");
  if (!list || !form) return;

  function money(n) {
    return "$" + Number(n).toFixed(2);
  }

  function rows() {
    return Object.keys(cart).filter(function (sku) { return cart[sku] > 0; }).map(function (sku) {
      return { sku: sku, qty: cart[sku], item: menu[sku] };
    });
  }

  function render() {
    var chosen = rows();
    if (!chosen.length) {
      list.innerHTML = "<li class=\"order-empty\">Nothing on the ticket yet.</li>";
    } else {
      list.innerHTML = chosen.map(function (row) {
        return "<li><span>" + row.qty + " × " + row.item.name + "</span><span>" + money(row.qty * row.item.price) + "</span></li>";
      }).join("");
    }
    var total = chosen.reduce(function (sum, row) { return sum + row.qty * row.item.price; }, 0);
    if (totalEl) totalEl.textContent = money(total);
    if (itemsField) itemsField.value = JSON.stringify(chosen.map(function (row) { return { sku: row.sku, qty: row.qty }; }));
    document.querySelectorAll("[data-sku]").forEach(function (btn) {
      var qty = cart[btn.getAttribute("data-sku")] || 0;
      var badge = btn.querySelector(".qty-badge");
      if (badge) badge.textContent = qty ? String(qty) : "";
    });
  }

  document.querySelectorAll("[data-sku]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var sku = btn.getAttribute("data-sku");
      cart[sku] = Math.min(20, (cart[sku] || 0) + 1);
      render();
    });
  });

  var clearBtn = document.getElementById("order-clear");
  if (clearBtn) {
    clearBtn.addEventListener("click", function () {
      cart = {};
      render();
    });
  }

  function showTicket(plain, number, detail) {
    if (!printer || !ticketEl) return;
    printer.hidden = false;
    ticketEl.textContent = plain;
    if (statusEl) {
      statusEl.textContent = "Order " + number + " is at the printer. " + (detail || "");
    }
    printer.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  form.addEventListener("submit", function (event) {
    var mode = window.dpsOrder && window.dpsOrder.mode;
    if (mode === "wordpress") return;
    event.preventDefault();
    var body = {
      guest: form.guest.value,
      phone: form.phone.value,
      ready: form.ready.value,
      note: form.note.value,
      items: rows().map(function (row) { return { sku: row.sku, qty: row.qty }; })
    };
    if (statusEl) statusEl.textContent = "Sending the ticket…";
    fetch("api/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    }).then(function (res) { return res.json(); }).then(function (data) {
      if (!data.ok) {
        if (statusEl) statusEl.textContent = data.error || "The printer did not take the order.";
        return;
      }
      showTicket(data.ticket, data.number, data.transport === "tcp" ? "Sent on the restaurant network." : "Held in the kitchen spool until a printer address is set.");
    }).catch(function () {
      if (statusEl) statusEl.textContent = "The order did not reach the printer.";
    });
  });

  function sample() {
    cart = { "ember-pepperoni": 1, "ember-salad": 1 };
    form.guest.value = "Alex Rivera";
    form.phone.value = "908-555-0148";
    form.ready.value = "6:30 PM";
    form.note.value = "Slice the pie. Extra napkins.";
    render();
    if (window.dpsOrder && window.dpsOrder.mode === "wordpress") {
      form.requestSubmit ? form.requestSubmit() : form.submit();
      return;
    }
    form.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
  }

  var sampleBtn = document.getElementById("order-sample");
  if (sampleBtn) sampleBtn.addEventListener("click", sample);
  if (new URLSearchParams(window.location.search).has("sample")) sample();
  render();
})();
