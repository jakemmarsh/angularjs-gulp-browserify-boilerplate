'use strict';

var gulp        = require('gulp');
var runSequence = require('run-sequence');

gulp.task('prod', [], function(cb) {

  cb = cb || function() {};

  global.isProd = true;
  global.buildType = 'production';

  runSequence('clean', ['styles', 'images', 'fonts', 'views', 'browserify'], 'gzip', cb);

});
