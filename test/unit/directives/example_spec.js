/*global angular, browser*/

'use strict';

describe('Unit: ExampleDirective', function() {

  var element, scope;

  beforeEach(function() {
    spyOn(window, 'alert');
    angular.mock.module('app');

    angular.mock.inject(function($compile, $rootScope) {
      scope = $rootScope;
      element = angular.element('<div example-directive="{{message}}">Sample Directive</div>');
      scope.message = "It doesn't hurt.";
      $compile(element)(scope);
    });
  });

  it('should bind itself to the element', function() {
    element.triggerHandler('click');
    expect(window.alert).toHaveBeenCalledWith("Element clicked: It doesn't hurt.");
  });

  it('should update its bindings', function() {
    scope.message = "It hurts a bit.";
    scope.$digest();
    element.triggerHandler('click');
    expect(window.alert).toHaveBeenCalledWith("Element clicked: It hurts a bit.");
  });
});
