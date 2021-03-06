'use strict';

angular.module('happy')
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/emotions', {
                templateUrl: 'views/emotion/emotions.html',
                controller: 'EmotionController',
                resolve: {
                    emotionsFromDB: ['EmotionService', function (EmotionFunctionService) {
                        console.log("dans lemotionRouter");
                        return EmotionFunctionService.query();
          }]
                }
            })
    }]);