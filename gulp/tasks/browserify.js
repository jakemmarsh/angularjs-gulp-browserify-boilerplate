/* browserify task
   ---------------
   Bundle javascripty things with browserify!

   If the watch task is running, this uses watchify instead
   of browserify for faster bundling using caching.
*/

var browserify   = require('browserify');
var browserSync  = require('browser-sync');
var bundleLogger = require('../util/bundleLogger');
var config       = require('../config');
var gulp         = require('gulp');
var handleErrors = require('../util/handleErrors');
var source       = require('vinyl-source-stream');
var watchify     = require('watchify');

gulp.task('browserify', ['views'], function() {
  var bundleMethod = global.devMode ? watchify : browserify;

  var bundler = bundleMethod({
    entries: config.browserify.entries,
    debug: global.devMode,
    insertGlobals: true
  });

  var bundle = function() {
    bundleLogger.start();

    return bundler.bundle({ debug: !!global.devMode })
      .on('error', handleErrors)
      .pipe(source(config.browserify.bundleName))
      .pipe(gulp.dest(config.scripts.dest))
      .on('end', function() {
        bundleLogger.end()
      });
  };

  if (global.devMode) {
    console.log('Watchify is watching for changes...')
    bundler.on('update', function() {
      return bundle()
        .pipe(browserSync.reload({ stream: true, once: true }));
    });
  }

  return bundle();
});