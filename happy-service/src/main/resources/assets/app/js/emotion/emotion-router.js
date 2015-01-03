'use strict';

angular.module('happy')
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/emotions', {
        templateUrl: 'views/emotion/emotions.html',
        controller: 'EmotionController',
        resolve:{
          resolvedEmotion: ['Emotion', function (Emotion) {
            return Emotion.query();
          }]
        }
      })
    }]);
