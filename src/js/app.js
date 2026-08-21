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
    van: "VANESSA",
    seeker: "child of the wider dark"
  };

  var omens = [
    "The tea shows a road that eats its own map.",
    "A moth lands on the Queen of Bowls. Hunger is the plot.",
    "Three roads. One honest stomach. Do not lie to either."
  ];

  var closers = [
    "The tale is a lie, but a hint lives in it.",
    "Skazka lozh, da v nei namek.",
    "I do not see the future. I deal it."
  ];

  var state = {
    turn: 0,
    hunger: 16,
    wit: 9,
    luck: 7,
    inv: ["Laminated Map"],
    lastRoll: null
  };

  function pick(list) {
    return list[Math.floor(Math.random() * list.length)];
  }

  function fill(text) {
    return String(text || "").replace(/\{\{(\w+)\}\}/g, function (_, key) {
      return blanks[key] || key;
    });
  }

  function d20() {
    var n = 1 + Math.floor(Math.random() * 20);
    state.lastRoll = n;
    return n;
  }

  function hasItem(name) {
    return state.inv.indexOf(name) !== -1;
  }

  function give(name) {
    if (!hasItem(name)) state.inv.push(name);
  }

  function hurt(n) {
    state.hunger = Math.max(0, state.hunger - n);
  }

  function heal(n) {
    state.hunger = Math.min(16, state.hunger + n);
  }

  function hud() {
    return (
      '<div class="snes-hud" aria-label="Party status">' +
      '<div class="snes-stat"><b>HUNGER</b> ' + bars(state.hunger, 16) + " " + state.hunger + "</div>" +
      '<div class="snes-stat"><b>WIT</b> ' + bars(state.wit, 12) + " " + state.wit + "</div>" +
      '<div class="snes-stat"><b>LUCK</b> ' + bars(state.luck, 12) + " " + state.luck + "</div>" +
      '<div class="snes-inv"><b>PACK</b> ' + state.inv.join(" · ") + "</div>" +
      (state.lastRoll ? '<div class="snes-roll">d20 → ' + state.lastRoll + "</div>" : "") +
      "</div>"
    );
  }

  function bars(n, max) {
    var s = "";
    var i;
    for (i = 0; i < max; i++) s += i < n ? "█" : "░";
    return '<span class="snes-bar">' + s + "</span>";
  }

  function wrap(inner) {
    return (
      '<div class="snes-shell">' +
      '<p class="snes-title">WIDER QUEST  ·  ZORYA DM</p>' +
      hud() +
      '<div class="snes-window">' + inner + "</div>" +
      "</div>"
    );
  }

  var nodes = {
    madlib: { form: true },
    couch: {
      card: "FLOOR 1 — THE COUCH",
      title: "Zhivili-byli, in 16-bit",
      bodies: [
        "Sit, {{seeker}}. I am Zorya, dungeon master of the three roads. {{driver}}, {{navigator}}, and {{hound}} are glued to a sofa. A haunted mini-mart blinks. The last bag of {{snack}} is the MacGuffin. Before the shop: a talking iron door, SNES-era, rude."
      ],
      choices: [{ label: "COMMAND: Approach the talking door", next: "door" }]
    },
    door: {
      type: "riddle",
      card: "RIDDLE DOOR",
      title: "Inscription in cheap gold letters",
      prompt:
        "I am born of grain. I am better split than stored. Kings fight wars for me, fools drive vans for me. What am I?",
      hint: "{{navigator}} whispers: not a sword. Think kitchen.",
      answers: [
        { label: "A MEAL  (shared bread)", correct: true, next: "mart" },
        { label: "GOLD", correct: false, trap: 3, next: "door" },
        { label: "A SWORD +1", correct: false, trap: 2, next: "door" },
        { label: "THE VOID", correct: false, trap: 4, next: "door" }
      ]
    },
    mart: {
      card: "FLOOR 1 — PAPER MASK",
      title: "Unmask check",
      bodies: [
        "The clerk was the ghost. They hid {{snack}} from franchise drones. Share, and I gift you a Grub Gem (key item). Hoard, and Hunger bites."
      ],
      choices: [
        { label: "SHARE the bag  (+item)", next: "share" },
        { label: "HOARD it", next: "sulk" }
      ]
    },
    share: {
      card: "ITEM GET",
      title: "You obtained GRUB GEM",
      bodies: ["{{hound}} drools a coin of fried dough into the pack. Use it later on masks, engines, and sphinxes."],
      grant: "Grub Gem",
      heal: 2,
      choices: [{ label: "COMMAND: Enter the rune hall", next: "runes" }]
    },
    sulk: {
      card: "TRAP TILE",
      title: "{{van}} stalls",
      bodies: ["NO FRY LEFT BEHIND. The engine is a puzzle you already failed. Hunger -3. {{hound}} pays three soggy crisps as tithe."],
      trap: 3,
      choices: [{ label: "Apologize. Rune hall anyway.", next: "runes" }]
    },
    runes: {
      type: "order",
      card: "FLOOR 2 — RUNE LOCK",
      title: "Light the stalls in grandmother’s order",
      prompt:
        "Three runes over the market gate. Zorya: ‘Steam first (the street), dough second (the work), tea last (the guest).’ Wrong order is a pit.",
      steps: [
        { id: "steam", label: "STEAM" },
        { id: "dough", label: "DOUGH" },
        { id: "tea", label: "TEA" }
      ],
      next: "market",
      fail: "runes-fail"
    },
    "runes-fail": {
      card: "PIT TRAP",
      title: "The floor remembers",
      bodies: ["You lit tea first like a tourist. The pit is padded with old menus. Hunger -2. Try the runes again, dungeon-crawler."],
      trap: 2,
      choices: [{ label: "Climb out. Reset runes.", next: "runes" }]
    },
    market: {
      card: "FLOOR 2 — NIGHT MARKET",
      title: "Steam is scripture",
      bodies: [
        "Dustport stalls. The auntie is ‘haunted.’ The glowing sauce is a mimic. Sit for one meal, or chase ketchup-colored treasure like every failed campaign."
      ],
      choices: [
        { label: "TALK: Sit. Listen. Eat.", next: "auntie" },
        { label: "LOOK: Chase glowing sauce", next: "carnival" }
      ]
    },
    auntie: {
      card: "NPC — AUNTIE",
      title: "The ghost was the cook",
      bodies: [
        "She unmasks herself. A scout wanted her bun renamed WRAP. She feeds you. Pack gains Ketchup (key). Do not flatten her culture into a flavor."
      ],
      grant: "Ketchup",
      heal: 3,
      choices: [{ label: "COMMAND: Silent diner", next: "diner" }]
    },
    diner: {
      type: "item",
      card: "FLOOR 3 — SHARED BASKET",
      title: "Use item on the rings",
      prompt:
        "One basket. The inscription: PASS WHAT IS RED. In SNES D&D you would open ITEM and use it on the table. {{driver}} is sweating.",
      need: "Ketchup",
      success: "diner-ok",
      fail: "fight",
      look: "If you have no ketchup, the quarrel begins. That’s the trap."
    },
    "diner-ok": {
      card: "CHECK PASSED",
      title: "Commensality +1",
      bodies: ["You pass the ketchup. The basket splits like a fair loot table. {{van}} purrs. Wit +1."],
      wit: 1,
      choices: [{ label: "COMMAND: Food-court boss", next: "carnival" }]
    },
    fight: {
      card: "QUARREL  (status: Hungry)",
      title: "Like, zoinks — party split",
      bodies: [
        "{{navigator}} recites the itinerary. {{hound}} under the booth. No ketchup in the pack, or you refused to use it. Order a second basket (Hunger -2) and continue."
      ],
      trap: 2,
      choices: [{ label: "ITEM: Second basket. Make peace.", next: "carnival" }]
    },
    carnival: {
      type: "riddle",
      card: "BOSS — MASCOT SPHINX",
      title: "The scout in the rubber head asks",
      prompt:
        "What has a street, a name, and a soul a franchise cannot buy — only steal?",
      hint: "Zorya taps the table. Not gold. Not the mascot.",
      answers: [
        { label: "CULTURE  (the cook’s bun / the {{dish}})", correct: true, next: "unmask" },
        { label: "THE MASCOT’S JOB", correct: false, trap: 3, next: "carnival" },
        { label: "A COUPON", correct: false, trap: 2, next: "carnival" },
        { label: "USE GRUB GEM on the mask", special: "Grub Gem", next: "unmask" }
      ]
    },
    unmask: {
      card: "BOSS DOWN",
      title: "And they would have gotten away with it",
      bodies: [
        "Meddling kids. Talking hound. Rubber head on the floor. The cooks keep their stalls. One door remains, lettered CASTLE NOVA. A last sphinx waits if you are greedy for puzzles — or you may simply sit."
      ],
      grant: "Rubber Mask",
      choices: [
        { label: "RIDDLE: Final sphinx", next: "sphinx" },
        { label: "LEAVE: Sit at the dawn table", next: "castle" }
      ]
    },
    sphinx: {
      type: "riddle",
      card: "FINAL SPHINX",
      title: "Who is allowed at the dawn table?",
      prompt: "Who sits where the map ends?",
      hint: "Not the chosen one. Not the scout.",
      answers: [
        { label: "EVERYONE WHO SHARED FOOD", correct: true, next: "castle" },
        { label: "ONLY THE HERO", correct: false, trap: 4, next: "sphinx" },
        { label: "THE FRANCHISE SCOUT", correct: false, trap: 5, next: "sphinx" }
      ]
    },
    castle: {
      card: "FLOOR ∞ — DAWN TABLE",
      title: "Destiny was dinner",
      bodies: [
        "The {{dish}} at the edge. {{driver}} and {{navigator}} split the last slider. {{hound}} ‘allergies.’ You, {{seeker}}, sat the whole crawl. Pack: {{pack}}. Hunger remains. The wider universe was a dungeon whose treasure was a seat."
      ],
      choices: [{ label: "PRESS START — new game+", next: "madlib" }]
    },
    faint: {
      card: "GAME OVER",
      title: "Hunger reached 0",
      bodies: ["You faint in the dungeon of the stomach. Zorya closes the book, then opens it. Fools get continues."],
      choices: [{ label: "CONTINUE", next: "madlib" }]
    }
  };

  function maybeGrant(node) {
    if (node.grant) give(node.grant);
    if (node.heal) heal(node.heal);
    if (node.wit) state.wit = Math.min(12, state.wit + node.wit);
    if (node.trap) hurt(node.trap);
  }

  function checkFaint() {
    if (state.hunger <= 0) {
      render("faint");
      return true;
    }
    return false;
  }

  function bindNext() {
    var buttons = root.querySelectorAll("[data-next]");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", function () {
        var spec = this.getAttribute("data-special");
        if (spec) {
          if (!hasItem(spec)) {
            hurt(2);
            d20();
            if (!checkFaint()) render(this.getAttribute("data-stay") || "carnival");
            return;
          }
        }
        render(this.getAttribute("data-next"));
      });
    }
  }

  function render(id) {
    var node = nodes[id];
    if (!node) return;

    if (id === "madlib" || node.form) {
      state.turn = 0;
      state.hunger = 16;
      state.wit = 9;
      state.luck = 7;
      state.inv = ["Laminated Map"];
      state.lastRoll = null;
      root.innerHTML = wrap(
        '<p class="teller-mark">Zorya DM · character create</p>' +
          "<h2>Name the party</h2>" +
          "<p>Old teller. Russian stove, Roma tent, 16-bit dungeon in the cards. Speak names. I generate rooms, riddles, and traps. Wrong answers bite Hunger — like SNES D&amp;D doors that lied.</p>" +
          '<p class="omen">' +
          pick(omens) +
          "</p>" +
          '<form class="madlib" id="madlib-form">' +
          field("seeker", "Your name", blanks.seeker) +
          field("driver", "Driver", blanks.driver) +
          field("navigator", "Navigator", blanks.navigator) +
          field("hound", "Hound", blanks.hound) +
          field("snack", "Starting MacGuffin", blanks.snack) +
          field("dish", "Legendary dish", blanks.dish) +
          field("van", "Talking van", blanks.van) +
          '<button class="btn btn-primary" type="submit">PRESS START</button>' +
          "</form>"
      );
      document.getElementById("madlib-form").addEventListener("submit", function (e) {
        e.preventDefault();
        ["seeker", "driver", "navigator", "hound", "snack", "dish", "van"].forEach(function (k) {
          var el = document.getElementById("blank-" + k);
          if (el && el.value) blanks[k] = el.value;
        });
        render("couch");
      });
      return;
    }

    if (node.type === "riddle") {
      state.turn += 1;
      var html =
        '<p class="teller-mark">' +
        fill(node.card) +
        "</p>" +
        "<h2>" +
        fill(node.title) +
        "</h2>" +
        '<p class="teller-body">' +
        fill(node.prompt) +
        "</p>" +
        (node.hint ? '<p class="omen">' + fill(node.hint) + "</p>" : "") +
        '<p class="snes-cmd-label">SELECT ANSWER</p><div class="adv-choices">';
      (node.answers || []).forEach(function (a, idx) {
        html +=
          '<button type="button" class="btn btn-ghost adv-choice" data-idx="' +
          idx +
          '">' +
          fill(a.label) +
          "</button>";
      });
      html += "</div>";
      root.innerHTML = wrap(html);
      var ansBtns = root.querySelectorAll("[data-idx]");
      for (var j = 0; j < ansBtns.length; j++) {
        ansBtns[j].addEventListener("click", function () {
          var a = node.answers[parseInt(this.getAttribute("data-idx"), 10)];
          d20();
          if (a.special) {
            if (!hasItem(a.special)) {
              hurt(2);
              if (!checkFaint()) render(id);
              return;
            }
            render(a.next);
            return;
          }
          if (a.correct) {
            if (state.lastRoll + state.wit >= 12) heal(1);
            render(a.next);
            return;
          }
          hurt(a.trap || 2);
          if (!checkFaint()) render(a.next || id);
        });
      }
      return;
    }

    if (node.type === "order") {
      state.turn += 1;
      var picked = [];
      function paintOrder() {
        var html2 =
          '<p class="teller-mark">' +
          fill(node.card) +
          "</p>" +
          "<h2>" +
          fill(node.title) +
          "</h2>" +
          '<p class="teller-body">' +
          fill(node.prompt) +
          "</p>" +
          '<p class="omen">Sequence: ' +
          (picked.length ? picked.join(" → ") : "(none)") +
          "</p>" +
          '<p class="snes-cmd-label">TOUCH RUNES IN ORDER</p><div class="adv-choices">';
        node.steps.forEach(function (s) {
          html2 +=
            '<button type="button" class="btn btn-ghost adv-choice" data-rune="' +
            s.id +
            '">' +
            s.label +
            "</button>";
        });
        html2 +=
          '<button type="button" class="btn btn-primary" data-act="commit">PULL LEVER</button></div>';
        root.innerHTML = wrap(html2);
        var rbtns = root.querySelectorAll("[data-rune]");
        for (var r = 0; r < rbtns.length; r++) {
          rbtns[r].addEventListener("click", function () {
            picked.push(this.getAttribute("data-rune"));
            paintOrder();
          });
        }
        var commit = root.querySelector("[data-act='commit']");
        if (commit) {
          commit.addEventListener("click", function () {
            var need = node.steps.map(function (s) {
              return s.id;
            });
            var ok = picked.join(",") === need.join(",");
            d20();
            if (ok) render(node.next);
            else {
              if (!checkFaint()) render(node.fail);
            }
          });
        }
      }
      paintOrder();
      return;
    }

    if (node.type === "item") {
      state.turn += 1;
      var html3 =
        '<p class="teller-mark">' +
        fill(node.card) +
        "</p>" +
        "<h2>" +
        fill(node.title) +
        "</h2>" +
        '<p class="teller-body">' +
        fill(node.prompt) +
        "</p>" +
        (node.look ? '<p class="omen">' + fill(node.look) + "</p>" : "") +
        '<p class="snes-cmd-label">COMMAND</p><div class="adv-choices">' +
        '<button type="button" class="btn btn-primary" data-act="use">ITEM: Use ' +
        node.need +
        "</button>" +
        '<button type="button" class="btn btn-ghost" data-act="skip">TALK: Refuse / don’t have it</button>' +
        "</div>";
      root.innerHTML = wrap(html3);
      root.querySelector("[data-act='use']").addEventListener("click", function () {
        d20();
        if (hasItem(node.need) || state.lastRoll >= 18) render(node.success);
        else {
          hurt(2);
          if (!checkFaint()) render(node.fail);
        }
      });
      root.querySelector("[data-act='skip']").addEventListener("click", function () {
        render(node.fail);
      });
      return;
    }

    state.turn += 1;
    maybeGrant(node);
    if (id !== "faint" && checkFaint()) return;

    var body = node.bodies && node.bodies.length ? pick(node.bodies) : node.body || "";
    body = fill(body).replace("{{pack}}", state.inv.join(", "));
    var html4 =
      '<p class="teller-mark">' +
      fill(node.card || "") +
      "</p>" +
      "<h2>" +
      fill(node.title) +
      "</h2>" +
      '<p class="teller-body">' +
      body +
      "</p>" +
      '<p class="omen">' +
      pick(closers) +
      '</p><p class="snes-cmd-label">SELECT COMMAND</p><div class="adv-choices">';
    (node.choices || []).forEach(function (c) {
      html4 +=
        '<button type="button" class="btn btn-ghost adv-choice" data-next="' +
        c.next +
        '">' +
        fill(c.label) +
        "</button>";
    });
    html4 += "</div>";
    root.innerHTML = wrap(html4);
    bindNext();
  }

  function field(id, label, value) {
    return (
      '<label class="madlib-field"><span>' +
      label +
      '</span><input id="blank-' +
      id +
      '" value="' +
      String(value).replace(/"/g, "&quot;") +
      '" /></label>'
    );
  }

  render("madlib");
})();
