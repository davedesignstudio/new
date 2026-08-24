import gulp from "gulp";
import { spawn } from "child_process";
import hugoBin from "hugo-bin";
import gutil from "gulp-util";
import flatten from "gulp-flatten";
import postcss from "gulp-postcss";
import cssImport from "postcss-import";
import cssnext from "postcss-cssnext";
import cssNested from "postcss-nested";
import BrowserSync from "browser-sync";
import webpack from "webpack";
import webpackConfig from "./webpack.conf";

const browserSync = BrowserSync.create();

const hugoArgsDefault = ["-d", "../dist", "-s", "site", "-v"];
const hugoArgsPreview = ["--buildDrafts", "--buildFuture"];

gulp.task("hugo", cb => buildSite(cb));
gulp.task("hugo-preview", cb => buildSite(cb, hugoArgsPreview));

gulp.task("css", () =>
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

gulp.task("js", cb => {
  const myConfig = Object.assign({}, webpackConfig);

  webpack(myConfig, (err, stats) => {
    if (err) throw new gutil.PluginError("webpack", err);
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
});

gulp.task("fonts", () =>
  gulp
    .src("./src/fonts/**/*", { allowEmpty: true })
    .pipe(flatten())
    .pipe(gulp.dest("./dist/fonts"))
    .pipe(browserSync.stream())
);

gulp.task("videos", () =>
  gulp
    .src("./src/videos/**/*", { allowEmpty: true })
    .pipe(gulp.dest("./dist/videos"))
    .pipe(browserSync.stream())
);

gulp.task("images", () =>
  gulp
    .src("./src/img/**/*", { allowEmpty: true })
    .pipe(gulp.dest("./dist/img"))
    .pipe(browserSync.stream())
);

function runServer() {
  browserSync.init({
    server: {
      baseDir: "./dist"
    }
  });
  gulp.watch("./src/js/**/*.js", gulp.series("js"));
  gulp.watch("./src/css/**/*.css", gulp.series("css"));
  gulp.watch("./src/fonts/**/*", gulp.series("fonts"));
  gulp.watch("./src/img/**/*", gulp.series("images"));
  gulp.watch("./src/videos/**/*", gulp.series("videos"));
  gulp.watch("./site/**/*", gulp.series("hugo"));
}

function buildSite(cb, options, environment = "development") {
  const args = options ? hugoArgsDefault.concat(options) : hugoArgsDefault;

  process.env.NODE_ENV = environment;

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

const assets = gulp.parallel("css", "js", "fonts", "videos", "images");

gulp.task(
  "server",
  gulp.series(gulp.parallel("hugo", assets), function serve() {
    runServer();
  })
);
gulp.task(
  "server-preview",
  gulp.series(gulp.parallel("hugo-preview", assets), function servePreview() {
    runServer();
  })
);
gulp.task("build", gulp.series(assets, cb => buildSite(cb, [], "production")));
gulp.task(
  "build-preview",
  gulp.series(assets, cb => buildSite(cb, hugoArgsPreview, "production"))
);
