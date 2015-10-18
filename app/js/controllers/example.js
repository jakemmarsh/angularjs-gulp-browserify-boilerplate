'use strict';

var controllersModule = require('./_index');

function ExampleCtrl() {

  // ViewModel
  var vm = this;

  vm.title = 'AngularJS, Gulp, and Browserify!';
  vm.number = 1234;

}

controllersModule.controller('ExampleCtrl', ExampleCtrl);