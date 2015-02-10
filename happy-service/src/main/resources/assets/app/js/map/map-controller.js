'use strict';

angular.module('happy')


.controller("MapController", function($scope,$log, $timeout) {
    $scope.map = {center: {latitude:  -21.040414446125766, longitude:  55.718346697807306}, zoom: 20 };
    $scope.options = {scrollwheel: false};
    $scope.coordsUpdates = 0;
    $scope.dynamicMoveCtr = 0;
    var service;
     var geocoder;
    var latlng; 
    
    $scope.marker = {        
      id: 0,
      coords: {
        latitude:  -21.040414446125766,
        longitude: 55.718346697807306
      },
      options: { draggable: true },
      events: {
          dragend: function (marker, eventName, args) {
          $log.log('marker dragend');
          var lat = marker.getPosition().lat();
          var lon = marker.getPosition().lng();
          geocoder = new google.maps.Geocoder();
          latlng = new google.maps.LatLng(lat, lon);
          $log.log(lat);
          $log.log(lon);
          $log.log(latlng);

          $scope.marker.options = {
            draggable: true,
            labelContent: "lat: " + $scope.marker.coords.latitude + ' ' + 'lon: ' + $scope.marker.coords.longitude,
            labelAnchor: "100 0"
            
          };
           
         codeAddress();
         function codeAddress() {
                $log.log('dans le codeAddress');
            var infowindow = new google.maps.InfoWindow();
                $log.log('info window ok');
                      
                    
           geocoder.geocode({'latLng': latlng}, function(results, status) {
               $log.log('dans geocode');
                      if (status == google.maps.GeocoderStatus.OK) {
                          $log.log('status == google.maps.GeocoderStatus.OK');
                        if (results[1]) {
                            $log.log('geocode OK');
                            $log.log(results[0]);
                            $log.log(results[1].formatted_address);
                         
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