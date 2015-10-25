'use strict';

import gulp        from 'gulp';
import runSequence from 'run-sequence';

gulp.task('test', ['browserSync'], function() {

  return runSequence('unit', 'protractor');

});