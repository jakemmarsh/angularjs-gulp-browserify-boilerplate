/*global browser */

describe('E2E: Routes', function() {

  it('should have a working home route', function() {
    browser.get('#/');
    expect(browser.getLocationAbsUrl()).toMatch('/');
  });

});