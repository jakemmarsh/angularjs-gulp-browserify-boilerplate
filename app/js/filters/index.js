'use strict';

import angular from 'angular';
const bulk = require('bulk-require');

const filtersModule = angular.module('app.filters', []);

const filters = bulk(__dirname, ['./**/!(*index|*.spec).js']);

Object.keys(filters).forEach((key) => {
  let item = filters[key];

  filtersModule.filter(item.name, item.fn);
});

export default filtersModule;