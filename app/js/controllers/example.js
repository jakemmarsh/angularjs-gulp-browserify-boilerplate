'use strict';

function ExampleCtrl() {

  // ViewModel
  const vm = this;

  vm.title = 'AngularJS, Gulp, and Browserify!';
  vm.number = 1234;

}

module.exports = {
  name: 'ExampleCtrl',
  fn: ExampleCtrl
};