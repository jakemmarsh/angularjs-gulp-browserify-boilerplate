import gulp         from 'gulp';
import source       from 'vinyl-source-stream';
import streamify    from 'gulp-streamify';
import uglify       from 'gulp-uglify';
import browserify   from 'browserify';
import browserifyShim   from 'browserify-shim';
import babelify     from 'babelify';
import browserSync  from 'browser-sync';
import ngAnnotate   from 'browserify-ngannotate';
import handleErrors from '../util/handleErrors';
import bundleLogger from '../util/bundleLogger';
import config       from '../config';
import collapser from 'bundle-collapser/plugin';

gulp.task('dist', ['clean', 'eslint', 'componentViews'], function() {
  return buildScript('index.js');
});

function buildScript(file) {

  let bundler = browserify({
    entries: [config.sourceDir + 'js/components/' + file],
    debug: false,
    cache: {},
    packageCache: {},
    fullPaths: false
  });
  bundler.plugin(collapser);
  const transforms = [
    { 'name':browserifyShim, 'options': {}},
    { 'name':babelify, 'options': {}},
    { 'name':ngAnnotate, 'options': {}},
    { 'name':'brfs', 'options': {}},
    { 'name':'bulkify', 'options': {}}
  ];

  transforms.forEach(function(transform) {
    bundler.transform(transform.name, transform.options);
  });

  function rebundle() {
    bundleLogger.start();

    const stream = bundler.bundle();

    return stream
      .on('error', handleErrors)
      .on('end', bundleLogger.end)
      .pipe(source(file))
      .pipe(streamify(uglify({
        compress: { drop_console: true } // eslint-disable-line camelcase
      })))
      .pipe(gulp.dest(config.distDir))
      .pipe(browserSync.stream());
  }

  return rebundle();
}
