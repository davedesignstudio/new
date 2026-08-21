(function (g) {
  var ROADS = [
    "Forest Road",
    "Mountain Road",
    "River Road",
    "Ash Road",
    "Snow Road",
    "Old Imperial Road",
    "Forgotten Road"
  ];
  var WEATHER = ["rain", "fog", "snow", "clear", "storm", "a red sunset", "endless night"];
  var CARDS = [
    "ROAD",
    "DOG",
    "SHIP",
    "HOUSE",
    "SNAKE",
    "FOREST",
    "BRIDGE",
    "MOON",
    "HEART",
    "RING",
    "FIRE",
    "DAGGER",
    "CROW",
    "LANTERN",
    "BELL",
    "HORSE",
    "KEY",
    "WHEEL",
    "ANGEL"
  ];
  var ARTS = [
    "/img/road/bville.jpg",
    "/img/road/bville-2.jpg",
    "/img/road/philhower.jpg",
    "/img/road/coffee.jpg",
    "/img/road/coffee-cup.jpg",
    "/img/road/cafe.jpg",
    "/img/road/kong.jpg",
    "/img/road/princess.jpg",
    "/img/road/paper-stamp.jpg",
    "/img/road/scan-a.png",
    "/img/road/scan-b.png",
    "/img/tower/ch1.jpg",
    "/img/tower/ch2.jpg",
    "/img/tower/ch3.jpg",
    "/img/tower/ch4.jpg",
    "/img/mars/habitat.jpg",
    "/img/mars/storm.jpg",
    "/img/mars/table.jpg"
  ];

  var QUESTIONS = [
    {
      q: "You find something small and warm in the dust. Nobody saw you pick it up. Would you give it back?",
      a: [
        { id: "return-it", label: "Give it back", t: { loyalty: 1, mercy: 1 } },
        { id: "keep-it", label: "Keep it", t: { suspicion: 1 } },
        { id: "ask-lost", label: "Ask who lost it", t: { curiosity: 1, trust: 1 } }
      ]
    },
    {
      q: "A stranger holds out a gold ring like it already belongs to you.",
      a: [
        { id: "take-ring", label: "Take it", t: { wander: 1 }, card: "RING" },
        { id: "refuse-ring", label: "Refuse it", t: { suspicion: 1, mercy: 1 } },
        { id: "ask-ring", label: "Ask who lost it", t: { curiosity: 1, trust: 1 } }
      ]
    },
    {
      q: "A mill window is lit. A child says mother is waiting, and looks at you like you already know the way.",
      a: [
        { id: "help-child", label: "Help them", t: { mercy: 2, loyalty: 1 }, flag: "helpedChild" },
        { id: "ignore-child", label: "Walk past", t: { wander: 1 }, flag: "ignoredChild" },
        { id: "ask-mill", label: "Ask where", t: { curiosity: 1 } }
      ]
    },
    {
      q: "The ferryman smiles a little too fast. The water looks honest. The smile does not.",
      a: [
        { id: "cross-now", label: "Cross anyway", t: { courage: 2, trust: 1 }, flag: "crossed" },
        { id: "turn-away", label: "Turn back", t: { return: 1, suspicion: 1 }, flag: "abandonedBridge" },
        { id: "wait-rain", label: "Wait a while", t: { fate: 1 } }
      ]
    },
    {
      q: "Cow Lick is open. Bind's ledger sits on the bar like a sleeping animal.",
      a: [
        { id: "sit-lick", label: "Sit down", t: { mercy: 1, loyalty: 1 }, flag: "sat" },
        { id: "read-ledger", label: "Read the book", t: { curiosity: 1, suspicion: 1 }, flag: "readLedger" },
        { id: "pass-lick", label: "Keep walking", t: { wander: 1 } }
      ]
    },
    {
      q: "Bville still serves. Boom Boom or Chetzel on an unsplit plate. Someone left room for you.",
      a: [
        { id: "eat-bville", label: "Eat with them", t: { trust: 1, mercy: 1 }, flag: "ate" },
        { id: "pay-first", label: "Ask the price", t: { suspicion: 1 } },
        { id: "leave-bville", label: "Leave hungry", t: { wander: 1 } }
      ]
    },
    {
      q: "Philhower's yellow sun is nailed to a post. The card just says Design. Your pocket feels like a phone.",
      a: [
        { id: "call-phil", label: "Call the number", t: { trust: 1, curiosity: 1 }, flag: "calledPhilhower" },
        { id: "read-phil", label: "Read the card", t: { curiosity: 1 }, flag: "readPhilhower" },
        { id: "pass-phil", label: "Keep walking", t: { wander: 1 } }
      ]
    },
    {
      q: "A lantern hangs in trees that seem to move when you look away. It wants a hand.",
      a: [
        { id: "take-lantern", label: "Take it", t: { courage: 1, fate: 1 }, card: "LANTERN" },
        { id: "leave-lantern", label: "Leave it", t: { suspicion: 1 } },
        { id: "watch-lantern", label: "Just watch", t: { curiosity: 1, fate: 1 } }
      ]
    },
    {
      q: "A soldier asks which way the wagon went. His voice is tired. His eyes are not.",
      a: [
        { id: "tell-true", label: "Tell the truth", t: { loyalty: 1, trust: 1 } },
        { id: "lie-soldier", label: "Lie for them", t: { suspicion: 1, courage: 1 } },
        { id: "say-nothing", label: "Say nothing", t: { return: 1 } }
      ]
    },
    {
      q: "A widow turns a key in her palm and will not use it. She looks like she is waiting for permission.",
      a: [
        { id: "take-key", label: "Take the key", t: { curiosity: 1, courage: 1 }, card: "KEY" },
        { id: "leave-key", label: "Leave it be", t: { mercy: 1 } },
        { id: "ask-door", label: "Ask about the door", t: { fate: 1, curiosity: 1 }, flag: "askedDoor" }
      ]
    },
    {
      q: "Up on the high girder, an ape throws barrels like the world is a joke. She waits at the top with a lantern and a HELP that sounds almost polite.",
      a: [
        { id: "sit-throne", label: "Climb to her", t: { courage: 2, fate: 1 }, flag: "satThrone" },
        { id: "walk-princess", label: "Dodge the barrels", t: { wander: 1, suspicion: 1 } },
        { id: "ask-princess", label: "Ask her name", t: { curiosity: 1, trust: 1 }, flag: "askedPrincess" }
      ]
    },
    {
      q: "Cafe Robust smells like someone grew the morning themselves. Espresso, or grounds in your pocket for later?",
      a: [
        { id: "sit-cafe", label: "Sit a while", t: { mercy: 1, trust: 1 }, flag: "sat" },
        { id: "read-cup", label: "Read the cup", t: { fate: 1, curiosity: 1 } },
        { id: "pass-cafe", label: "Keep walking", t: { wander: 1 } }
      ]
    },
    {
      q: "A musician plays a song you almost remember. Not the tune — the room you first heard it in.",
      a: [
        { id: "listen", label: "Listen", t: { fate: 1, return: 1 } },
        { id: "pay-tune", label: "Leave a coin", t: { mercy: 1, loyalty: 1 } },
        { id: "walk-music", label: "Keep walking", t: { wander: 1 } }
      ]
    }
  ];

  var STRANGERS = [
    { id: "child", name: "a child", art: "village" },
    { id: "soldier", name: "a soldier", art: "road" },
    { id: "widow", name: "a widow", art: "chapel" },
    { id: "merchant", name: "Bind", art: "creamery" },
    { id: "philhower", name: "Philhower", art: "philhower" },
    { id: "bville", name: "Bville", art: "bville" },
    { id: "traveler", name: "a traveler", art: "road" },
    { id: "ferryman", name: "a ferryman", art: "bridge" },
    { id: "musician", name: "a musician", art: "village" },
    { id: "beggar", name: "a beggar", art: "village" },
    { id: "red", name: "a woman in red", art: "oracle" },
    { id: "cafe", name: "Cafe Robust", art: "creamery" },
    { id: "princess", name: "the princess", art: "princess" }
  ];

  var STORE = "wider.roadwisdom.v1";

  function blankTraits() {
    return {
      courage: 0,
      mercy: 0,
      curiosity: 0,
      loyalty: 0,
      trust: 0,
      suspicion: 0,
      wander: 0,
      return: 0,
      fate: 0
    };
  }

  function loadMem() {
    try {
      var raw = g.localStorage && g.localStorage.getItem(STORE);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return {
      cycles: 0,
      traits: blankTraits(),
      counts: {
        east: 0,
        north: 0,
        bridges: 0,
        abandoned: 0,
        sits: 0,
        helps: 0,
        doors: 0,
        took: 0,
        asked: 0,
        passed: 0,
        stayed: 0,
        priced: 0,
        refusedReading: 0
      },
      lastCards: [],
      flags: {},
      notes: [],
      seed: 1 + Math.floor(Math.random() * 2147483645)
    };
  }

  function saveMem(m) {
    try {
      if (g.localStorage) g.localStorage.setItem(STORE, JSON.stringify(m));
    } catch (e) {}
  }

  function rng(m) {
    m.seed = (m.seed * 16807) % 2147483647;
    return (m.seed - 1) / 2147483646;
  }

  function pick(arr, m) {
    return arr[Math.floor(rng(m) * arr.length)];
  }

  function shuffle(arr, m) {
    var a = arr.slice();
    var i;
    for (i = a.length - 1; i > 0; i--) {
      var j = Math.floor(rng(m) * (i + 1));
      var t = a[i];
      a[i] = a[j];
      a[j] = t;
    }
    return a;
  }

  function bump(obj, t) {
    var k;
    for (k in t) {
      if (t.hasOwnProperty(k)) obj[k] = (obj[k] || 0) + t[k];
    }
  }

  function addNote(m, line) {
    if (m.notes.indexOf(line) === -1) m.notes.push(line);
    if (m.notes.length > 24) m.notes.shift();
  }

  function newRun(mem) {
    var road = pick(ROADS, mem);
    var weather = pick(WEATHER, mem);
    var forced = (mem.lastCards || []).slice(0, 3);
    var enc = [];
    var i;
    var artDeck = shuffle(ARTS, mem);
    function nextArt() {
      if (!artDeck.length) artDeck = shuffle(ARTS, mem);
      return artDeck.pop();
    }
    for (i = 0; i < forced.length && enc.length < 2; i++) {
      var beat = makeSymbolBeat(forced[i], mem);
      beat.artUrl = nextArt();
      enc.push(beat);
    }
    var stranger = pick(STRANGERS, mem);
    var qn = questionForStranger(stranger, mem);
    qn.artUrl = artForStranger(stranger, nextArt, mem);
    enc.push(qn);
    var dirs = shuffle(["FOREST", "VILLAGE", "RIVER"], mem);
    return {
      screen: "title",
      beat: 0,
      road: road,
      weather: weather,
      symbol: pick(CARDS, mem),
      stranger: stranger,
      encounters: enc.slice(0, 3),
      dirs: dirs,
      seen: [],
      runTraits: blankTraits(),
      chosen: [],
      refused: [],
      cards: [],
      spread: null,
      runArt: nextArt(),
      artDeck: artDeck,
      mem: mem
    };
  }

  function wrapText(s, n) {
    n = n || 18;
    var words = String(s || "").split(/\s+/);
    var lines = [];
    var cur = "";
    var i;
    for (i = 0; i < words.length; i++) {
      var next = cur ? cur + " " + words[i] : words[i];
      if (next.length > n && cur) {
        lines.push(cur);
        cur = words[i];
      } else {
        cur = next;
      }
    }
    if (cur) lines.push(cur);
    return lines;
  }

  function questionForStranger(stranger, mem) {
    var who = {
      child: "help-child",
      soldier: "tell-true",
      widow: "take-key",
      merchant: "sit-lick",
      bville: "eat-bville",
      philhower: "call-phil",
      ferryman: "cross-now",
      musician: "listen",
      princess: "sit-throne",
      cafe: "sit-cafe",
      red: "take-ring",
      beggar: "return-it",
      traveler: "return-it"
    };
    var want = who[stranger.id] || "return-it";
    var q = QUESTIONS[0];
    var i;
    for (i = 0; i < QUESTIONS.length; i++) {
      if (QUESTIONS[i].a && QUESTIONS[i].a[0] && QUESTIONS[i].a[0].id === want) {
        q = QUESTIONS[i];
        break;
      }
    }
    if (stranger.id === "child") return childMemoryBeat(mem, q);
    if (stranger.id === "princess") return princessBeat();
    return q;
  }

  function artForStranger(stranger, nextArt, mem) {
    if (stranger.id === "princess") return pick(["/img/road/kong.jpg", "/img/road/princess.jpg"], mem);
    if (stranger.id === "bville") return pick(["/img/road/bville.jpg", "/img/road/bville-2.jpg"], mem);
    if (stranger.id === "philhower") return "/img/road/philhower.jpg";
    if (stranger.id === "merchant" || stranger.id === "cafe") {
      return pick(["/img/road/coffee.jpg", "/img/road/coffee-cup.jpg", "/img/road/cafe.jpg"], mem);
    }
    return nextArt();
  }

  function childMemoryBeat(mem, fallback) {
    var a = [
      { id: "help-child", label: "Help them", t: { mercy: 2, loyalty: 1 }, flag: "helpedChild" },
      { id: "ignore-child", label: "Walk past", t: { wander: 1 }, flag: "ignoredChild" },
      { id: "ask-mill", label: "Ask where", t: { curiosity: 1 }, flag: "sawMill" }
    ];
    if (mem.flags.ignoredChild && mem.cycles >= 3) {
      return { q: "The child does not run to you this time. Just says, soft: you always leave.", a: a };
    }
    if (mem.flags.ignoredChild && mem.cycles >= 2) {
      return { q: "The child looks up and asks, without anger, why you did not help.", a: a };
    }
    if (mem.flags.ignoredChild) {
      return {
        q: "The mill window is lit. Mother waits. The child is not here.",
        a: [
          { id: "help-mother", label: "Help her", t: { mercy: 2 }, flag: "helpedMother" },
          { id: "leave-mill", label: "Walk past", t: { wander: 1 } },
          { id: "ask-mill", label: "Ask where he went", t: { curiosity: 1 }, flag: "sawMill" }
        ]
      };
    }
    return fallback || QUESTIONS[2];
  }

  function princessBeat() {
    var i;
    for (i = 0; i < QUESTIONS.length; i++) {
      if (QUESTIONS[i].a && QUESTIONS[i].a[0] && QUESTIONS[i].a[0].id === "sit-throne") return QUESTIONS[i];
    }
    return QUESTIONS[QUESTIONS.length - 2];
  }

  function makeSymbolBeat(card, mem) {
    var weather = pick(WEATHER, mem);
    return {
      q: "From last time: the " + card.toLowerCase() + " is waiting in the " + weather + ", like it never left.",
      card: card,
      spawned: true,
      a: [
        { id: "approach-" + card, label: "Go closer", t: { fate: 1, curiosity: 1 }, card: card },
        { id: "avoid-" + card, label: "Steer clear", t: { suspicion: 1, return: 1 } },
        { id: "ask-" + card, label: "Speak to it", t: { curiosity: 1, trust: 1 }, card: card }
      ]
    };
  }

  function soulOf(t) {
    var scores = [
      ["WANDERER", t.wander + t.curiosity],
      ["KEEPER", t.mercy + t.loyalty],
      ["SEEKER", t.curiosity + t.courage],
      ["WATCHER", t.suspicion + t.fate],
      ["RETURNER", t.return]
    ];
    scores.sort(function (a, b) {
      return b[1] - a[1];
    });
    if (scores[0][1] <= 0) return "TRAVELER";
    if (scores[0][1] === scores[1][1]) return scores[0][0] + "/" + scores[1][0];
    return scores[0][0];
  }

  function pairLine(a, b) {
    var key = a + "+" + b;
    var table = {
      "ROAD+MOON": "The road is unsure of itself. The moon is kinder — it shows what daylight rushes past.",
      "ROAD+DAGGER": "Someone walking near you knows more than they are saying.",
      "ROAD+BRIDGE": "Soon you will have to trust a crossing.",
      "ROAD+DOG": "Something loyal is keeping pace, whether you asked or not.",
      "ROAD+HEART": "You are not hunting a map. You want a table that will hold.",
      "BRIDGE+HEART": "The crossing only works if you let someone meet you halfway.",
      "BRIDGE+MOON": "This bridge prefers night. Day makes it shy.",
      "DOG+DAGGER": "Loyalty can bite. That does not make it less loyal.",
      "LANTERN+FOREST": "The light was trying to warn you, not guide you.",
      "HOUSE+RING": "Someone is keeping a seat warm.",
      "CROW+MOON": "A watcher has been counting how often you come back.",
      "KEY+HOUSE": "There is a door you have never chosen — not yet.",
      "WHEEL+ROAD": "You keep calling this failure. The road calls it practice.",
      "FIRE+HOUSE": "Even what you fortify can fall. That is not the end of cooking.",
      "SHIP+RIVER": "Leaving can still be a way of sitting still."
    };
    if (table[key]) return table[key];
    if (table[b + "+" + a]) return table[b + "+" + a];
    return "The " + a.toLowerCase() + " keeps glancing toward the " + b.toLowerCase() + ".";
  }

  function drawSpread(s) {
    var mem = s.mem;
    var cards = s.cards.slice();
    if (cards.length < 5) {
      var extra = shuffle(CARDS, mem);
      var i;
      for (i = 0; i < extra.length && cards.length < 5; i++) {
        if (cards.indexOf(extra[i]) === -1) cards.push(extra[i]);
      }
    }
    cards = cards.slice(0, 5);
    var soul = soulOf(mem.traits);
    var c = mem.counts;
    var history = [];
    if (c.bridges) history.push("You have crossed " + c.bridges + " bridge" + (c.bridges === 1 ? "" : "s") + ". Your feet remember the wood.");
    if (c.abandoned) history.push("You walked away from " + c.abandoned + " crossing" + (c.abandoned === 1 ? "" : "s") + ". The water still knows.");
    if (c.east >= 3) history.push("East again — " + c.east + " times. You call it wandering. The road calls it a preference.");
    if (c.sits) history.push("More than once, you sat when walking would have been easier.");
    if (mem.flags.ignoredChild && mem.cycles >= 2) history.push("The child has not forgotten that you left.");
    if (mem.cycles >= 7) history.push("You always find a road. That is not an insult.");
    if (mem.cycles >= 12 && c.helps) history.push("You keep trying to save people. Has anyone asked why?");
    if (mem.cycles >= 31 && !mem.flags.askedDoor) history.push("All these walks, and you have never once chosen the door.");
    var spread = {
      cards: cards,
      origin: cards[0],
      follows: cards[1],
      refuse: cards[2],
      before: cards[3],
      become: cards[4],
      pair: pairLine(cards[0], cards[1]),
      soul: soul,
      history: history,
      looking: inferWant(mem),
      hiding: inferHidden(mem)
    };
    s.spread = spread;
    mem.lastCards = cards.slice(0, 3);
    return spread;
  }

  var HIDDEN = [
    {
      key: "CREDIT",
      title: "THE NAMES",
      slug: "/hidden/credit",
      line: "You have good hands. You have never once asked whose recipe you are holding.",
      score: function (c) {
        return (c.took || 0) * 2 - (c.asked || 0);
      }
    },
    {
      key: "THE LIST",
      title: "THE LIST",
      slug: "/hidden/the-list",
      line: "You have places to be. Every one of them was somewhere else.",
      score: function (c) {
        return (c.passed || 0) * 2 - (c.stayed || 0);
      }
    },
    {
      key: "THE LOCK",
      title: "THE LOCK",
      slug: "/hidden/the-lock",
      line: "All these miles, and you have never once asked a door a question.",
      score: function (c, mem) {
        return mem.cycles >= 3 && !(c.doors || 0) ? mem.cycles : -1;
      }
    },
    {
      key: "THE DEBT",
      title: "THE DEBT",
      slug: "/hidden/the-debt",
      line: "You always ask what it costs. Nobody has ever been able to give you anything.",
      score: function (c) {
        return (c.priced || 0) * 3;
      }
    },
    {
      key: "THE OTHER YOU",
      title: "THE OTHER YOU",
      slug: "/hidden/the-other-you",
      line: "I keep the ones you left standing in the forks. Somebody has to.",
      score: function (c, mem) {
        return !(c.sits || 0) && mem.cycles >= 2 ? mem.traits.wander + mem.cycles : mem.traits.wander - (c.sits || 0);
      }
    },
    {
      key: "THE EXIT",
      title: "THE EXIT",
      slug: "/hidden/the-exit",
      line: "You are very good at going. Tell me one thing you have arrived at.",
      score: function (c) {
        return (c.abandoned || 0) * 3 - (c.bridges || 0);
      }
    },
    {
      key: "THE QUESTION",
      title: "THE QUESTION",
      slug: "/hidden/the-question",
      line: "You keep asking about the future. The future is a polite way of asking permission.",
      score: function (c, mem) {
        return (c.refusedReading || 0) * 3 + (mem.cycles >= 5 && !mem.flags.askedHidden ? 2 : 0);
      }
    }
  ];

  function inferHidden(mem) {
    var c = mem.counts || {};
    var best = HIDDEN[0];
    var bestScore = -Infinity;
    var i;
    for (i = 0; i < HIDDEN.length; i++) {
      var v = HIDDEN[i].score(c, mem);
      if (v > bestScore) {
        bestScore = v;
        best = HIDDEN[i];
      }
    }
    return { key: best.key, title: best.title, line: best.line, slug: best.slug, score: bestScore };
  }

  function inferWant(mem) {
    var t = mem.traits;
    if (t.mercy + t.loyalty >= t.wander + t.curiosity) return "someone to say you can stay";
    if (t.return > t.wander) return "a second chance, said softly";
    if (t.curiosity > t.courage) return "the quieter question under the loud one";
    return "a road that remembers your name";
  }

  function readerGreeting(mem) {
    var n = mem.cycles;
    if (n <= 0) return ['"Come in.', 'Sit if you like."'];
    if (n === 1) return ['"Ah.', 'You came back."'];
    if (n === 2 && mem.lastCards[0]) return ['"Last time you', "chose the " + mem.lastCards[0].toLowerCase() + '.', 'I kept it warm."'];
    if (n >= 7 && n < 12) return ['"You always take', 'a road.', 'I am not teasing."'];
    if (n >= 12 && n < 31) return ['"We have been', 'here before,', 'haven\'t we?"'];
    if (n >= 31) return ['"Thirty-one,', "then " + n + '.', 'Still walking."'];
    return ['"Again?', 'Good."'];
  }

  function linesFor(s) {
    var sc = s.screen;
    var mem = s.mem;
    if (sc === "title") {
      return ["ROAD-WISDOM", "", "Earth underfoot.", "You walk.", "She reads.", "", "Walk it kindly."];
    }
    if (sc === "travel") {
      return [
        s.road.toUpperCase(),
        s.weather,
        "",
        "The path splits.",
        "No signs. Just",
        "weather and habit.",
        "",
        "The " + s.symbol.toLowerCase() + " tags along."
      ];
    }
    if (sc === "meet") {
      var e = s.encounters[s.beat];
      if (!e) return ["Even the road", "goes quiet."];
      if (e.spawned) {
        return [e.card || "OMEN", "", "Last reading", "left this here."].concat(wrapText(e.q, 18));
      }
      var out = [s.stranger.name.toUpperCase(), ""];
      if (s.stranger.id === "princess") out = ["HIGH GIRDER", "", "She is waiting."];
      return out.concat(wrapText(e.q, 18));
    }
    if (sc === "discover") {
      var found = s.cards.slice(0, 3);
      var d = ["IN YOUR HANDS", ""];
      if (!found.length) d.push("(just dust)");
      var fi;
      for (fi = 0; fi < found.length; fi++) d.push(found[fi]);
      d.push("", "The Reader is", "this way.");
      return d;
    }
    if (sc === "reader") {
      return ["THE READER", "", "She looks up,", "not surprised."].concat(readerGreeting(mem)).concat(["", "Shall we draw?"]);
    }
    if (sc === "spread") {
      var sp = s.spread;
      return [
        "FIVE CARDS",
        "from " + sp.origin,
        "follows " + sp.follows,
        "you refuse " + sp.refuse,
        "ahead: " + sp.before,
        "you become " + sp.become
      ];
    }
    if (sc === "fortune") {
      var f = s.spread;
      var lines = ["THE READING"].concat(wrapText(f.pair)).concat(["", "If I had to name", "you: " + f.soul + "."]);
      if (f.history[0]) lines = lines.concat([""]).concat(wrapText(f.history[0]));
      if (mem.cycles >= 5) lines = lines.concat([""]).concat(wrapText("Between us — you were looking for " + f.looking + "."));
      if (f.hiding) lines = lines.concat(["", "You are hiding", f.hiding.title + "."]);
      lines = lines.concat(["", "The road is still", "open."]);
      return lines;
    }
    if (sc === "hiding") {
      var h = (s.spread && s.spread.hiding) || inferHidden(mem);
      return ["WHAT YOU HIDE", "", h.title]
        .concat([""])
        .concat(wrapText('"' + h.line + '"'))
        .concat(["", "Nothing is buried.", "Earth does not end.", "It is only stored."]);
    }
    if (sc === "hidden") {
      return [
        "THE READER",
        "",
        "You thought you",
        "came for the",
        "future.",
        "",
        "You did not.",
        "",
        "You came looking",
        "for " + inferWant(mem) + ".",
        "",
        "That is enough",
        "for tonight."
      ];
    }
    if (sc === "memory") {
      var notes = mem.notes.slice(-7);
      if (!notes.length) return ["REMEMBERED", "", "Nothing yet.", "Dust is patient."];
      return ["REMEMBERED"].concat(notes);
    }
    return ["..."];
  }

  function choicesFor(s) {
    var sc = s.screen;
    if (sc === "title") return [{ id: "begin", label: "Start walking" }];
    if (sc === "travel")
      return s.dirs.map(function (d) {
        var soft = { FOREST: "Forest way", VILLAGE: "Village", RIVER: "River" };
        return { id: "dir-" + d, label: soft[d] || d };
      });
    if (sc === "meet") {
      var e = s.encounters[s.beat];
      return (e && e.a) || [{ id: "walk-on", label: "Keep walking" }];
    }
    if (sc === "discover") return [{ id: "to-reader", label: "Find the Reader" }];
    if (sc === "reader")
      return [
        { id: "draw", label: "Yes — draw" },
        { id: "refuse-draw", label: "Not tonight" }
      ];
    if (sc === "spread") return [{ id: "read", label: "Read them" }];
    if (sc === "fortune") {
      var opts = [{ id: "again", label: "Walk again" }];
      opts.push({ id: "what-hide", label: "What am I hiding?" });
      if (s.mem.cycles >= 8 && !s.mem.flags.askedHidden) opts.push({ id: "what-q", label: "What was I asking?" });
      return opts;
    }
    if (sc === "hidden") return [{ id: "again", label: "Walk again" }];
    if (sc === "hiding")
      return [
        { id: "again", label: "Walk again" },
        { id: "read-hidden", label: "Read the whole part" },
        { id: "paperback", label: "Drive it instead" }
      ];
    if (sc === "memory") return [{ id: "mem-back", label: "Back" }];
    return [{ id: "begin", label: "Start walking" }];
  }

  function artFor(s) {
    if (s.screen === "reader" || s.screen === "spread" || s.screen === "fortune" || s.screen === "hidden" || s.screen === "hiding" || s.screen === "discover") return "oracle";
    if (s.screen === "title") return "oracle";
    if (s.screen === "meet") {
      var e = s.encounters[s.beat];
      if (e && e.card === "BRIDGE") return "bridge";
      if (e && e.card === "FOREST") return "forest";
      if (e && e.card === "LANTERN") return "forest";
      if (s.stranger && s.stranger.id === "princess") return "princess";
      if (e && (e.q || "").indexOf("Cow Lick") !== -1) return "creamery";
      if (e && (e.q || "").indexOf("Bville") !== -1) return "bville";
      if (e && (e.q || "").indexOf("princess") !== -1) return "princess";
      return (s.stranger && s.stranger.art) || "road";
    }
    if (s.road.indexOf("Forest") === 0) return "forest";
    if (s.road.indexOf("River") === 0) return "bridge";
    return "road";
  }

  function applyChoice(s, opt) {
    if (!opt) return;
    bump(s.runTraits, opt.t || {});
    bump(s.mem.traits, opt.t || {});
    s.chosen.push(opt.id);
    if (opt.card && s.cards.indexOf(opt.card) === -1) s.cards.push(opt.card);
    if (opt.flag) s.mem.flags[opt.flag] = true;
    if (opt.flag === "helpedChild") s.mem.counts.helps += 1;
    if (opt.flag === "ignoredChild") addNote(s.mem, "You walked past the child.");
    if (opt.flag === "crossed") s.mem.counts.bridges += 1;
    if (opt.flag === "abandonedBridge") s.mem.counts.abandoned += 1;
    if (opt.flag === "sat" || opt.flag === "satThrone") s.mem.counts.sits += 1;
    if (opt.flag === "askedDoor") s.mem.counts.doors += 1;
    tallyHiding(s.mem.counts, opt.id);
    if (opt.flag === "askedPrincess") addNote(s.mem, "She smiled: Vasilisa.");
    if (opt.flag === "satThrone") addNote(s.mem, "You climbed the high girder for her.");
    addNote(s.mem, opt.label);
  }

  function tallyHiding(c, id) {
    if (!c || !id) return;
    function bumpCount(k) {
      c[k] = (c[k] || 0) + 1;
    }
    if (/^(take|keep|approach)/.test(id)) bumpCount("took");
    if (/^(ask|read|watch|listen)/.test(id)) bumpCount("asked");
    if (/^(pass|leave|walk|ignore|turn-away|avoid)/.test(id)) bumpCount("passed");
    if (/^(sit|eat|help|tell-true|cross|call|listen|return-it)/.test(id)) bumpCount("stayed");
    if (/^(pay-first|read-ledger|read-cup|read-phil)/.test(id)) bumpCount("priced");
  }

  function act(s, id) {
    if (id === "mem") {
      s.prev = s.screen;
      s.screen = "memory";
      return s;
    }
    if (id === "mem-back") {
      s.screen = s.prev || "travel";
      return s;
    }
    if (id === "begin") {
      s.screen = "travel";
      s.cards.push(s.symbol);
      return s;
    }
    if (id.indexOf("dir-") === 0) {
      var dir = id.slice(4);
      if (dir === "FOREST" || dir === "EAST") s.mem.counts.east += 1;
      if (dir === "VILLAGE") s.mem.counts.north += 1;
      s.chosen.push(id);
      s.screen = "meet";
      s.beat = 0;
      return s;
    }
    if (s.screen === "meet") {
      var e = s.encounters[s.beat];
      var opt = null;
      var i;
      if (e && e.a) {
        for (i = 0; i < e.a.length; i++) {
          if (e.a[i].id === id) opt = e.a[i];
        }
      }
      applyChoice(s, opt);
      s.beat += 1;
      if (s.beat >= s.encounters.length) s.screen = "discover";
      return s;
    }
    if (id === "to-reader") {
      s.screen = "reader";
      return s;
    }
    if (id === "what-q") {
      s.mem.flags.askedHidden = true;
      addNote(s.mem, "You asked the question.");
      saveMem(s.mem);
      s.screen = "hidden";
      return s;
    }
    if (id === "what-hide") {
      s.mem.flags.sawHidden = true;
      addNote(s.mem, "She named what you hide.");
      saveMem(s.mem);
      s.screen = "hiding";
      return s;
    }
    if (id === "draw" || id === "refuse-draw") {
      if (id === "refuse-draw") {
        bump(s.mem.traits, { suspicion: 1, return: 1 });
        s.mem.counts.refusedReading = (s.mem.counts.refusedReading || 0) + 1;
      }
      drawSpread(s);
      s.screen = "spread";
      return s;
    }
    if (id === "read") {
      s.mem.cycles += 1;
      addNote(s.mem, "Cycle " + s.mem.cycles + ": " + s.spread.soul);
      saveMem(s.mem);
      s.screen = "fortune";
      return s;
    }
    if (id === "again") {
      saveMem(s.mem);
      var nxt = newRun(s.mem);
      nxt.screen = "travel";
      nxt.cards.push(nxt.symbol);
      return nxt;
    }
    return s;
  }

  function meetPrincess(s) {
    var state = s || newRun(loadMem());
    state.screen = "meet";
    state.beat = 0;
    state.road = "Old Imperial Road";
    state.weather = "a red sunset";
    state.stranger = { id: "princess", name: "the princess", art: "princess" };
    state.encounters = [princessBeat()];
    state.encounters[0].artUrl = pick(["/img/road/kong.jpg", "/img/road/princess.jpg"], state.mem);
    state.runArt = state.encounters[0].artUrl;
    state.symbol = "LANTERN";
    if (state.cards.indexOf("LANTERN") === -1) state.cards.push("LANTERN");
    return state;
  }

  function artUrlFor(s) {
    if (s.screen === "meet" && s.encounters[s.beat] && s.encounters[s.beat].artUrl) return s.encounters[s.beat].artUrl;
    if (s.screen === "travel" || s.screen === "title") return s.runArt || "/img/road/paper-stamp.jpg";
    if (s.screen === "discover") return s.runArt || "/img/road/scan-a.png";
    var i = Math.abs((s.mem.seed || 1) + (s.mem.cycles || 0) * 17) % ARTS.length;
    if (s.screen === "reader" || s.screen === "spread" || s.screen === "fortune" || s.screen === "hidden" || s.screen === "hiding") return ARTS[i];
    return s.runArt || "/img/road/paper-stamp.jpg";
  }

  function scene(s) {
    var scn = {
      screen: s.screen,
      day: s.mem.cycles + 1,
      art: artFor(s),
      artUrl: artUrlFor(s),
      bgUrl: artUrlFor(s),
      lines: linesFor(s),
      choices: choicesFor(s),
      ambience: artFor(s) === "creamery" || artFor(s) === "village" || artFor(s) === "bville",
      memory: s.mem.notes.slice(),
      road: s.road,
      weather: s.weather,
      hidden: inferHidden(s.mem)
    };
    return scn;
  }

  function newState(mem) {
    return newRun(mem || loadMem());
  }

  function isOver() {
    return false;
  }

  function resetAll() {
    try {
      if (g.localStorage) g.localStorage.removeItem(STORE);
    } catch (e) {}
    return newRun(loadMem());
  }

  g.ROADCORE = {
    newState: newState,
    act: act,
    scene: scene,
    soulOf: soulOf,
    isOver: isOver,
    resetAll: resetAll,
    loadMem: loadMem,
    meetPrincess: meetPrincess,
    inferHidden: inferHidden,
    HIDDEN: HIDDEN,
    CARDS: CARDS
  };
})(typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : this);
