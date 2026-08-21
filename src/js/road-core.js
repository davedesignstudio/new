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
  var STORE = "wider.roadwisdom.v1";

  var QUESTIONS = [
    {
      q: "Would you return something you found if nobody knew you had it?",
      a: [
        { id: "return-it", label: "RETURN IT", t: { loyalty: 1, mercy: 1 } },
        { id: "keep-it", label: "KEEP IT", t: { suspicion: 1 } },
        { id: "ask-lost", label: "ASK WHO LOST IT", t: { curiosity: 1, trust: 1 } }
      ]
    },
    {
      q: "A stranger offers a gold ring.",
      a: [
        { id: "take-ring", label: "TAKE IT", t: { wander: 1 }, card: "RING" },
        { id: "refuse-ring", label: "REFUSE IT", t: { suspicion: 1, mercy: 1 } },
        { id: "ask-ring", label: "ASK WHO LOST IT", t: { curiosity: 1, trust: 1 } }
      ]
    },
    {
      q: "The mill-light is on. A child says mother is waiting.",
      a: [
        { id: "help-child", label: "HELP", t: { mercy: 2, loyalty: 1 }, flag: "helpedChild" },
        { id: "ignore-child", label: "LEAVE", t: { wander: 1 }, flag: "ignoredChild" },
        { id: "ask-mill", label: "ASK WHERE", t: { curiosity: 1 } }
      ]
    },
    {
      q: "The ferryman smiles too quickly. Cross now?",
      a: [
        { id: "cross-now", label: "CROSS", t: { courage: 2, trust: 1 }, flag: "crossed" },
        { id: "turn-away", label: "TURN AWAY", t: { return: 1, suspicion: 1 }, flag: "abandonedBridge" },
        { id: "wait-rain", label: "WAIT", t: { fate: 1 } }
      ]
    },
    {
      q: "Cow Lick is open. Bind's ledger is on the bar.",
      a: [
        { id: "sit-lick", label: "SIT", t: { mercy: 1, loyalty: 1 }, flag: "sat" },
        { id: "read-ledger", label: "READ THE BOOK", t: { curiosity: 1, suspicion: 1 }, flag: "readLedger" },
        { id: "pass-lick", label: "WALK ON", t: { wander: 1 } }
      ]
    },
    {
      q: "Bville still serves. A plate, unsplit.",
      a: [
        { id: "eat-bville", label: "EAT", t: { trust: 1, mercy: 1 }, flag: "ate" },
        { id: "pay-first", label: "ASK THE PRICE", t: { suspicion: 1 } },
        { id: "leave-bville", label: "LEAVE HUNGRY", t: { wander: 1 } }
      ]
    },
    {
      q: "A lantern hangs in moving trees. Take it?",
      a: [
        { id: "take-lantern", label: "TAKE", t: { courage: 1, fate: 1 }, card: "LANTERN" },
        { id: "leave-lantern", label: "LEAVE IT", t: { suspicion: 1 } },
        { id: "watch-lantern", label: "WATCH", t: { curiosity: 1, fate: 1 } }
      ]
    },
    {
      q: "A soldier asks if you saw which way the wagon went.",
      a: [
        { id: "tell-true", label: "TELL TRUE", t: { loyalty: 1, trust: 1 } },
        { id: "lie-soldier", label: "LIE", t: { suspicion: 1, courage: 1 } },
        { id: "say-nothing", label: "SAY NOTHING", t: { return: 1 } }
      ]
    },
    {
      q: "A widow holds a key she will not use.",
      a: [
        { id: "take-key", label: "TAKE THE KEY", t: { curiosity: 1, courage: 1 }, card: "KEY" },
        { id: "leave-key", label: "LEAVE IT", t: { mercy: 1 } },
        { id: "ask-door", label: "ASK THE DOOR", t: { fate: 1, curiosity: 1 }, flag: "askedDoor" }
      ]
    },
    {
      q: "The ape has the high girder. She is at the top. The barrels do not care about thrones.",
      a: [
        { id: "sit-throne", label: "CLIMB", t: { courage: 2, fate: 1 }, flag: "satThrone" },
        { id: "walk-princess", label: "DODGE", t: { wander: 1, suspicion: 1 } },
        { id: "ask-princess", label: "ASK HER NAME", t: { curiosity: 1, trust: 1 }, flag: "askedPrincess" }
      ]
    },
    {
      q: "A musician plays a song you almost remember.",
      a: [
        { id: "listen", label: "LISTEN", t: { fate: 1, return: 1 } },
        { id: "pay-tune", label: "GIVE COIN", t: { mercy: 1, loyalty: 1 } },
        { id: "walk-music", label: "WALK ON", t: { wander: 1 } }
      ]
    }
  ];

  var STRANGERS = [
    { id: "child", name: "a child", art: "village" },
    { id: "soldier", name: "a soldier", art: "road" },
    { id: "widow", name: "a widow", art: "chapel" },
    { id: "merchant", name: "Bind", art: "creamery" },
    { id: "traveler", name: "a traveler", art: "road" },
    { id: "ferryman", name: "a ferryman", art: "bridge" },
    { id: "musician", name: "a musician", art: "village" },
    { id: "beggar", name: "a beggar", art: "village" },
    { id: "red", name: "a woman in red", art: "oracle" },
    { id: "princess", name: "the princess", art: "princess" }
  ];

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
      counts: { east: 0, north: 0, bridges: 0, abandoned: 0, sits: 0, helps: 0, doors: 0 },
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
    for (i = 0; i < forced.length && enc.length < 2; i++) {
      enc.push(makeSymbolBeat(forced[i], mem));
    }
    var stranger = pick(STRANGERS, mem);
    enc.push(questionForStranger(stranger, mem));
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
    var map = {
      child: 2,
      soldier: 7,
      widow: 8,
      merchant: 4,
      ferryman: 3,
      musician: 10,
      princess: 9,
      red: 1,
      beggar: 0,
      traveler: 0
    };
    var q = QUESTIONS[map[stranger.id] != null ? map[stranger.id] : 0];
    if (stranger.id === "child") return childMemoryBeat(mem, q);
    if (stranger.id === "princess") return princessBeat();
    return q;
  }

  function childMemoryBeat(mem, fallback) {
    var a = [
      { id: "help-child", label: "HELP", t: { mercy: 2, loyalty: 1 }, flag: "helpedChild" },
      { id: "ignore-child", label: "LEAVE", t: { wander: 1 }, flag: "ignoredChild" },
      { id: "ask-mill", label: "ASK WHERE", t: { curiosity: 1 }, flag: "sawMill" }
    ];
    if (mem.flags.ignoredChild && mem.cycles >= 3) {
      return { q: "The child says you always leave.", a: a };
    }
    if (mem.flags.ignoredChild && mem.cycles >= 2) {
      return { q: "The child asks why you did not help.", a: a };
    }
    if (mem.flags.ignoredChild) {
      return {
        q: "The mill-light is on. Mother waits. The child is gone.",
        a: [
          { id: "help-mother", label: "HELP HER", t: { mercy: 2 }, flag: "helpedMother" },
          { id: "leave-mill", label: "LEAVE", t: { wander: 1 } },
          { id: "ask-mill", label: "ASK WHERE HE WENT", t: { curiosity: 1 }, flag: "sawMill" }
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
      q: "The " + card.toLowerCase() + " from the last reading is here, under " + weather + ".",
      card: card,
      spawned: true,
      a: [
        { id: "approach-" + card, label: "APPROACH", t: { fate: 1, curiosity: 1 }, card: card },
        { id: "avoid-" + card, label: "AVOID", t: { suspicion: 1, return: 1 } },
        { id: "ask-" + card, label: "ASK IT", t: { curiosity: 1, trust: 1 }, card: card }
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
      "ROAD+MOON": "The road is uncertain. The moon shows what day hides.",
      "ROAD+DAGGER": "Someone close knows more than they say.",
      "ROAD+BRIDGE": "A crossing will require trust.",
      "ROAD+DOG": "Something loyal walks beside you.",
      "ROAD+HEART": "You are looking for a table, not a map.",
      "BRIDGE+HEART": "A crossing will require trust.",
      "BRIDGE+MOON": "The bridge comes only at night.",
      "DOG+DAGGER": "Loyalty has teeth.",
      "LANTERN+FOREST": "The light was a warning.",
      "HOUSE+RING": "A seat is being kept.",
      "CROW+MOON": "A watcher counts your returns.",
      "KEY+HOUSE": "A door you have never chosen.",
      "WHEEL+ROAD": "You mistake repetition for failure.",
      "FIRE+HOUSE": "What you fortify can still fall.",
      "SHIP+RIVER": "Leaving is still a kind of sitting still."
    };
    if (table[key]) return table[key];
    if (table[b + "+" + a]) return table[b + "+" + a];
    return "The " + a.toLowerCase() + " turns toward the " + b.toLowerCase() + ".";
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
    if (c.bridges) history.push("You have crossed " + c.bridges + " bridge" + (c.bridges === 1 ? "" : "s") + ".");
    if (c.abandoned) history.push("You have abandoned " + c.abandoned + ".");
    if (c.east >= 3) history.push("You have taken the east road " + c.east + " times. You call it wandering. The road calls it choosing.");
    if (c.sits) history.push("You sat when you could have walked.");
    if (mem.flags.ignoredChild && mem.cycles >= 2) history.push("The child still asks why you left.");
    if (mem.cycles >= 7) history.push("You always take a road.");
    if (mem.cycles >= 12 && c.helps) history.push("Why do you keep trying to save them?");
    if (mem.cycles >= 31 && !mem.flags.askedDoor) history.push("You have never once chosen the door.");
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
      looking: inferWant(mem)
    };
    s.spread = spread;
    mem.lastCards = cards.slice(0, 3);
    return spread;
  }

  function inferWant(mem) {
    var t = mem.traits;
    if (t.mercy + t.loyalty >= t.wander + t.curiosity) return "permission to stay";
    if (t.return > t.wander) return "a second chance";
    if (t.curiosity > t.courage) return "the question under the question";
    return "a road that remembers you";
  }

  function readerGreeting(mem) {
    var n = mem.cycles;
    if (n <= 0) return ['"Welcome."'];
    if (n === 1) return ['"Welcome back."'];
    if (n === 2 && mem.lastCards[0]) return ['"You chose the', mem.lastCards[0].toLowerCase(), 'last time."'];
    if (n >= 7 && n < 12) return ['"You always take', 'the road."'];
    if (n >= 12 && n < 31) return ['"You have asked', 'this question before."'];
    if (n >= 31) return ['"You have walked', "this road " + n + ' times."'];
    return ['"Again?"'];
  }

  function linesFor(s) {
    var sc = s.screen;
    var mem = s.mem;
    if (sc === "title") {
      return ["ROAD-WISDOM", "", "Endless reading.", "The world", "rearranges.", "", "You remember."];
    }
    if (sc === "travel") {
      return [
        s.road.toUpperCase(),
        s.weather,
        "",
        "A road divides ahead.",
        "",
        "The " + s.symbol.toLowerCase() + " is with you."
      ];
    }
    if (sc === "meet") {
      var e = s.encounters[s.beat];
      if (!e) return ["The road goes quiet."];
      if (e.spawned) {
        return [e.card || "OMEN", "", "Last reading", "made this."].concat(wrapText(e.q, 18));
      }
      var out = [s.stranger.name.toUpperCase(), ""];
      if (s.stranger.id === "princess") out = ["HIGH GIRDER", "THE PRINCESS", ""];
      return out.concat(wrapText(e.q, 18));
    }
    if (sc === "discover") {
      var found = s.cards.slice(0, 3);
      var d = ["YOU FOUND", ""];
      if (!found.length) d.push("(dust)");
      var fi;
      for (fi = 0; fi < found.length; fi++) d.push(found[fi]);
      d.push("", "The reading", "is this way.");
      return d;
    }
    if (sc === "reader") {
      return ["THE READER"].concat(["", "She looks at you."]).concat(readerGreeting(mem)).concat(["", "Draw the cards?"]);
    }
    if (sc === "spread") {
      var sp = s.spread;
      return [
        "FIVE CARDS",
        "FROM " + sp.origin,
        "TAIL " + sp.follows,
        "BLIND " + sp.refuse,
        "AHEAD " + sp.before,
        "BECOME " + sp.become
      ];
    }
    if (sc === "fortune") {
      var f = s.spread;
      var lines = ["THE READING"].concat(wrapText(f.pair)).concat(["", "You are the", f.soul + "."]);
      if (f.history[0]) lines = lines.concat([""]).concat(wrapText(f.history[0]));
      if (mem.cycles >= 5) lines = lines.concat(["", "You were looking", "for " + f.looking + "."]);
      lines = lines.concat(["", "Your road", "continues."]);
      return lines;
    }
    if (sc === "hidden") {
      return [
        "THE READER",
        "",
        "You thought you",
        "were looking for",
        "the future.",
        "",
        "You weren't.",
        "",
        "You were looking",
        "for " + inferWant(mem) + ".",
        "",
        "Now you know."
      ];
    }
    if (sc === "memory") {
      var notes = mem.notes.slice(-7);
      if (!notes.length) return ["REMEMBERED", "", "(the dust is new)"];
      return ["REMEMBERED"].concat(notes);
    }
    return ["..."];
  }

  function choicesFor(s) {
    var sc = s.screen;
    if (sc === "title") return [{ id: "begin", label: "PRESS START" }];
    if (sc === "travel")
      return s.dirs.map(function (d) {
        return { id: "dir-" + d, label: d };
      });
    if (sc === "meet") {
      var e = s.encounters[s.beat];
      return (e && e.a) || [{ id: "walk-on", label: "WALK ON" }];
    }
    if (sc === "discover") return [{ id: "to-reader", label: "CONTINUE" }];
    if (sc === "reader")
      return [
        { id: "draw", label: "YES" },
        { id: "refuse-draw", label: "NO" }
      ];
    if (sc === "spread") return [{ id: "read", label: "READ" }];
    if (sc === "fortune") {
      var opts = [{ id: "again", label: "WALK AGAIN" }];
      if (s.mem.cycles >= 8 && !s.mem.flags.askedHidden) opts.push({ id: "what-q", label: "WHAT QUESTION?" });
      else opts.push({ id: "wider", label: "WIDER" });
      return opts;
    }
    if (sc === "hidden") return [{ id: "again", label: "WALK AGAIN" }];
    if (sc === "memory") return [{ id: "mem-back", label: "BACK" }];
    return [{ id: "begin", label: "START" }];
  }

  function artFor(s) {
    if (s.screen === "reader" || s.screen === "spread" || s.screen === "fortune" || s.screen === "hidden" || s.screen === "discover") return "oracle";
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
    if (opt.flag === "ignoredChild") addNote(s.mem, "You left the child.");
    if (opt.flag === "crossed") s.mem.counts.bridges += 1;
    if (opt.flag === "abandonedBridge") s.mem.counts.abandoned += 1;
    if (opt.flag === "sat" || opt.flag === "satThrone") s.mem.counts.sits += 1;
    if (opt.flag === "askedDoor") s.mem.counts.doors += 1;
    if (opt.flag === "askedPrincess") addNote(s.mem, "She said Vasilisa.");
    if (opt.flag === "satThrone") addNote(s.mem, "You climbed the high girder.");
    addNote(s.mem, opt.label);
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
    if (id === "draw" || id === "refuse-draw") {
      if (id === "refuse-draw") bump(s.mem.traits, { suspicion: 1, return: 1 });
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
    state.symbol = "LANTERN";
    if (state.cards.indexOf("LANTERN") === -1) state.cards.push("LANTERN");
    return state;
  }

  function scene(s) {
    var scn = {
      screen: s.screen,
      day: s.mem.cycles + 1,
      art: artFor(s),
      lines: linesFor(s),
      choices: choicesFor(s),
      ambience: artFor(s) === "creamery" || artFor(s) === "village" || artFor(s) === "bville",
      memory: s.mem.notes.slice(),
      road: s.road,
      weather: s.weather
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
    CARDS: CARDS
  };
})(typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : this);
