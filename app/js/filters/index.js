import angular from 'angular';

const bulk = require('bulk-require');
const filtersModule = angular.module('app.filters', []);
const filters = bulk(__dirname, ['./**/!(*index|*.spec).js']);

function declare(filterMap) {
  Object.keys(filterMap).forEach((key) => {
    let item = filterMap[key];

    if (!item) {
      return;
    }

    if (item.fn && typeof item.fn === 'function') {
      filtersModule.filter(item.name, item.fn);
    } else {
      declare(item);
    }
  });
}

declare(filters);

export default filtersModule;
