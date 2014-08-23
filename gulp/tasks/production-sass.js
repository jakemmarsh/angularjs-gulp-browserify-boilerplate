var config    = require('../config');
var gulp      = require('gulp');
var minifyCSS = require('gulp-minify-css');
var debug     = require('gulp-debug');

gulp.task('production-sass', ['sass'], function() {
  return gulp.src(config.sass.dest + '/**.css')
    .pipe(debug({ verbose: true }))
    .pipe(minifyCSS())
    .pipe(gulp.dest(config.sass.dest));
});