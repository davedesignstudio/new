const gulp = require("gulp");
const { spawn } = require("child_process");
const fs = require("fs");
const hugoBin = require("hugo-bin");
const flatten = require("gulp-flatten");
const postcss = require("gulp-postcss");
const cssImport = require("postcss-import");
const cssnext = require("postcss-cssnext");
const cssNested = require("postcss-nested");
const BrowserSync = require("browser-sync");
const webpack = require("webpack");
const webpackConfig = require("./webpack.conf");

const browserSync = BrowserSync.create();

const hugoArgsDefault = ["-d", "../dist", "-s", "site", "-v"];
const hugoArgsPreview = ["--buildDrafts", "--buildFuture"];

function hugo(cb) {
  return buildSite(cb);
}

function hugoPreview(cb) {
  return buildSite(cb, hugoArgsPreview);
}

function css() {
  return gulp
    .src("./src/css/*.css")
    .pipe(
      postcss([
        cssImport({ from: "./src/css/main.css" }),
        cssNested(),
        cssnext()
      ])
    )
    .pipe(gulp.dest("./dist/css"))
    .pipe(browserSync.stream());
}

function js(cb) {
  webpack(Object.assign({}, webpackConfig), (err, stats) => {
    if (err) {
      cb(err);
      return;
    }

    const info = stats.toString({
      colors: true,
      progress: true
    });

    if (info) {
      console.log("[webpack]", info);
    }

    if (stats.hasErrors()) {
      cb(new Error("Webpack build failed"));
      return;
    }

    browserSync.reload();
    cb();
  });
}

function fonts() {
  if (!fs.existsSync("./src/fonts")) {
    return Promise.resolve();
  }

  return gulp
    .src("./src/fonts/**/*", { allowEmpty: true })
    .pipe(flatten())
    .pipe(gulp.dest("./dist/fonts"))
    .pipe(browserSync.stream());
}

function videos() {
  if (!fs.existsSync("./src/videos")) {
    return Promise.resolve();
  }

  return gulp
    .src("./src/videos/**/*", { allowEmpty: true })
    .pipe(gulp.dest("./dist/videos"))
    .pipe(browserSync.stream());
}

function images() {
  if (!fs.existsSync("./src/img")) {
    return Promise.resolve();
  }

  return gulp
    .src("./src/img/**/*", { allowEmpty: true })
    .pipe(gulp.dest("./dist/img"))
    .pipe(browserSync.stream());
}

function runServer() {
  browserSync.init({
    server: {
      baseDir: "./dist"
    }
  });

  gulp.watch("./src/js/**/*.js", js);
  gulp.watch("./src/css/**/*.css", css);
  gulp.watch("./src/fonts/**/*", fonts);
  gulp.watch("./src/img/**/*", images);
  gulp.watch("./src/videos/**/*", videos);
  gulp.watch("./site/**/*", hugo);
}

function buildProduction(cb) {
  return buildSite(cb, [], "production");
}

function buildPreviewProduction(cb) {
  return buildSite(cb, hugoArgsPreview, "production");
}

function buildSite(cb, options, environment = "development") {
  const args = options ? hugoArgsDefault.concat(options) : hugoArgsDefault;
  process.env.NODE_ENV = environment;

  return spawn(hugoBin, args, { stdio: "inherit" }).on("close", code => {
    if (code === 0) {
      browserSync.reload();
      cb();
      return;
    }

    browserSync.notify("Hugo build failed :(");
    cb(new Error("Hugo build failed"));
  });
}

exports.hugo = hugo;
exports["hugo-preview"] = hugoPreview;
exports.css = css;
exports.js = js;
exports.fonts = fonts;
exports.videos = videos;
exports.images = images;
exports.server = gulp.series(hugo, gulp.parallel(css, js, fonts, videos, images), runServer);
exports["server-preview"] = gulp.series(hugoPreview, gulp.parallel(css, js, fonts, videos, images), runServer);
exports.build = gulp.series(gulp.parallel(css, js, fonts, videos, images), buildProduction);
exports["build-preview"] = gulp.series(gulp.parallel(css, js, fonts, videos, images), buildPreviewProduction);
