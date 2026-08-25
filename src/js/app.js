const filters = document.getElementById("dinner-filters");

function applyFilter(value) {
  const cards = document.querySelectorAll(".dinner-card[data-tags]");
  const blocks = document.querySelectorAll(".region-block");
  const empty = document.getElementById("filter-empty");
  let visible = 0;

  cards.forEach(function (card) {
    const tags = " " + (card.getAttribute("data-tags") || "") + " ";
    const match = value === "all" || tags.indexOf(" " + value + " ") !== -1;
    card.style.display = match ? "" : "none";
    if (match) {
      visible += 1;
    }
  });

  blocks.forEach(function (block) {
    const open = block.querySelectorAll('.dinner-card[data-tags]:not([style*="display: none"])');
    block.style.display = open.length ? "" : "none";
  });

  if (empty) {
    empty.hidden = visible !== 0;
  }

  if (filters) {
    Array.prototype.forEach.call(filters.querySelectorAll(".filter"), function (button) {
      button.classList.toggle("is-active", button.getAttribute("data-filter") === value);
    });
  }
}

if (filters) {
  filters.addEventListener("click", function (event) {
    const button = event.target.closest(".filter");
    if (!button) {
      return;
    }
    const value = button.getAttribute("data-filter");
    applyFilter(value);
    if (history.replaceState) {
      history.replaceState(null, "", value === "all" ? "/dinners/" : "/dinners/#" + value);
    }
  });

  const hash = (window.location.hash || "").replace("#", "");
  const aliases = {
    "shore-south": "shore-and-south",
    "shore-and-south": "shore-and-south",
    "north-jersey": "north-jersey",
    "central-jersey": "central-jersey",
    byob: "byob",
    "tasting-menu": "tasting-menu",
    waterfront: "waterfront",
    "date-night": "date-night"
  };
  if (aliases[hash]) {
    const value = aliases[hash];
    applyFilter(value);
    const section = document.getElementById(value);
    if (section) {
      section.scrollIntoView();
    }
  }
}
