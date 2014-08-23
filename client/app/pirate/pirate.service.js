'use strict';

angular.module('zubieliciousRepoApp')
  .factory('pirate', function () {
    // Service logic
    // ...

    var meaningOfLife = 42;
    var hunger = 0;
    var thirst = 0;
    var health = 50;
    var happiness = 50;

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }
    };
  });
