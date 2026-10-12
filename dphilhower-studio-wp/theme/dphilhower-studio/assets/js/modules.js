(function () {
  var data = window.dpsModules;
  var bench = document.getElementById("module-bench");
  var assembly = document.getElementById("assembly");
  var readout = document.getElementById("assembly-readout");
  if (!data || !bench || !assembly) return;

  function find(list, id) {
    for (var i = 0; i < list.length; i++) {
      if (list[i].id === id) return list[i];
    }
    return null;
  }

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function clear(node) {
    while (node.firstChild) node.removeChild(node.firstChild);
  }

  function money(amount) {
    return "$" + Number(amount).toFixed(2);
  }

  function repeat(ch, count) {
    return new Array(count + 1).join(ch);
  }

  function center(text, width) {
    text = String(text);
    if (text.length >= width) return text.slice(0, width);
    var pad = width - text.length;
    return repeat(" ", Math.floor(pad / 2)) + text;
  }

  function padLine(left, right, width) {
    left = String(left);
    right = String(right);
    var space = width - left.length - right.length;
    if (space < 1) {
      var keep = Math.max(1, width - right.length - 1);
      return left.slice(0, keep) + " " + right;
    }
    return left + repeat(" ", space) + right;
  }

  function ticketPlain(restaurant) {
    var width = 32;
    var rule = repeat("-", width);
    var ticket = restaurant.ticket;
    var lines = [
      center(restaurant.name, width),
      center("KITCHEN", width),
      rule,
      "Order " + ticket.number,
      "Time  " + ticket.placed_at,
      "Name  " + ticket.guest,
      "Phone " + ticket.phone,
      "For   Pickup"
    ];
    if (ticket.ready) lines.push("Ready " + ticket.ready);
    lines.push(rule);
    var total = 0;
    ticket.items.forEach(function (item) {
      var line = item.qty * item.price;
      total += line;
      lines.push(padLine(item.qty + "  " + item.name, money(line), width));
    });
    lines.push(rule);
    lines.push(padLine("TOTAL", money(total), width));
    if (ticket.note) {
      lines.push(rule);
      lines.push("NOTE");
      lines.push(String(ticket.note));
    }
    lines.push(rule);
    lines.push(center("** END **", width));
    return lines.join("\n") + "\n";
  }

  function seal(letters) {
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 120 120");
    svg.setAttribute("class", "seal");
    svg.setAttribute("aria-hidden", "true");
    ["52", "44"].forEach(function (radius, index) {
      var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circle.setAttribute("cx", "60");
      circle.setAttribute("cy", "60");
      circle.setAttribute("r", radius);
      circle.setAttribute("class", index === 0 ? "seal-outer" : "seal-inner");
      svg.appendChild(circle);
    });
    var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", "60");
    text.setAttribute("y", "68");
    text.setAttribute("text-anchor", "middle");
    text.textContent = letters;
    svg.appendChild(text);
    return svg;
  }

  function kicker(label) {
    return el("p", "mod-kicker", label);
  }

  function markPiece(restaurant, mark) {
    var article = el("article", "mod mod-mark");
    article.setAttribute("data-piece", "mark");
    article.appendChild(kicker("Mark"));
    var face = el("div", "mark-face mark-" + (mark.id === "wordmark" ? "word" : mark.id === "monogram" ? "mono" : "seal"));
    if (mark.id === "wordmark") {
      face.appendChild(el("h3", "word-name", restaurant.name));
      face.appendChild(el("div", "word-rule"));
      face.appendChild(el("p", "mark-line", restaurant.line));
    } else if (mark.id === "monogram") {
      face.appendChild(el("p", "mono-letters", restaurant.letters));
      face.appendChild(el("h3", "mark-name", restaurant.name));
      face.appendChild(el("p", "mark-line", restaurant.line));
    } else {
      face.appendChild(seal(restaurant.letters));
      var copy = el("div");
      copy.appendChild(el("h3", "mark-name", restaurant.name));
      copy.appendChild(el("p", "mark-line", restaurant.line));
      face.appendChild(copy);
    }
    article.appendChild(face);
    article.appendChild(el("p", "mod-meta", mark.label));
    return article;
  }

  function windowPiece(restaurant) {
    var article = el("article", "mod mod-window");
    article.setAttribute("data-piece", "window");
    article.appendChild(kicker("Window"));
    article.appendChild(el("h3", "mod-name", restaurant.name));
    article.appendChild(el("p", "mark-line", restaurant.line));
    var meta = el("p", "win-meta");
    meta.appendChild(el("span", "", restaurant.street));
    meta.appendChild(el("span", "", restaurant.hours));
    article.appendChild(meta);
    return article;
  }

  function menuPiece(restaurant) {
    var article = el("article", "mod mod-menu");
    article.setAttribute("data-piece", "menu");
    article.appendChild(kicker("Menu"));
    article.appendChild(el("h3", "mod-title", restaurant.name));
    var group = null;
    var list = null;
    restaurant.menu.forEach(function (item) {
      if (item.group !== group) {
        article.appendChild(el("p", "menu-group-label", item.group));
        list = el("ul");
        article.appendChild(list);
        group = item.group;
      }
      var row = el("li");
      row.appendChild(el("span", "", item.name));
      row.appendChild(el("span", "price", money(item.price)));
      list.appendChild(row);
    });
    return article;
  }

  function chordPiece(chord) {
    var article = el("article", "mod mod-chord");
    article.setAttribute("data-piece", "chord");
    article.appendChild(kicker("Chord"));
    article.appendChild(el("h3", "mod-title", chord.label));
    var grid = el("div", "swatches");
    [
      ["Plate", chord.plate],
      ["Stock", chord.stock],
      ["Heat", chord.heat],
      ["Metal", chord.metal]
    ].forEach(function (pair) {
      var role = pair[0];
      var hex = pair[1];
      var swatch = el("div", "swatch");
      swatch.style.background = hex;
      swatch.style.color = role === "Stock" || role === "Metal" ? chord.plate : chord.stock;
      swatch.appendChild(el("span", "", role));
      swatch.appendChild(el("span", "", hex));
      grid.appendChild(swatch);
    });
    article.appendChild(grid);
    return article;
  }

  function packPiece(restaurant) {
    var article = el("article", "mod mod-pack");
    article.setAttribute("data-piece", "pack");
    article.appendChild(kicker("Pack"));
    var face = el("div", "pack-face");
    face.appendChild(el("p", "pack-letters", restaurant.letters));
    var copy = el("div");
    copy.appendChild(el("h3", "mod-title", restaurant.pack));
    copy.appendChild(el("p", "mark-line", restaurant.pack_line));
    face.appendChild(copy);
    article.appendChild(face);
    var bars = el("p", "pack-bars");
    bars.setAttribute("aria-hidden", "true");
    for (var i = 0; i < 4; i++) bars.appendChild(el("span"));
    article.appendChild(bars);
    return article;
  }

  function ticketPiece(restaurant) {
    var article = el("article", "mod mod-ticket");
    article.setAttribute("data-piece", "ticket");
    article.appendChild(kicker("Ticket"));
    article.appendChild(el("pre", "", ticketPlain(restaurant)));
    return article;
  }

  var params = new URLSearchParams(window.location.search);
  var ember = find(data.restaurants, "ember") || data.restaurants[0];
  var state = {
    restaurant: ember.id,
    mark: ember.mark,
    chord: ember.chord
  };
  if (find(data.restaurants, params.get("restaurant"))) {
    var chosen = find(data.restaurants, params.get("restaurant"));
    state.restaurant = chosen.id;
    state.mark = chosen.mark;
    state.chord = chosen.chord;
  }
  if (find(data.marks, params.get("mark"))) state.mark = params.get("mark");
  if (find(data.chords, params.get("chord"))) state.chord = params.get("chord");

  function paint(updateUrl) {
    var restaurant = find(data.restaurants, state.restaurant);
    var mark = find(data.marks, state.mark);
    var chord = find(data.chords, state.chord);
    if (!restaurant || !mark || !chord) return;
    assembly.style.setProperty("--plate", chord.plate);
    assembly.style.setProperty("--stock", chord.stock);
    assembly.style.setProperty("--heat", chord.heat);
    assembly.style.setProperty("--metal", chord.metal);
    assembly.style.setProperty("--ink", chord.plate);
    assembly.setAttribute("data-restaurant", restaurant.id);
    assembly.setAttribute("data-mark", mark.id);
    assembly.setAttribute("data-chord", chord.id);
    clear(assembly);
    assembly.appendChild(markPiece(restaurant, mark));
    assembly.appendChild(windowPiece(restaurant));
    assembly.appendChild(menuPiece(restaurant));
    assembly.appendChild(chordPiece(chord));
    assembly.appendChild(packPiece(restaurant));
    assembly.appendChild(ticketPiece(restaurant));
    assembly.appendChild(el("p", "assembly-rail", "Same frame · stock field · metal rule · plate ink"));
    var preset = mark.id === restaurant.mark && chord.id === restaurant.chord;
    if (readout) {
      readout.textContent = restaurant.name + " is a studio identity. " + mark.label + " on the " + chord.label + " chord. " + (preset ? "Preset fit." : "Custom mix. Menu, window, pack, and ticket stay fitted.");
    }
    bench.querySelectorAll("button[data-set]").forEach(function (button) {
      var key = button.getAttribute("data-set");
      button.setAttribute("aria-pressed", button.getAttribute("data-value") === state[key] ? "true" : "false");
    });
    if (updateUrl && window.history && window.history.replaceState) {
      var url = new URL(window.location.href);
      url.searchParams.set("restaurant", state.restaurant);
      url.searchParams.set("mark", state.mark);
      url.searchParams.set("chord", state.chord);
      window.history.replaceState(null, "", url);
    }
  }

  bench.addEventListener("click", function (event) {
    var button = event.target.closest("button[data-set]");
    if (!button || !bench.contains(button)) return;
    var key = button.getAttribute("data-set");
    var value = button.getAttribute("data-value");
    if (key === "restaurant") {
      var restaurant = find(data.restaurants, value);
      if (!restaurant) return;
      state.restaurant = restaurant.id;
      state.mark = restaurant.mark;
      state.chord = restaurant.chord;
    } else if (key === "mark" || key === "chord") {
      state[key] = value;
    } else {
      return;
    }
    paint(true);
  });

  paint(false);
})();
