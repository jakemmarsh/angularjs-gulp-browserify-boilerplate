'use strict';

var gulp   = require('gulp');
var gzip   = require('gulp-gzip');
var size   = require('gulp-size');
var gulpif = require('gulp-if');
var config = require('../config');

gulp.task('gzip', function() {

  return gulp.src(config.gzip.src)
  	.pipe(gulpif(config.logsizes, size({showFiles: true, title:'Pre-gzip'})))
    .pipe(gzip(config.gzip.options))
    .pipe(gulpif(config.logsizes, size({showFiles: true, title:'Post-gzip'})))
    .pipe(gulp.dest(config.gzip.dest));

});
