const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");
const postcss = require("postcss");
const cssImport = require("postcss-import");
const cssnext = require("postcss-cssnext");
const cssNested = require("postcss-nested");

const root = path.join(__dirname, "..");
const dist = path.join(root, "dist");

function run(cmd, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { stdio: "inherit", cwd: root });
    child.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(cmd + " exited " + code));
    });
  });
}

function compileCss() {
  const from = path.join(root, "src/css/main.css");
  const css = fs.readFileSync(from, "utf8");
  return postcss([
    cssImport({ from }),
    cssNested(),
    cssnext()
  ])
    .process(css, { from, to: path.join(dist, "css/main.css") })
    .then((result) => {
      fs.mkdirSync(path.join(dist, "css"), { recursive: true });
      fs.writeFileSync(path.join(dist, "css/main.css"), result.css);
      console.log("css compiled");
    });
}

function copyJs() {
  fs.mkdirSync(dist, { recursive: true });
  fs.copyFileSync(path.join(root, "src/js/app.js"), path.join(dist, "app.js"));
  console.log("js copied");
}

function hugoBin() {
  try {
    return require("hugo-bin");
  } catch (err) {
    return "hugo";
  }
}

compileCss()
  .then(copyJs)
  .then(() => run(hugoBin(), ["-d", path.join(root, "dist"), "-s", path.join(root, "site")]))
  .then(() => compileCss().then(copyJs))
  .then(() => {
    console.log("build complete");
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
