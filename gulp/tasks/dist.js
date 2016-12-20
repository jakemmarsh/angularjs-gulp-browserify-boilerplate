import gulp         from 'gulp';
import handleErrors from '../util/handleErrors';
import config       from '../config';
import runSequence from 'run-sequence';

gulp.task('dist', function(cb) {
  runSequence('clean', ['eslint', 'componentViews', 'styles'], 'copyComponents', cb);
});

gulp.task('copyComponents', function () {
  return gulp.on('error', handleErrors)
    .src(config.sourceDir + 'component/**/*.js')
    .pipe(gulp.dest(config.distDir));
});
