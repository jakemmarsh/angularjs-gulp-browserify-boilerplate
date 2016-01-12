/*global angular */

'use strict';

describe('Unit: ExampleService', () => {

  let http, service;

  beforeEach(() => {
    // instantiate the app module
    angular.mock.module('app');

    // mock the service
    angular.mock.inject(($httpBackend, ExampleService) => {
      http = $httpBackend;
      service = ExampleService;
    });
  });

  it('should exist', () => {
    expect(service).toBeDefined();
  });

  it('should retrieve data', (done) => {
    http.expect('GET', 'apiPath').respond(201, {data: 1234});

    service.get().then((result) => {
      expect(result).toEqual({data: 1234});
    }, (error) => {
      expect(error).toBeUndefined();
    }).then(done);

    http.flush();
  });
});
