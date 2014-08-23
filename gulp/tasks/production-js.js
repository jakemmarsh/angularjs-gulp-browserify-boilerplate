var config = require('../config');
var gulp   = require('gulp');
var uglify = require('gulp-uglify');

gulp.task('production-js', ['browserify'], function() {
  return gulp.src(config.scripts.dest + '/**.js')
    .pipe(uglify())
    .pipe(gulp.dest(config.scripts.dest));
});