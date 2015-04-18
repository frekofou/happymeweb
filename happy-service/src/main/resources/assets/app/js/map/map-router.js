'use strict';

angular.module('happy')
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/map', {
                templateUrl: 'views/map/emotions_map.html',
                controller: 'MapController',
                resolve: {
                    emotionsMapsFromDB: ['MapService', function (MapFunctionService) {
                        console.log("dans lemotionMapRouter");
                        return MapFunctionService.query();
          }]
                }
            })
    }]);