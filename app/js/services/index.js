import angular from 'angular';

const bulk = require('bulk-require');
const servicesModule = angular.module('app.services', []);
const services = bulk(__dirname, ['./**/!(*index|*.spec).js']);

function declare(serviceMap) {
  Object.keys(serviceMap).forEach((key) => {
    let item = serviceMap[key];

    if (!item) {
      return;
    }

    if (item.fn && typeof item.fn === 'function') {
      servicesModule.service(item.name, item.fn);
    } else {
      declare(item);
    }
  });
}

declare(services);

export default servicesModule;
