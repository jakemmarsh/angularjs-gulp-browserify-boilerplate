'use strict';

import config       from '../config';
import testServer   from '../util/testServer';
import express      from 'express';
import gulp         from 'gulp';
import {
  protractor,
  webdriver,
  webdriver_update
} from 'gulp-protractor';

gulp.task('webdriver-update', webdriver_update);
gulp.task('webdriver', webdriver);

gulp.task('protractor', ['prod', 'webdriver-update', 'webdriver'], function(cb) {

  const testFiles = gulp.src('test/e2e/**/*.js');

  testServer({
    port: config.browserPort,
    dir: config.buildDir
  }).then((server) => {
    testFiles.pipe(protractor({
        configFile: config.test.protractor
    })).on('error', (err) => {
      // Make sure failed tests cause gulp to exit non-zero
      throw err;
    }).on('end', () => server.close(cb));
  });

});
