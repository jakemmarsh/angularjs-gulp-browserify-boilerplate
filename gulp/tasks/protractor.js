'use strict';

import config       from '../config';
import gulp         from 'gulp';
import {
  protractor,
  webdriver,
  webdriver_update
} from 'gulp-protractor';

gulp.task('webdriver-update', webdriver_update);
gulp.task('webdriver', webdriver);

gulp.task('protractor', ['webdriver-update', 'webdriver', 'browserSync'], function(cb = function() {}) {

  gulp.src('test/e2e/**/*.js').pipe(protractor({
      configFile: config.test.protractor
  })).on('error', (err) => {
    // Make sure failed tests cause gulp to exit non-zero
    throw err;
  }).on('end', () => {
    process.exit();
    cb();
  });

});