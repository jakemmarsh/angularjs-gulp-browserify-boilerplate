'use strict';

var directivesModule = require('./_index.js');

/**
 * @ngInject
 */
directivesModule.directive('exampleDirective', function () {

  return {
    restrict: 'EA',
    link: function($scope, $element) {
      $element.on('click', function() {
        console.log('element clicked');
      });
    }
  };

});