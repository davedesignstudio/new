(function (g) {
  var STORE = "wider.table.v1";

  var JOBS = {
    cook: { hands: 3, heart: 1, kit: "a pan", line: "You know heat. That is a kind of spell." },
    driver: { hands: 2, heart: 2, kit: "keys", line: "You know a van that starts on the third try." },
    hound: { hands: 1, heart: 3, kit: "a nose", line: "You know smell. Plots fall off when you chew them." },
    reader: { hands: 1, heart: 3, kit: "a napkin", line: "You know when not to turn the card." }
  };

  var PC_NAMES = ["Moss", "Jun", "Hari", "Kit", "Vale", "Ren", "Nell", "Bo", "Irie", "Sol"];

  var COOK_NAMES = [
    "Marisol",
    "Auntie Lin",
    "Hector",
    "Bess",
    "Priya",
    "Oksana",
    "Wei",
    "Rosa",
    "Yusuf",
    "Mae",
    "Fran",
    "Samir",
    "June",
    "Tomás",
    "Nell"
  ];

  var DISHES = [
    "chili-lime crisps",
    "a bun that has kept its name for forty years",
    "onion rings still ticking",
    "stew that is mostly grief and very good stock",
    "a slider on a paper boat",
    "kettle noodles",
    "fried dough coins",
    "beans with a stone waiting in them",
    "pie that remembers a window",
    "red sauce with no label"
  ];

  var SMELLS = [
    "cooler hum and lime",
    "griddle sugar and rain",
    "onion and old coffee",
    "amber lamps and thyme",
    "rubber and miracle sauce",
    "lemon oil and dust",
    "lightning and stock",
    "bread and wet stone"
  ];

  var LIGHTS = [
    "The cooler light blinks like it is breathing.",
    "Kites eat the streetlamps.",
    "One strip light is doing the work of a moon.",
    "Emergency amber. Radio hymns.",
    "Neon that wants to be holy and is only trying.",
    "A work lantern on a girder nobody should still be using.",
    "Every window lit, every door barred.",
    "Dawn the colour of a receipt."
  ];

  var JOKES = [
    "Klax would highlight IF YOU ARE ALREADY HUNGRY, which is every subsection.",
    "Grub sits like a person who paid for a ticket.",
    "Gary almost says BEHOLD and instead says, very small, this is good.",
    "A mascot the size of a refrigerator waves at children with visible contempt.",
    "The check is already face-down, which is somehow menacing.",
    "Prophet Gary consults a scroll, goes pale, and admits the hound is not in the document.",
    "Bodie does not air-guitar. File that. It is diagnostic.",
    "The laminated itinerary has been folded into a coaster so it has a job."
  ];

  var ACHES = [
    "Twelve is the wrong number now. She says it like a recipe: no heat, no garnish.",
    "VANESSA starts on the first try, which she has never once done, and nobody makes a joke.",
    "Her hand stays on the bowl rim a second too long.",
    "The owner cannot stop crying. A cook, without looking at him, butters him more bread.",
    "She has to whisper. The moan used up her voice.",
    "He holds the rubber head under his arm like a hat he no longer needs, and he is just tired.",
    "You opened someone's door for them. It is not the same as being invited through it.",
    "Everyone is full and nobody is fed, which is a distinction this road takes seriously."
  ];

  var HELLOS = [
    "“You are hungry,” they say. “That is not a prophecy. That is a smell.”",
    "They do not look up. The food looks up for them.",
    "“Hands or out,” they say, and then, softer, “hands is a better story.”",
    "They set water down before they ask who you are.",
    "“If you are here to rename it, the stall is haunted. If you are here to eat, sit.”"
  ];

  var PITCHES = [
    "He wants to scale the flavor profile. He says it like a kindness.",
    "She offers a number that is genuinely a lot, and none of it has a name attached.",
    "The folder has a column for asset and a column for cost and no column for the cook.",
    "He would like to call it the Boom Boom. It has a name. It has had a name.",
    "Hunger wants a seat it will not share. It has learned to wear a nice coat."
  ];

  var ASIDES = [
    "A moth inspects the specials.",
    "The ladle ticks the pot, keeping time.",
    "Steam writes something on the window and forgets it.",
    "Zorya is in a booth that was not there. She does not wave.",
    "Somewhere a van fails to start, out of principle."
  ];

  var HIT_YOU = [
    "The ladle finds your knuckles. Honest heat.",
    "Steam burns. You deserved a little of that.",
    "A menu board clips your elbow. The specials do not flinch."
  ];

  var HIT_THEM = [
    "The pan rings like a bell. They sit down harder than they meant to.",
    "You hit the folder, which is the true weak point.",
    "Grub, uninvited, chews a corner of the plot. It helps."
  ];

  var MISS = [
    "You swing at the idea of a monster and hit a napkin dispenser.",
    "The dice bounce. The kitchen does not care about your initiative.",
    "You miss. The stew does not."
  ];

  var GUESTS = [
    {
      id: "bodie",
      name: "Bodie",
      line: "Bodie is already holding keys he has not been given. “Dude. We are SO destined.” He means the next plate.",
      ache: "Bodie almost air-guitars, then doesn't. That is how you know it is bad."
    },
    {
      id: "klax",
      name: "Klax",
      line: "Klax has an advisory. He has highlighted IF YOU ARE ALREADY HUNGRY, which is every subsection.",
      ache: "Klax looks at the itinerary like it might forgive him."
    },
    {
      id: "grub",
      name: "Grub",
      line: "Grub comes out from under a booth with something in his mouth, like a ring bearer who has misunderstood the assignment.",
      ache: "Grub goes quiet. The joke was never the hound. The hound was the one who stayed."
    },
    {
      id: "vanessa",
      name: "VANESSA",
      line: "VANESSA, who is a van, says nothing in dot-matrix and somehow still says third try.",
      ache: "The dashboard does something disapproving. She has driven through a storm for people who did not thank her."
    },
    {
      id: "gary",
      name: "Gary",
      line: "Prophet Gary materializes in a booth of light and begins, “BEHOLD, THE CHOSEN—” and a ladle tells him he is blocking the queue.",
      ache: "Gary eats standing up, then sits down, which for him is a conversion experience."
    }
  ];

  var PLACE_WORDS = [
    "cellar",
    "basement",
    "alley",
    "roof",
    "pantry",
    "garden",
    "van",
    "booth",
    "lot",
    "pier",
    "cliff",
    "tower",
    "kitchen",
    "upstairs",
    "downstairs",
    "freezer",
    "storeroom",
    "courtyard",
    "rubble",
    "stall",
    "counter",
    "girder",
    "tent",
    "market",
    "diner",
    "canteen",
    "mart",
    "court"
  ];

  var KIND_DEFS = {
    mart: {
      titles: ["The blinking mini-mart", "Last-bag chapel", "Sodium-orange pumps"],
      arts: ["/img/road/cafe.jpg", "/img/road/bville.jpg"],
      tags: ["share", "recipe"],
      station: "cooler",
      item: "chili-lime crisps",
      foe: "scout"
    },
    market: {
      titles: ["Dustport night market", "Kite-stall row", "Forty griddles"],
      arts: ["/img/road/bville.jpg", "/img/road/bville-2.jpg"],
      tags: ["rename"],
      station: "griddle",
      item: "the bun's real name",
      foe: "scout"
    },
    diner: {
      titles: ["The silent corridor diner", "Six booths, no beacons", "A chrome napkin moon"],
      arts: ["/img/road/coffee.jpg", "/img/road/coffee-cup.jpg"],
      tags: ["share", "basket"],
      station: "window booth",
      item: "ketchup",
      foe: null
    },
    court: {
      titles: ["Carnival food court", "Miracle sauces, almost", "The rubber-head nave"],
      arts: ["/img/road/kong.jpg"],
      tags: ["mask"],
      station: "stall",
      item: "rubber mask",
      foe: "mascot"
    },
    canteen: {
      titles: ["Widow's Spur canteen", "Amber hymn kitchen", "The locked dining room"],
      arts: ["/img/road/philhower.jpg"],
      tags: ["door", "chair"],
      station: "pot",
      item: "a key she will not use",
      foe: null
    },
    tower: {
      titles: ["The sea-cliff kitchen", "The Tower, which is a restaurant", "Forty cooks, no guests"],
      arts: ["/img/tower/ch1.jpg", "/img/tower/ch3.jpg"],
      tags: ["storm"],
      station: "line",
      item: "an index card with four lines",
      foe: "hunger"
    },
    spur: {
      titles: ["A spur road canteen", "Cans like tombstones", "Radio and stock"],
      arts: ["/img/road/philhower.jpg", "/img/mars/storm.jpg"],
      tags: ["chair"],
      station: "counter",
      item: "unlabeled jar",
      foe: null
    },
    pier: {
      titles: ["Slider stand at the edge", "Eight stools and a light", "Castle Nova, which is a counter"],
      arts: ["/img/tower/ch4.jpg", "/img/mars/table.jpg"],
      tags: ["sit"],
      station: "board",
      item: "coffee, already poured",
      foe: null
    },
    alley: {
      titles: ["The alley griddle", "A stall with no line", "CLOSED — HAUNTED"],
      arts: ["/img/road/bville-2.jpg", "/img/road/cafe.jpg"],
      tags: ["rename", "share"],
      station: "cart",
      item: "fried dough coin",
      foe: "scout"
    },
    roof: {
      titles: ["The high girder", "A lantern that is a work light", "Scaffolding from 1998"],
      arts: ["/img/road/kong.jpg", "/img/tower/ch2.jpg"],
      tags: ["storm"],
      station: "platform",
      item: "a work lantern",
      foe: "hunger"
    },
    pantry: {
      titles: ["The pantry that was a chapel", "Jars with names on tape", "A stone among the beans"],
      arts: ["/img/road/paper.jpg", "/img/road/coffee-cup.jpg"],
      tags: ["share", "recipe"],
      station: "shelf",
      item: "beans",
      foe: null
    }
  };

  var KIND_KEYS = ["mart", "market", "diner", "court", "canteen", "tower", "spur", "pier"];

  function titleCase(s) {
    s = String(s || "").replace(/\s+/g, " ").trim();
    if (!s) return "Friend";
    return s
      .split(" ")
      .map(function (w) {
        if (!w) return w;
        if (w.toUpperCase() === "VANESSA") return "VANESSA";
        return w.charAt(0).toUpperCase() + w.slice(1);
      })
      .join(" ");
  }

  function makeRng(seed, state) {
    var s = state != null ? state >>> 0 : (seed >>> 0) || 1;
    function next() {
      s = (s * 1664525 + 1013904223) >>> 0;
      return s / 4294967296;
    }
    return {
      seed: seed,
      state: function () {
        return s;
      },
      next: next,
      int: function (n) {
        if (n <= 0) return 0;
        return Math.floor(next() * n);
      },
      pick: function (a) {
        return a[Math.floor(next() * a.length)];
      },
      chance: function (p) {
        return next() < p;
      },
      shuffle: function (arr) {
        var a = arr.slice();
        var i;
        for (i = a.length - 1; i > 0; i--) {
          var j = Math.floor(next() * (i + 1));
          var t = a[i];
          a[i] = a[j];
          a[j] = t;
        }
        return a;
      },
      d: function (sides) {
        return 1 + Math.floor(next() * sides);
      }
    };
  }

  function rngOf(st) {
    return makeRng(st.seed, st.rngState);
  }

  function saveRng(st, rng) {
    st.rngState = rng.state();
  }

  function deep(o) {
    return JSON.parse(JSON.stringify(o));
  }

  function hasItem(st, name) {
    var n = String(name).toLowerCase();
    return st.pack.some(function (p) {
      return p.toLowerCase().indexOf(n) !== -1;
    });
  }

  function takePack(st, name) {
    if (st.pack.indexOf(name) === -1) st.pack.push(name);
  }

  function dropPack(st, name) {
    var n = String(name).toLowerCase();
    st.pack = st.pack.filter(function (p) {
      return p.toLowerCase().indexOf(n) === -1;
    });
  }

  function line(lines, who, text) {
    if (text) lines.push({ who: who, text: text });
  }

  function matchName(needle, hay) {
    if (!needle || !hay) return false;
    needle = String(needle).toLowerCase();
    hay = String(hay).toLowerCase();
    return hay.indexOf(needle) !== -1 || needle.indexOf(hay) !== -1;
  }

  function roomOf(st) {
    return st.rooms[st.room];
  }

  function makeCook(rng, kind) {
    var def = KIND_DEFS[kind] || KIND_DEFS.mart;
    return {
      name: rng.pick(COOK_NAMES),
      dish: rng.pick(DISHES),
      joke: rng.pick(JOKES),
      ache: rng.pick(ACHES),
      hello: rng.pick(HELLOS),
      doing: rng.pick(["tending", "guarding", "refusing to rename", "stirring", "plating"]),
      station: def.station,
      fed: false,
      talked: 0
    };
  }

  function makeFoe(rng, kind) {
    var def = KIND_DEFS[kind] || KIND_DEFS.mart;
    if (!def.foe) return null;
    if (def.foe === "mascot") {
      return {
        id: "mascot",
        name: "the mascot",
        hp: 6 + rng.int(4),
        intro: "A mascot the size of a refrigerator stops waving. The head is rubber. The coat is very nice.",
        pitch: rng.pick(PITCHES),
        weak: "the rubber head"
      };
    }
    if (def.foe === "hunger") {
      return {
        id: "hunger",
        name: "Hunger",
        hp: 8 + rng.int(5),
        intro: "Hunger arrives as weather. It wants a seat it will not share.",
        pitch: "It does not negotiate. It eats the guest list.",
        weak: "a set table"
      };
    }
    return {
      id: "scout",
      name: "the scout",
      hp: 5 + rng.int(4),
      intro: "A person in a nice coat is holding a folder like a weapon that went to business school.",
      pitch: rng.pick(PITCHES),
      weak: "the cook's name"
    };
  }

  function makeItems(rng, kind) {
    var def = KIND_DEFS[kind] || KIND_DEFS.mart;
    var items = [
      {
        id: "dish-" + kind,
        name: def.item,
        desc: "It smells like an argument you are losing.",
        taken: false
      }
    ];
    if (rng.chance(0.4)) {
      items.push({
        id: "extra-" + kind,
        name: rng.pick(["a ladle", "a receipt", "a dough coin", "an unlabeled jar"]),
        desc: "Someone left it out on purpose.",
        taken: false
      });
    }
    return items;
  }

  function makeKitchen(rng, kind, id) {
    var def = KIND_DEFS[kind] || KIND_DEFS.alley;
    var title = rng.pick(def.titles);
    return {
      id: id,
      kind: kind,
      title: title,
      art: rng.pick(def.arts),
      smell: rng.pick(SMELLS),
      light: rng.pick(LIGHTS),
      tags: def.tags.slice(),
      cook: makeCook(rng, kind),
      foe: makeFoe(rng, kind),
      items: makeItems(rng, kind),
      exits: [],
      visited: false,
      looked: 0,
      openDoor: false,
      guest: null
    };
  }

  function makeTent(rng) {
    return {
      id: "tent",
      kind: "tent",
      title: "The tent at the crossroads",
      art: "/img/road/paper.jpg",
      smell: "wax and wet canvas",
      light: "One candle. One deck. She does not look up.",
      tags: ["deal"],
      cook: {
        name: "Zorya",
        dish: "tea she did not order",
        joke: "“You are hungry. That is not a prophecy. That is a smell.”",
        ache: "A teller alone is a stove with no house.",
        hello: "She turns one card face-down and leaves it there.",
        doing: "dealing",
        station: "napkin",
        fed: false,
        talked: 0
      },
      foe: null,
      items: [
        {
          id: "stone",
          name: "the hearth-stone",
          desc: "It is just a stone. You do not eat this.",
          taken: false
        }
      ],
      exits: [],
      visited: false,
      looked: 0,
      openDoor: false,
      guest: null
    };
  }

  function makeStar(rng) {
    return {
      id: "star",
      kind: "star",
      title: "The Star-table",
      art: rng.pick(["/img/tower/ch4.jpg", "/img/mars/table.jpg"]),
      smell: "coffee and onions that are doing emotional labor",
      light: "There are exactly enough seats. There have always been exactly enough seats.",
      tags: ["sit"],
      cook: {
        name: "the night cook",
        dish: "a slider on a paper boat",
        joke: "Bodie will later claim it was the onions.",
        ache: "Nobody asks what you did to deserve it.",
        hello: "He pours coffee before he asks who you are.",
        doing: "sliding a plate",
        station: "counter",
        fed: false,
        talked: 0
      },
      foe: null,
      items: [
        {
          id: "coffee",
          name: "coffee",
          desc: "Poured already. The whole religion of this place.",
          taken: false
        }
      ],
      exits: [],
      visited: false,
      looked: 0,
      openDoor: false,
      guest: null
    };
  }

  function wire(a, b, dir, back) {
    a.exits.push({ to: b.id, label: b.title, dir: dir });
    b.exits.push({ to: a.id, label: a.title, dir: back || "back" });
  }

  function generateNight(rng) {
    var rooms = {};
    var tent = makeTent(rng);
    var star = makeStar(rng);
    rooms.tent = tent;
    rooms.star = star;

    var pool = rng.shuffle(["mart", "market", "court", "tower", "spur", "pier", "alley"]);
    var kinds = rng.shuffle(["diner", "canteen"].concat(pool.slice(0, 3)));

    var chain = [];
    var i;
    for (i = 0; i < kinds.length; i++) {
      var id = "k" + i;
      rooms[id] = makeKitchen(rng, kinds[i], id);
      chain.push(rooms[id]);
    }

    var guests = rng.shuffle(GUESTS).slice(0, 2 + rng.int(2));
    for (i = 0; i < guests.length && i < chain.length; i++) {
      chain[i].guest = guests[i];
    }

    wire(tent, chain[0], "east", "back");
    for (i = 0; i < chain.length - 1; i++) {
      wire(chain[i], chain[i + 1], "east", "back");
    }
    wire(chain[chain.length - 1], star, "east", "back");

    if (rng.chance(0.7) && chain.length > 2) {
      var sideKind = rng.pick(["pantry", "roof", "alley"]);
      var side = makeKitchen(rng, sideKind, "side");
      rooms.side = side;
      var from = chain[1];
      wire(from, side, rng.pick(["south", "down", "up"]), "back");
    }

    return rooms;
  }

  function opening(seed) {
    return [
      {
        who: "she",
        text:
          "It is a kitchen table. I am the dungeon master. You are the hungry one. The dice are real. The map is not printed — I roll it as we go. Night " +
          seed +
          "."
      },
      {
        who: "dm",
        text: "One candle. One deck. A roadside woman named Zorya. She does not curse you. She deals."
      },
      {
        who: "she",
        text: "Name yourself, or say ROLL, and I will."
      }
    ];
  }

  function newGame(seed) {
    if (seed == null || seed === "") seed = (Date.now() % 900000) + 1;
    seed = parseInt(seed, 10);
    if (!seed || seed < 1) seed = 1;
    var rng = makeRng(seed, seed);
    var rooms = generateNight(rng);
    var st = {
      seed: seed,
      rngState: rng.state(),
      mode: "name",
      name: "",
      job: "",
      hands: 0,
      heart: 0,
      hp: 12,
      maxHp: 12,
      pack: [],
      flags: {
        fed: [],
        shared: false,
        stoneInPot: false,
        extraPlace: false,
        unmasked: 0,
        hoarded: 0,
        laughed: false,
        ached: false,
        hired: false,
        stoneOffered: false
      },
      room: "tent",
      rooms: rooms,
      improvised: 0,
      ending: null,
      endingText: [],
      log: opening(seed)
    };
    persist(st);
    return st;
  }

  function persist(st) {
    try {
      if (g.localStorage) g.localStorage.setItem(STORE, JSON.stringify(st));
    } catch (e) {}
  }

  function loadGame() {
    try {
      var raw = g.localStorage && g.localStorage.getItem(STORE);
      if (!raw) return null;
      var st = JSON.parse(raw);
      if (!st || !st.rooms || !st.seed) return null;
      return st;
    } catch (e) {
      return null;
    }
  }

  function clearSave() {
    try {
      if (g.localStorage) g.localStorage.removeItem(STORE);
    } catch (e) {}
  }

  function parse(raw) {
    var original = String(raw == null ? "" : raw);
    var t = original
      .toLowerCase()
      .replace(/[^\w\s'-]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    if (!t) return { verb: "empty", rest: "", raw: original };

    if (/^(l|look|look around|examine room|listen)$/.test(t)) return { verb: "look", rest: "", raw: original };
    if (/^(i|inv|inventory|pack|sheet|stats)$/.test(t)) return { verb: "inv", rest: "", raw: original };
    if (/^(help|\?|commands|what can i do)$/.test(t)) return { verb: "help", rest: "", raw: original };
    if (/^(wait)$/.test(t)) return { verb: "wait", rest: "", raw: original };
    if (/^(sit|sit down|set eleven|set twelve|eleventh chair)$/.test(t)) return { verb: "sit", rest: t, raw: original };
    if (/^(laugh)$/.test(t)) return { verb: "laugh", rest: "", raw: original };
    if (/^(cry|weep)$/.test(t)) return { verb: "cry", rest: "", raw: original };
    if (/^(new|new night)$/.test(t)) return { verb: "new", rest: "", raw: original };
    if (/^(walk again|again|restart)$/.test(t)) return { verb: "again", rest: "", raw: original };
    if (/^(same night|this seed)$/.test(t)) return { verb: "same", rest: "", raw: original };

    var m;
    m = t.match(/^(?:i am a |i'm a |be a |play |job )?(cook|driver|hound|reader)$/);
    if (m) return { verb: "job", rest: m[1], raw: original };

    m = t.match(/^(?:i am|i'm|call me|name is|my name is)\s+(.+)$/);
    if (m) {
      var restn = m[1];
      var jm = restn.match(/^(.*?)\s+(?:the|a)\s+(cook|driver|hound|reader)$/);
      if (jm) return { verb: "namejob", rest: jm[1], job: jm[2], raw: original };
      return { verb: "name", rest: restn, raw: original };
    }
    m = t.match(/^(.+)\s+the\s+(cook|driver|hound|reader)$/);
    if (m && !/^(go|walk|talk|ask|look|take|use|give|attack|eat|cook|hire|sit|put|pass|tell|speak)/.test(t)) {
      return { verb: "namejob", rest: m[1], job: m[2], raw: original };
    }

    if (/^(roll|roll a name)$/.test(t)) return { verb: "rollname", rest: "", raw: original };
    m = t.match(/^roll\s+(?:a\s+)?(?:d20|dice|check)?(.*)$/);
    if (m && t.indexOf("roll") === 0 && t !== "roll") return { verb: "roll", rest: m[1].trim(), raw: original };
    if (t === "roll d20" || t === "roll dice") return { verb: "roll", rest: "", raw: original };

    m = t.match(/^(go|walk|enter|head|leave|drive|climb)\s+(?:to\s+|toward\s+|into\s+|up\s+)?(.+)$/);
    if (m) return { verb: "go", rest: m[2], raw: original };
    if (/^(north|south|east|west|back|out|in|up|down)$/.test(t)) return { verb: "go", rest: t, raw: original };
    if (/^(onward|forward|next|continue)$/.test(t)) return { verb: "go", rest: "east", raw: original };

    m = t.match(/^(talk|ask|tell|speak|comfort)\s+(?:to\s+|with\s+)?(.+)$/);
    if (m) return { verb: "talk", rest: m[2], raw: original };
    if (/^(talk|ask|speak)$/.test(t)) return { verb: "talk", rest: "", raw: original };

    m = t.match(/^(look|examine|inspect|read|check)\s+(?:at\s+|the\s+)?(.+)$/);
    if (m) return { verb: "lookat", rest: m[2], raw: original };

    m = t.match(/^(take|get|grab|steal|pick up)\s+(?:the\s+)?(.+)$/);
    if (m) return { verb: "take", rest: m[2], raw: original };

    m = t.match(/^(use|give|offer|pass|share|split|put|pour)\s+(?:the\s+)?(.+)$/);
    if (m) return { verb: "use", rest: m[2], raw: original };
    if (/^(share|split the basket|pass the ketchup|pass the jar|pass what is red)$/.test(t)) {
      return { verb: "use", rest: t, raw: original };
    }
    if (/^(put the stone|stone in the pot|put it in the pot)$/.test(t)) {
      return { verb: "use", rest: "stone in the pot", raw: original };
    }

    m = t.match(/^(attack|hit|fight|punch|kick|unmask)\s+(?:the\s+)?(.+)$/);
    if (m) return { verb: "attack", rest: m[2], raw: original };
    if (/^(attack|fight|unmask)$/.test(t)) return { verb: "attack", rest: "", raw: original };

    m = t.match(/^(eat|taste|chew)\s+(?:the\s+)?(.+)$/);
    if (m) return { verb: "eat", rest: m[2], raw: original };
    if (/^(eat|taste)$/.test(t)) return { verb: "eat", rest: "", raw: original };

    m = t.match(/^(cook|stir|feed|serve)\s*(.*)$/);
    if (m) return { verb: "cook", rest: (m[2] || "").trim(), raw: original };

    m = t.match(/^(hire)\s*(.*)$/);
    if (m) return { verb: "hire", rest: (m[2] || "").trim(), raw: original };

    return { verb: "do", rest: t, raw: original };
  }

  function rollCheck(st, rng, stat, dc, lines) {
    var die = rng.d(20);
    var bon = st[stat] || 0;
    var total = die + bon;
    var ok = total >= dc;
    if (die === 20) ok = true;
    if (die === 1) ok = false;
    line(
      lines,
      "roll",
      "d20 (" + die + ") + " + titleCase(stat) + " (" + bon + ") = " + total + " vs " + dc + (ok ? ". Yes." : ". No.")
    );
    return { die: die, bonus: bon, total: total, dc: dc, ok: ok, crit: die === 20, fumble: die === 1 };
  }

  function lookLines(st, rng, lines) {
    var r = roomOf(st);
    if (!r) {
      line(lines, "dm", "The map ate itself. Say WALK AGAIN.");
      return;
    }
    r.visited = true;
    r.looked += 1;
    line(lines, "dm", r.title + ".");
    line(lines, "dm", "Steam first: " + r.smell + ". " + r.light);
    if (r.cook) {
      if (r.kind === "diner" && r.looked === 1) {
        line(lines, "dm", r.cook.name + " sets three waters before anyone has a name. That is the whole religion of this place.");
      } else if (r.kind === "star" && r.looked === 1) {
        line(lines, "dm", r.cook.hello);
      } else {
        line(
          lines,
          "dm",
          r.cook.name + " is " + r.cook.doing + " " + r.cook.dish + " at the " + r.cook.station + "."
        );
      }
      if (r.cook.fed) line(lines, "dm", r.cook.name + " has been fed. The room is a different temperature.");
    }
    if (r.foe && r.foe.hp > 0) {
      line(lines, "dm", r.foe.intro);
    } else if (r.foe && r.foe.hp <= 0) {
      line(lines, "dm", "The " + r.foe.name + " is sitting. The folder is just a folder now.");
    }
    var left = r.items.filter(function (it) {
      return !it.taken;
    });
    if (left.length) {
      line(
        lines,
        "dm",
        "Out on the " +
          (r.cook ? r.cook.station : "table") +
          ": " +
          left
            .map(function (it) {
              return it.name;
            })
            .join("; ") +
          "."
      );
    }
    if (r.guest && r.looked === 1) {
      line(lines, "dm", r.guest.line);
    }
    if (r.looked === 1) {
      line(lines, "dm", rng.pick(ASIDES));
    } else {
      line(lines, "she", rng.chance(0.5) ? rng.pick(ASIDES) : "You have been here. The food has not left.");
    }
    if (r.kind === "tent" && !hasItem(st, "hearth-stone") && !st.flags.stoneOffered) {
      line(lines, "she", "A stone on the napkin. It is just a stone. You do not eat this. The old stories agree.");
    }
    var exits = r.exits
      .map(function (e) {
        return e.dir + " — " + e.label;
      })
      .join("; ");
    if (exits) line(lines, "sys", "Ways out: " + exits + ".");
  }

  function matchExit(r, rest) {
    if (!rest) return null;
    var t = rest.toLowerCase();
    var i;
    for (i = 0; i < r.exits.length; i++) {
      var e = r.exits[i];
      if (e.dir === t) return e;
      if (matchName(t, e.label) || matchName(t, e.to)) return e;
    }
    if (t === "on" || t === "onward" || t === "forward" || t === "next") {
      for (i = 0; i < r.exits.length; i++) {
        if (r.exits[i].dir !== "back") return r.exits[i];
      }
    }
    return null;
  }

  function improviseKind(rest) {
    var t = rest.toLowerCase();
    if (/roof|girder|upstairs/.test(t)) return "roof";
    if (/pantry|freezer|storeroom|cellar|basement|downstairs/.test(t)) return "pantry";
    if (/alley|stall|market/.test(t)) return "alley";
    if (/tower|cliff|courtyard|rubble|storm/.test(t)) return "tower";
    if (/diner|booth/.test(t)) return "diner";
    if (/canteen|widow/.test(t)) return "canteen";
    if (/pier|nova|slider|stand/.test(t)) return "pier";
    if (/mart|crisp/.test(t)) return "mart";
    if (/court|mascot/.test(t)) return "court";
    if (/van|lot/.test(t)) return "spur";
    return "alley";
  }

  function wantsPlace(rest) {
    var t = String(rest || "").toLowerCase();
    var i;
    for (i = 0; i < PLACE_WORDS.length; i++) {
      if (t.indexOf(PLACE_WORDS[i]) !== -1) return true;
    }
    return false;
  }

  function startJob(st, rng, job, lines) {
    var j = JOBS[job];
    st.job = job;
    st.hands = j.hands;
    st.heart = j.heart;
    st.mode = "play";
    takePack(st, j.kit);
    line(lines, "she", "She writes " + st.name + " the " + job + " on a napkin. " + j.line);
    line(
      lines,
      "she",
      "She sets the hearth-stone in your pack. “You do not eat this. You put it in the pot so other people remember they have carrots. Then you take it out. Supper remains.”"
    );
    takePack(st, "the hearth-stone");
    st.flags.stoneOffered = true;
    st.rooms.tent.items.forEach(function (it) {
      if (it.id === "stone") it.taken = true;
    });
    line(lines, "dm", "Hands " + st.hands + ", Heart " + st.heart + ", Hunger " + st.hp + ". Say what you do. I will roll.");
    lookLines(st, rng, lines);
  }

  function setName(st, rng, name, lines) {
    st.name = titleCase(name);
    st.mode = "job";
    line(lines, "she", "“" + st.name + ".” She tastes it. “That will feed.”");
    line(lines, "she", "What are you tonight — cook, driver, hound, or reader? Or ROLL.");
  }

  function unmaskFoe(st, r, rng, lines) {
    if (!r.foe || r.foe.hp > 0) return;
    st.flags.unmasked += 1;
    line(
      lines,
      "dm",
      r.foe.name === "Hunger"
        ? "Hunger sits. It still wants a seat. Tonight it will share. The keep, somewhere, remembers it was a kitchen."
        : "The head comes off. A tired person in a nice coat is holding a folder in a kitchen at the wrong hour. They were never a monster. They were appetite with a business card."
    );
    line(lines, "dm", rng.pick(ACHES));
    st.flags.ached = true;
    if (r.cook && !r.cook.fed) {
      line(lines, "she", "“Hire them or feed them,” Zorya says. “Those are the two spells that work.”");
    }
  }

  function maybeWander(st, rng, lines) {
    if (!rng.chance(0.35)) return;
    var r = roomOf(st);
    if (r.guest && rng.chance(0.5)) {
      line(lines, "dm", rng.chance(0.5) ? r.guest.line : r.guest.ache);
      if (!rng.chance(0.5)) st.flags.ached = true;
      return;
    }
    var gue = rng.pick(GUESTS);
    line(lines, "dm", gue.line);
  }

  function finish(st, title, texts, lines) {
    st.mode = "ended";
    st.ending = title;
    st.endingText = texts;
    line(lines, "sys", "This reading ends: " + title + ".");
    texts.forEach(function (t) {
      line(lines, "she", t);
    });
    line(lines, "she", "Earth does not end. Say WALK AGAIN, or NEW NIGHT, and I will deal.");
  }

  function composeEnding(st) {
    var fed = st.flags.fed.length;
    var texts = [];
    var title = "THE SEAT";
    if (st.hp <= 0) {
      title = "THE EMPTY STOOL";
      texts = [
        "You sit down in the road because Hunger sat on you first.",
        "She does not say game over. She says the stone is still in the pack, and the pack is still a kind of table.",
        "“You are not being punished. You are being told.”"
      ];
      return { title: title, texts: texts };
    }
    if (st.flags.hired) {
      title = "THE HIRE";
      texts = [
        "The name goes with the bun. A rope can be pulled from either end.",
        "“Adequate,” says Zorya, which from her is a standing ovation."
      ];
    } else if (st.flags.extraPlace && fed) {
      title = "THE ELEVENTH CHAIR";
      texts = [
        "This is the whole religion. One extra place. Not for a ghost. For arithmetic.",
        "A table that always has a spare seat cannot quietly become a list."
      ];
    } else if (!fed && st.flags.hoarded > 1) {
      title = "THE STALL YOU DID NOT VISIT";
      texts = [
        "You ate well and you learned nothing.",
        "“You are not being punished,” she says. “You are being told. There is a difference and it is the whole road.”"
      ];
    } else if (st.room !== "star" && !st.flags.shared) {
      title = "THE LONG WAY";
      texts = [
        "You are very good at going. Tell me one thing you have arrived at.",
        "The stand is open tomorrow. That is not mercy. It is hours."
      ];
    } else {
      title = "THE SEAT";
      texts = [
        "You thought you came for the slider. You came to find out whether there was a stool.",
        "There was. There always was. The trick was walking far enough to sit down."
      ];
    }
    if (st.flags.stoneInPot) {
      texts.push("The stone came out of the pot. Supper remained. Palace. Prairie. Stall. Same supper. You sat down in it.");
    } else {
      texts.push("The stone is not the soup. You still have it. That is allowed. Dinner stands on that.");
    }
    if (st.flags.laughed && st.flags.ached) {
      texts.push("You laughed once. Then your hand stayed on the rim. That is the correct order.");
    }
    texts.push("The Tower falls somewhere behind you, on schedule, and becomes a table.");
    return { title: title, texts: texts };
  }

  function doLookAt(st, rng, rest, lines) {
    var r = roomOf(st);
    if (matchName(rest, "stone") || matchName(rest, "hearth")) {
      line(
        lines,
        "she",
        "“You do not eat this. The old stories agree. You put it in the pot so other people remember they have carrots.”"
      );
      return;
    }
    if (r.cook && matchName(rest, r.cook.name)) {
      line(lines, "dm", r.cook.hello);
      line(lines, "dm", r.cook.name + " is " + r.cook.doing + " " + r.cook.dish + ".");
      return;
    }
    if (r.foe && matchName(rest, r.foe.name)) {
      line(lines, "dm", r.foe.intro);
      line(lines, "dm", r.foe.pitch);
      return;
    }
    var i;
    for (i = 0; i < r.items.length; i++) {
      if (matchName(rest, r.items[i].name)) {
        line(lines, "dm", r.items[i].desc);
        return;
      }
    }
    if (matchName(rest, "door") && r.tags.indexOf("door") !== -1) {
      line(lines, "dm", "A dining room behind it. Twelve chairs. Twelve is the wrong number now.");
      st.flags.ached = true;
      return;
    }
    line(lines, "dm", "You look until the looking becomes hunger again. " + rng.pick(ASIDES));
  }

  function doTalk(st, rng, rest, lines) {
    var r = roomOf(st);
    if (r.foe && r.foe.hp > 0 && (matchName(rest, r.foe.name) || matchName(rest, "scout") || matchName(rest, "mascot") || matchName(rest, "hunger"))) {
      line(lines, "dm", r.foe.pitch);
      var chk = rollCheck(st, rng, "heart", 14, lines);
      if (chk.ok) {
        line(lines, "dm", "Something in the folder loses a column. They hear a name.");
      } else {
        line(lines, "dm", "They smile with their teeth. The pitch continues.");
      }
      return;
    }
    if (r.guest && rest && matchName(rest, r.guest.name)) {
      line(lines, "dm", r.guest.ache);
      st.flags.ached = true;
      return;
    }
    if (r.cook) {
      r.cook.talked += 1;
      if (r.cook.talked === 1) {
        line(lines, "dm", r.cook.hello);
        line(lines, "dm", r.cook.joke);
        st.flags.laughed = true;
      }
      var talk = rollCheck(st, rng, "heart", 11, lines);
      if (talk.ok || r.cook.talked > 1) {
        line(lines, "dm", r.cook.name + " says: " + r.cook.ache);
        st.flags.ached = true;
      } else {
        line(lines, "dm", r.cook.name + " keeps working. The bun goes on the griddle. It smells like an argument you are losing.");
      }
      line(lines, "dm", rng.pick(ASIDES));
      return;
    }
    line(lines, "she", "No one answers but the pot, which is a kind of person.");
  }

  function doTake(st, rng, rest, lines) {
    var r = roomOf(st);
    var i;
    for (i = 0; i < r.items.length; i++) {
      var it = r.items[i];
      if (it.taken) continue;
      if (!rest || matchName(rest, it.name) || matchName(rest, it.id)) {
        if (it.id === "stone" || matchName(it.name, "hearth-stone")) {
          takePack(st, "the hearth-stone");
          it.taken = true;
          st.flags.stoneOffered = true;
          line(lines, "she", "Take it. Do not eat it. That is the whole religion.");
          return;
        }
        it.taken = true;
        takePack(st, it.name);
        st.flags.hoarded += 1;
        var chk = rollCheck(st, rng, "hands", 8, lines);
        if (chk.ok) {
          line(lines, "dm", "You take " + it.name + ". It has weight. So does the not-asking.");
        } else {
          line(lines, "dm", "You take " + it.name + " anyway. The room notices.");
        }
        return;
      }
    }
    line(lines, "dm", "Nothing by that name is sitting out. Hunger is not an item. You cannot pocket it.");
  }

  function doUse(st, rng, rest, lines) {
    var r = roomOf(st);
    var usingStone = matchName(rest, "stone") || matchName(rest, "hearth") || matchName(rest, "pot");
    if (usingStone && hasItem(st, "hearth-stone")) {
      rollCheck(st, rng, "heart", 10, lines);
      st.flags.stoneInPot = true;
      st.flags.shared = true;
      if (r.cook && st.flags.fed.indexOf(r.cook.name) === -1) {
        r.cook.fed = true;
        st.flags.fed.push(r.cook.name);
      }
      line(
        lines,
        "dm",
        "You put the stone in the pot. Other people remember they have carrots. Then you take it out. Supper remains. The stone is not the soup."
      );
      st.hp = Math.min(st.maxHp, st.hp + 3);
      line(lines, "sys", "Hunger eases (" + st.hp + ").");
      return;
    }
    var sharing =
      matchName(rest, "share") ||
      matchName(rest, "ketchup") ||
      matchName(rest, "basket") ||
      matchName(rest, "jar") ||
      matchName(rest, "crisp") ||
      matchName(rest, "bun") ||
      matchName(rest, "pass") ||
      matchName(rest, "rings") ||
      matchName(rest, "red") ||
      matchName(rest, "what is");
    if (sharing || (rest && hasItem(st, rest))) {
      var share = rollCheck(st, rng, "heart", 10, lines);
      if (share.ok) {
        st.flags.shared = true;
        st.flags.hoarded = Math.max(0, st.flags.hoarded - 1);
        if (r.cook && st.flags.fed.indexOf(r.cook.name) === -1) {
          r.cook.fed = true;
          st.flags.fed.push(r.cook.name);
        }
        st.hp = Math.min(st.maxHp, st.hp + 2);
        line(lines, "dm", "You pass what is red. The check turns out to be less than the number on it.");
        line(lines, "dm", rng.pick(JOKES));
        st.flags.laughed = true;
        if (r.kind === "diner" || r.tags.indexOf("basket") !== -1) {
          line(
            lines,
            "dm",
            "VANESSA, somewhere, starts on the first try, which she has never once done, and nobody makes a joke about it."
          );
          st.flags.ached = true;
        }
      } else {
        line(lines, "dm", "You hold on a second too long. The basket does not split. The van, somewhere, does not start.");
      }
      return;
    }
    line(lines, "dm", "Use it how? Pass it, put the stone in the pot, share, or hire.");
  }

  function doAttack(st, rng, rest, lines) {
    var r = roomOf(st);
    if (r.cook && rest && matchName(rest, r.cook.name) && !(r.foe && matchName(rest, r.foe.name))) {
      line(lines, "she", "You do not attack the cook. That is not this game. That is a different, worse book.");
      return;
    }
    if (!r.foe || r.foe.hp <= 0) {
      line(lines, "dm", "There is no monster. There is a person, or a pot, or your own hunger. Swing at those with a plate.");
      return;
    }
    var atk = rollCheck(st, rng, "hands", 12, lines);
    if (atk.ok) {
      var dmg = 1 + rng.d(4) + (atk.crit ? 2 : 0);
      r.foe.hp -= dmg;
      line(lines, "dm", rng.pick(HIT_THEM) + " (" + dmg + " . Hunger-that-will-not-share is at " + Math.max(0, r.foe.hp) + ".)");
      if (r.foe.hp <= 0) {
        r.foe.hp = 0;
        unmaskFoe(st, r, rng, lines);
        return;
      }
    } else {
      line(lines, "dm", rng.pick(MISS));
    }
    var defDc = 10 + Math.floor(st.heart / 2);
    var foeRoll = rng.d(20);
    line(lines, "roll", r.foe.name + " d20 (" + foeRoll + ") vs " + defDc + ".");
    if (foeRoll >= defDc) {
      var hurt = 1 + rng.d(3);
      st.hp -= hurt;
      line(lines, "dm", rng.pick(HIT_YOU) + " Hunger " + Math.max(0, st.hp) + ".");
      if (st.hp <= 0) {
        st.hp = 0;
        var end = composeEnding(st);
        finish(st, end.title, end.texts, lines);
      }
    } else {
      line(lines, "dm", r.foe.name + " misses, which looks like a pitch that found no buyer.");
    }
  }

  function doEat(st, rng, rest, lines) {
    if (matchName(rest, "stone") || matchName(rest, "hearth")) {
      line(lines, "she", "No. That is the whole religion and you tried to snack it. She takes it back, then gives it back, because teaching is a kind of passing.");
      return;
    }
    var r = roomOf(st);
    var food = rest;
    if (!food) {
      var left = r.items.filter(function (it) {
        return !it.taken;
      })[0];
      food = left ? left.name : r.cook ? r.cook.dish : "whatever is steaming";
    }
    var eat = rollCheck(st, rng, "heart", 8, lines);
    st.hp = Math.min(st.maxHp, st.hp + (eat.ok ? 3 : 1));
    line(lines, "dm", "You eat " + food + ". It is the best thing you have had in an hour, which is a long time to be a person.");
    if (eat.ok && r.cook) {
      line(lines, "dm", r.cook.joke);
      st.flags.laughed = true;
    }
    line(lines, "sys", "Hunger " + st.hp + ".");
  }

  function doCook(st, rng, rest, lines) {
    var r = roomOf(st);
    var chk = rollCheck(st, rng, "hands", 12, lines);
    if (chk.ok) {
      st.flags.shared = true;
      st.hp = Math.min(st.maxHp, st.hp + 2);
      line(lines, "dm", "You work the line. You are terrible at it and then, briefly, you are not.");
      if (r.cook && st.flags.fed.indexOf(r.cook.name) === -1) {
        r.cook.fed = true;
        st.flags.fed.push(r.cook.name);
      }
      if (r.tags.indexOf("storm") !== -1) {
        line(lines, "dm", "Lightning takes a wall. The head cook moves service into the rain and keeps going. Somebody props a safe open for the light.");
      }
    } else {
      line(lines, "dm", "You burn something that had a grandmother. They let you stay anyway. That is hospitality, not skill.");
    }
  }

  function doHire(st, rng, rest, lines) {
    var r = roomOf(st);
    if (!r.foe && !r.cook) {
      line(lines, "dm", "There is no one to hire but yourself, and you are already working tonight.");
      return;
    }
    var chk = rollCheck(st, rng, "heart", 13, lines);
    if (chk.ok) {
      st.flags.hired = true;
      st.flags.shared = true;
      if (r.foe && r.foe.hp > 0) {
        r.foe.hp = 0;
        unmaskFoe(st, r, rng, lines);
      }
      if (r.cook) {
        line(lines, "dm", "You say hire " + r.cook.name + ". The folder grows a column with a name in it, spelled correctly, which they had to ask about.");
      } else {
        line(lines, "dm", "You say hire her. The number on the napkin gets smaller and gets a name.");
      }
    } else {
      line(lines, "dm", "“That's more expensive,” they say. You say yes. They say “Considerably.” You lose the thread and the pitch continues.");
    }
  }

  function doSit(st, rng, rest, lines) {
    var r = roomOf(st);
    if (r.tags.indexOf("chair") !== -1 || r.tags.indexOf("door") !== -1 || matchName(rest, "eleven") || matchName(rest, "twelve")) {
      var door = rollCheck(st, rng, "heart", 11, lines);
      if (door.ok) {
        r.openDoor = true;
        st.flags.extraPlace = true;
        st.flags.ached = true;
        st.flags.laughed = true;
        line(
          lines,
          "dm",
          "You set eleven. Then you set the twelfth anyway and say, “For the stock.” She laughs once, surprised, the way you laugh when someone names the thing you were going to take to the grave. Then she puts a bowl there. Her hand stays on the rim a second too long."
        );
        if (r.cook && st.flags.fed.indexOf(r.cook.name) === -1) {
          r.cook.fed = true;
          st.flags.fed.push(r.cook.name);
        }
      } else {
        line(lines, "dm", "She says no. Then she says yes. Then she opens the door herself, which was always going to be the only way it opened. You have not sat yet. Try again.");
      }
      return;
    }
    if (r.kind === "star" || r.tags.indexOf("sit") !== -1) {
      line(lines, "dm", "You sit. That is the whole ending. Somebody who has been cooking all night slides a plate across.");
      if (st.flags.laughed) line(lines, "dm", "You are crying about a slider and pretending it is the onions.");
      var end = composeEnding(st);
      finish(st, end.title, end.texts, lines);
      return;
    }
    if (r.kind === "tent") {
      line(lines, "she", "She turns the tea around so the handle faces you, which is the closest thing to a blessing available in a tent.");
      st.hp = Math.min(st.maxHp, st.hp + 1);
      return;
    }
    line(lines, "dm", "You sit. The night does not end. Sitting here is not the Star-table, but it is practice.");
    st.hp = Math.min(st.maxHp, st.hp + 1);
  }

  function doGo(st, rng, rest, lines) {
    var r = roomOf(st);
    var ex = matchExit(r, rest);
    if (!ex && wantsPlace(rest) && st.improvised < 2 && st.mode === "play") {
      var kind = improviseKind(rest);
      var nid = "imp" + st.improvised;
      var fresh = makeKitchen(rng, kind, nid);
      fresh.title = titleCase(rest);
      st.rooms[nid] = fresh;
      r.exits.push({ to: nid, label: fresh.title, dir: "aside" });
      fresh.exits.push({ to: r.id, label: r.title, dir: "back" });
      r.exits.forEach(function (e) {
        if (e.dir !== "back" && e.dir !== "aside" && e.to !== nid) {
          fresh.exits.push({ to: e.to, label: e.label, dir: e.dir });
        }
      });
      st.improvised += 1;
      line(lines, "she", "You said " + rest + ". Fine. I will roll a kitchen there. That is what on the fly means.");
      ex = r.exits[r.exits.length - 1];
    }
    if (!ex) {
      line(lines, "dm", "That way is not a door. Try a way out I named, or a kitchen word — alley, pantry, roof, van — and I will roll one.");
      return;
    }
    st.room = ex.to;
    maybeWander(st, rng, lines);
    lookLines(st, rng, lines);
  }

  function doInv(st, lines) {
    line(
      lines,
      "sys",
      st.name +
        " the " +
        (st.job || "?") +
        " — Hands " +
        st.hands +
        ", Heart " +
        st.heart +
        ", Hunger " +
        st.hp +
        "/" +
        st.maxHp +
        "."
    );
    line(lines, "sys", "Pack: " + (st.pack.length ? st.pack.join(", ") : "empty hands, which she does not treat as a failure") + ".");
    line(lines, "sys", "Night " + st.seed + ".");
  }

  function doHelp(lines) {
    line(
      lines,
      "she",
      "Say what you do. LOOK. GO east, back, or a kitchen word. TALK. TAKE. PASS what is red. PUT THE STONE IN THE POT. ATTACK the scout or Hunger. HIRE her. EAT. COOK. SIT. LAUGH. CRY. I roll a d20. There is no game over. Earth does not end."
    );
  }

  function doUnknown(st, rng, rest, lines) {
    var r = roomOf(st);
    if (r && matchExit(r, rest)) {
      doGo(st, rng, rest, lines);
      return;
    }
    if (wantsPlace(rest)) {
      doGo(st, rng, rest, lines);
      return;
    }
    if (/hire/.test(rest)) {
      doHire(st, rng, rest, lines);
      return;
    }
    var guess = rollCheck(st, rng, "heart", 15, lines);
    if (guess.ok) {
      line(lines, "she", "I heard that as trying. Trying is a Heart check. " + rng.pick(ASIDES));
      st.flags.laughed = true;
    } else {
      line(lines, "she", "Say it like a kitchen. LOOK, GO, TALK, TAKE, PASS, SIT. I am a dungeon master, not a mind.");
    }
  }

  function promptsFor(st) {
    if (st.mode === "name") return ["ROLL", "Moss", "Jun the cook"];
    if (st.mode === "job") return ["cook", "driver", "hound", "reader"];
    if (st.mode === "ended") return ["walk again", "new night", "same night"];
    var r = roomOf(st);
    var p = ["look", "inventory"];
    if (!r) return p;
    if (r.cook) p.push("talk to " + r.cook.name);
    if (r.foe && r.foe.hp > 0) {
      p.push("attack " + r.foe.name);
      p.push("hire her");
    }
    if (r.tags.indexOf("share") !== -1 || r.tags.indexOf("basket") !== -1) p.push("pass what is red");
    if (hasItem(st, "hearth-stone") && r.cook && r.kind !== "tent") p.push("put the stone in the pot");
    if (r.tags.indexOf("chair") !== -1 || r.tags.indexOf("door") !== -1) p.push("set eleven");
    if (r.kind === "star" || r.tags.indexOf("sit") !== -1) p.push("sit");
    var left = r.items.filter(function (it) {
      return !it.taken;
    })[0];
    if (left) p.push("take " + left.name);
    var i;
    for (i = 0; i < r.exits.length; i++) {
      if (r.exits[i].dir !== "back") p.push("go " + r.exits[i].dir);
    }
    p.push("go back");
    return p.slice(0, 8);
  }

  function act(state, raw) {
    var st = deep(state);
    var lines = [];
    var p = parse(raw);
    var rng = rngOf(st);

    if (p.verb === "empty") {
      line(lines, "she", "The silence is a kind of hunger. Say a thing.");
      saveRng(st, rng);
      st.log = (st.log || []).concat(lines);
      persist(st);
      return { state: st, lines: lines, prompts: promptsFor(st) };
    }

    line(lines, "you", String(raw).trim());

    if (p.verb === "new") {
      var n = newGame();
      return { state: n, lines: n.log.slice(), prompts: promptsFor(n) };
    }
    if (p.verb === "again") {
      var n2 = newGame((Date.now() % 900000) + 1);
      return { state: n2, lines: n2.log.slice(), prompts: promptsFor(n2) };
    }
    if (p.verb === "same") {
      var n3 = newGame(st.seed);
      return { state: n3, lines: n3.log.slice(), prompts: promptsFor(n3) };
    }

    if (st.mode === "ended") {
      line(lines, "she", "This night is a receipt. WALK AGAIN, NEW NIGHT, or SAME NIGHT.");
      saveRng(st, rng);
      st.log = (st.log || []).concat(lines);
      persist(st);
      return { state: st, lines: lines, prompts: promptsFor(st) };
    }

    if (st.mode === "name") {
      if (p.verb === "help") {
        doHelp(lines);
      } else if (p.verb === "job") {
        st.name = rng.pick(PC_NAMES);
        line(lines, "she", "You would not name yourself, so I did. " + st.name + ".");
        startJob(st, rng, p.rest, lines);
      } else if (p.verb === "namejob") {
        st.name = titleCase(p.rest);
        startJob(st, rng, p.job, lines);
      } else if (p.verb === "rollname" || p.verb === "roll") {
        st.name = rng.pick(PC_NAMES);
        st.mode = "job";
        line(lines, "she", "The dice say " + st.name + ". What are you tonight — cook, driver, hound, or reader?");
      } else if (p.verb === "look") {
        line(lines, "she", "Name yourself first. The night will still be there.");
      } else {
        var nm = p.rest || p.raw;
        setName(st, rng, nm, lines);
      }
      saveRng(st, rng);
      st.log = (st.log || []).concat(lines);
      persist(st);
      return { state: st, lines: lines, prompts: promptsFor(st) };
    }

    if (st.mode === "job") {
      if (p.verb === "help") {
        doHelp(lines);
        saveRng(st, rng);
        st.log = (st.log || []).concat(lines);
        persist(st);
        return { state: st, lines: lines, prompts: promptsFor(st) };
      }
      var job = p.verb === "job" ? p.rest : null;
      if (p.verb === "namejob" && p.job) {
        if (p.rest) st.name = titleCase(p.rest);
        job = p.job;
      }
      if (!job && /cook|driver|hound|reader/.test(String(p.rest || p.raw).toLowerCase())) {
        job = String(p.rest || p.raw).toLowerCase().match(/cook|driver|hound|reader/)[0];
      }
      if (!job && (p.verb === "roll" || p.verb === "rollname")) job = rng.pick(Object.keys(JOBS));
      if (!job) {
        line(lines, "she", "Cook, driver, hound, or reader. Those are the classes. This is that kind of table.");
      } else {
        startJob(st, rng, job, lines);
      }
      saveRng(st, rng);
      st.log = (st.log || []).concat(lines);
      persist(st);
      return { state: st, lines: lines, prompts: promptsFor(st) };
    }

    switch (p.verb) {
      case "look":
        lookLines(st, rng, lines);
        break;
      case "lookat":
        doLookAt(st, rng, p.rest, lines);
        break;
      case "talk":
        doTalk(st, rng, p.rest, lines);
        break;
      case "take":
        doTake(st, rng, p.rest, lines);
        break;
      case "use":
        doUse(st, rng, p.rest, lines);
        break;
      case "attack":
        doAttack(st, rng, p.rest, lines);
        break;
      case "eat":
        doEat(st, rng, p.rest, lines);
        break;
      case "cook":
        doCook(st, rng, p.rest, lines);
        break;
      case "hire":
        doHire(st, rng, p.rest, lines);
        break;
      case "sit":
        doSit(st, rng, p.rest, lines);
        break;
      case "go":
        doGo(st, rng, p.rest, lines);
        break;
      case "inv":
        doInv(st, lines);
        break;
      case "help":
        doHelp(lines);
        break;
      case "wait":
        line(lines, "dm", rng.pick(ASIDES));
        maybeWander(st, rng, lines);
        break;
      case "laugh":
        st.flags.laughed = true;
        line(lines, "dm", rng.pick(JOKES));
        line(lines, "she", "Good. Keep one. You will need it when the hand stays on the rim.");
        break;
      case "cry":
        st.flags.ached = true;
        line(lines, "dm", rng.pick(ACHES));
        line(lines, "she", "That is not a failure. That is a kitchen doing its work.");
        break;
      case "roll":
        rollCheck(st, rng, st.hands >= st.heart ? "hands" : "heart", 12, lines);
        line(lines, "she", "I will spend that roll on the next door.");
        break;
      default:
        doUnknown(st, rng, p.rest, lines);
    }

    saveRng(st, rng);
    st.log = (st.log || []).concat(lines);
    if (st.log.length > 120) st.log = st.log.slice(-90);
    persist(st);
    return { state: st, lines: lines, prompts: promptsFor(st) };
  }

  function view(st) {
    var r = roomOf(st) || {};
    return {
      seed: st.seed,
      mode: st.mode,
      name: st.name,
      job: st.job,
      hands: st.hands,
      heart: st.heart,
      hp: st.hp,
      maxHp: st.maxHp,
      pack: st.pack.slice(),
      room: st.room,
      title: r.title || "",
      art: r.art || "/img/road/paper.jpg",
      ending: st.ending,
      log: (st.log || []).slice(),
      prompts: promptsFor(st)
    };
  }

  g.TABLE = {
    STORE: STORE,
    JOBS: JOBS,
    parse: parse,
    newGame: newGame,
    act: act,
    view: view,
    loadGame: loadGame,
    clearSave: clearSave,
    prompts: promptsFor,
    generateNight: generateNight,
    makeRng: makeRng
  };
})(typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : this);
