// Pizza ordering UI for Tasty Licks

const PIZZAS = [
  {
    id: "margherita",
    name: "Margherita",
    description: "San Marzano tomato, fresh mozzarella, basil, olive oil",
    basePrice: 14
  },
  {
    id: "pepperoni",
    name: "Pepperoni",
    description: "Tomato sauce, mozzarella, cupped pepperoni",
    basePrice: 16
  },
  {
    id: "veggie",
    name: "Veggie Supreme",
    description: "Mushrooms, peppers, onion, olives, roasted tomato",
    basePrice: 17
  },
  {
    id: "bbq-chicken",
    name: "BBQ Chicken",
    description: "Smoky BBQ, grilled chicken, red onion, cilantro",
    basePrice: 18
  },
  {
    id: "four-cheese",
    name: "Four Cheese",
    description: "Mozzarella, provolone, fontina, parmesan",
    basePrice: 16
  },
  {
    id: "build-your-own",
    name: "Build Your Own",
    description: "Tomato sauce, mozzarella — stack the toppings you want",
    basePrice: 12
  }
];

const SIZES = [
  { id: "small", label: "Small 10\"", multiplier: 0.85 },
  { id: "medium", label: "Medium 12\"", multiplier: 1 },
  { id: "large", label: "Large 14\"", multiplier: 1.25 }
];

const CRUSTS = [
  { id: "thin", label: "Thin", extra: 0 },
  { id: "hand", label: "Hand-tossed", extra: 0 },
  { id: "thick", label: "Thick", extra: 1.5 }
];

const TOPPINGS = [
  { id: "pepperoni", label: "Pepperoni", price: 1.5 },
  { id: "mushrooms", label: "Mushrooms", price: 1.25 },
  { id: "peppers", label: "Bell peppers", price: 1.25 },
  { id: "onion", label: "Onion", price: 1 },
  { id: "olives", label: "Olives", price: 1.25 },
  { id: "sausage", label: "Italian sausage", price: 1.75 },
  { id: "bacon", label: "Bacon", price: 1.75 },
  { id: "jalapeno", label: "Jalapeño", price: 1 },
  { id: "pineapple", label: "Pineapple", price: 1.25 }
];

const money = n => n.toFixed(2);

