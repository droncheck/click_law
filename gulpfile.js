// VARIABLES & PATHS

let fileswatch   = 'html,htm,txt,json,md,woff,woff2', // List of files extensions for watching & hard reload (comma separated)
    imageswatch  = 'jpg,jpeg,png,webp,svg', // List of images extensions for watching & compression (comma separated)
    online       = true; // If «false» - Browsersync will work offline without internet connection



// LOGIC

const { src, dest, parallel, series, watch } = require('gulp');
const babel        = require('gulp-babel');
const sass         = require('gulp-sass');
const cleancss     = require('gulp-clean-css');
const concat       = require('gulp-concat');
const browserSync  = require('browser-sync').create();
// const uglify       = require('gulp-uglify-es').default;
const autoprefixer = require('gulp-autoprefixer');
const imagemin     = require('gulp-imagemin');
const newer        = require('gulp-newer');
const rsync        = require('gulp-rsync');
const del          = require('del');
const webpack      = require('webpack-stream');

function browsersync() {
  browserSync.init({
    server: { baseDir: 'dist' },
    notify: false,
    online: online
  })
}

function files() {
  return src([
    'src/*.html',
		'src/.htaccess',
  ])
  .pipe(dest('dist'))
}

function fonts() {
  return src('src/fonts/*')
  .pipe(dest('dist/fonts'))
}

function scripts() {
  return src('src/js/app.js')
  .pipe(babel({
    presets: ['@babel/preset-env']
  }))
  .pipe(webpack({
    mode: 'development'
  }))
  .pipe(concat('app.min.js'))
  .pipe(dest('dist/js'))
  .pipe(browserSync.stream())
}

function styles() {
  return src('src/sass/main.sass')
  .pipe(sass())
  .pipe(concat('app.min.css'))
  .pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true }))
  .pipe(cleancss( {level: { 1: { specialComments: 0 } },/* format: 'beautify' */ }))
  .pipe(dest('dist/css'))
  .pipe(browserSync.stream())
}

function images() {
  return src('src/img/*')
  .pipe(newer('dist/img'))
  .pipe(imagemin())
  .pipe(dest('dist/img'))
}

function cleanimg() {
  return del('dist/img/**/*', { force: true })
}

function cleandist() {
  return del('dist', { force: true })
}

function startwatch() {
  watch('src/**/sass/**/*', styles);
  watch('src/**/*.{' + imageswatch + '}', images);
  watch('src/**/*.{' + fileswatch + '}').on('change', browserSync.reload);
  watch(['src/**/*.js'], scripts);
  watch(['src/**/*.html'], files);
}

exports.browsersync = browsersync;
exports.assets      = series(cleandist, files, fonts, images, styles, scripts);
exports.files       = files;
exports.fonts       = fonts;
exports.styles      = styles;
exports.scripts     = scripts;
exports.images      = images;
exports.cleanimg    = cleanimg;
exports.cleandist   = cleandist;
exports.default     = parallel(files, fonts, images, styles, scripts, browsersync, startwatch);
