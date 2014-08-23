var clean  = require('gulp-rimraf');
var config = require('../config');
var gulp   = require('gulp');

gulp.task('clean', function(){
  return gulp.src(config.dist.root, { read: false })
    .pipe(clean());
});