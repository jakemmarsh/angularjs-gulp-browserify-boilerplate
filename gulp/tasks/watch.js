var config = require('../config');
var gulp   = require('gulp');
var runSequence   = require('run-sequence');

gulp.task('watch', ['browserSync', 'server'], function() {
  gulp.watch(config.scripts.src, ['lint', 'browserify']);
  gulp.watch(config.sass.src,    ['sass']);
  gulp.watch(config.images.src,  ['images', 'reload']);
  gulp.watch(config.views.src,   ['views']);
});