'use strict';
var filtersModule = require('./_index');

/**
 * @ngInject
 */
function ExampleFilter() {
    return function(input) {
        return input.replace(/keyboard/ig,'leopard');
    };
}

filtersModule.filter('example', ExampleFilter);
