'use strict';

angular.module('zubieliciousRepoApp')
  .controller('MainCtrl', function ($scope, $http, $timeout, $state, Location, $q, Auth, $activityIndicator, User, pirate, $interval) {

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
            hunger : 0,
            thirst : 0,
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

    $scope.randomNumGenerator = function () {
      $scope.randomNum = Math.floor((Math.random() * 3000000) + 10000 * 30);
    };

    function makeHungry() {
        $scope.pirate.hunger += 1 * $scope.scaler;

    };

    function makeThirsty () {

        $scope.pirate.thirst += 1 * $scope.scaler;

    };

    function decreaseHealth() {

        $scope.pirate.health += 1 * $scope.scaler;

    };

    $interval(function() {
      $scope.randomNumGenerator();
      console.log('interval' + $scope.randomNum);
      var mod = Math.floor((Math.random() * 10) + 1);
      console.log('mod ' + mod);
      switch(mod) {
        case 1:
          makeHungry();
          break;
        case 2:
          makeThirsty();
          break;
        case 3:
          decreaseHealth();
          break;
        default:
          console.log('nothing happens');
          $scope.pirate.happiness -= 1;
      }

      $timeout(function(){
        console.log('random num timeout');
      }, $scope.randomNum);

    }, 10000);


    $scope.isLoggedIn = function () {
      return Auth.isLoggedIn();
    };

    $scope.actions = [
      {title: 'Food', class: 'foodBtn', bubbleIndex: 'bubble0'},
      {title: 'Drink', class: 'drinkBtn', bubbleIndex: 'bubble1'},
      {title: 'Lime', class: 'limeBtn', bubbleIndex: 'bubble2'},
      {title: 'Loot', class: 'lootBtn', bubbleIndex: 'bubble3'},
      {title: 'Logout', class: 'logoutBtn', bubbleIndex: 'bubble4'}
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

    $scope.doAction = function(action) {

      if(action === 'Food'){
        $scope.feed();
      }
      else if(action === 'Drink') {
        $scope.drink();
      }
      else if(action === 'Lime') {
          $scope.scurvy();
      }
      else if(action === 'Loot') {
        $scope.loot();
      }
      else if(action === 'Logout') {
        $scope.logout();
      }

      $timeout(function(){
       $scope.showBtn = false;
      }, 500);
    }

    // main function to setup weather dependencies
    deferredWeather.promise.then(function() {
      if ($scope.tooHot() || $scope.tooCold() || $scope.weatherData.wind > 10) {
        $scope.scaler = 1.7;
      }
      $scope.weatherLoaded = true;
      $activityIndicator.stopAnimating();
    });

    if (!$scope.isLoggedIn()) {
      $state.go('login');
    }

    function updatePirate () {
      $scope.pirate.happiness += 2;
      $scope.pirate.$update({id: $scope.pirate._id});
    }

    $scope.feed = function () {
      $scope.pirate.hunger -= 3;
      if ($scope.pirate.hunger <= 0) {
        $scope.pirate.hunger = 0;
      }
      updatePirate();
    };

    $scope.drink = function () {
      $scope.pirate.thirst -= 3;
      if ($scope.pirate.thirst <= 0) {
        $scope.pirate.thirst = 0;
      }
      updatePirate();
    };

    $scope.scurvy = function () {
      $scope.pirate.health -= 3;
      if ($scope.pirate.health <= 0) {
        $scope.pirate.health = 0;
      }
      updatePirate();
    };

    $scope.loot = function () {
      $scope.pirate.happiness += 5;
      updatePirate();
    };

    $scope.logout = function() {

    }
  });
