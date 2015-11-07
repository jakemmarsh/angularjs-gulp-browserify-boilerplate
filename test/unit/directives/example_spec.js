/*global angular, module, browser*/

'use strict';

describe('Unit: ExampleDirective', function() {

  var element, scope;

  beforeEach(function() {
    spyOn(window, 'alert');
    angular.mock.module('app');

    angular.mock.inject(function($compile, $rootScope) {
      scope = $rootScope;
      element = angular.element('<div example-directive="{{message}}" title="{{title}}">Sample Directive</div>');
      scope.title = 'A sample title';
      scope.message = 'It doesn\'t hurt.';
      $compile(element)(scope);
      scope.$digest();
    });
  });

  it('should bind itself to the element', function() {
    element.triggerHandler('click');
    expect(window.alert).toHaveBeenCalledWith('Element clicked: It doesn\'t hurt.');
  });

  it('should update its bindings', function() {
    scope.message = 'It hurts a bit.';
    scope.$digest();
    element.triggerHandler('click');
    expect(window.alert).toHaveBeenCalledWith('Element clicked: It hurts a bit.');
  });

  it('should bind a title property to its template', function() {
    expect(element.find('h1').text()).toBe('A sample title');
  });

});
