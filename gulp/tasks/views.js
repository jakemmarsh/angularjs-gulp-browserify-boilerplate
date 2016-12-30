import config        from '../config';
import gulp          from 'gulp';
import merge         from 'merge-stream';
import templateCache from 'gulp-angular-templatecache';

// Views task
gulp.task('views', function() {

  // Put our index.html in the dist folder
  const indexFile = gulp.src(config.views.index)
    .pipe(gulp.dest(config.publicDir));

  // Process any other view files from app/views
  const views = gulp.src(config.views.src)
    .pipe(templateCache({
      standalone: true
    }))
    .pipe(gulp.dest(config.views.dest));

  // Put our index.js in the dist folder
  const serverFile = gulp.src(config.views.server)
    .pipe(gulp.dest(config.buildDir));

  // Put our package.json in the dist folder
  const packageFile = gulp.src(config.views.package)
    .pipe(gulp.dest(config.buildDir));

  return merge(indexFile, views);

});
