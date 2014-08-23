'use strict';

angular.module('zubieliciousRepoApp')
  .controller('MainCtrl', function ($scope, $http, Location) {
    $scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };
    $scope.weatherData = {};
    Location.getLocation().then(function (data) {
      $scope.location = data;
    }).then(function () {
      var weatherlocation = 'http://api.openweathermap.org/data/2.5/weather?lat='
      + $scope.location.lat + '&lon=' + $scope.location.lng + '&units=imperial';
      console.log('weatherLocation ' + weatherlocation);
      $http.get(weatherlocation).success(function (weatherData) {
        $scope.weatherData.maxTemp = weatherData.main.temp_max;
        $scope.weatherData.minTemp = weatherData.main.temp_min ;
        $scope.weatherData.temp = weatherData.main.temp;
        $scope.weatherData.humidity = (weatherData.main.humidity / 100.0);
        // grab the first weather condition
        $scope.weatherData.currentConditions = weatherData.weather[0];
      });
    });
  });
