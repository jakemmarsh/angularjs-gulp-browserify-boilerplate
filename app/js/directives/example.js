'use strict';

/**
 * @ngInject
 */
function exampleDirective() {

  return {
    restrict: 'EA',
    link: function(scope, element) {
      element.on('click', function() {
        console.log('element clicked');
      });
    }
  };

}

module.exports = {
  type: 'directive',
  name: 'exampleDirective',
  fn: exampleDirective
};