'use strict';

angular.module('zubieliciousRepoApp')
  .factory('pirate', function ($resource, User) {
    // Service logic
    // ...

    var Pirate = $resource('/api/pirate',
      {},
      {
        get: {
          method: 'GET',
          url: '/api/pirate/:id',
          params: {id: '@id'}
        },
        create: {
          method: 'POST'
        },
        update: {
          method: 'PUT',
          url: '/api/pirate/:id',
          params: {id: '@id'}
        }
      });

     return Pirate;

     Pirate.prototype.createNew = function () {
      var _this = this;
      User.get('me').$promise.then(function (user) {
        _this.name = 'Little Jack';
        _this.owner = user.email;
        _this.hunger = 20;
        _this.thirst = 20;
        _this.health = 20;
        _this.happiness = 50;
        _this.energy = 10;
      });

      this.create();
     };
  });
