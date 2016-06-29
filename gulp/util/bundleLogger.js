import gutil        from 'gulp-util';
import prettyHrtime from 'pretty-hrtime';

let startTime;

export default {

  start() {
    startTime = process.hrtime();
    gutil.log(`${gutil.colors.green('Rebundling')}...`);
  },

  end() {
    const taskTime = process.hrtime(startTime);
    const prettyTime = prettyHrtime(taskTime);
    gutil.log(`Finished ${gutil.colors.green('rebundling')} in ${gutil.colors.magenta(prettyTime)}`);
  }

};
