const fs = require("fs");
const browserSync = require("browser-sync").create();
const { build } = require("./build");

build();

browserSync.init({
  server: { baseDir: "./dist" },
  port: 3000,
  open: false,
  notify: false
});

function rebuild(event, file) {
  try {
    build();
    browserSync.reload();
    console.log("rebuilt", file || event);
  } catch (error) {
    console.error(error.message);
  }
}

fs.watch("site", { recursive: true }, rebuild);
fs.watch("src", { recursive: true }, rebuild);
