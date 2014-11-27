'use strict';

describe('Controller: AboutController', function () {

  // load the controller's module
  beforeEach(module('uiApp'));

  var aboutController,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    aboutController = $controller('AboutController', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
