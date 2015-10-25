'use strict';

import config from '../config';
import gulp   from 'gulp';
import del    from 'del';

gulp.task('clean', function(cb) {

  del([config.buildDir], cb);

});
