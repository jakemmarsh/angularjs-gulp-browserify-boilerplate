'use strict';

var angular = require('angular');
var bulk = require('bulk-require');

var controllersModule = angular.module('app.controllers', []);

var controllers = bulk(__dirname, ['./**/!(*index|*.spec).js']);

Object.keys(controllers).forEach(function(key) {
  var item = controllers[key];

  controllersModule.controller(item.name, item.fn);
});

module.exports = controllersModule;