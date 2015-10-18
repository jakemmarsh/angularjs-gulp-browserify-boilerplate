'use strict';

function ExampleDirective() {

  return {
    restrict: 'EA',
    link: (scope, element) => {
      element.on('click', () => {
        console.log('element clicked');
      });
    }
  };

}

export default {
  name: 'exampleDirective',
  fn: ExampleDirective
};