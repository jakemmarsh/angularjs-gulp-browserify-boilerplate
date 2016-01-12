/*global angular */

'use strict';

describe('Unit: ExampleFilter', () => {

  let $filter;

  beforeEach(() => {
    // instantiate the app module
    angular.mock.module('app');

    // mock the filter
    angular.mock.inject((_$filter_) => {
      $filter = _$filter_;
    });
  });

  it('should replace the word "keyboard" with "leopard"', () => {
    let testString = 'computers are operated by keyboards';
    let resultString = $filter('ExampleFilter')(testString);

    expect(resultString).toEqual('computers are operated by leopards');
  });

});