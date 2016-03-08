'use strict';

import notify from 'gulp-notify';
import gutil  from 'gulp-util';

export default function(error) {

  if( !global.isProd ) {

    let args = Array.prototype.slice.call(arguments);

    // Send error to notification center with gulp-notify
    notify.onError({
      title: 'Compile Error',
      message: `\r\n${error}`
    }).apply(this, args);

    // Keep gulp from hanging on this task
    this.emit('end');

  } else {
    // Log the error and stop the process
    // to prevent broken code from building
    console.log(`${gutil.colors.red(error)}`);
    process.exit(1);
  }

};
