'use strict';

angular.module('zubieliciousRepoApp')
  .controller('MainCtrl', function ($scope, $http, $state, Location, $q, Auth, $activityIndicator, User, pirate) {

    $activityIndicator.startAnimating();

    User.get('me').$promise.then(function (user) {
      var p = new pirate({id: user.uid});
      p.$get({id: user.uid}, function (data) {
        $scope.pirate = data;
      }, function (err) {
        if (err.status === 404) {
          // Let's create a pirate!
          var newPirate = new pirate({
            name : 'Little Jack',
            owner : user.uid,
            hunger : 20,
            thirst : 20,
            health : 20,
            happiness : 50,
            energy : 10
          });
          newPirate.$create(function (data) {
            $scope.pirate = data;
          }, function (err) {

          });
          console.log('error');
        }
      });
    });


    $scope.isLoggedIn = function () {
      return Auth.isLoggedIn();
    };

    $scope.actions = [
      {title: 'Food'},
      {title: 'Drink'},
      {title: 'Lime'},
      {title: 'Loot'}
    ];

    $scope.scaler = 1;
    $scope.weatherLoaded = false;

    $scope.weatherData = {};
    var deferredWeather = $q.defer();
    Location.getLocation().then(function (data) {
      $scope.location = data;
    }).then(function () {
      var weatherlocation = 'http://api.openweathermap.org/data/2.5/weather?lat='
        + $scope.location.lat
        + '&lon=' + $scope.location.lng
        + '&units=imperial';
      console.log('weatherLocation ' + weatherlocation);
      $http({
        method: 'GET',
        url: weatherlocation,
        transformRequest: function (data, headersGetter) {
          var headers = headersGetter();
          delete headers['Access-Control-Request-Headers'];
          delete headers['Access-Control-Request-Method'];
          delete headers['Authorization'];
        }}).success(function (weatherData) {
        $scope.weatherData.maxTemp = weatherData.main.temp_max;
        $scope.weatherData.minTemp = weatherData.main.temp_min;
        $scope.weatherData.temp = weatherData.main.temp;
        $scope.weatherData.humidity = (weatherData.main.humidity / 100.0);
        $scope.weatherData.wind = weatherData.wind.speed;
        // grab the first weather condition
        $scope.weatherData.currentConditions = weatherData.weather[0];
        deferredWeather.resolve();
      });
    });

    $scope.tooHot = function() {
      return $scope.weatherData.maxTemp || $scope.weatherData.temp > 90;
    };

    $scope.tooCold = function() {
      return $scope.weatherData.minTemp || $scope.weatherData.temp < 60;
    };

    // main function to setup weather dependencies
    deferredWeather.promise.then(function() {
      if ($scope.tooHot() || $scope.tooCold()) {
        $scope.scaler = 0.7;
      }
      $scope.weatherLoaded = true;
      $activityIndicator.stopAnimating();
    });

    if (!$scope.isLoggedIn()) {
      $state.go('login');
    }
  });
