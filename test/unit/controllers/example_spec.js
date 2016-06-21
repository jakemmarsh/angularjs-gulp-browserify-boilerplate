describe('Unit: ExampleCtrl', function() {

  let ctrl;

  beforeEach(function() {
    // instantiate the app module
    angular.mock.module('app');

    angular.mock.inject(($controller) => {
      ctrl = $controller('ExampleCtrl');
    });
  });

  it('should exist', function() {
    expect(ctrl).toBeDefined();
  });

  it('should have a number variable equal to 1234', function() {
    expect(ctrl.number).toEqual(1234);
  });

  it('should have a title variable equal to \'AngularJS, Gulp, and Browserify!\'', function() {
    expect(ctrl.title).toEqual('AngularJS, Gulp, and Browserify! Written with keyboards and love!');
  });

});