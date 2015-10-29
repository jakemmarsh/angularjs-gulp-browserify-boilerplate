'use strict';

function ExampleDirective() {

  return {
    restrict: 'EA',
    link: (scope, element) => {
      element.on('click', () => {
        alert('element clicked');
      });
    }
  };

}

export default {
  name: 'exampleDirective',
  fn: ExampleDirective
};
