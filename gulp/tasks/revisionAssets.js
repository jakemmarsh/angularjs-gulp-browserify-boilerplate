'use strict';

import gulp from       'gulp';
import rev from        'gulp-rev';
import revReplace from 'gulp-rev-replace';
import revNapkin from  'gulp-rev-napkin';
import useref from     'gulp-useref';
import gulpif from     'gulp-if';

gulp.task('revisionAssets', function () {
    return gulp.src('./build/index.html')
        .pipe(useref({
            searchPath: 'build'
        }))
        .pipe(gulpif('*.js', rev()))
        .pipe(gulpif('*.css', rev()))
        .pipe(revReplace())
        .pipe(gulp.dest('./build/'))
        .pipe(revNapkin());
});
