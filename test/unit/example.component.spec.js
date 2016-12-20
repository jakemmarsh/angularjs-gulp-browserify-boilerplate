describe('Sample unit test', function() {

  let subject;

  beforeEach(function() {
    // instantiate the app module
    angular.mock.module('gsf.example-component');

    inject(function (_$componentController_) {
      let mocks = null;
      let bindings = {
        exampleValue: 'testValue'
      }
      subject = _$componentController_('exampleComponent', mocks, bindings);
    });
  });

  it('should have unit test for your own component', function() {
    subject.$onChanges({
      exampleValue: {
        currentValue: 'newValue'
      }
    });
    expect(subject.displayValue).toBe('newValue');
  });
});
