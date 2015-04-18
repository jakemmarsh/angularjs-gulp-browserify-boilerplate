'use strict';

var path = require('path');

function buildPath(subDir) {
  return function () {
    var paths = ['build'];
    if (global.buildType) {
      paths.push(global.buildType);
    }

    if (subDir) {
      paths.push(subDir);
    }

    return path.join.apply(path, paths);
  };
}

module.exports = {

  'serverport': 3000,

  'styles': {
    'src' : 'app/styles/**/*.scss',
    'dest': buildPath('css')
  },

  'scripts': {
    'src' : 'app/js/**/*.js',
    'dest': buildPath('js')
  },

  'images': {
    'src' : 'app/images/**/*',
    'dest': buildPath('images')
  },

  'fonts': {
    'src' : ['app/fonts/**/*'],
    'dest': buildPath('fonts')
  },

  'views': {
    'watch': [
      'app/index.html',
      'app/views/**/*.html'
    ],
    'src': 'app/views/**/*.html',
    'dest': 'app/js'
  },

  'gzip': {
    'src': 'build/**/*.{html,xml,json,css,js,js.map}',
    'dest': buildPath(),
    'options': {}
  },

  'dist': {
    'root'  : buildPath()
  },

  'browserify': {
    'entries'   : ['./app/js/main.js'],
    'bundleName': 'main.js',
    'sourcemap' : true
  },

  'test': {
    'karma': 'test/karma.conf.js',
    'protractor': 'test/protractor.conf.js'
  }

};
