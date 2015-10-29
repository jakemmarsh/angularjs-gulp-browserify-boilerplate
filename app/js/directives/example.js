'use strict';

function ExampleDirective() {

  return {
    restrict: 'EA',
    scope: {
      message: '@exampleDirective'
    },
    link: (scope, element, attrs) => {
      element.on('click', () => {
        alert('Element clicked: ' + scope.message);
      });
    }
  };

}

export default {
  name: 'exampleDirective',
  fn: ExampleDirective
};
