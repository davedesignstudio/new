const { spawnSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const dist = path.join(root, "dist");

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  fs.readdirSync(src, { withFileTypes: true }).forEach(function(entry) {
    const from = path.join(src, entry.name);
    const to = path.join(dest, entry.name);
    if (entry.name === "gallery") return;
    if (entry.isDirectory()) copyDir(from, to);
    else fs.copyFileSync(from, to);
  });
}

function compileCss() {
  const main = fs.readFileSync(path.join(root, "src/css/main.css"), "utf8");
  return main.replace(/@import\s+"imports\/([^"]+)";/g, function(_, file) {
    return fs.readFileSync(path.join(root, "src/css/imports", file), "utf8");
  });
}

if (fs.existsSync(dist)) {
  fs.rmSync(dist, { recursive: true, force: true });
}
fs.mkdirSync(dist, { recursive: true });
fs.mkdirSync(path.join(dist, "css"), { recursive: true });
fs.writeFileSync(path.join(dist, "css/main.css"), compileCss());
fs.copyFileSync(path.join(root, "src/js/app.js"), path.join(dist, "app.js"));
copyDir(path.join(root, "src/img"), path.join(dist, "img"));
// Restaurant-template leftovers are not part of this site.
if (fs.existsSync(path.join(dist, "img/gallery"))) {
  fs.rmSync(path.join(dist, "img/gallery"), { recursive: true, force: true });
}

const hugo = path.join(root, "node_modules", ".bin", "hugo");
const result = spawnSync(hugo, ["-d", "../dist", "-s", "site", "-v"], {
  cwd: root,
  stdio: "inherit"
});

if (result.status !== 0) {
  process.exit(result.status || 1);
}
