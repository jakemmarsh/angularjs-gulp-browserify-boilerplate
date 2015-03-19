'use strict';

var AppSettings = {
  appTitle: 'Example Application',
  apiUrl: process.env.BUILD_TYPE === 'development' ? '/dev/api/v1' : '/prod/api/v1'
};

module.exports = AppSettings;