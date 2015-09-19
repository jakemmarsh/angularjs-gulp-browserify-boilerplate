'use strict';

var angular = require('angular');
var bulk = require('bulk-require');

var controllersModule = angular.module('app.controllers', []);

var controllers = bulk(__dirname, ['./**/!(*_index|*.spec).js']);

Object.keys(controllers).forEach(function(key) {
  var module = controllers[key];
  if ( module.type && module.type === 'controller' ) {
    controllersModule.controller(module.name, module.fn);
  }
});

module.exports = controllersModule;