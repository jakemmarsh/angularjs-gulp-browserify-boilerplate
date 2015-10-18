'use strict';

var angular = require('angular');
var bulk = require('bulk-require');

var servicesModule = angular.module('app.services', []);

var services = bulk(__dirname, ['./**/!(*index|*.spec).js']);

Object.keys(services).forEach(function(key) {
  var item = services[key];

  servicesModule.controller(item.name, item.fn);
});

module.exports = servicesModule;