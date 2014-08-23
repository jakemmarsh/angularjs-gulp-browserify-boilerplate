var gulp = require('gulp');
var browserSync = require('browser-sync')

gulp.task('reload', ['images'], function(){
  browserSync.reload();
});