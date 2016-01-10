function ExampleFilter() {

  return function(input) {
    return input.replace(/keyboard/ig,'leopard');
  };

}

export default {
  name: 'ExampleFilter',
  fn: ExampleFilter
};