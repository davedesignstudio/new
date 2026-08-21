#!/usr/bin/env node
/* Road-Wisdom loop tests. Node 8 compatible. */
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
    },
    _data: data
  };
}

var store = makeStore();
var sandbox = {
  localStorage: store,
  Math: Math,
  JSON: JSON,
  console: console
};
sandbox.window = sandbox;
sandbox.global = sandbox;

var corePath = path.join(__dirname, "..", "src", "js", "road-core.js");
vm.runInNewContext(fs.readFileSync(corePath, "utf8"), sandbox);
var R = sandbox.ROADCORE;
assert.ok(R, "ROADCORE missing");

function walkToFortune(s) {
  var guard = 0;
  if (s.screen === "title") s = R.act(s, "begin");
  if (s.screen === "travel") {
    var dirs = R.scene(s).choices;
    s = R.act(s, dirs[0].id);
  }
  while (s.screen === "meet" && guard < 12) {
    var ch = R.scene(s).choices[0];
    s = R.act(s, ch.id);
    guard += 1;
  }
  if (s.screen === "discover") s = R.act(s, "to-reader");
  if (s.screen === "reader") s = R.act(s, "draw");
  if (s.screen === "spread") s = R.act(s, "read");
  return s;
}

check("STORE key", function () {
  assert.equal(R.STORE, "wider.roadwisdom.v1");
});

check("TABLE is a card", function () {
  assert.ok(R.CARDS.indexOf("TABLE") !== -1);
});

check("no GAME OVER", function () {
  assert.equal(R.isOver(), false);
  var s = walkToFortune(R.resetAll());
  assert.equal(R.isOver(), false);
  assert.equal(s.screen, "fortune");
  var labels = R.scene(s).choices.map(function (c) {
    return c.label;
  }).join(" | ");
  assert.ok(/walk again/i.test(labels), labels);
  assert.ok(!/game over/i.test(labels));
});

check("title → travel → meet → discover → reader → spread → fortune → again", function () {
  var s = R.resetAll();
  assert.equal(s.screen, "title");
  assert.equal(R.scene(s).lines[0], "ROAD-WISDOM");
  s = R.act(s, "begin");
  assert.equal(s.screen, "travel");
  s = R.act(s, R.scene(s).choices[0].id);
  assert.equal(s.screen, "meet");
  var n = s.encounters.length;
  var i;
  for (i = 0; i < n; i++) {
    s = R.act(s, R.scene(s).choices[0].id);
  }
  assert.equal(s.screen, "discover");
  s = R.act(s, "to-reader");
  assert.equal(s.screen, "reader");
  s = R.act(s, "draw");
  assert.equal(s.screen, "spread");
  assert.equal(s.spread.cards.length, 5);
  s = R.act(s, "read");
  assert.equal(s.screen, "fortune");
  assert.equal(s.mem.cycles, 1);
  s = R.act(s, "again");
  assert.equal(s.screen, "travel");
  assert.equal(s.mem.cycles, 1);
});

check("cloneBeat does not stamp shared QUESTIONS", function () {
  var s = R.resetAll();
  s = R.act(s, "begin");
  R.scene(s);
  var i;
  for (i = 0; i < R.QUESTIONS.length; i++) {
    assert.ok(!R.QUESTIONS[i].artUrl, "QUESTIONS[" + i + "] gained artUrl");
  }
  var beat = R.cloneBeat(R.QUESTIONS[0]);
  beat.artUrl = "/img/road/kong.jpg";
  assert.ok(!R.QUESTIONS[0].artUrl);
});

check("ignored child returns as mill memory", function () {
  var mem = R.loadMem();
  mem.flags.ignoredChild = true;
  mem.cycles = 2;
  mem.flags.helpedChild = false;
  mem.flags.helpedMother = false;
  var s = R.newRun(mem);
  assert.equal(s.stranger.id, "child");
  var q = s.encounters[s.encounters.length - 1].q;
  assert.ok(/child|mill|Mother/i.test(q), q);
});

check("princess easter egg", function () {
  var s = R.meetPrincess(R.resetAll());
  assert.equal(s.stranger.id, "princess");
  assert.equal(s.screen, "meet");
  var sc = R.scene(s);
  assert.ok(/kong|princess/.test(sc.artUrl), sc.artUrl);
  assert.ok(/Vasilisa|girder|princess|ape/i.test(sc.lines.join(" ")));
});

check("last reading cards spawn the next mile", function () {
  var mem = R.loadMem();
  mem.lastCards = ["BRIDGE", "DOG", "MOON"];
  var s = R.newRun(mem);
  assert.equal(s.encounters[0].spawned, true);
  assert.equal(s.encounters[0].card, "BRIDGE");
  assert.ok(s.encounters[0].artUrl);
});

check("pair lines cover TABLE and SNAKE", function () {
  assert.ok(/place-setting|fortress|table/i.test(R.pairLine("TABLE", "HOUSE")));
  assert.ok(/dust|path/i.test(R.pairLine("SNAKE", "ROAD")));
  assert.ok(/glancing toward|turns toward/i.test(R.pairLine("CROW", "HORSE")));
});

check("persistence uses STORE", function () {
  store.removeItem(R.STORE);
  var s = R.resetAll();
  s = walkToFortune(s);
  assert.equal(s.mem.cycles, 1);
  assert.ok(store.getItem(R.STORE));
  var parsed = JSON.parse(store.getItem(R.STORE));
  assert.equal(parsed.cycles, 1);
  var s2 = R.newState();
  assert.equal(s2.mem.cycles, 1);
});

check("art pool shuffles across runs", function () {
  var seen = {};
  var s = R.resetAll();
  var i;
  for (i = 0; i < 28; i++) {
    s = R.newRun(s.mem);
    seen[s.runArt] = true;
  }
  assert.ok(Object.keys(seen).length >= 4, "only " + Object.keys(seen).join(", "));
});

check("six kitchen strangers exist", function () {
  var ids = R.STRANGERS.map(function (x) {
    return x.id;
  });
  ["clerk", "auntie", "diner", "mascot", "canteen", "star"].forEach(function (id) {
    assert.ok(ids.indexOf(id) !== -1, "missing " + id);
  });
});

check("kitchen stranger questions resolve", function () {
  var mem = R.loadMem();
  var map = {
    clerk: "Share",
    auntie: "WRAP",
    diner: "red bottle",
    mascot: "franchise",
    canteen: "stew",
    star: "slider"
  };
  Object.keys(map).forEach(function (id) {
    var q = R.questionForStranger({ id: id }, mem);
    assert.ok(q && q.q, id + " missing question");
    assert.ok(q.q.toLowerCase().indexOf(map[id].toLowerCase()) !== -1, id + " → " + q.q);
  });
});

if (fails) {
  console.log("\n" + fails + " failed");
  process.exit(1);
}
console.log("\nall road tests passed");
