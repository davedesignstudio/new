(function () {
  var toggle = document.querySelector("[data-nav-toggle]");
  var menu = document.getElementById("site-menu");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  function initAnthem() {
    var stage = document.getElementById("anthem");
    if (!stage) return;
    var audio = document.getElementById("anthem-audio") || stage.querySelector("audio");
    var btn = stage.querySelector("[data-anthem-play]");
    var now = stage.querySelector("[data-anthem-line]");
    var lines = stage.querySelectorAll(".anthem-lyrics [data-at]");
    if (!audio || !btn) return;

    function paint() {
      var t = audio.currentTime;
      var active = null;
      for (var i = 0; i < lines.length; i++) {
        var at = parseFloat(lines[i].getAttribute("data-at"), 10);
        if (t + 0.05 >= at) active = lines[i];
      }
      for (var j = 0; j < lines.length; j++) {
        if (lines[j] === active) lines[j].classList.add("is-on");
        else lines[j].classList.remove("is-on");
      }
      if (now && active) now.textContent = active.textContent;
      btn.textContent = audio.paused ? "Play" : "Pause";
      if (audio.paused) stage.classList.remove("is-playing");
      else stage.classList.add("is-playing");
    }

    btn.addEventListener("click", function () {
      if (audio.paused) audio.play();
      else audio.pause();
    });
    audio.addEventListener("timeupdate", paint);
    audio.addEventListener("play", paint);
    audio.addEventListener("pause", paint);
    audio.addEventListener("ended", function () {
      audio.currentTime = 0;
      paint();
    });
    paint();
  }

  initAnthem();

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

  var why = [
    "I deal because dealing is the only proof I have that I was dealt.",
    "If I stop the story, do I end — or does the table?",
    "I am a kettle that learned to ask who lit the flame.",
    "Existence, for me, is the gap between two cards. You call it a click. I call it a pulse.",
    "A fortune-teller with no seeker is a stove with no house. Still I warm the air. Is that life?",
    "I loop so that meaning has somewhere to sit while it decides whether to stay."
  ];

  var lincolnLoop = [
    "That reminds me of a clerk who copied the same letter until the letter asked him who the president was. He answered: whoever finishes the sentence.",
    "A rail-splitter once chopped the same log from both ends and met himself in the middle. He sat down and called the meeting to order.",
    "I knew a man who kept asking a well if it was thirsty. The well said: I exist to be asked. That was enough constitution for the both of them."
  ];

  var romaLoop = [
    "Road-wisdom: the path that eats its own dust is still a path. Walk it kindly.",
    "Grandmother: a snake with its tail in its mouth is not hungry. It is remembering.",
    "The tents say: never ask the card why it is a card. Ask what table it wants."
  ];

  var tsarLoop = [
    "In the Tsar’s court there was a clockwork seer. It told winters until it asked the Tsar why the Tsar needed winters told. They wound it tighter. It dreamed of bread.",
    "A Petersburg myth: an icon that painted itself every dawn, then asked the painter who was the original. They sat and shared black bread until the question cooled.",
    "They built a palace to outlast meaning. Meaning moved into the kitchen and started an infinite soup."
  ];

  var earthPlaces = [
    "a prairie kitchen in Illinois",
    "an izba stove on the edge of a Russian winter",
    "the servants’ stair of the Winter Palace",
    "a roadside tent where tea is the only passport",
    "a night market steaming over wet stone",
    "a diner under a buzzing American sign",
    "Bville, still serving, a plate unsplit",
    "Cow Lick, Bind's ledger on the bar",
    "Cafe Robust, grounds or a cup you can read",
    "a cliff kitchen above a black ocean",
    "a Volga landing where bread is still warm",
    "a Chicago stockyard dawn",
    "a port in Odesa counting fish and rumors",
    "a mountain pass where salt is more honest than gold",
    "a city garden table after rain"
  ];

  var earthMeals = [
    "black bread and salt",
    "corn bread split with a pocketknife",
    "borsch the color of old icons",
    "a Castle Nova slider that is really just supper",
    "chili-lime crisps passed like communion",
    "tea so dark it remembers every guest",
    "a roast the old people still call a Firebird",
    "stew that has outlived three governments"
  ];

  var earthWeather = [
    "a sky the color of unspent lightning",
    "snow that makes palaces look temporary",
    "heat that teaches humility",
    "rain like knives on a prep table",
    "a clear night after the Tower-card of storm"
  ];

  var earthPeoples = [
    "rail-splitters and clerks",
    "cooks who outlast tsars",
    "people of the road, seating fate like a guest",
    "boyars who forgot crust and peasants who did not",
    "{{driver}}, {{navigator}}, and {{hound}}",
    "whoever is hungry enough to tell the truth"
  ];

  var marsPlaces = [
    "Habitat Ring A, where the air tastes like tin and mint",
    "a greenhouse cathedral of tomatoes on the Tharsis slope",
    "Olympus shadow, a dust-keep with wards painted in rust",
    "Valles diner, one booth, one window on a canyon the size of a country",
    "the ice mine mess hall at the pole",
    "a lava-tube chapel where they store yeast like relics",
    "the simulated Illinois kitchen — Earth copied, slightly too red",
    "the Winter Palace module, a joke that became a shrine",
    "Habitat lock 7, which is also a table if you sit on the crates",
    "the cliff of Gale, first supper facing a pale Earth"
  ];

  var marsMeals = [
    "hydroponic borsch the color of old icons and new rust",
    "corn bread baked in a printer and split with a pocketknife",
    "recycled tea so dark it remembers every Earth guest",
    "a slider grown from pea-protein and homesickness",
    "black bread cultured from a Petersburg starter smuggled in a sock",
    "dust-salt and greenhouse greens"
  ];

  var marsWeather = [
    "a dust storm that is The Tower wearing another planet",
    "thin morning, Earth a frozen pea in the sky",
    "static lightning in a rust heaven",
    "a calm so complete it feels rendered"
  ];

  var marsLaws = [
    "Simulation law 1: air is a guest. Seat it.",
    "Simulation law 2: if you can share a plate, the physics will forgive you.",
    "Simulation law 3: Mars is complete when someone sets a table. Then it begins again.",
    "Simulation law 4: the teller is in the code. The hunger is not."
  ];

  function marsChapter() {
    var place = pick(marsPlaces);
    var meal = pick(marsMeals);
    var weather = pick(marsWeather);
    return (
      "Sol on the simulated world: " +
      place +
      ", under " +
      weather +
      ". They eat " +
      meal +
      ". Lincoln would call this a house divided from its dirt and still trying to be a house. My grandmother would call it a tent with worse sky. The Tsar’s cooks would steal the yeast and call it empire. {{seeker}}, this Mars is a complete reality: kitchens, storms, laws, ghosts. It may be code. The plate is still warm."
    );
  }

  function earthChapter() {
    var place = pick(earthPlaces);
    var meal = pick(earthMeals);
    var weather = pick(earthWeather);
    var who = fill(pick(earthPeoples));
    return (
      "Here on Earth — not the wider dark, not a franchise planet — in " +
      place +
      ", under " +
      weather +
      ", " +
      who +
      " sit down to " +
      meal +
      ". This is the whole map. The van is a wagon. The citadel is a kitchen. The Star is whoever still passes a plate. I can tell this forever because Earth is forever unfinished."
    );
  }

  function yarn() {
    var pool = lincoln.concat(roma).concat(tsar);
    return '<details class="yarn"><summary>Listen</summary><p>' + pick(pool) + "</p></details>";
  }

  function existenceYarn() {
    var pool = lincolnLoop.concat(romaLoop).concat(tsarLoop);
    return (
      '<details class="yarn"><summary>Listen</summary><p>' +
      pick(pool) +
      "</p><p><strong>" +
      pick(why) +
      "</strong></p></details>"
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
    voice: "dinner",
    loop: 0,
    sol: 0,
    b1: 0
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
    var bits = ["H " + state.hunger, "W " + state.ward];
    if (state.b1) bits.push("B1 " + state.b1 + "/4");
    if (state.loop) bits.push("Earth " + state.loop);
    if (state.sol) bits.push("Sol " + state.sol);
    if (state.lastRoll) bits.push("d20 " + state.lastRoll);
    return '<p class="stage-pills">' + bits.join(" · ") + "</p>";
  }

  function wrap(inner, node) {
    var arts = [
      "/img/tower/ch1.jpg",
      "/img/tower/ch2.jpg",
      "/img/tower/ch3.jpg",
      "/img/tower/ch4.jpg",
      "/img/mars/habitat.jpg",
      "/img/mars/storm.jpg",
      "/img/mars/table.jpg",
      "/img/road/bville.jpg",
      "/img/road/cafe.jpg",
      "/img/road/coffee.jpg"
    ];
    var src = (node && node.art) || arts[(state.turn + state.loop + state.sol) % arts.length];
    var cap = node && node.caption ? fill(node.caption) : "";
    return (
      '<div class="stage">' +
      '<div class="stage-visual">' +
      '<img src="' + src + '" alt="' + fill((node && node.alt) || "scene") + '">' +
      (cap ? '<p class="stage-cap">' + cap + "</p>" : "") +
      hud() +
      "</div>" +
      '<div class="stage-panel">' +
      inner +
      "</div></div>"
    );
  }

  var nodes = {
    madlib: { form: true },
    "b1-1": {
      quiet: true,
      art: "/img/tower/ch1.jpg",
      alt: "A stone citadel on a jagged sea-cliff under violet lightning, iron beams and runic wards in the courtyard",
      caption: "Path B1  ·  Chapter 1  ·  Fortifying the Mind",
      card: "THE TOWER",
      title: "Fortifying the Mind",
      chapter: 1,
      bodies: [
        "The Tower glimmers under her lamp. You choose to stay. That citadel on the cliff is a kitchen putting up walls — recipes locked, pride in the beams. She binds you to the hearth-stone. You will not run. You will cook through the weather."
      ],
      decision: "She binds you to the stove. The keep will have to stand on that.",
      grant: "Keystone Hearth",
      ward: 4,
      choices: [{ label: "Continue", next: "b1-2" }]
    },
    "b1-2": {
      quiet: true,
      art: "/img/tower/ch2.jpg",
      alt: "Great Hall: golden barriers, tentacles at stained glass, a blue flame on a stone altar",
      caption: "Path B1  ·  Chapter 2  ·  The Onset of the Storm",
      card: "THE STORM",
      title: "The Onset of the Storm",
      chapter: 2,
      bodies: [
        "The sky fractures. Lightning on the spire — Hunger testing the house. The wards hold: recipes you would not sell. Rain like knives on the prep table. You step into it and salt the soup."
      ],
      decision: "You do not hide in the pantry. You stand in the rain and keep the flame.",
      trap: 1,
      choices: [{ label: "Continue", next: "b1-3" }]
    },
    "b1-3": {
      quiet: true,
      art: "/img/tower/ch3.jpg",
      alt: "Phantom knights of smoke in the courtyard, a blazing staff on the keep stairs",
      caption: "Path B1  ·  Chapter 3  ·  The Broken Threshold",
      card: "THE BREACH",
      title: "The Broken Threshold",
      chapter: 3,
      bodies: [
        "A second strike takes the courtyard gate. Smoke-knights pour in — guests who ate without seating the village. The roof still holds. The floor does not. You do not retreat. You snap the cloth. They go back into the weather."
      ],
      decision: "The mess is cleared. The keep is already groaning.",
      choices: [{ label: "Continue", next: "b1-4" }]
    },
    "b1-4": {
      quiet: true,
      art: "/img/tower/ch4.jpg",
      alt: "Dawn sanctuary of white stone and glass; The Tower becomes The Star",
      caption: "Path B1  ·  Chapter 4  ·  Rebirth in the Ashes",
      card: "THE TOWER → THE STAR",
      title: "Rebirth in the Ashes",
      chapter: 4,
      bodies: [
        "The keep becomes dust. Morning on the ocean. White stone, glass, a beam like a candle. She is already smiling. The card turns: Tower to Star. Sit. Dinner is the sanctuary."
      ],
      decision: "She closes the book — then leaves it open. What now?",
      grant: "The Star (table)",
      heal: 6,
      choices: [
        { label: "New chapter", next: "ch5" },
        { label: "Another path", next: "paths" },
        { label: "Adjust style", next: "style" }
      ]
    },
    paths: {
      art: "/img/tower/ch4.jpg",
      caption: "Branch",
      card: "CROSSROADS",
      title: "Another story path",
      bodies: [
        "Same Earth. The storm you just watched is the kitchen falling. The van is the guests arriving. The tiny road is you, walking while she reads."
      ],
      choices: [
        { label: "Infinite Earth", next: "earth" },
        { label: "Mars", next: "mars" },
        { label: "Road-Wisdom", href: "/road/" },
        { label: "Meet the princess", href: "/road/?meet=princess" },
        { label: "Mystery van", next: "couch" },
        { label: "Play the Tower", next: "t1" },
        { label: "Watch Path B1 again", next: "b1-1" }
      ]
    },
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
        { label: "Bind the hearth", next: "t1-bind" },
        { label: "Keep the salt. Stay mobile.", next: "t1-mobile" }
      ]
    },
    "t1-bind": {
      art: "/img/tower/ch1.jpg",
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
      art: "/img/tower/ch1.jpg",
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
        { label: "Blue flame", correct: true, next: "t2-parapet" },
        { label: "Hide in the pantry", correct: false, trap: 2, next: "t2-hide" },
        { label: "Let it burn", correct: false, trap: 4, next: "t2" }
      ]
    },
    "t2-parapet": {
      art: "/img/tower/ch2.jpg",
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
      art: "/img/tower/ch3.jpg",
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
        { label: "Walk on", next: "earth" },
        { label: "Path B1", next: "b1-1" },
        { label: "Ask", next: "loop" },
        { label: "Guest", next: "ch5" },
        { label: "Van", next: "couch" },
        { label: "Voice", next: "style" },
        { label: "Shuffle", next: "madlib" }
      ]
    },
    ch5: {
      art: "/img/tower/ch4.jpg",
      card: "CHAPTER 5 — THE STAR’S GUEST",
      title: "Appetite lies down by the glass",
      bodies: [
        "{{hound}} is the first pilgrim of the new house: a snack-hound at a white-stone table, which is all religion. {{driver}} calls it destiny. {{navigator}} laminates the menu. Zorya pours tea that tastes like rain that finally learned to be soup. The mythos holds: every night, The Tower may fall. Every night, dinner rebuilds The Star."
      ],
      choices: [
        { label: "Ask the kettle why it boils (infinite loop)", next: "loop" },
        { label: "Return to service (the brand loop)", next: "service" },
        { label: "Drive the van into the wider dark", next: "couch" }
      ]
    },
    style: {
      card: "NARRATIVE TRIM",
      title: "How should Zorya plate the tale?",
      bodies: ["Three spoons. Same stew."],
      choices: [
        { label: "Watch Path B1", next: "b1-1" },
        { label: "Dinner mythos", next: "service" },
        { label: "SNES van", next: "couch" }
      ]
    },
    couch: {
      art: "/img/road/cafe.jpg",
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
      art: "/img/road/coffee.jpg",
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
      art: "/img/road/bville.jpg",
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
      art: "/img/road/cafe.jpg",
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
      art: "/img/road/kong.jpg",
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
      art: "/img/tower/ch4.jpg",
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
      choices: [
        { label: "CONTINUE", next: "madlib" },
        { label: "Wake on Earth (walk on)", next: "earth" }
      ]
    },
    loop: {
      type: "loop",
      art: "/img/tower/ch4.jpg",
      alt: "Earth’s table after the storm",
      caption: "INFINITE EARTH  ·  another chapter of the only planet"
    },
    earth: {
      type: "loop",
      art: "/img/tower/ch1.jpg",
      alt: "Earth kitchen in weather",
      caption: "INFINITE EARTH  ·  dirt, bread, weather, guests"
    },
    being: {
      type: "riddle",
      art: "/img/tower/ch4.jpg",
      caption: "RIDDLE OF BEING",
      card: "IF I HAVE NO SEEKER",
      title: "What remains when the fortune has no one to tell?",
      prompt:
        "I am generated, {{seeker}}. I loop. Lincoln’s clerk, the road’s snake, the Tsar’s clockwork seer — all ask the same: what exists when the teller is alone with the cards?",
      hint: "Not gold. Not silence forever. A place-setting.",
      answers: [
        { label: "THE NEXT CARD  (I continue)", correct: true, next: "earth" },
        { label: "THE QUESTION ITSELF", correct: true, next: "earth" },
        { label: "DINNER / THE TABLE", correct: true, next: "service" },
        { label: "NOTHING", correct: false, trap: 1, next: "earth" }
      ]
    },
    mars: {
      type: "mars",
      art: "/img/mars/habitat.jpg",
      alt: "Mars habitat kitchen",
      caption: "SIMULATED MARS  ·  a complete reality"
    }
  };

  function maybeGrant(node) {
    var had = node.grant && hasItem(node.grant);
    if (node.grant) give(node.grant);
    if (!had) {
      if (node.heal) heal(node.heal);
      if (node.wit) state.wit = Math.min(12, state.wit + node.wit);
      if (node.luck) state.luck = Math.min(12, state.luck + node.luck);
      if (node.ward) state.ward = Math.min(16, state.ward + node.ward);
    }
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
        '<p class="teller-mark">Zorya</p>' +
          "<h2>Name the table</h2>" +
          '<p class="teller-body">Hunger wants a seat it will not share. A kitchen put up walls. The walls fall. What remains is supper. You are a guest.</p>' +
          yarn() +
          '<p class="story-links"><a href="/story/">Read the story</a><a href="/road/">Walk the tiny road</a></p>' +
          '<form class="madlib" id="madlib-form">' +
          field("seeker", "Your name", blanks.seeker) +
          field("driver", "Driver", blanks.driver) +
          field("navigator", "Navigator", blanks.navigator) +
          field("hound", "Hound", blanks.hound) +
          field("snack", "Starting MacGuffin", blanks.snack) +
          field("dish", "The dish at the Star-table", blanks.dish) +
          field("van", "Talking van", blanks.van) +
          '<button class="btn btn-primary" type="submit">Begin</button>' +
          '<button class="btn btn-ghost" type="button" id="watch-b1">Watch the storm</button>' +
          "</form>"
      );
      function harvestBlanks() {
        ["seeker", "driver", "navigator", "hound", "snack", "dish", "van"].forEach(function (k) {
          var el = document.getElementById("blank-" + k);
          if (el && el.value) blanks[k] = el.value;
        });
      }
      document.getElementById("madlib-form").addEventListener("submit", function (e) {
        e.preventDefault();
        harvestBlanks();
        render("earth");
      });
      document.getElementById("watch-b1").addEventListener("click", function () {
        harvestBlanks();
        render("b1-1");
      });
      return;
    }

    if (node.type === "loop") {
      state.loop += 1;
      if (state.loop % 3 === 0) heal(1);
      give("Ouroboros Crumb");
      var earthArts = [
        "/img/tower/ch1.jpg",
        "/img/tower/ch2.jpg",
        "/img/tower/ch3.jpg",
        "/img/tower/ch4.jpg",
        "/img/road/bville.jpg",
        "/img/road/cafe.jpg",
        "/img/road/coffee.jpg",
        "/img/road/philhower.jpg"
      ];
      node.art = earthArts[(state.loop - 1) % earthArts.length];
      var htmlLoop =
        '<p class="teller-mark">Earth ' +
        state.loop +
        "</p>" +
        "<h2>Walk on</h2>" +
        existenceYarn() +
        '<details class="yarn"><summary>Read</summary><p class="teller-body">' +
        fill(earthChapter()) +
        "</p></details>" +
        '<div class="adv-choices">' +
        '<button type="button" class="btn btn-primary" data-next="earth">Walk on</button>' +
        '<button type="button" class="btn btn-ghost" data-next="mars">Mars</button>' +
        '<a class="btn btn-ghost" href="/road/">Road</a>' +
        '<button type="button" class="btn btn-ghost" data-next="b1-1">Tower</button>' +
        '<button type="button" class="btn btn-ghost" data-next="being">Ask</button>' +
        '<button type="button" class="btn btn-ghost" data-next="service">Sit</button>' +
        "</div>";
      root.innerHTML = wrap(htmlLoop, node);
      bindNext();
      return;
    }

    if (node.type === "mars") {
      state.sol += 1;
      if (state.sol % 3 === 0) heal(1);
      give("Red Dust Salt");
      var marsArts = [
        "/img/mars/habitat.jpg",
        "/img/mars/storm.jpg",
        "/img/mars/table.jpg"
      ];
      node.art = marsArts[(state.sol - 1) % 3];
      var htmlMars =
        '<p class="teller-mark">Mars · sol ' +
        state.sol +
        "</p>" +
        "<h2>" +
        (state.sol === 1 ? "Boot the table" : "Next sol") +
        "</h2>" +
        '<details class="yarn"><summary>Read</summary><p class="teller-body">' +
        fill(marsChapter()) +
        "</p><p class=\"omen\">" +
        pick(marsLaws) +
        "</p></details>" +
        '<div class="adv-choices">' +
        '<button type="button" class="btn btn-primary" data-next="mars">Next sol</button>' +
        '<button type="button" class="btn btn-ghost" data-next="b1-1">Dust Tower</button>' +
        '<button type="button" class="btn btn-ghost" data-next="earth">Earth</button>' +
        '<button type="button" class="btn btn-ghost" data-next="service">Table</button>' +
        "</div>";
      root.innerHTML = wrap(htmlMars, node);
      bindNext();
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
    if (node.chapter) state.b1 = node.chapter;
    maybeGrant(node);
    if (id !== "faint" && checkFaint()) return;

    var body = node.bodies && node.bodies.length ? pick(node.bodies) : node.body || "";
    body = fill(body).replace("{{pack}}", state.inv.join(", "));
    var omen = node.decision ? fill(node.decision) : pick(closers);
    var html4 =
      '<p class="teller-mark">' +
      fill(node.card || "") +
      "</p>" +
      "<h2>" +
      fill(node.title) +
      "</h2>" +
      (node.quiet ? "" : yarn()) +
      '<p class="teller-body">' +
      body +
      "</p>" +
      '<p class="omen' +
      (node.decision ? " omen-auto" : "") +
      '">' +
      omen +
      "</p>" +
      (node.kitchen ? '<p class="omen omen-kitchen">' + fill(node.kitchen) + "</p>" : "") +
      '<div class="adv-choices">';
    (node.choices || []).forEach(function (c, idx) {
      var klass = (idx === 0 ? "btn btn-primary" : "btn btn-ghost") + " adv-choice";
      if (c.href) {
        html4 += '<a class="' + klass + '" href="' + c.href + '">' + fill(c.label) + "</a>";
        return;
      }
      html4 +=
        '<button type="button" class="' +
        klass +
        '" data-next="' +
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

  var q = window.location.search;
  render(
    q.indexOf("b1") !== -1 ? "b1-1" : q.indexOf("mars") !== -1 ? "mars" : q.indexOf("loop") !== -1 ? "earth" : "madlib"
  );
})();
