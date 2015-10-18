'use strict';

var angular = require('angular');
var bulk = require('bulk-require');

var directivesModule = angular.module('app.directives', []);

var directives = bulk(__dirname, ['./**/!(*index|*.spec).js']);

Object.keys(directives).forEach(function(key) {
  var item = directives[key];

  directivesModule.directive(item.name, item.fn);
});

module.exports = directivesModule;