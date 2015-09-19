'use strict';

import servicesModule from './_index.js';

/**
 * @ngInject
 */
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

servicesModule.service('ExampleService', ExampleService);