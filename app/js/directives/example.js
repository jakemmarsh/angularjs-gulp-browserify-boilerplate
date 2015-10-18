'use strict';

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
  name: 'exampleDirective',
  fn: exampleDirective
};