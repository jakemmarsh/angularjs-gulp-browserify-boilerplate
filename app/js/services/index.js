'use strict';

import angular from 'angular';
const bulk = require('bulk-require');

const servicesModule = angular.module('app.services', []);

const services = bulk(__dirname, ['./**/!(*index|*.spec).js']);

Object.keys(services).forEach((key) => {
  let item = services[key];

  servicesModule.service(item.name, item.fn);
});

export default servicesModule;
