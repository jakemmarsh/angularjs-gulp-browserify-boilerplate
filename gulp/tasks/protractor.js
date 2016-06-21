import config     from '../config';
import testServer from '../util/testServer';
import gulp       from 'gulp';
import {
  protractor,
  webdriver_update, // eslint-disable-line camelcase
  webdriver
} from 'gulp-protractor';

gulp.task('webdriverUpdate', webdriver_update);
gulp.task('webdriver', webdriver);

gulp.task('protractor', ['prod', 'webdriverUpdate', 'webdriver'], function(cb) {

  const testFiles = gulp.src('test/e2e/**/*.js');

  testServer({
    port: config.testPort,
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
