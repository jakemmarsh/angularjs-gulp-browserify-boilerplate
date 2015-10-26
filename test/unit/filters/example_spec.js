/*global angular */

'use strict';

describe('Unit: ExampleFilter', function() {

  var $filter;

  beforeEach(function() {
    // instantiate the app module
    angular.mock.module('app');

    // mock the filter
    angular.mock.inject(function(_$filter_) {
      $filter = _$filter_;
    });
  });

  it('should replace the word "keyboard" with "leopard"', function() {
    var testString = 'computers are operated by keyboards';
    var resultString = $filter('ExampleFilter')(testString);

    expect(resultString).toEqual('computers are operated by leopards');
  });

});