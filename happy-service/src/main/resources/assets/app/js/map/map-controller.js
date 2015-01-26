'use strict';

angular.module('happy')

 .controller('MapController', ['$scope', '$modal', 'resolvedEmotion', 'Emotion',
 function ($scope, $modal, resolvedEmotion, Emotion,uiGmapGoogleMapApi) {
     // recupération de toutes les emotions
   $scope.emotions = resolvedEmotion; 
       
    $scope.map = {center: {latitude: 40.1451, longitude: -99.6680 }, zoom: 2};
    $scope.map.options = {scrollwheel: false};
    $scope.coordsUpdates = 0;
    $scope.dynamicMoveCtr = 0;
    var vm = this; 
    /* $scope.emotions = [
                 {
                   id: 583187,
                   latitude: 46.7682,
                   longitude: -71.3234,
                   title: "title"
                 }
               ];*/
       
 
    
    }])
 ;