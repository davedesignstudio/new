const fs = require("fs");
const BrowserSync = require("browser-sync");
const { buildAll, runHugo, buildCss, buildJs, copyAssets } = require("./build");

const browserSync = BrowserSync.create();

function debounce(fn, wait) {
  let t;
  return () => {
    clearTimeout(t);
    t = setTimeout(fn, wait);
  };
}

function watch(dir, handler) {
  if (!fs.existsSync(dir)) return;
  fs.watch(dir, { recursive: true }, debounce(handler, 120));
}

buildAll()
  .then(() => {
    browserSync.init({
      server: { baseDir: "./dist" },
      open: false,
      notify: false
    });

    const reload = () => browserSync.reload();

    watch("src/css", () => {
      buildCss().then(() => browserSync.reload("*.css")).catch(console.error);
    });
    watch("src/js", () => {
      buildJs().then(reload).catch(console.error);
    });
    watch("src/img", () => {
      copyAssets();
      reload();
    });
    watch("src/videos", () => {
      copyAssets();
      reload();
    });
    watch("site", () => {
      runHugo().then(reload).catch(console.error);
    });
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
