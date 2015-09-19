'use strict';

var angular = require('angular');
var bulk = require('bulk-require');

var directivesModule = angular.module('app.directives', []);

var directives = bulk(__dirname, ['./**/!(*_index|*.spec).js']);

Object.keys(directives).forEach(function(key) {
  var module = directives[key];
  if ( module.type && module.type === 'directive' ) {
    directivesModule.directive(module.name, module.fn);
  }
});

module.exports = directivesModule;