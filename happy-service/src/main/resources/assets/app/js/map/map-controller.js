'use strict';

angular.module('happy')


.controller("MapController", function ($scope, $log, $timeout) {
    // initialisation de la map
    $scope.map = {
        center: {
            latitude: -21.040414446125766,
            longitude: 55.718346697807306
        },
        zoom: 20
    };
    $scope.options = {
        scrollwheel: false
    };
    // compteurs de modification
    $scope.coordsUpdates = 0;
    $scope.dynamicMoveCtr = 0;
    var service;
    var geocoder;
    var latlng;
    var lat; 
    var lon;

    // creation du marker
    $scope.marker = {
        id: 0,
        // coordonnées de positionnement du marker : to do geolocaliser
        coords: {
            latitude: -21.040414446125766,
            longitude: 55.718346697807306
        },
        options: {
            draggable: true
        },
        // evenement relachement du drag du marker
        events: {
            // le marker, le fait de drager, les evenements navigateur
            dragend: function (marker, eventName, args) {
                $log.log('relachement du marker');
                // peut mieux faire pour lancer le code 
                latlng = getLatLngFromMarker(marker);
                $log.log('recupération de l\'objet:' + latlng);
                geocodeFromLatLng(latlng);
                    
            }
        }

    };
    
          function getLatLngFromMarker(marker) {
                    $log.log('dans le getLatLngFromMarker');
                    
                     // position du marker sur la map --> le marker porte sa position et non la map  
                var lat = marker.getPosition().lat();
                var lon = marker.getPosition().lng();
                // a supprime?
                
                latlng = new google.maps.LatLng(lat, lon);
                $log.log(lat);
                $log.log(lon);
                return latlng;
          }
          
          function geocodeFromLatLng(latlng) {
                $log.log('dans le geocodeFromLatLng');
                 geocoder = new google.maps.Geocoder(); 
              
                 geocoder.geocode({
                        'latLng': latlng
                    }, function (results, status) {
                        $log.log('tentative de geocoding via ' + latlng);
                        if (status == google.maps.GeocoderStatus.OK) {
                            $log.log('status == google.maps.GeocoderStatus.OK');
                            $log.log('geocoding réussi');
                                $log.log('reponse brute:');
                                $log.log(results[0]);
                           
                        } else {
                            $log.log('Geocoder failed');
                            alert("Geocoder failed due to: " + status);
                        }
                    });
               
          }
                    
          
    /* $scope.$watchCollection("marker.coords", function (newVal, oldVal) {
       if (_.isEqual(newVal, oldVal))
         return;
       $scope.coordsUpdates++;
     });
     $timeout(function () {
       $scope.marker.coords = {
         latitude: -21.089607729507502,
         longitude: 55.666960937499994
       };
       $scope.dynamicMoveCtr++;
       $timeout(function () {
         $scope.marker.coords = {
           latitude: -21.089607729507502,
           longitude: 55.666960937499994
         };
         $scope.dynamicMoveCtr++;
       }, 2000);
     }, 1000);*/


});