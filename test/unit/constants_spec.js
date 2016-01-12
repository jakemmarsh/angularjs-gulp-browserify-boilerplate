/*global angular */

'use strict';

describe('Unit: Constants', () => {

  let constants;

  beforeEach(() => {
    // instantiate the app module
    angular.mock.module('app');

    // mock the directive
    angular.mock.inject((AppSettings) => {
      constants = AppSettings;
    });
  });

  it('should exist', () => {
    expect(constants).toBeDefined();
  });

  it('should have an application name', () => {
    expect(constants.appTitle).toEqual('Example Application');
  });

});