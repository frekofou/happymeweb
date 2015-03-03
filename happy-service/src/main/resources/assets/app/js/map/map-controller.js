'use strict';

angular.module('happy')


.controller('MapController', ['$scope', 'Emotion', 'EmotionService', function ($scope, $timeout, Emotion, EmotionService) {
    // initialisation de la map
    $scope.map = {
        center: {
            latitude: -21.040414446125766,
            longitude: 55.718346697807306,

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
    var map;
    var geocodedPlace;
    var emotion;
    var myGeocodeResults;

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
                console.log("relachement du marker");
                // peut mieux faire pour lancer le code 
                latlng = getLatLngFromMarker(marker);
                console.log('recupération de latlng deouis le marker:' + latlng);
                geocodedPlace = geocodeFromLatLng(latlng);
            },
            dblclick: function (marker, eventName, args) {

                console.log("myGeocodeResults:" + myGeocodeResults);
                console.log("pre query");
                emotion = {
                    title: "ma nouvelle emotion",
                    location: myGeocodeResults,
                    feeling: {
                        type: "HAPPY"
                    }
                };


                console.log("avant enregistrement" + emotion);
                console.log(emotion);
                Emotion.save(emotion);
                console.log(" post query");

            }

        }
    };

    function getLatLngFromMarker(marker, EmotionService, $scope) {
        console.log('dans le getLatLngFromMarker');

        // position du marker sur la map --> le marker porte sa position et non la map  
        var lat = marker.getPosition().lat();
        var lon = marker.getPosition().lng();

        latlng = new google.maps.LatLng(lat, lon);
        console.log(lat);
        console.log(lon);
        return latlng;
    }

    function geocodeFromLatLng(latlng) {
        console.log('dans le geocodeFromLatLng');
        geocoder = new google.maps.Geocoder();
        geocoder.geocode({
            'latLng': latlng
        }, function (results, status) {
            console.log('tentative de geocoding via ' + latlng);
            if (status == google.maps.GeocoderStatus.OK) {
                console.log('status == google.maps.GeocoderStatus.OK');
                console.log('geocoding réussi');
                console.log('reponse brute:');
                console.log(results[0]);
                myGeocodeResults = results;

            } else {
                console.log('Geocoder failed');
                alert("Geocoder failed due to: " + status);
                myGeocodeResults = null;
            }
        });
    }

}]);