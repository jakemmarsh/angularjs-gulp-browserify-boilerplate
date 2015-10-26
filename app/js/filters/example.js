'use strict';

function ExampleFilter() {
    return function(input) {
        return input.replace(/keyboard/ig,'leopard');
    };
}

export default {
    name: 'example',
    fn: ExampleFilter
};