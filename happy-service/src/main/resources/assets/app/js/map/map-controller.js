'use strict';

angular.module('happy')


.controller("MapController", function($scope,$log, $timeout) {
    // initialisation de la map
    $scope.map = {center: {latitude:  -21.040414446125766, longitude:  55.718346697807306}, zoom: 20 };
    $scope.options = {scrollwheel: false};
    // compteurs de modification
    $scope.coordsUpdates = 0;
    $scope.dynamicMoveCtr = 0;
    var service;
     var geocoder;
    var latlng; 
    
    // creation du marker
    $scope.marker = {        
      id: 0,
        // coordonnées de positionnement du marker : to do geolocaliser
      coords: {
        latitude:  -21.040414446125766,
        longitude: 55.718346697807306
      },
      options: { draggable: true },
        // evenement relachement du drag du marker
      events: {
          // le marker, le fait de drager, les evenements navigateur
          dragend: function (marker, eventName, args) {
          $log.log('marker dragend');
            // position du marker sur la map --> le marker porte sa position et non la map  
          var lat = marker.getPosition().lat();
          var lon = marker.getPosition().lng();
              // a supprime?
          geocoder = new google.maps.Geocoder();
          latlng = new google.maps.LatLng(lat, lon);
          $log.log(lat);
          $log.log(lon);
          $log.log(latlng);

          $scope.marker.options = {
            draggable: true,
              // fix me car ne s'affiche pas
            labelContent: "lat: " + $scope.marker.coords.latitude + ' ' + 'lon: ' + $scope.marker.coords.longitude
            //labelAnchor: "100 0"
            
          };
          // peut mieux faire pour lancer le code 
         codeAddress();
         function codeAddress() {
                $log.log('dans le codeAddress');
            var infowindow = new google.maps.InfoWindow();
                $log.log('info window ok');
                      
               // recuperation des information via l'api geocoder   new google.maps.Geocoder();
             // latLng issue de la position du marker, results contient la réponse de l'API, status contient le OK/KO
           geocoder.geocode({'latLng': latlng}, function(results, status) {
               $log.log('tentative de geocoding via ' + latlng);
                      if (status == google.maps.GeocoderStatus.OK) {
                          $log.log('status == google.maps.GeocoderStatus.OK');
                        if (results[1]) {
                            $log.log('geocoding réussi');
                            $log.log('reponse brute:');
                            $log.log(results[0]);
                            $log.log('premier element:' + results[1].formatted_address);
                         
                        }
                      } else {
                          $log.log('Geocoder failed');
                        alert("Geocoder failed due to: " + status);
                      }
                    });            
            }}
      }
     
    };
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