'use strict';

/**
 * @ngdoc function
 * @name happymeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the happymeApp
 */
angular.module('happymeApp')

  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  $scope.factory('emotionsFactory', ['$resource',
  function($resource){
    return $resource('http://vps112500.ovh.net:8080/',{},{
    query: { method: 'GET', isArray: true }});}
      ])

;

    $scope.emotions = $scope.emotionsFactory.query();
});
