'use strict';

import config from '../config';
import path from 'path';
import gulp from 'gulp';
import { Server } from 'karma';

gulp.task('tdd', ['views'], function(cb) {

    gulp.watch(config.views.watch, ['views']);

    new Server({
        configFile: path.resolve(__dirname, '../..', config.test.karma),
        singleRun: false
    }, cb).start();

});
