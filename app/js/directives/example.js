'use strict';

function exampleDirective() {

  return {
    restrict: 'EA',
    link: (scope, element) => {
      element.on('click', () => {
        console.log('element clicked');
      });
    }
  };

}

module.exports = {
  name: 'exampleDirective',
  fn: exampleDirective
};