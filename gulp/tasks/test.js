'use strict';

var gulp        = require('gulp');
var runSequence = require('run-sequence');

gulp.task('test', ['browserSync'], function() {

  return runSequence('unit', 'protractor');

});