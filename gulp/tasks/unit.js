import config   from '../config';
import path     from 'path';
import gulp     from 'gulp';
import {Server} from 'karma';

gulp.task('unit', ['componentViews'], function(cb) {

  new Server({
    configFile: path.resolve(__dirname, '../..', config.test.karma)
  }, cb).start();

});
