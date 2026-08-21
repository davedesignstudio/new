#!/usr/bin/env node
/* On-the-fly tabletop DM. Node 8 compatible. */
var fs = require("fs");
var path = require("path");
var vm = require("vm");
var assert = require("assert");

var fails = 0;
function check(name, fn) {
  try {
    fn();
    console.log("ok  " + name);
  } catch (err) {
    fails += 1;
    console.log("FAIL  " + name);
    console.log("      " + (err && err.message ? err.message : err));
  }
}

function makeStore() {
  var data = {};
  return {
    getItem: function (k) {
      return Object.prototype.hasOwnProperty.call(data, k) ? data[k] : null;
    },
    setItem: function (k, v) {
      data[k] = String(v);
    },
    removeItem: function (k) {
      delete data[k];
    }
  };
}

function load() {
  var store = makeStore();
  var sandbox = { localStorage: store, Math: Math, JSON: JSON, console: console, Date: Date };
  sandbox.window = sandbox;
  sandbox.global = sandbox;
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, "..", "src", "js", "table.js"), "utf8"), sandbox);
  return { T: sandbox.TABLE, store: store };
}

function blob(lines) {
  return lines
    .map(function (l) {
      return l.text;
    })
    .join(" ");
}

function walk(T, seed, cmds) {
  var s = T.newGame(seed);
  var all = s.log.slice();
  cmds.forEach(function (c) {
    var r = T.act(s, c);
    s = r.state;
    all = all.concat(r.lines);
  });
  return { state: s, lines: all };
}

var env = load();
var T = env.T;
assert.ok(T, "TABLE missing");

check("parse sits, goes, and puts the stone in the pot", function () {
  assert.equal(T.parse("look").verb, "look");
  assert.equal(T.parse("go east").verb, "go");
  assert.equal(T.parse("put the stone in the pot").verb, "use");
  assert.equal(T.parse("I am Moss the cook").verb, "namejob");
  assert.equal(T.parse("set eleven").verb, "sit");
  assert.equal(T.parse("walk again").verb, "again");
});

check("same seed deals the same kitchens", function () {
  var a = T.newGame(4242);
  var b = T.newGame(4242);
  var titlesA = Object.keys(a.rooms)
    .map(function (k) {
      return a.rooms[k].title;
    })
    .sort()
    .join("|");
  var titlesB = Object.keys(b.rooms)
    .map(function (k) {
      return b.rooms[k].title;
    })
    .sort()
    .join("|");
  assert.equal(titlesA, titlesB);
});

check("different seeds deal different nights", function () {
  var a = T.newGame(11);
  var b = T.newGame(99);
  var cooksA = Object.keys(a.rooms)
    .map(function (k) {
      return a.rooms[k].cook && a.rooms[k].cook.name;
    })
    .join("|");
  var cooksB = Object.keys(b.rooms)
    .map(function (k) {
      return b.rooms[k].cook && b.rooms[k].cook.name;
    })
    .join("|");
  var titlesA = Object.keys(a.rooms)
    .map(function (k) {
      return a.rooms[k].kind + ":" + a.rooms[k].title;
    })
    .join("|");
  var titlesB = Object.keys(b.rooms)
    .map(function (k) {
      return b.rooms[k].kind + ":" + b.rooms[k].title;
    })
    .join("|");
  assert.ok(cooksA !== cooksB || titlesA !== titlesB, "nights were identical");
});

check("every night has a tent, a star, a diner, and a canteen", function () {
  var seeds = [1, 7, 21, 100, 777];
  seeds.forEach(function (seed) {
    var s = T.newGame(seed);
    var kinds = Object.keys(s.rooms).map(function (k) {
      return s.rooms[k].kind;
    });
    assert.ok(kinds.indexOf("tent") !== -1, "no tent " + seed);
    assert.ok(kinds.indexOf("star") !== -1, "no star " + seed);
    assert.ok(kinds.indexOf("diner") !== -1, "no diner " + seed);
    assert.ok(kinds.indexOf("canteen") !== -1, "no canteen " + seed);
  });
});

