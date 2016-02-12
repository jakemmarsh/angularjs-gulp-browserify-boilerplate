var wallabify = require('wallabify');
var wallabyPostprocessor = wallabify({
    debug: true,
    entryPatterns: ['test/wallaby-main.js', 'test/unit/**/*.js']
  }
  , function (bundler) {
    bundler.transform(require('babelify'));
    bundler.transform(require('browserify-ngannotate'));
    bundler.transform(require('bulkify'));
    return bundler;
  }
);

module.exports = function (wallaby) {
  return {
    files: [
      {pattern: 'node_modules/babel-polyfill/dist/polyfill.js', instrument: false},
      {pattern: 'app/js/**/index.js', load: false, instrument: false},
      {pattern: 'app/js/**/*.js', load: false},
      {pattern: 'test/wallaby-main.js', load: false}
      ".babelrc"
    ],
    tests: [
      {pattern: 'test/unit/**/*.js', load: false}
    ],

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
