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
    "The leaves say: a house that will not feed a stranger is already a ruin.",
    "I see a tall man in a stove-pipe hat, splitting a log of pride down the middle.",
    "In the Tsar’s winter, three brothers stood at a fork. Only the one who packed bread lived."
  ];

  var lincoln = [
    "That reminds me of a feller who would not lend his axe, and so spent all day chopping with a dull one — honesty is a sharp edge, child, but sharing is the whetstone.",
    "I knew a lawyer who argued a whole afternoon about whose hog it was, until a woman set supper and both men forgot the hog. The case was dinner.",
    "A rail-splitter told me: if I had four hours to save the Union, I’d spend three of ’em setting the table. A hungry senate is a cruel senate.",
    "There was a boy who kept both halves of a wishbone in his pocket, so nobody could win. He grew up rich in pockets and poor in friends."
  ];

  var roma = [
    "My people of the road say: the country with no Tsar is the kettle that still sings for a guest.",
    "A card laid is a word spoken; do not turn it back like a stingy host turning a plate.",
    "Grandmother: never count the stars until the bread has a name. Fate is a guest. Seat it.",
    "Wisdom of the tents: a closed fist cannot take a blessing, nor pass the salt."
  ];

  var tsar = [
    "In the days of the Tsar, a muzhik walked to the Winter Palace with black bread. The boyars laughed. The Tsar, who had forgotten the taste of crust, wept into the loaf and called it a crown.",
    "They tell of three sisters under the old eagle: one hoarded grain, one fled, one baked for the storm. Only the third found the Firebird — and it was a roast, golden, meant to be cut.",
    "A boyar locked his kitchen so peasants could not smell the soup. That night the palace froze. The stove, insulted, went to live in an izba, and the Tsar dined on silver and hunger.",
    "When Petersburg’s river rose, the court prayed to icons and the cooks prayed to yeast. Guess which prayer rose."
  ];

  var closers = [
    "As we say on the road: skazka lozh, da v nei namek — the tale is a lie, but the hint is supper.",
    "Lincoln would split the difference. The Tsar would split the goose. I split the card. You eat.",
    "I do not see the future. I remember a better table, and I deal until you sit."
  ];

  function yarn() {
    return (
      '<blockquote class="yarn">' +
      "<p>" +
      pick(lincoln) +
      "</p><p>" +
      pick(roma) +
      "</p><p>" +
      pick(tsar) +
      "</p></blockquote>"
    );
  }

  var state = {
    turn: 0,
    hunger: 16,
    wit: 9,
    luck: 7,
    ward: 12,
    inv: ["Laminated Map"],
    lastRoll: null,
    voice: "dinner"
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
      '<div class="snes-stat"><b>WARD</b> ' + bars(state.ward, 16) + " " + state.ward + "</div>" +
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

  function wrap(inner, node) {
    var art = "";
    if (node && node.art) {
      art =
        '<figure class="scene-art"><img src="' +
        node.art +
        '" alt="' +
        fill(node.alt || "scene") +
        '">' +
        (node.caption ? "<figcaption>" + fill(node.caption) + "</figcaption>" : "") +
        "</figure>";
    }
    return (
      '<div class="snes-shell">' +
      '<p class="snes-title">ZORYA  ·  FORTUNE TABLE  ·  LINCOLN / ROAD / TSAR</p>' +
      hud() +
      art +
      '<div class="snes-window">' +
      inner +
      "</div></div>"
    );
  }

  var nodes = {
    madlib: { form: true },
    t1: {
      art: "/img/tower/ch1.jpg",
      alt: "Citadel on a sea-cliff under violet lightning",
      caption: "COURSE I  ·  THE TOWER  ·  Fortifying the kitchen",
      card: "TAROT — THE TOWER",
      title: "Fortifying the mind (the hearth)",
      bodies: [
        "The Tower glimmers, {{seeker}}. Sit. I am Zorya — I talk like a prairie lawyer who learned cards in a tent and winter in an izba. That citadel on the cliff is a kitchen that thinks it is a fortress, same as a Tsar who thought a palace was a home. Rain like knives on the prep table. Will you bind your soul to the hearth-stone, as an honest man binds his word — or keep the salt packed, as my people keep the road?"
      ],
      choices: [
        { label: "BIND soul-energy to the keystone (hearth / structural immunity)", next: "t1-bind" },
        { label: "KEEP mobility — cook and run if the roof goes", next: "t1-mobile" }
      ]
    },
    "t1-bind": {
      card: "KEYSTONE = HEARTH",
      title: "You are the dinner’s foundation",
      bodies: [
        "You pour yourself into the keep’s heart. Wards blaze. You cannot flee easily — but gravy, glass, and guests will have a place to stand. Pack: Keystone Hearth. Ward +4."
      ],
      grant: "Keystone Hearth",
      ward: 4,
      choices: [{ label: "The sky fractures. Stand the storm.", next: "t2" }]
    },
    "t1-mobile": {
      card: "THE OPEN GATE",
      title: "A kitchen that can pack into a van",
      bodies: [
        "You refuse the tomb of stone. Luck +2. The citadel is a little weaker. {{van}} somewhere in the mythos honks — later, this choice is how dinner travels."
      ],
      grant: "Travel Salt",
      luck: 2,
      choices: [{ label: "The sky fractures anyway.", next: "t2" }]
    },
    t2: {
      type: "riddle",
      art: "/img/tower/ch2.jpg",
      alt: "Great Hall, tentacles at stained glass, blue altar flame",
      caption: "COURSE II  ·  THE STORM  ·  Hunger tests the wards",
      card: "LIGHTNING vs WARD",
      title: "The onset of the storm",
      prompt:
        "Lightning on the spire — Hunger testing the house. Tentacles at the glass, which the Tsar’s priests would have called demons and Lincoln would have called ‘a committee.’ A blue flame on the altar does not go out. Child, what holds when the sky breaks?",
      hint: "Roma proverb: hide in the pantry and the guest still finds you. The flame is supper.",
      answers: [
        { label: "THE BLUE FLAME  (the meal that must not go out)", correct: true, next: "t2-parapet" },
        { label: "THE INNER SANCTUM  (hide in the pantry)", correct: false, trap: 2, next: "t2-hide" },
        { label: "LET THE TOWER BURN", correct: false, trap: 4, next: "t2" }
      ]
    },
    "t2-parapet": {
      card: "PARAPET CHANNEL",
      title: "You step into the rain",
      bodies: [
        "Rather than hide, you feed the fading wards with your own heat — like tasting the soup and salting it in the storm. The barrier holds. For now. Hunger gnaws. The gate below is the next course."
      ],
      trap: 1,
      choices: [{ label: "The courtyard gate screams.", next: "t3" }]
    },
    "t2-hide": {
      card: "PANTRY",
      title: "Safe, and the glass still breaks",
      bodies: [
        "You hid. The wards flickered without you. Ward -2. The phantoms learned the pantry door. Even leftovers must be guarded."
      ],
      trap: 2,
      wardDown: 2,
      choices: [{ label: "Forced out. The gate is already gone.", next: "t3" }]
    },
    t3: {
      type: "item",
      art: "/img/tower/ch3.jpg",
      alt: "Phantom knights in the courtyard, staff on the stairs",
      caption: "COURSE III  ·  THE BREACH  ·  Guests who will not share",
      card: "PHANTOM KNIGHTS",
      title: "The broken threshold",
      prompt:
        "Phantom knights of smoke — unpaid ghosts of the Tsar’s table, boyars who ate without seating the village, a franchise that wants the recipe and not the guest. A rail-splitter would say a house divided against its supper cannot stand. ITEM the Keystone Hearth, or snap the cloth of holy force.",
      need: "Keystone Hearth",
      success: "t3-blast",
      fail: "t3-blast",
      look: "No keystone? Then you are the muzhik with only bread. The wave still comes. Hunger is the tax."
    },
    "t3-blast": {
      card: "HOLY FORCE = SERVICE BELL",
      title: "The courtyard clears",
      bodies: [
        "You do not retreat. The wave is a tablecloth snapped over a mess — as my aunt snapped linen at a stingy inn. Phantoms go into the storm. The keep groans like a palace that forgot black bread. Next card is ruin. Then we eat, as honest men do after a hard case."
      ],
      choices: [{ label: "Let the tower fall.", next: "t4" }]
    },
    t4: {
      art: "/img/tower/ch4.jpg",
      alt: "Dawn sanctuary of white stone and glass, The Star",
      caption: "COURSE IV  ·  THE STAR  ·  The citadel was always a table",
      card: "THE TOWER → THE STAR",
      title: "Rebirth in the ashes (automatic blend)",
      bodies: [
        "The keep becomes dust, like a proud palace after a true winter. Golden beam. White stone. Glass. I have told this ending three ways: Lincoln called it a new birth of freedom; my grandmother called it seating the star; the old Russians called it the Firebird cooked at last. Listen, {{seeker}}: WIDER’s fortune is not empire. It is dinner after the Tsar’s tower falls. The Star is a place-setting."
      ],
      grant: "The Star (table)",
      heal: 6,
      choices: [{ label: "Sit. Service begins.", next: "service" }]
    },
    service: {
      art: "/img/tower/ch4.jpg",
      caption: "SERVICE  ·  Mythos for dinner",
      card: "WIDER  —  FIRST SUPPER",
      title: "The sanctuary plates the {{dish}}",
      bodies: [
        "{{driver}}, {{navigator}}, and {{hound}} pull up in {{van}} as if they had always been driving toward this cliff. The road-trip was the pilgrimage; the Tower was the kitchen catching fire and living. {{snack}} on the side. {{dish}} in the center. You, {{seeker}}, are the guest who bound the hearth. Pack: {{pack}}. The storm has passed because someone set a table in the rubble."
      ],
      choices: [
        { label: "NEW CHAPTER — the first guest after dawn", next: "ch5" },
        { label: "OTHER PATH — 16-bit road (Scooby van)", next: "couch" },
        { label: "ADJUST STYLE — teller / SNES / dinner voice", next: "style" },
        { label: "SHUFFLE — deal The Tower again", next: "madlib" }
      ]
    },
    ch5: {
      card: "CHAPTER 5 — THE STAR’S GUEST",
      title: "Appetite lies down by the glass",
      bodies: [
        "{{hound}} is the first pilgrim of the new house: a snack-hound at a white-stone table, which is all religion. {{driver}} calls it destiny. {{navigator}} laminates the menu. Zorya pours tea that tastes like rain that finally learned to be soup. The mythos holds: every night, The Tower may fall. Every night, dinner rebuilds The Star."
      ],
      choices: [
        { label: "Return to service (the brand loop)", next: "service" },
        { label: "Drive the van into the wider dark", next: "couch" }
      ]
    },
    style: {
      card: "NARRATIVE TRIM",
      title: "How should Zorya plate the tale?",
      bodies: ["Three spoons. Same stew."],
      choices: [
        { label: "Old roadside teller (skazka)", next: "service" },
        { label: "SNES dungeon master", next: "service" },
        { label: "Dinner mythos (brand voice)", next: "service" }
      ]
    },
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
      choices: [
        { label: "The table was the dungeon loot", next: "service" },
        { label: "PRESS START — new game+", next: "madlib" }
      ]
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
    if (node.luck) state.luck = Math.min(12, state.luck + node.luck);
    if (node.ward) state.ward = Math.min(16, state.ward + node.ward);
    if (node.wardDown) state.ward = Math.max(0, state.ward - node.wardDown);
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
      state.ward = 12;
      state.hunger = 16;
      state.wit = 9;
      state.luck = 7;
      state.inv = ["Laminated Map"];
      state.lastRoll = null;
      root.innerHTML = wrap(
        '<p class="teller-mark">Zorya · simulated fortune · three tongues</p>' +
          "<h2>Sit. Give me names to read.</h2>" +
          "<p>I talk like three kitchens in one mouth: a prairie lawyer’s anecdote, Roma road-wisdom from my grandmother’s tent, and the old myths from the Tsar’s Russia — black bread at the Winter Palace, Firebirds that were roasts, stoves that left proud houses. Speak who sits. Then I deal The Tower until it becomes dinner.</p>" +
          yarn() +
          '<p class="omen">' +
          pick(omens) +
          "</p>" +
          '<form class="madlib" id="madlib-form">' +
          field("seeker", "Your name", blanks.seeker) +
          field("driver", "Driver", blanks.driver) +
          field("navigator", "Navigator", blanks.navigator) +
          field("hound", "Hound", blanks.hound) +
          field("snack", "Starting MacGuffin", blanks.snack) +
          field("dish", "The dish at the Star-table", blanks.dish) +
          field("van", "Talking van", blanks.van) +
          '<button class="btn btn-primary" type="submit">DEAL THE TOWER</button>' +
          "</form>"
      );
      document.getElementById("madlib-form").addEventListener("submit", function (e) {
        e.preventDefault();
        ["seeker", "driver", "navigator", "hound", "snack", "dish", "van"].forEach(function (k) {
          var el = document.getElementById("blank-" + k);
          if (el && el.value) blanks[k] = el.value;
        });
        render("t1");
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
        yarn() +
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
      root.innerHTML = wrap(html, node);
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
        root.innerHTML = wrap(html2, node);
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
      root.innerHTML = wrap(html3, node);
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
      yarn() +
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
    root.innerHTML = wrap(html4, node);
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
