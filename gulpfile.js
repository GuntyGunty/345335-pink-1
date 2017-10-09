`use strict`;

const gulp = require('gulp');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const run = require('run-sequence');
const rename = require('gulp-rename');
const svgstore = require('gulp-svgstore');
const imagemin = require('gulp-imagemin');
const svgmin = require('gulp-svgmin');
const del = require('del');
const uglify = require('gulp-uglify');
const minify = require('gulp-csso');
const csscomb = require('gulp-csscomb');
const autoprefixer = require('autoprefixer');
const server = require('browser-sync').create();

gulp.task('clean', function () {
  return del('build');
});

gulp.task('copy', function() {
  return gulp.src([
    'fonts/**/*.{woff,woff2}',
    'img/*.{svg,png,jpg,gif}',
    'js/**',
    '*.html'
  ], {
    base: '.'
  })
  .pipe(gulp.dest('build'));
});

gulp.task('style', function() {
  gulp.src('sass/style.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer({browsers: [
        'last 2 versions'
      ]})
    ]))
    .pipe(gulp.dest('build/css'))
    .pipe(minify())
    .pipe(csscomb())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css'))
    .pipe(server.stream());
});

gulp.task('images', function() {
  return gulp.src('img/**/*.{png,jpg,gif}')
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true})
    ]))
    .pipe(gulp.dest('build/img'));
});


gulp.task('symbols', function() {
  return gulp.src('img/svg/*.svg')
  .pipe(svgmin())
    .pipe(gulp.dest('build/img/'));
});

// gulp.task('js', function() {
//   return gulp.src('js/*.js')
//     .pipe(uglify())
//     .pipe(gulp.dest('build/js'))
// });

gulp.task('html:update', ['html:copy'], function(done) {
  server.reload();
  done();
});

gulp.task('serve', ['style'], function() {
  server.init({
    server: 'build/',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch('sass/**/*.{scss,sass}', ['style']);
  gulp.watch('*.html').on('change', server.reload);
});

gulp.task('build', function(fn) {
  run(
    'clean',
    'copy',
    'style',
    'images',
    'symbols',
    // 'js',
  fn);
});
