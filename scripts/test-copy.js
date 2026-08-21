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
console.log("copy lint passed (" + files.length + " files)");
