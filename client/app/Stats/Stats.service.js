'use strict';

angular.module('zubieliciousRepoApp')
  .factory('Stats', function () {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }
    };
  });
