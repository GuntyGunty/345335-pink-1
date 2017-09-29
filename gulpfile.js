"use strict";

const gulp = require("gulp");
const sass = require("gulp-sass");
const plumber = require("gulp-plumber");
const postcss = require("gulp-postcss");
const stylelint = require('gulp-stylelint');
const autoprefixer = require("autoprefixer");
const minify = require("gulp-csso");
const imagemin = require("gulp-imagemin");
const rename = require("gulp-rename");
const del = require("del");
const uglify = require("gulp-uglify");
const svgstore = require("gulp-svgstore");
const svgmin = require("gulp-svgmin");
const server = require("browser-sync").create();
const run = require("run-sequence");

gulp.task("clean", function () {
  return del("build");
});

gulp.task("copy", function() {
  return gulp.src([
    "fonts/**/*.{woff,woff2}",
    "img/*.{svg,png,jpg,gif}",
    "js/**",
    "*.html"
  ], {
    base: "."
  })
  .pipe(gulp.dest("build"));
});

gulp.task("lint", function() {
  gulp.src("sass/style.scss")
  .pipe(stylelint({
    codeFilename: ("*.stylelintrc"),
    failAfterError: true,
    reporters: [
      {formatter: 'string', console: true}
    ]
  }))
});

gulp.task("style", function() {
  gulp.src("sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer({browsers: [
        "last 2 versions"
      ]})
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

  gulp.task("images", function() {
  return gulp.src("build/img/**/*.{png,jpg,gif}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true})
    ]))
    .pipe(gulp.dest("build/img"));
});

gulp.task("symbols", function() {
  return gulp.src("build/img/icons/*.svg")
    .pipe(svgmin())
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("symbols.svg"))
    .pipe(gulp.dest("build/img"));
});

gulp.task("js", function() {
  return gulp.src("js/*.js")
    .pipe(uglify())
    .pipe(gulp.dest("build/js"))
});

gulp.task("html:copy", function() {
  return gulp.src("*.html")
    .pipe(gulp.dest("build"));
});

gulp.task("html:update", ["html:copy"], function(done) {
  server.reload();
  done();
});

gulp.task("serve", function() {
  server.init({
    server: "build/"
  });

  gulp.watch("sass/**/*.{scss,sass}", ["style"]);
  gulp.watch("*.html", ["html:update"]);
});

gulp.task("build", function(fn) {
  run(
    "clean",
    "copy",
    "lint",
    "style",
    "images",
    "symbols",
    "js",
  fn);
});
