'use strict';

var config      = require('../config');
var browserSync = require('browser-sync');
var gulp        = require('gulp');

gulp.task('browserSync', function() {

  browserSync({
  	port: config.browserport,
  	ui: {
    	port: config.uiport
    },
    proxy: 'localhost:' + config.serverport
  });

});
