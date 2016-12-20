const istanbul = require('browserify-istanbul');
const isparta  = require('isparta');
const gutil = require('gulp-util');

const karmaBaseConfig = {

  basePath: '../',

  singleRun: true,

  frameworks: ['jasmine', 'browserify', 'es5-shim'],

  preprocessors: {
    'src/component/**/*.js': ['browserify', 'coverage'],
    'test/**/*.js': ['browserify']
  },

  browsers: ['PhantomJS'],

  reporters: ['dots', 'junit'],
  junitReporter: {
    outputDir: '',                      // results will be saved as $outputDir/$browserName.xml
    outputFile: 'test-results.xml',     // if included, results will be saved as $outputDir/$browserName/$outputFile
    useBrowserName: false               // add browser name to report and classes names
  },

  autoWatch: true,

  browserify: {
    debug: false,
    extensions: ['.js'],
    transform: [
      'babelify',
      'browserify-ngannotate',
      'bulkify',
      'browserify-shim',
      istanbul({
        instrumenter: isparta,
        ignore: ['**/node_modules/**', '**/test/**']
      })
    ]
  },

  proxies: {
    '/': 'http://localhost:9876/'
  },

  urlRoot: '/__karma__/',

  files: [
    // http://stackoverflow.com/questions/29391111/karma-phantomjs-and-es6-promises
    'node_modules/babel-polyfill/dist/polyfill.js',
    'node_modules/angular/angular.js',

    //Component's root
    'src/component/index.js',

    // 3rd-party resources
    'node_modules/angular-mocks/angular-mocks.js',

    // test files
    'test/unit/**/*.js'
  ]

};

const customLaunchers = {
  chrome: {
    base: 'SauceLabs',
    browserName: 'chrome',
    // temporary fix for chrome 52, check this link for details:
    // https://github.com/karma-runner/karma-chrome-launcher/issues/73
    flags: ['--no-sandbox']
  }
};

const ciAdditions = {
  sauceLabs: {
    testName: 'Karma Unit Tests',
    startConnect: false,
    build: process.env.TRAVIS_BUILD_NUMBER,
    tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER
  },
  browsers: Object.keys(customLaunchers),
  customLaunchers: customLaunchers,
  reporters: ['progress', 'coverage', 'saucelabs']
};

const htmlAddition = {
  frameworks: ['browserify', 'jasmine', 'source-map-support'],
  singleRun: false,
  reporters: ['kjhtml'],
  browsers: ['Chrome']
};

module.exports = function(config) {
  const isCI = process.env.CI && Boolean(process.env.TRAVIS_PULL_REQUEST);
  config.set(isCI ? Object.assign(karmaBaseConfig, ciAdditions)
    : (Boolean(gutil.env.debug) ? Object.assign(karmaBaseConfig, htmlAddition)
    : karmaBaseConfig));
};
