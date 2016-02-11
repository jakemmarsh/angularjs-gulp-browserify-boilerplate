var wallabify = require('wallabify');
var wallabyPostprocessor = wallabify({
    insertGlobals: true,
    debug: true,
    entryPatterns: 'app/**/*.js'
  }
  , function (bundler) {
    bundler.exclude('mkdirp');
    bundler.transform(require('babelify'));
    bundler.transform(require('browserify-ngannotate'));
    bundler.transform(require('bulkify'));
    return bundler;
  }
);

module.exports = function (wallaby) {
  return {
    files: [
      {pattern: 'node_modules/angular/angular.js', instrument: false},
      {pattern: 'node_modules/angular-mocks/angular-mocks.js', instrument: false},
      {pattern: 'app/js/**/*.js', load: false},
    ],
    tests: [
      {pattern: 'test/unit/**/*.js', load: false}
    ],
    compilers: {
      '**/*.js': wallaby.compilers.babel({
        babel: require('babel-core'),
        presets: ['es2015']
      })
    },

    env: {
      type: 'browser',
      runner: require("phantomjs2-ext").path,
      params: {
        runner: "--web-security=false"
      }
    },
    postprocessor: wallabyPostprocessor,

    bootstrap: function () {
      //   required to trigger tests loading
      window.__moduleBundler.loadTests();
    },
    debug: true
  };
};