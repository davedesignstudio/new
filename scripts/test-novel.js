#!/usr/bin/env node
/* Graphic novel spine. Node 8 compatible. */
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
vm.runInNewContext(fs.readFileSync(path.join(__dirname, "..", "src", "js", "novel.js"), "utf8"), sandbox);
var N = sandbox.WIDERNOVEL;
assert.ok(N, "WIDERNOVEL missing");

check("nineteen pages in one book", function () {
  assert.equal(N.PAGES.length, 19);
});

check("every page has art and a teller", function () {
  N.PAGES.forEach(function (p) {
    assert.ok(p.art && p.art.indexOf("/img/") === 0, p.id + " art");
    assert.ok(p.teller && p.teller.length > 20, p.id + " teller");
    assert.ok(p.caption, p.id + " caption");
  });
});

check("no GAME OVER in the novel", function () {
  var blob = N.PAGES.map(function (p) {
    return p.teller + " " + (p.caption || "") + " " + (p.choices || []).map(function (c) {
      return c.label;
    }).join(" ");
  }).join(" ");
  assert.ok(!/game over/i.test(blob), blob.slice(0, 80));
});

check("share and keep reconverge at the stall", function () {
  var s = N.newState();
  s = N.go(s, "clerk");
  var sc = N.scene(s);
  assert.equal(sc.choices.length, 2);
  var share = N.choose(s, sc.choices[0]);
  assert.equal(share.page, "market");
  assert.equal(share.flags.sharedBag, true);
  var keep = N.choose(s, sc.choices[1]);
  assert.equal(keep.page, "market");
  assert.equal(keep.flags.hoardedBag, true);
});

check("bottle choice reconverges at the mask", function () {
  var s = N.go(N.newState(), "diner");
  var sc = N.scene(s);
  var a = N.choose(s, sc.choices[0]);
  var b = N.choose(s, sc.choices[1]);
  assert.equal(a.page, "mask");
  assert.equal(b.page, "mask");
});

check("the book remembers the bag", function () {
  var s = N.go(N.newState(), "clerk");
  s = N.choose(s, N.scene(s).choices[0]);
  var sc = N.scene(s);
  assert.ok(/shared the bag/i.test(sc.teller), sc.teller);
});

check("hear it again does not dump you out of Earth", function () {
  var s = N.go(N.newState(), "end");
  var sc = N.scene(s);
  var again = sc.choices.filter(function (c) {
    return c.again;
  })[0];
  assert.ok(again, "missing again");
  s = N.choose(s, again);
  assert.equal(s.page, "candle");
  assert.ok(s.cycles >= 1);
  var t = N.scene(s).teller;
  assert.ok(/came back/i.test(t), t);
});

check("keystone is said plainly", function () {
  var stone = N.PAGES.filter(function (p) {
    return p.id === "stone";
  })[0];
  assert.ok(/You do not eat this/.test(stone.caption));
  assert.ok(/stone was never food/i.test(stone.teller));
});

check("loaf page remembers a table and does not stack countries", function () {
  var loaf = N.PAGES.filter(function (p) {
    return p.id === "loaf";
  })[0];
  assert.ok(/remembering a table/.test(loaf.teller));
  assert.ok(/not lining up countries/.test(loaf.teller));
});

check("Zorya names herself in the first page", function () {
  assert.ok(/I am Zorya/.test(N.PAGES[0].teller));
});

check("this week’s box is in the book", function () {
  var box = N.PAGES.filter(function (p) {
    return p.id === "box";
  })[0];
  assert.ok(box, "missing box page");
  assert.equal(box.video, "Y43T7VQGtOs");
  assert.ok(/lost the room/i.test(box.teller), box.teller);
  assert.ok(/adapt/i.test(box.teller), box.teller);
});

check("current week is in the book", function () {
  var blob = N.PAGES.map(function (p) {
    return p.teller;
  }).join(" ");
  assert.ok(/ships/i.test(blob));
  assert.ok(/Pacific is running hot/i.test(blob));
  assert.ok(/collateral/i.test(blob));
  assert.ok(/rent ate the week/i.test(blob));
});

check("hearing the box still reaches the ships", function () {
  var s = N.go(N.newState(), "box");
  var sc = N.scene(s);
  assert.equal(sc.choices.length, 2);
  var heard = N.choose(s, sc.choices[0]);
  assert.equal(heard.page, "ships");
  assert.equal(heard.flags.heardBox, true);
  var dinner = N.choose(s, sc.choices[1]);
  assert.equal(dinner.page, "ships");
  assert.equal(dinner.flags.askedDinner, true);
});

if (fails) {
  console.log("\n" + fails + " failed");
  process.exit(1);
}
console.log("\nall novel tests passed");
