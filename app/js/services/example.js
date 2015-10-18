'use strict';

function ExampleService($http) {

  const service = {};

  service.get = function() {
    return new Promise((resolve, reject) => {
      $http.get('apiPath').success((data) => {
        resolve(data);
      }).error((err, status) => {
        reject(err, status);
      });
    });
  };

  return service;

}

module.exports = {
  name: 'ExampleService',
  fn: ExampleService
};