/*global angular, module, browser*/

'use strict';

describe('Unit: ExampleDirective', () => {

  let element, scope;

  beforeEach(() => {
    spyOn(window, 'alert');
    angular.mock.module('app');

    angular.mock.inject(($compile, $rootScope) => {
      scope = $rootScope;
      element = angular.element('<div example-directive="{{message}}" title="{{title}}">Sample Directive</div>');
      scope.title = 'A sample title';
      scope.message = 'It doesn\'t hurt.';
      $compile(element)(scope);
      scope.$digest();
    });
  });

  it('should bind itself to the element',() => {
    element.triggerHandler('click');
    expect(window.alert).toHaveBeenCalledWith('Element clicked: It doesn\'t hurt.');
  });

  it('should update its bindings', () => {
    scope.message = 'It hurts a bit.';
    scope.$digest();
    element.triggerHandler('click');
    expect(window.alert).toHaveBeenCalledWith('Element clicked: It hurts a bit.');
  });

  it('should bind a title property to its template', () => {
    expect(element.find('h1').text()).toBe('A sample title');
  });

});
