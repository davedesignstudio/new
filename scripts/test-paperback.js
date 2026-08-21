#!/usr/bin/env node
/* Paperback CYOA integrity. Node 8 compatible. */
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

var store = makeStore();
var sandbox = { localStorage: store, Math: Math, JSON: JSON, console: console };
sandbox.window = sandbox;
sandbox.global = sandbox;
vm.runInNewContext(fs.readFileSync(path.join(__dirname, "..", "src", "js", "paperback.js"), "utf8"), sandbox);
var P = sandbox.PAPERBACK;
assert.ok(P, "PAPERBACK missing");

check("fifty-two numbered sections", function () {
  var keys = Object.keys(P.BOOK);
  assert.equal(keys.length, 52, "got " + keys.length);
});

check("every turn lands on a real section", function () {
  var missing = [];
  Object.keys(P.BOOK).forEach(function (k) {
    var node = P.BOOK[k];
    (node.choices || []).forEach(function (c) {
      if (c.href) return;
      ["to", "fail"].forEach(function (field) {
        if (c[field] && !P.BOOK[c[field]]) missing.push(k + " → " + field + " " + c[field]);
      });
    });
  });
  assert.deepEqual(missing, []);
});

check("nine named endings and none are GAME OVER", function () {
  var ends = [];
  Object.keys(P.BOOK).forEach(function (k) {
    if (P.BOOK[k].ending) ends.push(P.BOOK[k].ending);
  });
  assert.equal(ends.length, 9, ends.join(", "));
  ends.forEach(function (e) {
    assert.ok(!/game over/i.test(e), e);
  });
});

check("a first-choice walk reaches an ending", function () {
  var s = P.resetAll();
  s = P.go(s, 1);
  var guard = 0;
  var last = 0;
  while (guard < 40) {
    var sc = P.scene(s);
    if (sc.ending) {
      assert.ok(sc.ending);
      assert.ok(sc.hidden && sc.hidden.title, "ending should name a hidden part");
      return;
    }
    var choice = P.BOOK[s.at].choices[0];
    assert.ok(choice, "stuck at " + s.at);
    last = s.at;
    s = P.choose(s, choice);
    guard += 1;
    assert.notEqual(s.at, last, "choice did not move from " + last);
  }
  throw new Error("no ending after 40 turns");
});

check("STORE key", function () {
  var s = P.resetAll();
  s = P.go(s, 1);
  s = P.choose(s, P.BOOK[1].choices[0]);
  assert.ok(store.getItem("wider.paperback.v1"));
});

check("the old part stories history together", function () {
  var blob = (P.BOOK[11].text || []).join(" ");
  assert.ok(/remembering a table/.test(blob), blob);
  assert.ok(/not stacking countries/.test(blob), blob);
  var fromTent = (P.BOOK[7].choices || []).some(function (c) {
    return c.to === 11;
  });
  var fromBooth = (P.BOOK[9].choices || []).some(function (c) {
    return c.to === 11;
  });
  assert.ok(fromTent && fromBooth, "old part should be reachable from tent and diner booth");
});

check("the old part names the keystone", function () {
  var blob = (P.BOOK[11].text || []).concat(P.BOOK[31].text || []).join(" ");
  assert.ok(/stone is not the soup|You do not eat this/i.test(blob), blob);
});

check("diner feeds before it asks names", function () {
  var blob = (P.BOOK[52].text || []).join(" ");
  assert.ok(/waters/.test(blob), blob);
});

check("Castle Nova pours before it asks", function () {
  var blob = (P.BOOK[99].text || []).join(" ");
  assert.ok(/pours coffee/.test(blob), blob);
});

check("no leftover orbit diction in choices", function () {
  var orbit = [];
  Object.keys(P.BOOK).forEach(function (k) {
    (P.BOOK[k].choices || []).forEach(function (c) {
      if (/orbit/i.test(c.label || "")) orbit.push(c.label);
    });
  });
  assert.deepEqual(orbit, []);
});

check("six kitchens are in the book", function () {
  var titles = Object.keys(P.BOOK)
    .map(function (k) {
      return P.BOOK[k].title || "";
    })
    .join(" | ")
    .toLowerCase();
  ["mini-mart", "night market", "diner", "food court", "canteen", "castle nova"].forEach(function (k) {
    assert.ok(titles.indexOf(k) !== -1, "missing " + k);
  });
});

if (fails) {
  console.log("\n" + fails + " failed");
  process.exit(1);
}
console.log("\nall paperback tests passed");
