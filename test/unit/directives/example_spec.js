/* global module */

'use strict';

describe('Unit: ExampleDirective', function() {

  let element;
  let scope;

  beforeEach(function() {
    spyOn(window, 'alert');
    angular.mock.module('app');

    angular.mock.inject(($compile, $rootScope) => {
      scope = $rootScope;
      scope.title = 'A sample title';
      scope.message = 'A sample message';

      element = angular.element(
        '<div example-directive title="{{title}}" click-message="{{message}}">Sample Directive</div>'
      );

      $compile(element)(scope);
      scope.$digest();
    });
  });

  it('should bind itself to the element', function() {
    element.triggerHandler('click');
    expect(window.alert).toHaveBeenCalledWith(`Element clicked: ${scope.message}`);
  });

  it('should update its bindings', function() {
    scope.message = 'A new sample message';
    scope.$digest();
    element.triggerHandler('click');
    expect(window.alert).toHaveBeenCalledWith(`Element clicked: ${scope.message}`);
  });

  it('should bind a title property to its template', function() {
    expect(element.find('h1').text()).toBe(`Directive title: ${scope.title}`);
  });

});
