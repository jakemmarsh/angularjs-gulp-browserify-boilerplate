'use strict';

import angular from 'angular';
const bulk = require('bulk-require');

export default angular.module('app.controllers', []);

bulk(__dirname, ['./**/!(*_index|*.spec).js']);