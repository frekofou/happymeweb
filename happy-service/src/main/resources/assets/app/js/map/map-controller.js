'use strict';

angular.module('happy')

// emotion manipulation is managed bu the EmotionController, it needs the EmotionSevice instance to work. why?
.controller('MapController', ['$scope', 'EmotionService', function ($scope, EmotionController, EmotionService, $timeout, $resource) {

    

    // initialisation de la map
    $scope.map = {
        center: {
            latitude: -21.040414446125766,
            longitude: 55.718346697807306,
            title: "Hello World!"
        },
        zoom: 10

    };
    $scope.options = {
        scrollwheel: false
    };
    // compteurs de modification
    $scope.coordsUpdates = 0;
    $scope.dynamicMoveCtr = 0;
    getAllMarkers(); 
    // initilisations des variables

    var geocoder;
    var latlng;
    var lat;
    var lon;
    var map;
    var geocodedPlace;
    var emotion;
    var myGeocodeResults;

    // creation du marker, lord du deplacement du marker on sauvegarde sa position
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
                console.log('recupération de latlng depuis le marker:' + latlng);
                // permet de geocoder directement depuis le javascrit
                // cette fonction est déportée coté serveur
                //geocodedPlace = geocodeFromLatLng(latlng);

            },
            dblclick: function (marker, eventName, args) {
                latlng = getLatLngFromMarker(marker);
                console.log("myGeocodeResults:" + myGeocodeResults);
                console.log("pre query");
                emotion = {
                    title: "ma nouvelle emotion",
                    location: latlng,
                    feeling: {
                        type: "HAPPY"
                    }
                };


                console.log("avant enregistrement" + emotion);
                console.log(emotion);

                //console.log(" dans get all query");      

                EmotionController.save(emotion);
                console.log(" post query");



            }

        }
    };

    function getAllMarkers() {

        console.log("dans le getAllMarkers");
        $scope.markers = [];


        var markers = [];
        var marker1 = {
            latitude: -21.10,
            longitude: 55.718346697807306,
            title: 'm',
            id: 1
        };
        markers.push(marker1);

        console.log(EmotionController.query());



        EmotionController.query(function (data) {
            console.log("dans le query data");
            var emotion;

            for (var i = 0, n = data.length; i < n; i++) {
                //console.log(data[i]);
                emotion = data[i];
                //console.log(emotion._id);
                var tempmark = {
                    latitude: emotion.location.k,
                    longitude: emotion.location.B,
                    title: emotion.title,
                    id: emotion._id
                };
                console.log("tempmark: " + tempmark);
                markers.push(tempmark);
            }
            console.log("les markers: " + markers);
           
        // set des markers
        $scope.markers = markers; 
             console.log("le scope: " + $scope.markers);
        });

        console.log("Recuperation des emotions");


    }


    // permet de geolocaliser le point
    function getLatLngFromMarker(marker, $scope) {
        console.log('dans le getLatLngFromMarker');

        // position du marker sur la map --> le marker porte sa position et non la map  
        var lat = marker.getPosition().lat();
        var lon = marker.getPosition().lng();

        latlng = new google.maps.LatLng(lat, lon);
        console.log(lat);
        console.log(lon);
        console.log(latlng);
        return latlng;
    }

    // permet de geocoder le marker, cette fonction a été déporté coté serveur
    // deprecated
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