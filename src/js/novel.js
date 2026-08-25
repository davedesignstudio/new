(function (g) {
  var STORE = "wider.novel.v1";

  var PAGES = [
    {
      id: "candle",
      n: 1,
      title: "The tent",
      art: "/img/road/paper.jpg",
      alt: "A tent, a candle, a deck of cards",
      caption: "Sit down.",
      teller: "I am Zorya. I keep a tent at the crossroads. One candle. One deck. I do not curse you. If you sit, I will tell you what happened.",
      next: "hunger"
    },
    {
      id: "hunger",
      n: 2,
      title: "Hunger",
      art: "/img/tower/ch1.jpg",
      alt: "A dark kitchen and a road",
      caption: "Who gets to eat.",
      teller: "That is the whole plot. A closed hand cannot pass the salt. A house that will not feed a stranger is already ruined. I have seen this in winter. I have seen this on the prairie. It is the same story.",
      next: "loaf"
    },
    {
      id: "loaf",
      n: 3,
      title: "The bread",
      art: "/img/road/bville.jpg",
      alt: "A kitchen and black bread",
      caption: "A man carried bread to a locked kitchen.",
      teller: "The people upstairs had forgotten crust. They laughed. Then they tasted it. They called it a crown, which is the wrong name for bread. The stove left and went to a smaller house. That is how a fortress starts. I am not lining up countries. I am remembering a table.",
      next: "stone"
    },
    {
      id: "stone",
      n: 4,
      title: "The stone",
      art: "/img/road/coffee.jpg",
      alt: "A cup and a stone on a table",
      caption: "You do not eat this.",
      teller: "Hungry people boiled a stone and said the soup was almost ready. The village put in carrots. Then they took the stone out. The stone was never food. It was there so people would remember they had food. That is the keystone. Not a chosen person. A stone you do not eat.",
      next: "fall"
    },
    {
      id: "fall",
      n: 5,
      title: "The kitchen that fell",
      art: "/img/comic/rye-clash.jpg",
      alt: "A woman with bread leaping while a kitchen-citadel is hit by a storm",
      caption: "They thought the kitchen could not fall.",
      teller: "There was a kitchen on a cliff. The cooks locked the recipes. Hunger came like weather, and then like a body made of locked doors. The house fell. After the dust there was still a table. I will not dress this up. The house fell because it would not share.",
      next: "rye"
    },
    {
      id: "rye",
      n: 6,
      title: "Rye",
      art: "/img/comic/rye-bounce.jpg",
      alt: "A woman in a yellow coat jumping between fire escapes with bread and coffee",
      caption: "She brought bread. She did not punch the storm.",
      teller: "Her name is Rye. Yellow coat. Black loaf. Coffee that did not spill. Gary will try to say she is chosen. She is not. She is a guest. She points at an empty chair and sits. That is all.",
      next: "van"
    },
    {
      id: "van",
      n: 7,
      title: "The van",
      art: "/img/tower/ch2.jpg",
      alt: "Night road and a camper",
      caption: "It is late. They are hungry.",
      teller: "Bodie drives. Klax reads a list. Grub is the dog. VANESSA is the van, and she talks. They think they are going to a famous sandwich. They are guests. The van starts on the third try.",
      next: "clerk"
    },
    {
      id: "clerk",
      n: 8,
      title: "The last bag",
      art: "/img/road/coffee-cup.jpg",
      alt: "A night counter and a hidden bag",
      caption: "The clerk hides the last bag.",
      teller: "She is not a ghost. She is tired. She is keeping food for morning. Share it, or keep it. I will remember which.",
      choices: [
        { label: "Share the bag", to: "market", flag: "sharedBag" },
        { label: "Keep the bag", to: "market", flag: "hoardedBag" }
      ]
    },
    {
      id: "market",
      n: 9,
      title: "The stall",
      art: "/img/road/bville-2.jpg",
      alt: "A night market stall",
      caption: "A man offered to buy the recipe, not the cook.",
      teller: "She kept the name of the bun. Forty years of a stall is a history. A menu that deletes the cook is also a history. Sit with her, or side with the man in the nice coat.",
      choices: [
        { label: "Sit with her", to: "diner", flag: "satAuntie" },
        { label: "Side with the buyer", to: "diner", flag: "sidedScout" }
      ]
    },
    {
      id: "diner",
      n: 10,
      title: "The diner",
      art: "/img/road/cafe.jpg",
      alt: "A quiet diner booth",
      caption: "Water first. Names later.",
      teller: "One basket. Three hungry people. Pass the red bottle, or do not. If you do not share, the van may not start. That is not magic. That is how a house works.",
      choices: [
        { label: "Pass the bottle", to: "mask", flag: "passedKetchup" },
        { label: "Keep the bottle", to: "mask", flag: "keptKetchup" }
      ]
    },
    {
      id: "mask",
      n: 11,
      title: "The rubber head",
      art: "/img/road/kong.jpg",
      alt: "A mascot head in a food court",
      caption: "The head comes off.",
      teller: "Under the mask is a person who wanted the bun without the woman. Grub bites the rubber. The cook is still the cook. We do not need a long speech here.",
      next: "widow"
    },
    {
      id: "widow",
      n: 12,
      title: "The extra chair",
      art: "/img/road/philhower.jpg",
      alt: "A canteen table with one spare seat",
      caption: "She sets eleven places. Someone sets twelve.",
      teller: "The stew is not cursed. It is grief and good stock. A table that keeps one extra seat cannot quietly become a list. Leave the chair. Eat.",
      next: "storm"
    },
    {
      id: "storm",
      n: 13,
      title: "The storm",
      art: "/img/tower/ch3.jpg",
      alt: "A cliff kitchen in lightning",
      caption: "The locked kitchen meets the weather.",
      teller: "You can help cook in the rain, or you can try to save the recipe from the safe. Both can feed people. Neither will put the walls back up. The walls were the problem.",
      choices: [
        { label: "Cook in the rain", to: "wreck", flag: "cookedRain" },
        { label: "Open the safe for the light", to: "wreck", flag: "openedSafe" }
      ]
    },
    {
      id: "wreck",
      n: 14,
      title: "After",
      art: "/img/comic/rye-star.jpg",
      alt: "A woman sitting at a table in a ruined room, passing bread",
      caption: "The house is down. Dinner is not.",
      teller: "Rye is already there with bread. Gary starts a sentence. She slides him the bottle. Every night a kitchen like this may fall. Every night dinner can start again. I have watched this more than once.",
      next: "nova"
    },
    {
      id: "nova",
      n: 15,
      title: "The stand",
      art: "/img/tower/ch4.jpg",
      alt: "A small stand with a light on and enough seats",
      caption: "He pours coffee before he asks who you are.",
      teller: "It is not a castle. It is a counter and a man who stayed up. There are enough seats. There were always enough seats. Gary read that in a loud voice and made it sound like a war. It was never a war.",
      next: "end"
    },
    {
      id: "end",
      n: 16,
      title: "You sit",
      art: "/img/tower/ch4.jpg",
      alt: "A set table",
      caption: "Nobody asks what you did to deserve it.",
      teller: "That is the ending. You sit. Someone who has been cooking all night gives you a plate. The planet does not end. If you want the same story in another room, the doors are still open. If you want to hear it again, I will light the candle.",
      ending: true,
      choices: [
        { label: "Hear it again", to: "candle", again: true },
        { label: "Drive the van", href: "/adventure" },
        { label: "Sit. She deals as you type", href: "/table" },
        { label: "Walk the small road", href: "/road" }
      ]
    }
  ];

  var BY_ID = {};
  var i;
  for (i = 0; i < PAGES.length; i++) {
    BY_ID[PAGES[i].id] = PAGES[i];
  }

  function blankFlags() {
    return {};
  }

  function loadState() {
    try {
      var raw = g.localStorage && g.localStorage.getItem(STORE);
      if (raw) {
        var s = JSON.parse(raw);
        if (s && s.page && BY_ID[s.page]) return s;
      }
    } catch (e) {}
    return newState();
  }

  function saveState(s) {
    try {
      if (g.localStorage) g.localStorage.setItem(STORE, JSON.stringify(s));
    } catch (e) {}
  }

  function newState() {
    return {
      page: "candle",
      flags: blankFlags(),
      seen: ["candle"],
      cycles: 0
    };
  }

  function remember(s, id) {
    if (s.seen.indexOf(id) === -1) s.seen = s.seen.concat([id]);
  }

  function go(s, id) {
    if (!BY_ID[id]) return s;
    var next = {
      page: id,
      flags: s.flags || blankFlags(),
      seen: (s.seen || []).slice(),
      cycles: s.cycles || 0
    };
    remember(next, id);
    saveState(next);
    return next;
  }

  function choose(s, choice) {
    if (!choice) return s;
    var next = {
      page: s.page,
      flags: {},
      seen: (s.seen || []).slice(),
      cycles: s.cycles || 0
    };
    var k;
    for (k in s.flags) {
      if (Object.prototype.hasOwnProperty.call(s.flags, k)) next.flags[k] = s.flags[k];
    }
    if (choice.flag) next.flags[choice.flag] = true;
    if (choice.again) {
      next.cycles = (next.cycles || 0) + 1;
      next.page = "candle";
      remember(next, "candle");
      saveState(next);
      return next;
    }
    if (choice.to) return go(next, choice.to);
    saveState(next);
    return next;
  }

  function tellerFor(page, s) {
    var flags = (s && s.flags) || {};
    var cycles = (s && s.cycles) || 0;
    if (page.id === "candle" && cycles > 0) {
      return "You came back. The candle is the same. I am not. I remember what you did with the bag and the bottle. Sit. We start from the tent anyway.";
    }
    if (page.id === "market" && flags.hoardedBag) {
      return "You kept the bag. The clerk watched you leave. The stall still has a name. Sit with the cook, or side with the man in the nice coat. I already know which kind of hunger you showed.";
    }
    if (page.id === "market" && flags.sharedBag) {
      return "You shared the bag. Good. A man here offered to buy the recipe and not the cook. She kept the name of the bun. Sit with her, or side with him.";
    }
    if (page.id === "diner" && flags.sidedScout) {
      return "You stood with the buyer. The bun still has her name. Water first, names later. One basket. Pass the red bottle, or keep it.";
    }
    if (page.id === "wreck" && flags.keptKetchup) {
      return "You kept the bottle at the diner. The van stalled, then started. Rye is here with bread anyway. The house is down. Dinner is not.";
    }
    if (page.id === "end" && flags.sharedBag && flags.passedKetchup) {
      return "You sat. You also shared when it cost you. That is not a prophecy. That is a person. The planet does not end. I will tell it again if you want.";
    }
    return page.teller;
  }

  function scene(s) {
    var page = BY_ID[s.page] || PAGES[0];
    var idx = 0;
    var j;
    for (j = 0; j < PAGES.length; j++) {
      if (PAGES[j].id === page.id) idx = j;
    }
    return {
      id: page.id,
      n: page.n,
      total: PAGES.length,
      index: idx,
      title: page.title,
      art: page.art,
      alt: page.alt || "",
      caption: page.caption || "",
      teller: tellerFor(page, s),
      ending: !!page.ending,
      next: page.next || null,
      choices: page.choices || null,
      canBack: idx > 0,
      cycles: s.cycles || 0,
      flags: s.flags || {},
      seen: s.seen || []
    };
  }

  function resetAll() {
    try {
      if (g.localStorage) g.localStorage.removeItem(STORE);
    } catch (e) {}
    var s = newState();
    saveState(s);
    return s;
  }

  g.WIDERNOVEL = {
    STORE: STORE,
    PAGES: PAGES,
    newState: newState,
    loadState: loadState,
    saveState: saveState,
    go: go,
    choose: choose,
    scene: scene,
    resetAll: resetAll,
    tellerFor: tellerFor
  };
})(typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : this);
