'use strict';

import controllersModule from './_index';

/**
 * @ngInject
 */
function ExampleCtrl() {

  // ViewModel
  const vm = this;

  vm.title = 'AngularJS, Gulp, and Browserify!';
  vm.number = 1234;

}

controllersModule.controller('ExampleCtrl', ExampleCtrl);