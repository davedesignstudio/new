(function () {
  var toggle = document.querySelector("[data-nav-toggle]");
  var menu = document.getElementById("site-menu");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  var root = document.getElementById("adventure");
  if (!root) return;

  var blanks = {
    driver: "Bodie",
    navigator: "Klax",
    hound: "Grub",
    snack: "chili-lime crisps",
    dish: "Castle Nova slider",
    van: "VANESSA"
  };

  var nodes = {
    madlib: {
      title: "Fill the mystery van",
      body: "Before the munchies drive the plot, name the gang and the food they would cross galaxies for.",
      form: true
    },
    couch: {
      title: "Stop 1 — The Couch",
      body: "{{driver}} and {{navigator}} are fused to the sofa. {{hound}} is already wearing the snack-crumb beard. The mini-mart across the lot is “haunted.” The last bag of {{snack}} just screamed.",
      choices: [
        { label: "Investigate the ghost (meddling kids)", next: "mart" },
        { label: "Steal the van keys and drive hungry", next: "market" }
      ]
    },
    mart: {
      title: "Unmask: Mini-mart ghoul",
      body: "It is the night clerk in a paper bag. They were hiding the last {{snack}} from franchise drones. They hand over the bag if the gang promises to share. {{hound}} does not promise. {{driver}} does, loudly.",
      choices: [
        { label: "Share the bag. Hit the night market.", next: "market" },
        { label: "Hoard it. The van sulks.", next: "sulk" }
      ]
    },
    sulk: {
      title: "{{van}} refuses to start",
      body: "The dashboard spells NO FRY LEFT BEHIND. {{navigator}} laminates an apology. {{hound}} returns three crisps, now soggy, as tribute.",
      choices: [{ label: "Okay, we share. Market.", next: "market" }]
    },
    market: {
      title: "Stop 2 — Dustport Night Market",
      body: "Steam. Kites. A street bun that only exists because the street exists. A “ghost auntie” haunts stall 12. {{navigator}} wants the recipe history. {{driver}} wants three of whatever is glowing.",
      choices: [
        { label: "Sit for one meal. Listen.", next: "auntie" },
        { label: "Chase the glowing sauce instead", next: "carnival" }
      ]
    },
    auntie: {
      title: "Unmask: The auntie was right",
      body: "The ghost is the cook, protecting her bun from a franchise scout in a rubber mask. She feeds the gang if they swear not to call it a wrap. Culture is the street, not the logo. {{hound}}: “R-r-recipe!”",
      choices: [{ label: "Thank her. Enter the silent diner.", next: "diner" }]
    },
    diner: {
      title: "Stop 3 — Silent Corridor Diner",
      body: "No beacons. One basket of rings. If they split it, {{van}} keeps flying. If they don’t, friendship stalls at the ketchup.",
      choices: [
        { label: "Split the rings. Pass the ketchup.", next: "carnival" },
        { label: "{{driver}} eats the basket. Chaos.", next: "fight" }
      ]
    },
    fight: {
      title: "Like, zoinks — crew rift",
      body: "{{navigator}} quotes the laminated itinerary. {{hound}} hides under the booth. Gary (stowaway prophet) tries to narrate a destiny. Nobody listens until someone orders a second basket.",
      choices: [{ label: "Order a second basket. Make up.", next: "carnival" }]
    },
    carnival: {
      title: "Stop 4 — Carnival Orbit Food Court",
      body: "Mascot villain. Miracle sauces. A scout trying to un-culture the {{dish}} into a chain. Classic unmask energy.",
      choices: [
        { label: "Yank the mascot head", next: "unmask" },
        { label: "Follow the sauce river to the edge", next: "castle" }
      ]
    },
    unmask: {
      title: "And I would have gotten away with it…",
      body: "…if it weren’t for you meddling kids and your talking snack-hound. The scout is booked. The cooks keep their stalls. {{van}} honks in mixolydian.",
      choices: [{ label: "One last drive. Castle Nova.", next: "castle" }]
    },
    castle: {
      title: "Stop 6 — Castle Nova / The Wider Dark",
      body: "The {{dish}} stand at the end of the map. No war. A table with enough seats. {{driver}} and {{navigator}} split the last slider. {{hound}} pretends not to cry into a Grub Gem. Destiny was dinner.",
      choices: [{ label: "Roll credits / play again", next: "madlib" }]
    }
  };

  function fill(text) {
    return String(text || "").replace(/\{\{(\w+)\}\}/g, function (_, key) {
      return blanks[key] || key;
    });
  }

  function render(id) {
    var node = nodes[id];
    if (!node) return;
    if (node.form) {
      root.innerHTML =
        '<h2>' + node.title + '</h2>' +
        '<p>' + node.body + '</p>' +
        '<form class="madlib" id="madlib-form">' +
        field("driver", "Driver (Shaggy / Bill energy)", blanks.driver) +
        field("navigator", "Navigator (Velma / Kumar energy)", blanks.navigator) +
        field("hound", "Snack-hound", blanks.hound) +
        field("snack", "Munchies MacGuffin", blanks.snack) +
        field("dish", "Legendary dish", blanks.dish) +
        field("van", "Van name", blanks.van) +
        '<button class="btn btn-primary" type="submit">Hit the road</button>' +
        '</form>';
      document.getElementById("madlib-form").addEventListener("submit", function (e) {
        e.preventDefault();
        ["driver", "navigator", "hound", "snack", "dish", "van"].forEach(function (k) {
          var el = document.getElementById("blank-" + k);
          if (el && el.value) blanks[k] = el.value;
        });
        render("couch");
      });
      return;
    }
    var html = '<p class="page-kicker">WIDER · play</p><h2>' + fill(node.title) + '</h2><p>' + fill(node.body) + '</p><div class="adv-choices">';
    (node.choices || []).forEach(function (c) {
      html += '<button type="button" class="btn btn-ghost adv-choice" data-next="' + c.next + '">' + fill(c.label) + '</button>';
    });
    html += "</div>";
    root.innerHTML = html;
    var buttons = root.querySelectorAll(".adv-choice");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", function () {
        render(this.getAttribute("data-next"));
      });
    }
  }

  function field(id, label, value) {
    return (
      '<label class="madlib-field">' +
      '<span>' + label + "</span>" +
      '<input id="blank-' + id + '" name="' + id + '" value="' + String(value).replace(/"/g, "&quot;") + '" />' +
      "</label>"
    );
  }

  render("madlib");
})();
