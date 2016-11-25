import config        from '../config';
import gulp          from 'gulp';
import templateCache from 'gulp-angular-templatecache';

// Views task
gulp.task('componentViews', function() {

  // Process any other view files from app/views
  const views = gulp.src(config.componentViews.src)
    .pipe(templateCache({
      standalone: true,
      module: 'template'
    }))
    .pipe(gulp.dest(config.componentViews.dest));

  return views;

});
