#!/usr/bin/env node
/* Fail if leftover space-tour copy or banned words leak into product text. */
var fs = require("fs");
var path = require("path");

var roots = [
  path.join(__dirname, "..", "site", "content"),
  path.join(__dirname, "..", "src", "js"),
  path.join(__dirname, "..", "site", "layouts")
];

var banned = [
  { re: /gypsy/i, why: "do not use this word in product copy" },
  { re: /gipsy/i, why: "do not use this word in product copy" },
  { re: /\bFTL\b/, why: "space-tour leftover" },
  { re: /airlock/i, why: "space-tour leftover" },
  { re: /charted space/i, why: "space-tour leftover" },
  { re: /holo-map/i, why: "space-tour leftover" },
  { re: /Outer Buoy/, why: "space-tour leftover" },
  { re: /docking spine/i, why: "space-tour leftover" },
  { re: /four-eyed alien/i, why: "space-tour leftover" },
  { re: /200-year-old camper/i, why: "space-tour leftover" }
];

function walk(dir, out) {
  fs.readdirSync(dir).forEach(function (name) {
    var p = path.join(dir, name);
    var st = fs.statSync(p);
    if (st.isDirectory()) walk(p, out);
    else if (/\.(md|js|html|css)$/.test(name)) out.push(p);
  });
}

var files = [];
roots.forEach(function (r) {
  if (fs.existsSync(r)) walk(r, files);
});

var hits = [];
files.forEach(function (file) {
  var text = fs.readFileSync(file, "utf8");
  var lines = text.split(/\r?\n/);
  banned.forEach(function (rule) {
    lines.forEach(function (line, i) {
      if (rule.re.test(line)) {
        hits.push(path.relative(path.join(__dirname, ".."), file) + ":" + (i + 1) + "  " + rule.why + "  " + line.trim());
      }
    });
  });
});

if (hits.length) {
  console.log("copy lint failed:\n" + hits.join("\n"));
  process.exit(1);
}

var libPath = path.join(__dirname, "..", "site", "content", "pages", "libraries.md");
if (!fs.existsSync(libPath)) {
  console.log("copy lint failed: missing site/content/pages/libraries.md");
  process.exit(1);
}
var lib = fs.readFileSync(libPath, "utf8");
var needed = ["Le Guin", "Morrison", "McCloud", "carrier bag", "gutter", "feed first"];
var missing = needed.filter(function (w) {
  return lib.indexOf(w) === -1;
});
if (missing.length) {
  console.log("copy lint failed: libraries.md missing: " + missing.join(", "));
  process.exit(1);
}

var histPath = path.join(__dirname, "..", "site", "content", "pages", "history.md");
if (!fs.existsSync(histPath)) {
  console.log("copy lint failed: missing site/content/pages/history.md");
  process.exit(1);
}
var hist = fs.readFileSync(histPath, "utf8");
var histNeed = ["remembering a table", "not stacking", "loaf that walked", "bun that kept"];
var histMissing = histNeed.filter(function (w) {
  return hist.indexOf(w) === -1;
});
if (histMissing.length) {
  console.log("copy lint failed: history.md missing: " + histMissing.join(", "));
  process.exit(1);
}

var keyPath = path.join(__dirname, "..", "site", "content", "pages", "keystone.md");
if (!fs.existsSync(keyPath)) {
  console.log("copy lint failed: missing site/content/pages/keystone.md");
  process.exit(1);
}
var key = fs.readFileSync(keyPath, "utf8");
var keyNeed = ["stone is not the soup", "Stone soup", "extra place", "hearth-stone"];
var keyMissing = keyNeed.filter(function (w) {
  return key.indexOf(w) === -1;
});
if (keyMissing.length) {
  console.log("copy lint failed: keystone.md missing: " + keyMissing.join(", "));
  process.exit(1);
}

function needFile(rel, phrases) {
  var p = path.join(__dirname, "..", rel);
  if (!fs.existsSync(p)) {
    console.log("copy lint failed: missing " + rel);
    process.exit(1);
  }
  var text = fs.readFileSync(p, "utf8");
  var miss = phrases.filter(function (w) {
    return text.indexOf(w) === -1;
  });
  if (miss.length) {
    console.log("copy lint failed: " + rel + " missing: " + miss.join(", "));
    process.exit(1);
  }
}

needFile("site/content/pages/alexandria.md", [
  "We do not have the Library",
  "Pinakes",
  "from the ships",
  "not one fire"
]);
needFile("site/content/pages/stacks.md", [
  "every library",
  "all of time",
  "Ashurbanipal",
  "Nalanda",
  "opposite move"
]);
needFile("site/content/pages/holdings.md", [
  "every book",
  "WorldCat",
  "holding is not a title",
  "129,864,880"
]);
needFile("site/content/pages/mouths.md", [
  "every text",
  "Translation is also required",
  "Aristeas",
  "common meal",
  "Forty thousand books",
  "not that they prophesied"
]);
needFile("site/content/pages/about.md", [
  "We help independent restaurants look as exceptional as the food they serve."
]);
needFile("site/content/pages/contact.md", [
  "We help independent restaurants look as exceptional as the food they serve."
]);
needFile("site/content/crew/rye.md", [
  "extra place",
  "mustard",
  "not a seventh main"
]);
needFile("site/content/pages/sample.md", [
  "/img/comic/rye-clash.jpg",
  "/img/comic/rye-bounce.jpg",
  "/img/comic/rye-star.jpg",
  "The kitchen thought it could not fall"
]);

console.log("copy lint passed (" + files.length + " files)");
