(function (g) {
  var STORE = "wider.paperback.v1";

  var BOOK = {
    1: {
      title: "The couch",
      art: "/img/tower/ch1.jpg",
      text: [
        "It is 11:40 at night and the three of you have achieved a state of hunger normally reserved for sieges.",
        "Bodie is already holding the keys. Klax is already holding a laminated sheet that says DO NOT DRIVE AT NIGHT. Grub is already in the van, which is cheating.",
        "VANESSA turns over on the third try, the way she always does, and says nothing about it."
      ],
      choices: [
        { label: "Drive to the mini-mart", to: 14 },
        { label: "Listen to Klax read the advisory first", to: 23 },
        { label: "Ask the old woman at the crossroads", to: 7 }
      ]
    },

    7: {
      title: "The tent at the crossroads",
      art: "/img/road/paper.jpg",
      text: [
        "There is a tent where no tent was. One candle, one deck, one old woman who does not look up.",
        "“You are hungry,” Zorya says. “That is not a prophecy. That is a smell.”",
        "She turns one card face-down and leaves it there."
      ],
      choices: [
        { label: "Ask what the card is", to: 31 },
        { label: "Ask for directions to food", to: 14 },
        { label: "Apologize and back out of the tent", to: 23 }
      ]
    },

    31: {
      title: "The face-down card",
      art: "/img/road/paper.jpg",
      gain: "Zorya's warning",
      text: [
        "“I could turn it,” she says. “Then you would spend the night obeying it. No. You take the road, I keep the card, we compare notes.”",
        "She writes something on a napkin and folds it into your hand. It says: THE MONSTER IS HOLDING A PAN.",
        "You are still hungry. That part was never in question."
      ],
      choices: [{ label: "Get in the van", to: 14 }]
    },

    23: {
      title: "Klax reads the whole advisory",
      text: [
        "There are eleven bullet points. Bodie air-guitars through four of them. Grub falls asleep on point six and wakes at the word snack in point nine.",
        "By the end everyone is hungrier and slightly better informed, which is the exact shape of most planning."
      ],
      choices: [
        { label: "Fine. Mini-mart.", to: 14 },
        { label: "Skip ahead — the night market", to: 42 }
      ]
    },

    14: {
      title: "The mini-mart is haunted",
      art: "/img/tower/ch2.jpg",
      text: [
        "The lights buzz in a pattern that feels like breathing. Somewhere in aisle three, something moans.",
        "On the counter: one bag of chili-lime crisps. The last one. It is glowing, but that is just the cooler.",
        "The moan happens again. It is coming from behind the register."
      ],
      choices: [
        { label: "Grab the bag and run", to: 55 },
        { label: "Look behind the register", to: 19 },
        { label: "Send Grub in first", to: 27 }
      ]
    },

    27: {
      title: "Grub goes first",
      text: [
        "Grub, who has no plan and therefore no fear, trots behind the register and does the only thing he knows: he chews.",
        "What he chews is a bedsheet. Under the bedsheet is a night clerk, nineteen, exhausted, holding a pan."
      ],
      choices: [{ label: "Well. Now what.", to: 19 }]
    },

    19: {
      title: "The clerk with the pan",
      art: "/img/road/bville.jpg",
      text: [
        "“I'm not haunting anything,” she says. “A guy came by Tuesday and offered to buy the recipe for the crisps. Not the crisps. The recipe. He said he'd 'scale the flavor profile.'”",
        "“So I started moaning at customers. It's been extremely effective and I hate it.”",
        "She is still holding the pan. The napkin in your pocket suddenly has weight."
      ],
      choices: [
        { label: "Buy the bag and ask her name", to: 63, gain: "Her name: Marisol" },
        { label: "Buy the bag and go", to: 55 },
        { label: "Offer to split it with her", to: 63, gain: "Her name: Marisol" }
      ]
    },

    63: {
      title: "You ask her name",
      art: "/img/road/bville.jpg",
      gain: "Grub Gem",
      text: [
        "Marisol. Her grandmother's chili, her cousin's lime, her own bad idea to add smoked salt at 2 a.m. during a slow shift.",
        "She writes it on the receipt like it costs her nothing, which it does not, which is the entire point.",
        "She also gives Grub a coin of fried dough from a box under the counter. He becomes, briefly, brave."
      ],
      choices: [
        { label: "Night market next", to: 42 },
        { label: "Ask what the scout looked like", to: 71 }
      ]
    },

    71: {
      title: "What the scout looked like",
      gain: "The scout's card",
      text: [
        "“Nice coat. Very calm. He kept calling the store 'the concept.'”",
        "She hands you a business card. It is heavy stock and says nothing except a phone number and the word GROWTH."
      ],
      choices: [{ label: "Pocket it. Drive.", to: 42 }]
    },

    55: {
      title: "You take the bag and go",
      text: [
        "The crisps are excellent. Nobody says much for four miles.",
        "Klax finally says, “Did we pay?” and Bodie says “Dude,” in the tone that means no, and VANESSA's dashboard does something disapproving in dot-matrix.",
        "The napkin in your pocket is still folded. You have not read it."
      ],
      hides: "CREDIT",
      choices: [
        { label: "Turn around", to: 19 },
        { label: "Keep driving to the night market", to: 42 }
      ]
    },

    42: {
      title: "Dustport night market",
      art: "/img/road/cafe.jpg",
      text: [
        "Steam everywhere. Kites over the stalls. Forty griddles going at once and every one of them louder than the prophecy.",
        "One stall has no line and a sign that says CLOSED — HAUNTED. Behind it, someone is very much cooking.",
        "Prophet Gary materializes in a booth of light and begins, “BEHOLD, THE CHOSEN—” and a woman with a ladle tells him he is blocking the queue."
      ],
      choices: [
        { label: "Approach the haunted stall", to: 38 },
        { label: "Eat somewhere with a line", to: 66 },
        { label: "Let Gary finish his sentence", to: 84 }
      ]
    },

    84: {
      title: "Gary finishes his sentence",
      text: [
        "“—TWO, WHO SHALL ALIGN THE GALAXIES BY AN ACT OF EXCELLENT FRIENDSHIP.”",
        "There is a pause. Grub burps.",
        "“There are three of us,” says Klax. Gary consults a scroll, goes pale, and says, “The hound is not in the document.”",
        "“The hound,” says Zorya from a booth that was not there, “is in the booth.”"
      ],
      choices: [
        { label: "Approach the haunted stall", to: 38 },
        { label: "Buy Gary a plate", to: 91 }
      ]
    },

    91: {
      title: "You buy the prophet dinner",
      gain: "Gary, quieter",
      text: [
        "He does not know what to do with a plate. Heralds are given tribute, not dinner.",
        "He eats standing up, then sits down, which for Gary is a conversion experience.",
        "“I may have been given the wrong document,” he says, to nobody."
      ],
      choices: [{ label: "The haunted stall", to: 38 }]
    },

    66: {
      title: "You eat somewhere with a line",
      text: [
        "It is good. It is fine. It is food that has been optimized by many previous customers, and it tastes exactly like that.",
        "Across the way, the haunted stall keeps cooking for nobody. The smell coming off it is not fine. It is specific."
      ],
      hides: "THE LIST",
      choices: [
        { label: "Go over there", to: 38 },
        { label: "Stay in the safe line", to: 74 }
      ]
    },

    74: {
      title: "The safe line, all night",
      text: [
        "You eat well and you eat twice and you learn nothing.",
        "In the morning the haunted stall is gone. Not closed. Gone, the way a rumor goes when it stops being repeated.",
        "Klax says, “We could have just walked over.” Nobody argues. That is the worst part."
      ],
      ending: "THE STALL YOU DID NOT VISIT",
      hides: "THE LIST",
      text2: [
        "Zorya closes the book and immediately opens it again, because Earth does not end and neither does this.",
        "“You are not being punished,” she says. “You are being told. There is a difference and it is the whole road.”"
      ],
      choices: [
        { label: "Open the book again", to: 1 },
        { label: "Go back to the market", to: 42 }
      ]
    },

    38: {
      title: "The auntie is the ghost",
      art: "/img/road/bville-2.jpg",
      text: [
        "She is not hiding. She is prepping. The CLOSED sign is because a man in a nice coat came Tuesday and offered to buy her bun and rename it.",
        "“He wanted to call it the Boom Boom,” she says. “It has a name. It has had a name for forty years.”",
        "She keeps working while she talks. The bun goes on the griddle. It smells like an argument you are losing."
      ],
      choices: [
        { label: "Ask the bun's name", to: 47, gain: "The bun's real name" },
        { label: "Ask how much the scout offered", to: 58 },
        { label: "Just order one", to: 47, gain: "The bun's real name" }
      ]
    },

    58: {
      title: "You ask about the money",
      text: [
        "It was a lot. Genuinely, seriously a lot, and she says the number without embarrassment.",
        "“I am not a saint,” she says. “I am a person with a lease. But he did not want me. He wanted the thing I do, without me attached to it, forever.”",
        "She flips the bun. “That is not a sale. That is a haunting.”"
      ],
      choices: [{ label: "Order one anyway", to: 47, gain: "The bun's real name" }]
    },

    47: {
      title: "You eat the bun",
      art: "/img/road/bville-2.jpg",
      gain: "Auntie's blessing",
      text: [
        "It is the best thing any of you have eaten and it is not close.",
        "Bodie stops talking for a full ninety seconds, which Klax later describes as the most frightening event of the trip.",
        "She tells you the name. You will not be renaming it. She sends you off with a jar of something red and unlabeled."
      ],
      choices: [
        { label: "Drive on to the diner", to: 52 },
        { label: "Ask about the man in the coat", to: 71 }
      ]
    },

    52: {
      title: "The silent corridor diner",
      art: "/img/road/coffee.jpg",
      text: [
        "No music. No beacons. Six booths and one waitress who communicates entirely through eyebrow.",
        "There is one basket of onion rings. There are three of you. The check has already been placed face-down, which is somehow menacing.",
        "Etched into the table, old and deep, someone has written: PASS WHAT IS RED."
      ],
      choices: [
        { label: "Pass the jar", to: 61, need: "Auntie's blessing", fail: 49 },
        { label: "Split the basket three ways", to: 61 },
        { label: "Ask the price first", to: 49 }
      ]
    },

    49: {
      title: "The quarrel",
      text: [
        "Klax reads the check. Bodie says the check is a construct. Grub goes under the booth, which is his position on most things.",
        "It escalates the way it always does — not about rings, about whether anyone is ever going to admit that the other one was right about something.",
        "Outside, VANESSA does not start. Not won't. Does not."
      ],
      hides: "THE DEBT",
      choices: [
        { label: "Bodie says it out loud", to: 61 },
        { label: "Order a second basket and say nothing", to: 78 }
      ]
    },

    78: {
      title: "A second basket, in silence",
      text: [
        "You eat it. It is fine. Everyone is full and nobody is fed, which is a distinction this road takes seriously.",
        "VANESSA starts on the eleventh try, out of pity."
      ],
      hides: "THE DEBT",
      choices: [{ label: "Drive to the food court", to: 30 }]
    },

    61: {
      title: "The basket splits",
      art: "/img/road/coffee-cup.jpg",
      gain: "Ketchup",
      text: [
        "Bodie says, “Your route was right, man. Both times.” He says it fast, to the table, like ripping off a bandage.",
        "Klax says, “I know,” and then, worse, “thank you,” and then they both look at the rings very hard.",
        "The waitress raises one eyebrow. The check turns out to be less than the number on it. VANESSA starts on the first try, which she has never once done."
      ],
      choices: [{ label: "Carnival orbit food court", to: 30 }]
    },

    30: {
      title: "Carnival orbit food court",
      art: "/img/tower/ch3.jpg",
      text: [
        "Twelve stalls, all miracle sauces, all almost working. A mascot the size of a refrigerator waves at children with visible contempt.",
        "The mascot's head is a rubber head. The mascot's coat is very nice.",
        "It sees the jar in your hands and stops waving."
      ],
      choices: [
        { label: "Confront the mascot", to: 44 },
        { label: "Let Grub chew the head off", to: 44, need: "Grub Gem", fail: 36 },
        { label: "Take the meeting", to: 36 }
      ]
    },

    36: {
      title: "The scout takes the meeting",
      art: "/img/tower/ch3.jpg",
      text: [
        "He removes the head himself, which is worse than being unmasked. Underneath is a pleasant man with a folder.",
        "“I'm not the villain here,” he says, and he genuinely believes it. “I'm distribution. Do you know how many people will never taste that bun because it exists in one place?”",
        "It is the best argument anyone has made all night. That is why it is dangerous."
      ],
      choices: [
        { label: "“Then hire her.”", to: 25 },
        { label: "Take the deal for her", to: 87 },
        { label: "Ask what happens to her name", to: 44 }
      ]
    },

    25: {
      title: "“Then hire her.”",
      art: "/img/road/cafe.jpg",
      text: [
        "The scout blinks. It is not in the folder. The folder has a column for asset and a column for cost and no column for the woman.",
        "“That's more expensive,” he says, and you say yes, and he says, “Considerably,” and you say yes again, and something in the food court changes temperature.",
        "He writes a different number on a napkin. It is smaller. It has her name on it, spelled correctly, which he had to ask about."
      ],
      ending: "THE HIRE",
      text2: [
        "It is not a triumph. She still has a lease and he still has a folder and the bun will still travel further than she will.",
        "But the name goes with it, and the name is a rope, and a rope can be pulled from either end.",
        "“Adequate,” says Zorya, which from her is a standing ovation. She deals again, because Earth does not end."
      ],
      choices: [
        { label: "Keep driving — Widow's Spur", to: 22 },
        { label: "Open the book again", to: 1 }
      ]
    },

    87: {
      title: "You take the deal on her behalf",
      art: "/img/tower/ch3.jpg",
      text: [
        "You sign a thing you are not qualified to sign. The number is enormous and none of it is yours and it feels, briefly, like heroism.",
        "Six months later the bun is everywhere. It is fine. It is optimized. It is called the Boom Boom.",
        "The stall is a location now. She is not in it."
      ],
      ending: "GROWTH",
      hides: "CREDIT",
      text2: [
        "“You fed more people,” Zorya admits, dealing. “That is real. Count it.”",
        "“Now count who cooked.” She turns the card. It is a kitchen with nobody in it.",
        "Earth does not end, so neither does this. The book opens again."
      ],
      choices: [
        { label: "Open the book again", to: 1 },
        { label: "Go back and refuse", to: 36 }
      ]
    },

    44: {
      title: "The head comes off",
      art: "/img/tower/ch3.jpg",
      gain: "Rubber mask",
      text: [
        "Grub gets there first, because of course he does — one dough coin's worth of courage, spent well.",
        "The children cheer. The scout, mid-sentence, becomes a man in a nice coat holding a folder in a food court at one in the morning.",
        "“You would have gotten away with it,” Bodie says, and then can't remember the rest, and Klax finishes it for him."
      ],
      choices: [
        { label: "Widow's Spur", to: 22 },
        { label: "Straight to Castle Nova", to: 99, need: "Auntie's blessing", fail: 22 }
      ]
    },

    22: {
      title: "Widow's Spur canteen",
      art: "/img/road/princess.jpg",
      text: [
        "Radio hymns. Emergency amber lighting. One woman, one pot, a stew everyone in three counties calls cursed.",
        "It is not cursed. It is grief and very good stock, which taste similar from a distance.",
        "She has a key on the counter and she will not use it. Behind her there is a door."
      ],
      choices: [
        { label: "Ask about the door", to: 68 },
        { label: "Take the key", to: 57 },
        { label: "Eat the stew and say nothing", to: 33 }
      ]
    },

    68: {
      title: "You ask the door a question",
      art: "/img/road/philhower.jpg",
      gain: "The door's answer",
      text: [
        "“It's the dining room,” she says. “Twelve chairs. I haven't opened it since he died because twelve is the wrong number now.”",
        "You ask if she wants help setting eleven. She says no. Then she says yes. Then she opens the door herself, which was always going to be the only way it opened.",
        "It smells like dust and lemon oil. It is a good room. It has been a good room this whole time."
      ],
      choices: [
        { label: "Help her set eleven places", to: 12 },
        { label: "Set twelve", to: 12 }
      ]
    },

    12: {
      title: "The eleventh chair",
      art: "/img/road/philhower.jpg",
      text: [
        "You set eleven. Then Bodie, who has never had a tactful thought in his life, sets the twelfth anyway and says, “For the stock.”",
        "She looks at it for a while. Then she puts a bowl in front of it, and serves everyone else, and sits down.",
        "The stew is not cursed. It never was. It is the most cared-for thing in four counties and it has been waiting for a room."
      ],
      ending: "THE ELEVENTH CHAIR",
      text2: [
        "“This is the whole religion,” Zorya says, from the doorway, uninvited and welcome. “One extra place. Not for a ghost. For arithmetic.”",
        "“A table that always has a spare seat cannot quietly become a list.”",
        "She turns a card. It is The Star, and it is just a set table, which it always was."
      ],
      choices: [
        { label: "Castle Nova, at dawn", to: 99 },
        { label: "Open the book again", to: 1 }
      ]
    },

    57: {
      title: "You take the key",
      text: [
        "She lets you. That is the thing about grief — it will hand you the key rather than explain the door.",
        "The lock turns. Behind it: a dining room with twelve chairs and no dust on eleven of them.",
        "You opened someone's door for them. It is not the same as being invited through it."
      ],
      hides: "THE LOCK",
      choices: [
        { label: "Apologize and hand it back", to: 68 },
        { label: "Go in", to: 33 }
      ]
    },

    33: {
      title: "The stew, in silence",
      text: [
        "It is extraordinary. Nobody asks what is in it, which is the correct call.",
        "You leave money on the counter and go. She watches the van pull out with the expression of a person who has been left politely many times.",
        "Klax, four miles later: “We should have asked about the door.”"
      ],
      hides: "THE LOCK",
      choices: [
        { label: "Turn around", to: 22 },
        { label: "Castle Nova", to: 99 }
      ]
    },

    99: {
      title: "Castle Nova",
      art: "/img/tower/ch4.jpg",
      text: [
        "At the edge of the map, where the road stops pretending it goes anywhere else, there is a slider stand with a light on.",
        "It is not a castle. It is a counter, eight stools, and a man who has been waiting up.",
        "There are exactly enough seats. There have always been exactly enough seats. That was the prophecy; Gary just read it in a font that made it sound like war."
      ],
      choices: [
        { label: "Sit", to: 100 },
        { label: "Ask if you're allowed to sit", to: 100 },
        { label: "Drive past it", to: 8 }
      ]
    },

    8: {
      title: "You drive past",
      art: "/img/mars/storm.jpg",
      text: [
        "Nobody says stop. That is the thing about a van at four in the morning — the decision gets made by whoever doesn't speak.",
        "The light gets small in the mirror. Bodie says there'll be another one. There will be. There are thousands.",
        "Klax opens the advisory again, for something to hold."
      ],
      ending: "THE LONG WAY",
      hides: "THE EXIT",
      text2: [
        "“You are very good at going,” Zorya says. “I have said so before. I will say it as long as you keep arriving here to hear it.”",
        "“The stand is open tomorrow. It is open every tomorrow. That is not mercy, it is hours.”",
        "Earth does not end. The book opens again, at the beginning, with the light still on."
      ],
      choices: [
        { label: "Turn around", to: 99 },
        { label: "Open the book again", to: 1 }
      ]
    },

    100: {
      title: "The Star-table",
      art: "/img/tower/ch4.jpg",
      text: [
        "You sit. That is the whole ending. You sit, and somebody who has been cooking all night slides a plate across, and nobody asks what you did to deserve it.",
        "Bodie is crying about a slider and pretending it's the onions. Klax has folded the itinerary into a coaster. Grub is asleep on Gary, who has stopped narrating.",
        "Zorya takes the last stool. She turns the face-down card. It is not a prophecy. It is a receipt with a name on it."
      ],
      ending: "THE SEAT",
      text2: [
        "“You thought you came for the slider,” she says. “You came to find out whether there was a stool.”",
        "“There was. There always was. The trick was walking far enough to sit down.”",
        "The Tower falls somewhere behind you, on schedule, and becomes a table. Earth does not end. Neither does the book."
      ],
      choices: [
        { label: "Open the book again", to: 1 },
        { label: "The hidden parts", href: "/hidden/" }
      ]
    }
  };

  function loadMem() {
    try {
      var raw = g.localStorage && g.localStorage.getItem(STORE);
      if (raw) {
        var m = JSON.parse(raw);
        m.dogEars = m.dogEars || [];
        m.endings = m.endings || [];
        m.readings = m.readings || 0;
        return m;
      }
    } catch (e) {}
    return { dogEars: [], endings: [], readings: 0 };
  }

  function saveMem(m) {
    try {
      if (g.localStorage) g.localStorage.setItem(STORE, JSON.stringify(m));
    } catch (e) {}
  }

  function endingCount() {
    var n = 0;
    var k;
    for (k in BOOK) {
      if (BOOK.hasOwnProperty(k) && BOOK[k].ending) n += 1;
    }
    return n;
  }

  function newState(mem) {
    return {
      at: 1,
      inv: [],
      hides: {},
      path: [],
      mem: mem || loadMem()
    };
  }

  function has(s, item) {
    return s.inv.indexOf(item) !== -1;
  }

  function go(s, to, gain) {
    var node = BOOK[to];
    if (!node) return s;
    s.at = to;
    s.path.push(to);
    if (gain && s.inv.indexOf(gain) === -1) s.inv.push(gain);
    if (node.gain && s.inv.indexOf(node.gain) === -1) s.inv.push(node.gain);
    if (node.hides) s.hides[node.hides] = (s.hides[node.hides] || 0) + 1;
    if (s.mem.dogEars.indexOf(to) === -1) s.mem.dogEars.push(to);
    if (node.ending && s.mem.endings.indexOf(node.ending) === -1) {
      s.mem.endings.push(node.ending);
      s.mem.readings += 1;
    }
    saveMem(s.mem);
    return s;
  }

  function choose(s, choice) {
    if (!choice) return s;
    if (choice.href) return s;
    var to = choice.to;
    if (choice.need && !has(s, choice.need)) to = choice.fail || to;
    return go(s, to, choice.gain);
  }

  function scene(s) {
    var node = BOOK[s.at] || BOOK[1];
    var choices = (node.choices || []).map(function (c, i) {
      var locked = !!(c.need && !has(s, c.need));
      return {
        index: i,
        label: c.label,
        to: c.need && locked ? c.fail || c.to : c.to,
        href: c.href,
        need: c.need,
        locked: locked,
        turn: c.href ? null : c.need && locked ? c.fail || c.to : c.to
      };
    });
    return {
      n: s.at,
      title: node.title,
      art: node.art || "/img/road/paper.jpg",
      text: node.text || [],
      after: node.ending ? node.text2 || [] : [],
      ending: node.ending || null,
      choices: choices,
      inv: s.inv.slice(),
      dogEars: s.mem.dogEars.length,
      sections: Object.keys(BOOK).length,
      endingsFound: s.mem.endings.slice(),
      endingsTotal: endingCount()
    };
  }

  function restart(s) {
    var st = newState(s ? s.mem : loadMem());
    return go(st, 1);
  }

  function resetAll() {
    try {
      if (g.localStorage) g.localStorage.removeItem(STORE);
    } catch (e) {}
    return newState(loadMem());
  }

  g.PAPERBACK = {
    newState: newState,
    scene: scene,
    choose: choose,
    go: go,
    restart: restart,
    resetAll: resetAll,
    loadMem: loadMem,
    BOOK: BOOK
  };
})(typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : this);
