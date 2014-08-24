'use strict';

describe('Directive: flasher', function () {

  // load the directive's module
  beforeEach(module('zubieliciousRepoApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<flasher></flasher>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the flasher directive');
  }));
});