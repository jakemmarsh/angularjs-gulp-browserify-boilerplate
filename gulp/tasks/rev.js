var clean        = require('gulp-rimraf');
var config       = require('../config');
var extend       = require('gulp-extend');
var filter       = require('gulp-filter');
var gulp         = require('gulp');
var rename       = require('gulp-rename');
var rev          = require('gulp-rev');
var revCollector = require('gulp-rev-collector');

// Rev all assets
gulp.task('rev-assets', function() {
  return gulp.src([config.dist.assets + '/**/!(*.css)'])
    // Remove non-reved assets
    .pipe(clean())
    // Rev all the assets
    .pipe(rev())
    .pipe(gulp.dest(config.dist.assets))
    // Output asset manifest
    .pipe(rev.manifest())
    .pipe(gulp.dest(config.dist.root));
});

// Rev the css file with updated asset references, so if
// assets change, the css rev hash will change too.
var cssFilter = filter('**/*.css');

gulp.task('rev-css', ['rev-assets'], function() {
  return gulp.src([config.dist.root + '/rev-manifest.json', config.dist.assets + '/*.css'])
    // Replace references in css files
    .pipe(revCollector())
    // Remove the un-reved css file
    .pipe(cssFilter)
    .pipe(clean())
    // Rev the css file
    .pipe(rev())
    .pipe(gulp.dest(config.dist.assets))
    .pipe(cssFilter.restore())
    // Output css manifest
    .pipe(rev.manifest())
    .pipe(rename('rev-manifest-css.json'))
    .pipe(gulp.dest(config.dist.root));
});

// Merge the asset manifest and css manifest files
gulp.task('rev-merge', ['rev-css'],  function() {
  return gulp.src([config.dist.root + '/rev-manifest*.json'])
    .pipe(clean())
    .pipe(extend('rev-manifest.json'))
    .pipe(gulp.dest(config.dist.root));
});

// Replace static references in index.html
gulp.task('rev-index', ['rev-merge'],  function() {
  return gulp.src([config.dist.root + '/rev-manifest.json', config.dist.root + '/index.html'])
    .pipe(revCollector())
    .pipe(clean())
    .pipe(gulp.dest(config.dist.root));
});

// Replace static references in bundled javascript
gulp.task('rev', ['rev-index'],  function() {
  return gulp.src([config.dist.root + '/rev-manifest.json', config.dist.assets + '/main*.js'])
    .pipe(revCollector())
    .pipe(clean())
    .pipe(gulp.dest(config.dist.assets));
});