check("a named cook can finish a night by walking east and sitting", function () {
  var s = T.newGame(8);
  s = T.act(s, "I am Moss the cook").state;
  assert.equal(s.mode, "play");
  assert.ok(s.pack.join(" ").indexOf("hearth-stone") !== -1);
  var guard = 0;
  while (s.mode !== "ended" && guard < 20) {
    var r = s.rooms[s.room];
    var east = (r.exits || []).filter(function (e) {
      return e.dir !== "back";
    })[0];
    if (s.room === "star" || (r.tags && r.tags.indexOf("sit") !== -1 && r.kind === "star")) {
      s = T.act(s, "sit").state;
    } else if (east) {
      s = T.act(s, "go " + east.dir).state;
    } else {
      s = T.act(s, "sit").state;
    }
    guard += 1;
  }
  assert.equal(s.mode, "ended", "did not end after " + guard);
  assert.ok(s.ending, "no ending title");
  assert.ok(!/game over/i.test(s.ending));
  var text = (s.endingText || []).join(" ");
  assert.ok(!/game over/i.test(text));
});

check("eating the stone is refused", function () {
  var w = walk(T, 3, ["Moss", "cook", "eat the stone"]);
  assert.ok(/do not eat|snack it|No\./i.test(blob(w.lines)), blob(w.lines));
});

check("attacking the cook is refused", function () {
  var s = T.newGame(4);
  s = T.act(s, "Moss").state;
  s = T.act(s, "cook").state;
  var cook = s.rooms[s.room].cook;
  var r = T.act(s, "attack " + cook.name);
  assert.ok(/not this game/i.test(blob(r.lines)), blob(r.lines));
});

check("putting the stone in the pot is the keystone", function () {
  var s = T.newGame(5);
  s = T.act(s, "Jun the driver").state;
  s = T.act(s, "go east").state;
  var r = T.act(s, "put the stone in the pot");
  s = r.state;
  assert.ok(s.flags.stoneInPot, "stone not in pot");
  assert.ok(/stone is not the soup/i.test(blob(r.lines)), blob(r.lines));
});

check("pass what is red is a real move", function () {
  var s = T.newGame(5);
  s = T.act(s, "Jun the driver").state;
  s = T.act(s, "go east").state;
  var r = T.act(s, "pass what is red");
  var t = blob(r.lines);
  assert.ok(!/Use it how/i.test(t), t);
  assert.ok(r.state.flags.shared || /does not split/i.test(t), t);
});

check("go to the pantry rolls a kitchen on the fly", function () {
  var s = T.newGame(12);
  s = T.act(s, "Kit").state;
  s = T.act(s, "hound").state;
  var before = Object.keys(s.rooms).length;
  var r = T.act(s, "go to the pantry");
  s = r.state;
  assert.ok(s.improvised >= 1, "did not improvise");
  assert.ok(Object.keys(s.rooms).length > before, "no new room");
  assert.ok(/on the fly|Pantry|pantry/i.test(blob(r.lines) + " " + s.rooms[s.room].title), blob(r.lines));
  var onward = (s.rooms[s.room].exits || []).some(function (e) {
    return e.dir !== "back";
  });
  assert.ok(onward, "improvised room should still lead onward");
});

check("two command walks on one seed stay in lockstep", function () {
  var cmds = ["Ren", "reader", "look", "talk", "go east"];
  var a = walk(T, 33, cmds);
  var b = walk(T, 33, cmds);
  assert.equal(a.state.room, b.state.room);
  assert.equal(a.state.rngState, b.state.rngState);
  assert.equal(blob(a.lines), blob(b.lines));
});

check("no GAME OVER ending in twenty rolled nights", function () {
  var i;
  for (i = 1; i <= 20; i++) {
    var s = T.newGame(i * 17);
    s = T.act(s, "help").state;
    var t = ((s.log || [])
      .map(function (l) {
        return l.text;
      })
      .join(" ") +
      " " +
      (s.ending || "")).toUpperCase();
    assert.ok(t.indexOf("GAME OVER") === -1 || /NO GAME OVER/.test(t), t);
  }
});

check("diner look names waters", function () {
  var s = T.newGame(2);
  s = T.act(s, "Bo").state;
  s = T.act(s, "cook").state;
  var dinerId = null;
  Object.keys(s.rooms).forEach(function (k) {
    if (s.rooms[k].kind === "diner") dinerId = k;
  });
  assert.ok(dinerId, "no diner");
  s.room = dinerId;
  var r = T.act(s, "look");
  assert.ok(/waters/i.test(blob(r.lines)), blob(r.lines));
});

if (fails) {
  console.log("\n" + fails + " failed");
  process.exit(1);
}
console.log("\nall table tests passed");
