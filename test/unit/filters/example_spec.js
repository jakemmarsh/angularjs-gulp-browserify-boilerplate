describe('Unit: ExampleFilter', function() {

  let $filter;

  beforeEach(function() {
    // instantiate the app module
    angular.mock.module('app');

    // mock the filter
    angular.mock.inject((_$filter_) => {
      $filter = _$filter_;
    });
  });

  it('should replace the word "keyboard" with "leopard"', function() {
    const testString = 'computers are operated by keyboards';
    const resultString = $filter('ExampleFilter')(testString);

    expect(resultString).toEqual('computers are operated by leopards');
  });

});