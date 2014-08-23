'use strict';

describe('Service: pirate', function () {

  // load the service's module
  beforeEach(module('zubieliciousRepoApp'));

  // instantiate service
  var pirate;
  beforeEach(inject(function (_pirate_) {
    pirate = _pirate_;
  }));

  it('should do something', function () {
    expect(!!pirate).toBe(true);
  });

});
