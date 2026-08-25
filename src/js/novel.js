(function (g) {
  var STORE = "wider.novel.v2";
  var BOX = "Y43T7VQGtOs";

  var PAGES = [
    {
      id: "candle",
      n: 1,
      title: "The tent",
      art: "/img/comic/zorya-this-week.jpg",
      alt: "A tent at a crossroads this week: one candle, a radio, heat lightning, ships waiting far off",
      caption: "Sit down. It is this week.",
      week: "August 2026",
      teller:
        "I am Zorya. I keep a tent at the crossroads. One candle. One deck. A radio that will not shut up.\n\nI do not curse you. If you sit, I will tell you what happened this week, and what has always happened. They are the same story with a new weather report.",
      next: "hunger"
    },
    {
      id: "hunger",
      n: 2,
      title: "Hunger",
      art: "/img/tower/ch1.jpg",
      alt: "A dark kitchen and a road",
      caption: "Who gets to eat.",
      teller:
        "That is the whole plot. Not a speech. Not a flag. A plate.\n\nThis year the count is already huge. Men with clipboards say millions more will join it when the Pacific finishes getting hot. I do not need their paper. I have a clerk hiding a bag. I have a kitchen that closed because the rent ate the week.\n\nA closed hand cannot pass the salt. A house that will not feed a stranger is already ruined.",
      next: "box"
    },
    {
      id: "box",
      n: 3,
      title: "The box",
      art: "/img/comic/zorya-this-week.jpg",
      alt: "The radio and candle in Zorya’s tent while two men argue on a screen",
      caption: "They said the room was lost.",
      week: "This week’s voices",
      video: BOX,
      videoTitle: "Two men on a box: leaders, unrest, the weather",
      teller:
        "Two men on a box this week. One said the people in charge lost the room. One said when money, fear, and manners all go bad at once, unrest is not a rumor. It is the next weather.\n\nThey talked about a war that makes the ships wait. They talked about people walking farther apart. They argued whether you can vote the sky down, or only live with it. One said: adapt. Build the defense. Humans have always done that. The other wanted a plan that locks the weather in a safe.\n\nGary would call that a prophecy. I call it men talking while dinner does not arrive. You can hear them. Then we will go back to the table.",
      choices: [
        { label: "Hear them", to: "ships", flag: "heardBox" },
        { label: "Ask about dinner", to: "ships", flag: "askedDinner" }
      ]
    },
    {
      id: "ships",
      n: 4,
      title: "The ships",
      art: "/img/comic/ships-wait.jpg",
      alt: "Grain ships and tankers waiting at night in a dark strait",
      caption: "Dinner that did not arrive.",
      teller:
        "One strait is a trickle. Another sea is shooting at its own grain. A man on the radio called food collateral. I call it a loaf that sat in a hold.\n\nOil is expensive again. The stuff that makes the field stand up is stuck on a tanker. The men on the box said the war would hit the shops. They were not wrong about the shops.\n\nNobody in my tent started that war. Everybody in my tent still has to eat.",
      next: "heat"
    },
    {
      id: "heat",
      n: 5,
      title: "The heat",
      art: "/img/comic/wheat-heat.jpg",
      alt: "A cracked wheat field under white heat, an empty grain truck on a farm road",
      caption: "The Pacific is running hot.",
      teller:
        "The Pacific is running hot. They have a name for the water. I have a name for the field that did not come up. The Plains had a harvest like this when my grandmother was a girl. Europe’s corn is thin. The river is too low to float the barge.\n\nThe men on the box said you cannot lock the climate in a cupboard. Fine. You also cannot lock the wheat. You can still plant. You can still share what grew.\n\nA fortress that says the weather will obey is the same fortress that locked the recipes.",
      next: "loaf"
    },
    {
      id: "loaf",
      n: 6,
      title: "The bread",
      art: "/img/road/bville.jpg",
      alt: "A kitchen and black bread",
      caption: "A man carried bread to a locked kitchen.",
      teller:
        "The people upstairs had forgotten crust. They laughed. Then they tasted it. They called it a crown, which is the wrong name for bread. The stove left and went to a smaller house. That is how a fortress starts.\n\nI am not lining up countries. I am remembering a table. Wheat can wait in a ship and still be this story.",
      next: "stone"
    },
    {
      id: "stone",
      n: 7,
      title: "The stone",
      art: "/img/road/coffee.jpg",
      alt: "A cup and a stone on a table",
      caption: "You do not eat this.",
      teller:
        "Hungry people boiled a stone and said the soup was almost ready. The village put in carrots. Then they took the stone out. The stone was never food. It was there so people would remember they had food.\n\nThat is the keystone. Not a chosen person. A stone you do not eat. Fertilizer on a tanker is not soup either. The soup is what the village still puts in.",
      next: "fall"
    },
    {
      id: "fall",
      n: 8,
      title: "The kitchen that fell",
      art: "/img/comic/closed-kitchen.jpg",
      alt: "A dark neighborhood restaurant at night, chairs stacked, a person in a yellow coat walking past with bread",
      caption: "You do not need lightning for a house to come down.",
      teller:
        "There was a kitchen on a cliff that locked the recipes. Hunger came like weather, then like a body made of locked doors. The house fell because it would not share.\n\nThis week the fall also looks like a corner place. Rent ate the week. The landlord wanted ten years. The cook went home with a box of spoons. A family that used to sit there now eats standing up.\n\nSame card. The Tower. I will not dress it up.",
      next: "rye"
    },
    {
      id: "rye",
      n: 9,
      title: "Rye",
      art: "/img/comic/rye-bounce.jpg",
      alt: "A woman in a yellow coat jumping between fire escapes with bread and coffee",
      caption: "She brought bread. She did not punch the storm.",
      teller:
        "Her name is Rye. Yellow coat. Black loaf. Coffee that did not spill. Gary will try to say she is chosen. She is not. She is a guest. She points at an empty chair and sits. That is all.\n\nThe men on the box wanted a plan for the species. She wanted a place to put the loaf down.",
      next: "van"
    },
    {
      id: "van",
      n: 10,
      title: "The van",
      art: "/img/tower/ch2.jpg",
      alt: "Night road and a camper",
      caption: "Fuel is high. They drive anyway.",
      teller:
        "Bodie drives. Klax reads a list. Grub is the dog. VANESSA is the van, and she talks. They think they are going to a famous sandwich. They are guests.\n\nThe van starts on the third try. Gas costs what it costs this week. That is not a quest. That is a gauge.",
      next: "clerk"
    },
    {
      id: "clerk",
      n: 11,
      title: "The last bag",
      art: "/img/road/scan-a.png",
      alt: "A night kitchen counter",
      caption: "The truck is late. She hides the last bag.",
      teller:
        "She is not a ghost. She is tired. The truck did not come because the ships did not move. She is keeping food for morning.\n\nShare it, or keep it. I will remember which. The men on the box called this unrest. I call it a bag.",
      choices: [
        { label: "Share the bag", to: "market", flag: "sharedBag" },
        { label: "Keep the bag", to: "market", flag: "hoardedBag" }
      ]
    },
    {
      id: "market",
      n: 12,
      title: "The stall",
      art: "/img/road/bville-2.jpg",
      alt: "A night market stall",
      caption: "A man offered to buy the recipe, not the cook.",
      teller:
        "She kept the name of the bun. Forty years of a stall is a history. A menu that deletes the cook is also a history.\n\nSit with her, or side with the man in the nice coat. The coat has a plan for every kitchen on the block. The plan does not include her.",
      choices: [
        { label: "Sit with her", to: "diner", flag: "satAuntie" },
        { label: "Side with the buyer", to: "diner", flag: "sidedScout" }
      ]
    },
    {
      id: "diner",
      n: 13,
      title: "The diner",
      art: "/img/road/cafe.jpg",
      alt: "A quiet diner booth",
      caption: "Water first. Names later.",
      teller:
        "One basket. Three hungry people. Families down the street are eating at home because sitting here became a luxury.\n\nPass the red bottle, or do not. If you do not share, the van may not start. That is not magic. That is how a house works. The box called it separation. It is a bottle.",
      choices: [
        { label: "Pass the bottle", to: "mask", flag: "passedKetchup" },
        { label: "Keep the bottle", to: "mask", flag: "keptKetchup" }
      ]
    },
    {
      id: "mask",
      n: 14,
      title: "The rubber head",
      art: "/img/road/kong.jpg",
      alt: "A mascot head in a food court",
      caption: "The head comes off.",
      teller:
        "Under the mask is a person who wanted the bun without the woman. The bright strip still has lights. The corner kitchen is dark.\n\nGrub bites the rubber. The cook is still the cook. We do not need a long speech here.",
      next: "widow"
    },
    {
      id: "widow",
      n: 15,
      title: "The extra chair",
      art: "/img/road/philhower.jpg",
      alt: "A canteen table with one spare seat",
      caption: "She fed people through every storm. Now the bill is the storm.",
      teller:
        "The stew is not cursed. It is grief and good stock. A kitchen that kept the lights on through hurricanes is allowed to be tired when chicken costs more and the room is empty.\n\nShe sets eleven places. Someone sets twelve. Leave the chair. Eat. A table that keeps one extra seat cannot quietly become a list.",
      next: "storm"
    },
    {
      id: "storm",
      n: 16,
      title: "The storm",
      art: "/img/tower/ch3.jpg",
      alt: "A cliff kitchen in lightning",
      caption: "The locked kitchen meets the weather.",
      teller:
        "You can help cook in the rain, or you can try to save the recipe from the safe. Both can feed people. Neither will put the walls back up. The walls were the problem.\n\nThe men on the box argued this. Lock the sky. Or live with it and build a defense. I have only seen one thing work: cook while it is wet. The safe does not feed the street.",
      choices: [
        { label: "Cook in the rain", to: "wreck", flag: "cookedRain" },
        { label: "Open the safe for the light", to: "wreck", flag: "openedSafe" }
      ]
    },
    {
      id: "wreck",
      n: 17,
      title: "After",
      art: "/img/comic/rye-star.jpg",
      alt: "A woman sitting at a table in a ruined room, passing bread",
      caption: "The house is down. Dinner is not.",
      teller:
        "Rye is already there with bread. Gary starts a sentence about destiny. She slides him the bottle.\n\nEvery night a kitchen like this may fall. Every night dinner can start again. I have watched this more than once. Unrest is a loud word for a quiet table if enough people sit.",
      next: "nova"
    },
    {
      id: "nova",
      n: 18,
      title: "The stand",
      art: "/img/tower/ch4.jpg",
      alt: "A small stand with a light on and enough seats",
      caption: "He pours coffee before he asks who you are.",
      teller:
        "It is not a castle. It is a counter and a man who stayed up. There are enough seats. There were always enough seats.\n\nGary read that in a loud voice and made it sound like a war. The box made it sound like a war. It was never a war. It was a plate.",
      next: "end"
    },
    {
      id: "end",
      n: 19,
      title: "You sit",
      art: "/img/tower/ch4.jpg",
      alt: "A set table",
      caption: "Nobody asks what you did to deserve it.",
      teller:
        "That is the ending. You sit. Someone who has been cooking all night gives you a plate. The planet does not end. The ships may still wait. The field may still be thin. The box may still shout.\n\nIf you want the same story in another room, the doors are still open. If you want to hear it again, I will light the candle.",
      ending: true,
      choices: [
        { label: "Hear it again", to: "candle", again: true },
        { label: "Hear the box again", href: "https://www.youtube.com/watch?v=Y43T7VQGtOs" },
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
      return "You came back. The candle is the same. I am not. I remember what you did with the bag and the bottle. The box is still talking. Sit. We start from the tent anyway.";
    }
    if (page.id === "ships" && flags.heardBox) {
      return "You heard them. Fine. One strait is a trickle. Another sea is shooting at its own grain. They called food collateral. I call it a loaf that sat in a hold. Oil is expensive. The field-food is stuck on a tanker. Nobody in my tent started that war. Everybody in my tent still has to eat.";
    }
    if (page.id === "ships" && flags.askedDinner) {
      return "You wanted dinner, not the argument. Good. Dinner is still waiting in a ship. One strait is a trickle. Another sea is shooting at its own grain. A man on the radio called food collateral. I call it a loaf that sat in a hold.";
    }
    if (page.id === "market" && flags.hoardedBag) {
      return "You kept the bag. The clerk watched you leave. The stall still has a name. Sit with the cook, or side with the man in the nice coat. I already know which kind of hunger you showed.";
    }
    if (page.id === "market" && flags.sharedBag) {
      return "You shared the bag. Good. A man here offered to buy the recipe and not the cook. She kept the name of the bun. Sit with her, or side with him.";
    }
    if (page.id === "diner" && flags.sidedScout) {
      return "You stood with the buyer. The bun still has her name. Water first, names later. One basket. Families down the street are eating at home. Pass the red bottle, or keep it.";
    }
    if (page.id === "wreck" && flags.keptKetchup) {
      return "You kept the bottle at the diner. The van stalled, then started. Rye is here with bread anyway. The house is down. Dinner is not.";
    }
    if (page.id === "wreck" && flags.cookedRain) {
      return "You cooked in the rain. The safe stayed shut. Rye is already there with bread. Gary starts a sentence. She slides him the bottle. The house is down. Dinner is not.";
    }
    if (page.id === "end" && flags.sharedBag && flags.passedKetchup) {
      return "You sat. You also shared when it cost you. That is not a prophecy. That is a person. The planet does not end. The box can shout. I will tell it again if you want.";
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
      week: page.week || "",
      video: page.video || "",
      videoTitle: page.videoTitle || "",
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
    BOX: BOX,
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
