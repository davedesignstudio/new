const { spawnSync } = require("child_process");
const fs = require("fs");
const hugoBin = require("hugo-bin");

function copyAssets() {
  fs.mkdirSync("dist/css", { recursive: true });
  fs.copyFileSync("src/css/imports/studio.css", "dist/css/main.css");
  fs.copyFileSync("src/js/app.js", "dist/app.js");
  fs.cpSync("src/img", "dist/img", { recursive: true });
  if (fs.existsSync("src/videos")) {
    fs.cpSync("src/videos", "dist/videos", { recursive: true });
  }
}

function buildHugo() {
  const result = spawnSync(hugoBin, ["-d", "../dist", "-s", "site"], {
    stdio: "inherit"
  });
  if (result.status !== 0) {
    throw new Error("Hugo build failed");
  }
}

function build() {
  fs.rmSync("dist", { recursive: true, force: true });
  buildHugo();
  copyAssets();
}

if (require.main === module) {
  try {
    build();
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

module.exports = { build };
