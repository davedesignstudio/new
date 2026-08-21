#!/usr/bin/env node
/* Bind live mark. Node 8 compatible. */
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

var sandbox = { Math: Math, JSON: JSON, console: console };
sandbox.window = sandbox;
sandbox.global = sandbox;
vm.runInNewContext(fs.readFileSync(path.join(__dirname, "..", "src", "js", "bind.js"), "utf8"), sandbox);
var B = sandbox.BIND;
assert.ok(B, "BIND missing");

check("new Bind every five seconds", function () {
  assert.equal(B.INTERVAL, 5000);
});

check("each tick is a different mark", function () {
  var a = B.frame(0, "/img/road/paper.jpg");
  var b = B.frame(1, "/img/road/paper.jpg");
  var c = B.frame(2, "/img/tower/ch4.jpg");
  assert.notEqual(JSON.stringify(a), JSON.stringify(b));
  assert.notEqual(JSON.stringify(b), JSON.stringify(c));
  assert.ok(a.paper && a.ink && a.sub);
  assert.ok(c.photo);
});

check("same tick is the same mark", function () {
  assert.equal(JSON.stringify(B.frame(7, "/img/road/cafe.jpg")), JSON.stringify(B.frame(7, "/img/road/cafe.jpg")));
});

check("paper.jpg is the Bind image", function () {
  assert.ok(B.isBindArt("/img/road/paper.jpg"));
  assert.ok(!B.isBindArt("/img/road/kong.jpg"));
});

if (fails) {
  console.log("\n" + fails + " failed");
  process.exit(1);
}
console.log("\nall bind tests passed");
