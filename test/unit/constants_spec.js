'use strict';

describe('Unit: Constants', function() {

  let constants;

  beforeEach(function() {
    // instantiate the app module
    angular.mock.module('app');

    // mock the directive
    angular.mock.inject((AppSettings) => {
      constants = AppSettings;
    });
  });

  it('should exist', function() {
    expect(constants).toBeDefined();
  });

  it('should have an application name', function() {
    expect(constants.appTitle).toEqual('Example Application');
  });

});