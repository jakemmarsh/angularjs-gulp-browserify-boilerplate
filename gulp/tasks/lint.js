var config = require('../config');
var gulp   = require('gulp');
var jshint = require('gulp-jshint');

gulp.task('lint', function() {
  return gulp.src([config.scripts.src, '!app/javascripts/templates.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});