'use strict';

angular.module('zubieliciousRepoApp')
  .directive('flasher', function () {
    return {
      template: '<div></div>',
      restrict: 'EA',
      link: function (scope, element, attrs) {
        element.text('this is the flasher directive');
      }
    };
  });