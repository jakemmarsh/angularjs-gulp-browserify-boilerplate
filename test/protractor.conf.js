'use strict';

require('babel-core/register');

var gulpConfig = require('../gulp/config');

exports.config = {

  allScriptsTimeout: 11000,

  baseUrl: 'http://localhost:' + gulpConfig.browserPort + '/',

  directConnect: true,

  capabilities: {
    browserName: 'chrome',
    version: '',
    platform: 'ANY'
  },

  framework: 'jasmine2',

  jasmineNodeOpts: {
    isVerbose: false,
    showColors: true,
    includeStackTrace: true,
    defaultTimeoutInterval: 30000
  },

  specs: [
    'e2e/**/*.js'
  ]

};
