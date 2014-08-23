var config       = require('../config');
var gulp         = require('gulp');
var sass         = require('gulp-ruby-sass');
var gulpIf       = require('gulp-if');
var handleErrors = require('../util/handleErrors');
var browserSync  = require('browser-sync');

gulp.task('sass', ['images'], function () {
  return gulp.src(config.sass.src)
    .pipe(sass({
      style: 'compact',
      compass: true,
      bundleExec: true,
      lineNumbers: true
    }))
    .on('error', handleErrors)
    .pipe(gulp.dest(config.sass.dest))
    .pipe(gulpIf(browserSync.active, browserSync.reload({ stream: true })));
});