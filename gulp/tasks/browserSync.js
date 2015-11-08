'use strict';

import config      from '../config';
import url         from 'url';
import browserSync from 'browser-sync';
import gulp        from 'gulp';

gulp.task('browserSync', function() {

  const DEFAULT_FILE = 'index.html';
  const ASSET_EXTENSION_REGEX = /\b(?!\?)\.(js|css|png|jpe?g|gif|svg|eot|otf|ttc|ttf|woff2?)(?!\.)/i;

  browserSync.init({
    server: {
      baseDir: config.buildDir,
      middleware: function(req, res, next) {
        let fileHref = url.parse(req.url).href;

        if ( !ASSET_EXTENSION_REGEX.test(fileHref) ) {
          req.url = '/' + DEFAULT_FILE;
        }

        return next();
      }
    },
  	port: config.browserPort,
  	ui: {
    	port: config.UIPort
    },
    ghostMode: {
      links: false
    }
  });

});
