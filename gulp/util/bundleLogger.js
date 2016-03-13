'use strict';

/* bundleLogger
 * ------------
 * Provides gulp style logs to the bundle method in browserify.js
 */

import gutil        from 'gulp-util';
import prettyHrtime from 'pretty-hrtime';

export default {
  
  let startTime;

  start(taskName) {
    startTime = process.hrtime();
    gutil.log('Starting', `'${gutil.colors.cyan(taskName)}'...`);  // start('bundle');
  },

  end(taskName) {
    let taskTime = process.hrtime(startTime);
    let prettyTime = prettyHrtime(taskTime);
    gutil.log('Finished', `'${gutil.colors.cyan(taskName)}' after ${gutil.colors.magenta(prettyTime)}`);  // end('bundle');
  }

};
