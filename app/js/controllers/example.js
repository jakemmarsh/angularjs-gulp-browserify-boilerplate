'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function ExampleCtrl() {

  // ViewModel
  var vm = this;

  vm.title = 'AngularJS, Gulp, and Browserify! Written with keyboards and love';
  vm.number = 1234;

}

controllersModule.controller('ExampleCtrl', ExampleCtrl);
