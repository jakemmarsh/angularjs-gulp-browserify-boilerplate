'use strict';

function ExampleCtrl() {

  // ViewModel
  const vm = this;

  vm.title = 'AngularJS, Gulp, and Browserify!';
  vm.number = 1234;

}

export default {
  name: 'ExampleCtrl',
  fn: ExampleCtrl
};