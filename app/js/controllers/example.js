'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
controllersModule.controller('ExampleCtrl', function () {

  // ViewModel
  var vm = this;

  vm.title = 'AngularJS, Gulp, and Browserify!';
  vm.number = 1234;

});