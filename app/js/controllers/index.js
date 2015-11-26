import angular from 'angular';
const bulk = require('bulk-require');

const controllersModule = angular.module('app.controllers', []);

const controllers = bulk(__dirname, ['./**/!(*index|*.spec).js']);

Object.keys(controllers).forEach((key) => {
  let item = controllers[key].default;

  controllersModule.controller(item.name, item.fn);
});

export default controllersModule;