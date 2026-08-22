const fs = require("fs");
const path = require("path");

const dist = path.join(__dirname, "..", "dist");
const required = [
  "index.html",
  "legislative/index.html",
  "executive/index.html",
  "judicial/index.html",
  "checks/index.html",
  "about/index.html",
  "404.html",
  "css/main.css",
  "app.js",
  "img/favicon.svg"
];

let failed = 0;

required.forEach(function(file) {
  const full = path.join(dist, file);
  if (!fs.existsSync(full)) {
    console.error("missing " + file);
    failed += 1;
  }
});

function assertContains(file, snippet) {
  const html = fs.readFileSync(path.join(dist, file), "utf8");
  if (html.indexOf(snippet) === -1) {
    console.error("expected " + JSON.stringify(snippet) + " in " + file);
    failed += 1;
  }
}

assertContains("index.html", "Three branches.");
assertContains("index.html", "data-triangle");
assertContains("index.html", "data-quiz");
assertContains("index.html", "Article I");
assertContains("index.html", "Article II");
assertContains("index.html", "Article III");
assertContains("legislative/index.html", "House of Representatives");
assertContains("executive/index.html", "take Care");
assertContains("judicial/index.html", "Marbury");
assertContains("checks/index.html", "ambition");
assertContains("css/main.css", "--gold:");
assertContains("app.js", "initQuiz");

if (fs.existsSync(path.join(dist, "tags/index.html"))) {
  console.error("taxonomy pages should be disabled");
  failed += 1;
}

if (failed) {
  console.error(failed + " check(s) failed");
  process.exit(1);
}

console.log("site checks passed");
