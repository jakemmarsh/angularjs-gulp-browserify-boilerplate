'use strict';

import directivesModule from './_index.js';

/**
 * @ngInject
 */
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

directivesModule.directive('exampleDirective', exampleDirective);