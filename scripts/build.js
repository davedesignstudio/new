require("babel-register");
const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");
const hugoBin = require("hugo-bin");
const postcss = require("postcss");
const cssImport = require("postcss-import");
const cssnext = require("postcss-cssnext");
const cssNested = require("postcss-nested");
const webpack = require("webpack");
const webpackConfig = require("../webpack.conf").default;

function mkdirp(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  mkdirp(dest);
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const from = path.join(src, entry.name);
    const to = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(from, to);
    } else if (entry.isFile()) {
      mkdirp(path.dirname(to));
      fs.copyFileSync(from, to);
    }
  }
}

function flattenCopy(src, dest) {
  if (!fs.existsSync(src)) return;
  mkdirp(dest);
  const walk = dir => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const from = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(from);
      else if (entry.isFile()) fs.copyFileSync(from, path.join(dest, entry.name));
    }
  };
  walk(src);
}

function runHugo(extraArgs = [], environment = "development") {
  return new Promise((resolve, reject) => {
    process.env.NODE_ENV = environment;
    const args = ["-d", "../dist", "-s", "site", "-v"].concat(extraArgs);
    const child = spawn(hugoBin, args, { stdio: "inherit" });
    child.on("close", code => {
      if (code === 0) resolve();
      else reject(new Error("Hugo build failed"));
    });
  });
}

function buildCss() {
  const from = path.join("src", "css", "main.css");
  const css = fs.readFileSync(from, "utf8");
  return postcss([
    cssImport({ from }),
    cssNested(),
    cssnext()
  ])
    .process(css, { from })
    .then(result => {
      mkdirp(path.join("dist", "css"));
      fs.writeFileSync(path.join("dist", "css", "main.css"), result.css);
      if (result.map) {
        fs.writeFileSync(path.join("dist", "css", "main.css.map"), result.map.toString());
      }
    });
}

function buildJs() {
  return new Promise((resolve, reject) => {
    webpack(Object.assign({}, webpackConfig), (err, stats) => {
      if (err) return reject(err);
      const info = stats.toJson();
      if (stats.hasErrors()) return reject(new Error(info.errors.join("\n")));
      console.log(stats.toString({ colors: true, progress: true }));
      resolve();
    });
  });
}

function copyAssets() {
  flattenCopy(path.join("src", "fonts"), path.join("dist", "fonts"));
  copyDir(path.join("src", "videos"), path.join("dist", "videos"));
  copyDir(path.join("src", "img"), path.join("dist", "img"));
}

function buildAll(options = {}) {
  const hugoArgs = options.preview ? ["--buildDrafts", "--buildFuture"] : [];
  const env = options.production ? "production" : "development";
  return runHugo(hugoArgs, env)
    .then(buildCss)
    .then(buildJs)
    .then(copyAssets);
}

module.exports = {
  runHugo,
  buildCss,
  buildJs,
  copyAssets,
  buildAll
};

if (require.main === module) {
  const preview = process.argv.includes("--preview");
  buildAll({ preview, production: true }).catch(err => {
    console.error(err);
    process.exit(1);
  });
}
