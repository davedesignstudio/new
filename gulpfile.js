const gulp = require("gulp");
const { spawn } = require("child_process");
const hugoBin = require("hugo-bin");
const gutil = require("gulp-util");
const flatten = require("gulp-flatten");
const postcss = require("gulp-postcss");
const cssImport = require("postcss-import");
const cssnext = require("postcss-cssnext");
const cssNested = require("postcss-nested");
const BrowserSync = require("browser-sync");
const webpack = require("webpack");
const webpackConfig = require("./webpack.conf.js");

const browserSync = BrowserSync.create();

// Hugo arguments
const hugoArgsDefault = ["-d", "../dist", "-s", "site", "-v"];
const hugoArgsPreview = ["--buildDrafts", "--buildFuture"];

const compileAssets = gulp.parallel(css, js, fonts, videos, images);

// Development tasks
gulp.task("hugo", hugo);
gulp.task("hugo-preview", hugoPreview);

// Run server tasks
gulp.task("server", gulp.series(hugo, compileAssets, runServer));
gulp.task("server-preview", gulp.series(hugoPreview, compileAssets, runServer));

// Build/production tasks
gulp.task("build", gulp.series(compileAssets, build));
gulp.task("build-preview", gulp.series(compileAssets, buildPreview));

// Compile CSS with PostCSS
gulp.task("css", css);
function css() {
  return (
  gulp
    .src("./src/css/*.css")
    .pipe(
      postcss([
        cssImport({ from: "./src/css/main.css" }),
        cssNested(),
        cssnext()
      ])
    )
    .pipe(gulp.dest("./dist/css"))
    .pipe(browserSync.stream())
  );
}

// Compile Javascript
gulp.task("js", js);
function js(cb) {
  const myConfig = Object.assign({}, webpackConfig);

  webpack(myConfig, (err, stats) => {
    if (err) throw new gutil.PluginError("webpack", err);
    if (stats.hasErrors()) {
      cb(new gutil.PluginError("webpack", stats.toString({ colors: true })));
      return;
    }
    gutil.log(
      "[webpack]",
      stats.toString({
        colors: true,
        progress: true
      })
    );
    browserSync.reload();
    cb();
  });
}

// Move all fonts in a flattened directory
gulp.task("fonts", fonts);
function fonts() {
  return (
  gulp
    .src("./src/fonts/**/*", { allowEmpty: true })
    .pipe(flatten())
    .pipe(gulp.dest("./dist/fonts"))
    .pipe(browserSync.stream())
  );
}

// Move all videos in a flattened directory
gulp.task("videos", videos);
function videos() {
  return (
  gulp
    .src("./src/videos/**/*", { allowEmpty: true })
    .pipe(gulp.dest("./dist/videos"))
    .pipe(browserSync.stream())
  );
}

// Move all images in a flattened directory
gulp.task("images", images);
function images() {
  return (
  gulp
    .src("./src/img/**/*", { allowEmpty: true })
    .pipe(gulp.dest("./dist/img"))
    .pipe(browserSync.stream())
  );
}

// Development server with browsersync
function runServer(cb) {
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
  cb();
}

function hugo(cb) {
  return buildSite(cb);
}

function hugoPreview(cb) {
  return buildSite(cb, hugoArgsPreview);
}

function build(cb) {
  return buildSite(cb, [], "production");
}

function buildPreview(cb) {
  return buildSite(cb, hugoArgsPreview, "production");
}

/**
 * Run hugo and build the site
 */
function buildSite(cb, options, environment) {
  const args = options ? hugoArgsDefault.concat(options) : hugoArgsDefault;

  process.env.NODE_ENV = environment || "development";

  return spawn(hugoBin, args, { stdio: "inherit" }).on("close", code => {
    if (code === 0) {
      browserSync.reload();
      cb();
    } else {
      browserSync.notify("Hugo build failed :(");
      cb("Hugo build failed");
    }
  });
}
