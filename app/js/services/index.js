'use strict';

var angular = require('angular');
var bulk = require('bulk-require');

var servicesModule = angular.module('app.services', []);

var services = bulk(__dirname, ['./**/!(*_index|*.spec).js']);

Object.keys(services).forEach(function(key) {
  var module = services[key];
  if ( module.type && module.type === 'service' ) {
    servicesModule.controller(module.name, module.fn);
  }
});

module.exports = servicesModule;