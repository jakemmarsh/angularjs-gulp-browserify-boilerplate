'use strict';

import config       from '../config';
import express      from 'express';
import testServer   from '../util/testServer';
import gulp         from 'gulp';
import {protractor} from 'gulp-protractor';


gulp.task('protractor', ['prod'], function(cb) {

  const tests = gulp.src('test/e2e/**/*.js');

  testServer({
    port: config.browserPort,
    dir: config.buildDir
  }).then(server => {
    tests.pipe(protractor({
        configFile: config.test.protractor
    })).on('error', err => {
      // Make sure failed tests cause gulp to exit non-zero
      throw err;
    }).on('end', () => server.close(cb));
  });

});