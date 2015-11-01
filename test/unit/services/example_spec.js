/*global angular */

'use strict';

describe('Unit: ExampleService', function() {

  var http, service;

  beforeEach(function() {
    // instantiate the app module
    angular.mock.module('app');

    // mock the service
    angular.mock.inject(function($httpBackend, ExampleService) {
      http = $httpBackend;
      service = ExampleService;
    });
  });

  it('should exist', function() {
    expect(service).toBeDefined();
  });

  it('should retrieve data', function(done) {
    http.expect('GET', 'apiPath').respond(201, {data: 1234});

    service.get().then(function(result) {
      expect(result).toEqual({data: 1234});
    }, function(error) {
      expect(error).toBeUndefined();
    }).then(done);

    http.flush();
  });
});
