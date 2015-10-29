/*global angular, browser*/

'use strict';

describe('Unit: ExampleDirective', function() {

  var element;

  beforeEach(function() {
    angular.mock.module('app');

    angular.mock.inject(function($compile, $rootScope) {
      element = angular.element('<div example-directive></div>');

      $compile(element)($rootScope);
    });
  });

  it('should bind itself to the element', function() {
    spyOn(window, 'alert');
    element.triggerHandler('click');
    expect(window.alert).toHaveBeenCalledWith('element clicked');
  });
});