function initPizzaOrder() {
  const grid = document.getElementById("pizza-grid");
  if (!grid) return;

  const state = {
    pizzaId: null,
    sizeId: "medium",
    crustId: "hand",
    toppings: [],
    qty: 1,
    cart: []
  };

  const els = {
    grid,
    builder: document.getElementById("pizza-builder"),
    pizzaName: document.getElementById("builder-pizza-name"),
    sizeOptions: document.getElementById("size-options"),
    crustOptions: document.getElementById("crust-options"),
    toppingsOptions: document.getElementById("toppings-options"),
    qtyValue: document.getElementById("qty-value"),
    qtyMinus: document.getElementById("qty-minus"),
    qtyPlus: document.getElementById("qty-plus"),
    builderTotal: document.getElementById("builder-total"),
    addBtn: document.getElementById("add-to-order"),
    bagItems: document.getElementById("bag-items"),
    bagEmpty: document.getElementById("bag-empty"),
    bagSummary: document.getElementById("bag-summary"),
    bagTotal: document.getElementById("bag-total"),
    checkout: document.getElementById("checkout"),
    checkoutTotal: document.getElementById("checkout-total"),
    form: document.getElementById("order-form"),
    addressField: document.getElementById("address-field"),
    success: document.getElementById("order-success"),
    successMessage: document.getElementById("success-message"),
    orderAgain: document.getElementById("order-again"),
    orderPage: document.querySelector(".order-page")
  };

  function selectedPizza() {
    return PIZZAS.find(p => p.id === state.pizzaId);
  }

  function linePrice() {
    const pizza = selectedPizza();
    if (!pizza) return 0;
    const size = SIZES.find(s => s.id === state.sizeId);
    const crust = CRUSTS.find(c => c.id === state.crustId);
    const toppingTotal = state.toppings.reduce((sum, id) => {
      const t = TOPPINGS.find(x => x.id === id);
      return sum + (t ? t.price : 0);
    }, 0);
    const unit = pizza.basePrice * size.multiplier + crust.extra + toppingTotal;
    return unit * state.qty;
  }

  function cartTotal() {
    return state.cart.reduce((sum, item) => sum + item.price, 0);
  }

  function renderMenu() {
    els.grid.innerHTML = PIZZAS.map(
      p => `
      <button type="button" class="pizza-card${
        state.pizzaId === p.id ? " is-selected" : ""
      }" data-pizza-id="${p.id}" role="option" aria-selected="${
        state.pizzaId === p.id
      }">
        <span class="pizza-name">${p.name}</span>
        <span class="pizza-desc">${p.description}</span>
        <span class="pizza-from">from $${money(p.basePrice)}</span>
      </button>
    `
    ).join("");
  }

  function renderOptions() {
    els.sizeOptions.innerHTML = SIZES.map(
      s => `
      <button type="button" class="option-chip${
        state.sizeId === s.id ? " is-selected" : ""
      }" data-size="${s.id}" aria-pressed="${state.sizeId === s.id}">
        ${s.label}
      </button>
    `
    ).join("");

    els.crustOptions.innerHTML = CRUSTS.map(
      c => `
      <button type="button" class="option-chip${
        state.crustId === c.id ? " is-selected" : ""
      }" data-crust="${c.id}" aria-pressed="${state.crustId === c.id}">
        ${c.label}${
          c.extra
            ? `<span class="chip-price">+$${money(c.extra)}</span>`
            : ""
        }
      </button>
    `
    ).join("");

    els.toppingsOptions.innerHTML = TOPPINGS.map(
      t => `
      <label class="topping-option">
        <input type="checkbox" value="${t.id}" ${
          state.toppings.includes(t.id) ? "checked" : ""
        }>
        <span>${t.label} <span class="topping-price">+$${money(
          t.price
        )}</span></span>
      </label>
    `
    ).join("");
  }

  function updateBuilder() {
    const pizza = selectedPizza();
    if (!pizza) {
      els.builder.hidden = true;
      return;
    }
    els.builder.hidden = false;
    els.pizzaName.textContent = pizza.name;
    els.qtyValue.textContent = String(state.qty);
    els.builderTotal.textContent = money(linePrice());
  }

  function renderCart() {
    const hasItems = state.cart.length > 0;

    if (!hasItems) {
      els.bagItems.innerHTML =
        '<li class="bag-empty" id="bag-empty">No pizzas yet &mdash; pick one above.</li>';
      els.bagSummary.hidden = true;
      els.checkout.hidden = true;
      return;
    }

    els.bagItems.innerHTML = state.cart
      .map(
        (item, index) => `
      <li class="bag-item">
        <div class="bag-item-body">
          <p class="bag-item-title">${item.qty}&times; ${item.name}</p>
          <p class="bag-item-meta">${item.meta}</p>
        </div>
        <p class="bag-item-price">$${money(item.price)}</p>
        <button type="button" class="bag-remove" data-index="${index}" aria-label="Remove ${
          item.name
        }">Remove</button>
      </li>
    `
      )
      .join("");

    const total = cartTotal();
    els.bagSummary.hidden = false;
    els.bagTotal.textContent = money(total);
    els.checkout.hidden = false;
    els.checkoutTotal.textContent = money(total);
  }

  function selectPizza(id) {
    state.pizzaId = id;
    state.sizeId = "medium";
    state.crustId = "hand";
    state.toppings = [];
    state.qty = 1;
    renderMenu();
    renderOptions();
    updateBuilder();
    els.builder.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function addToCart() {
    const pizza = selectedPizza();
    if (!pizza) return;

    const size = SIZES.find(s => s.id === state.sizeId);
    const crust = CRUSTS.find(c => c.id === state.crustId);
    const toppingLabels = state.toppings
      .map(id => {
        const t = TOPPINGS.find(x => x.id === id);
        return t ? t.label : null;
      })
      .filter(Boolean);

    const metaParts = [size.label, crust.label];
    if (toppingLabels.length) {
      metaParts.push(`+ ${toppingLabels.join(", ")}`);
    }

    state.cart.push({
      name: pizza.name,
      qty: state.qty,
      meta: metaParts.join(" · "),
      price: linePrice()
    });

    // Reset builder so a second click doesn't duplicate the same line
    state.pizzaId = null;
    state.sizeId = "medium";
    state.crustId = "hand";
    state.toppings = [];
    state.qty = 1;
    renderMenu();
    renderOptions();
    updateBuilder();
    renderCart();

    els.bagItems.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  // Events
  els.grid.addEventListener("click", e => {
    const card = e.target.closest("[data-pizza-id]");
    if (card) selectPizza(card.getAttribute("data-pizza-id"));
  });

  els.sizeOptions.addEventListener("click", e => {
    const btn = e.target.closest("[data-size]");
    if (!btn) return;
    state.sizeId = btn.getAttribute("data-size");
    renderOptions();
    updateBuilder();
  });

  els.crustOptions.addEventListener("click", e => {
    const btn = e.target.closest("[data-crust]");
    if (!btn) return;
    state.crustId = btn.getAttribute("data-crust");
    renderOptions();
    updateBuilder();
  });

  els.toppingsOptions.addEventListener("change", e => {
    if (e.target.type !== "checkbox") return;
    const id = e.target.value;
    if (e.target.checked) {
      if (!state.toppings.includes(id)) state.toppings.push(id);
    } else {
      state.toppings = state.toppings.filter(t => t !== id);
    }
    updateBuilder();
  });

  els.qtyMinus.addEventListener("click", () => {
    if (state.qty > 1) {
      state.qty -= 1;
      updateBuilder();
    }
  });

  els.qtyPlus.addEventListener("click", () => {
    if (state.qty < 10) {
      state.qty += 1;
      updateBuilder();
    }
  });

  els.addBtn.addEventListener("click", addToCart);

  els.bagItems.addEventListener("click", e => {
    const btn = e.target.closest("[data-index]");
    if (!btn) return;
    const index = Number(btn.getAttribute("data-index"));
    state.cart.splice(index, 1);
    renderCart();
  });

  els.form.addEventListener("change", e => {
    if (e.target.name === "fulfillment") {
      const isDelivery = e.target.value === "delivery";
      els.addressField.hidden = !isDelivery;
      els.addressField.required = isDelivery;
      if (!isDelivery) els.addressField.value = "";
    }
  });

  els.form.addEventListener("submit", e => {
    e.preventDefault();
    if (!state.cart.length) return;

    const data = new FormData(els.form);
    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const email = String(data.get("email") || "").trim();
    const fulfillment = String(data.get("fulfillment") || "pickup");
    const address = String(data.get("address") || "").trim();

    if (!name || !phone || !email) {
      els.form.reportValidity();
      return;
    }
    if (fulfillment === "delivery" && !address) {
      els.addressField.hidden = false;
      els.addressField.required = true;
      els.addressField.focus();
      els.form.reportValidity();
      return;
    }

    const total = money(cartTotal());
    const when =
      fulfillment === "delivery"
        ? `Delivery to ${address}`
        : "Pickup at the restaurant";

    els.orderPage
      .querySelectorAll(
        ".pizza-menu, .pizza-builder, .order-bag, .checkout, .order-intro"
      )
      .forEach(el => {
        el.hidden = true;
      });

    els.success.hidden = false;
    els.successMessage.textContent = `Thanks, ${name}! Your order ($${total}) is confirmed. ${when}. We'll text ${phone} when it's ready.`;
  });

  els.orderAgain.addEventListener("click", () => {
    state.pizzaId = null;
    state.cart = [];
    state.qty = 1;
    state.toppings = [];
    els.form.reset();
    els.addressField.hidden = true;
    els.addressField.required = false;
    els.success.hidden = true;

    els.orderPage
      .querySelectorAll(".pizza-menu, .order-bag, .order-intro")
      .forEach(el => {
        el.hidden = false;
      });
    els.builder.hidden = true;
    els.checkout.hidden = true;

    renderMenu();
    renderCart();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  renderMenu();
  renderOptions();
  renderCart();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initPizzaOrder);
} else {
  initPizzaOrder();
}
