'use strict';

function ExampleCtrl() {

  // ViewModel
  var vm = this;

  vm.title = 'AngularJS, Gulp, and Browserify!';
  vm.number = 1234;

}

module.exports = {
  type: 'controller',
  name: 'ExampleCtrl',
  fn: ExampleCtrl
};