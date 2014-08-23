var gulp  = require('gulp');
var runSequence = require('run-sequence');

gulp.task('production', function(callback) {
  runSequence('clean', 'production-sass', 'production-js', 'rev', callback);
});