import config from '../config';
import gulp   from 'gulp';
import del    from 'del';

gulp.task('clean', function() {

  return del([config.buildDir]);
  
});
