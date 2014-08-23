'use strict';

angular.module('zubieliciousRepoApp')
  .factory('Location', function ($q) {

    var location = {};

    function error (err) {
      return 'error ' + err;
    };

    location.getLocation = function () {
      var deferred = $q.defer();

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          location.lat = position.coords.latitude;
          console.log('lat' + location.lat);
          location.lng = position.coords.longitude;

          var loc  = {lat: position.coords.latitude, lng: position.coords.longitude};

          deferred.resolve(loc);
        }, error);
      }
      else {
        return 'location not supported';
      }
      return deferred.promise;
    };

    return location;

    // Public API here
    // return {
    //   getLocation: getLocation
    // };
  });
