'use strict';

/* bundleLogger
 * ------------
 * Provides gulp style logs to the bundle method in browserify.js
 */

import gutil        from 'gulp-util';
import prettyHrtime from 'pretty-hrtime';

export default {

  start() {
    let startTime = process.hrtime();
    gutil.log('Starting', `
      '${gutil.colors.cyan('bundle')}'...
    `);
  },

  end() {
    let taskTime = process.hrtime(startTime);
    let prettyTime = prettyHrtime(taskTime);
    gutil.log('Finished', `
      '${gutil.colors.cyan('bundle')}' after ${gutil.colors.magenta(prettyTime)}
    `);
  }

};
