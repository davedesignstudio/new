#!/usr/bin/env node
/* Build and serve without gulp 3. Node 22 compatible if NODE_OPTIONS includes --openssl-legacy-provider. */
var fs = require("fs");
var path = require("path");
var http = require("http");
var { spawnSync } = require("child_process");

var root = path.join(__dirname, "..");
var dist = path.join(root, "dist");
var port = parseInt(process.env.PORT || "3000", 10);

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  fs.readdirSync(src).forEach(function (name) {
    var from = path.join(src, name);
    var to = path.join(dest, name);
    if (fs.statSync(from).isDirectory()) copyDir(from, to);
    else fs.copyFileSync(from, to);
  });
}

function mime(file) {
  var ext = path.extname(file).toLowerCase();
  return (
    {
      ".html": "text/html; charset=utf-8",
      ".js": "application/javascript; charset=utf-8",
      ".css": "text/css; charset=utf-8",
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".png": "image/png",
      ".gif": "image/gif",
      ".webp": "image/webp",
      ".svg": "image/svg+xml",
      ".mp4": "video/mp4",
      ".ogg": "video/ogg",
      ".json": "application/json",
      ".xml": "application/xml",
      ".ico": "image/x-icon",
      ".woff": "font/woff",
      ".woff2": "font/woff2"
    }[ext] || "application/octet-stream"
  );
}

function buildHugo() {
  var hugo = path.join(root, "node_modules", "hugo-bin", "vendor", "hugo");
  var r = spawnSync(hugo, ["-d", dist, "-s", path.join(root, "site")], {
    stdio: "inherit"
  });
  if (r.status !== 0) throw new Error("hugo failed");
}

function buildCss() {
  var postcss = require("postcss");
  var cssImport = require("postcss-import");
  var cssnext = require("postcss-cssnext");
  var nested = require("postcss-nested");
  var from = path.join(root, "src", "css", "main.css");
  var css = fs.readFileSync(from, "utf8");
  return postcss([cssImport({ from: from }), nested(), cssnext()])
    .process(css, { from: from })
    .then(function (result) {
      fs.mkdirSync(path.join(dist, "css"), { recursive: true });
      fs.writeFileSync(path.join(dist, "css", "main.css"), result.css);
      console.log("css ok");
    });
}

function buildJs() {
  require("babel-register");
  var webpack = require("webpack");
  var config = require(path.join(root, "webpack.conf.js"));
  config = config.default || config;
  return new Promise(function (resolve, reject) {
    webpack(config, function (err, stats) {
      if (err) return reject(err);
      console.log(stats.toString({ colors: false, chunks: false }));
      if (stats.hasErrors()) return reject(new Error("webpack failed"));
      resolve();
    });
  });
}

function serve() {
  var server = http.createServer(function (req, res) {
    var urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
    if (urlPath === "/") urlPath = "/index.html";
    var file = path.join(dist, urlPath);
    if (!file.startsWith(dist)) {
      res.statusCode = 403;
      return res.end("forbidden");
    }
    fs.stat(file, function (err, st) {
      if (!err && st.isDirectory()) file = path.join(file, "index.html");
      fs.readFile(file, function (readErr, data) {
        if (readErr) {
          res.statusCode = 404;
          res.end("not found");
          return;
        }
        res.setHeader("Content-Type", mime(file));
        res.end(data);
      });
    });
  });
  server.listen(port, "0.0.0.0", function () {
    console.log("serving " + dist + " on http://127.0.0.1:" + port);
  });
}

Promise.resolve()
  .then(function () {
    buildHugo();
    copyDir(path.join(root, "src", "img"), path.join(dist, "img"));
    copyDir(path.join(root, "src", "fonts"), path.join(dist, "fonts"));
    copyDir(path.join(root, "src", "videos"), path.join(dist, "videos"));
    return buildCss();
  })
  .then(buildJs)
  .then(serve)
  .catch(function (err) {
    console.error(err);
    process.exit(1);
  });
