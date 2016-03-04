'use strict';

import gulp from 'gulp';
import runSequence from 'run-sequence';

gulp.task('test', ['clean'], function() {

    return runSequence('unit', 'protractor');

});
