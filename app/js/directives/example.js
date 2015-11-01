'use strict';

function ExampleDirective() {

  return {
    restrict: 'EA',
    templateUrl: 'directives/example.html',
    scope: {
      title: '@',
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
