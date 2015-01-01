'use strict';

/**
 * @ngdoc function
 * @name happymeApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the happymeApp
 */
angular.module('happymeApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'ngResource', 
	'AngularJS',
      'Karma'
    ];
  }
)
;
