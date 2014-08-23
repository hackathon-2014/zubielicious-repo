'use strict';

angular.module('zubieliciousRepoApp')
  .factory('pirate', function ($resource, User) {
    // Service logic
    // ...

    var Pirate = $resource('/api/pirate/:id',
      {id: '@id'},
      {
        get: {
          method: 'GET',
          // isArray: true,
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

  });
