'use strict';

angular.module('happy')

// emotion manipulation is managed bu the EmotionController, it needs the EmotionSevice instance to work. why?
.controller('MapController', ['$scope', 'EmotionService', function ($scope, EmotionController, EmotionService, $timeout, $resource) {



    // initialisation de la map
    $scope.map = {
        center: {
            latitude: -21.040414446125766,
            longitude: 55.718346697807306
        },
        zoom: 15,
        options: {
            backgroundColor: "white",
            disableDoubleClickZoom: true,
            mapTypeControl: false,
            maxZoom: 20,
            minZoom: 2,
            overviewMapControl: false,
            rotateControl: true,
            streetViewControl: false

        }


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
    $scope.happymarker = {
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
                //console.info("relachement du marker");
                // peut mieux faire pour lancer le code 
                latlng = getLatLngFromMarker(marker);
                //console.info('recupération de latlng depuis le marker:' + latlng);
                // permet de geocoder directement depuis le javascrit
                // cette fonction est déportée coté serveur
                // geocodedPlace = geocodeFromLatLng(latlng);

            },
            dblclick: function (marker, eventName, args) {
                latlng = getLatLngFromMarker(marker);
                // console.info("myGeocodeResults:" + myGeocodeResults);
                // console.info("pre query");
                emotion = {
                    title: "ma nouvelle emotion",
                    location: latlng,
                    feeling: {
                        type: "HAPPY"
                    }
                };

                var foo;
                
                EmotionController.save(emotion);
                // console.info(" post query");
                foo = getAllMarkers();
            }
        }

    };
    
    $scope.sadmarker = {
        id: 1,

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
                //console.info("relachement du marker");
                // peut mieux faire pour lancer le code 
                latlng = getLatLngFromMarker(marker);
                //console.info('recupération de latlng depuis le marker:' + latlng);
                // permet de geocoder directement depuis le javascrit
                // cette fonction est déportée coté serveur
                // geocodedPlace = geocodeFromLatLng(latlng);

            },
            dblclick: function (marker, eventName, args) {
                latlng = getLatLngFromMarker(marker);
                // console.info("myGeocodeResults:" + myGeocodeResults);
                // console.info("pre query");
                emotion = {
                    title: "ma nouvelle emotion",
                    location: latlng,
                    feeling: {
                        type: "SAD"
                    }
                };

                var foo;
                
                EmotionController.save(emotion);
                // console.info(" post query");
                foo = getAllMarkers();
            }
        }

    };

    function getAllMarkers() {

        console.info("dans le getAllMarkers");
        $scope.markers = [];


        var markers = [];

        console.info(EmotionController.query());



        EmotionController.query(function (data) {
            console.info("dans le query data");
            var emotion;

            for (var i = 0, n = data.length; i < n; i++) {
                //console.info(data[i]);
                emotion = data[i];
                console.info(emotion.feeling.type);
                var icon = getIcon(emotion.feeling.type);
                var tempmark = {
                    latitude: emotion.location.k,
                    longitude: emotion.location.B,
                    title: emotion.title,
                    id: emotion._id,
                    icon: icon
                };
                //console.info("tempmark: " + tempmark);
                markers.push(tempmark);
            }
            console.info("les markers: " + markers);

            // set des markers
            $scope.markers = markers;
            console.info("le scope: " + $scope.markers);
        });

        console.info("Recuperation des emotions");


    }


    // permet de geolocaliser le point
    function getLatLngFromMarker(marker, $scope) {
        console.info('dans le getLatLngFromMarker');

        // position du marker sur la map --> le marker porte sa position et non la map  
        var lat = marker.getPosition().lat();
        var lon = marker.getPosition().lng();

        latlng = new google.maps.LatLng(lat, lon);
        console.info(lat);
        console.info(lon);
        console.info(latlng);
        return latlng;
    }

    // permet de geocoder le marker, cette fonction a été déporté coté serveur
    // deprecated
    function geocodeFromLatLng(latlng) {
        console.info('dans le geocodeFromLatLng');
        geocoder = new google.maps.Geocoder();
        geocoder.geocode({
            'latLng': latlng
        }, function (results, status) {
            console.info('tentative de geocoding via ' + latlng);
            if (status == google.maps.GeocoderStatus.OK) {
                console.info('status == google.maps.GeocoderStatus.OK');
                console.info('geocoding réussi');
                console.info('reponse brute:');
                console.info(results[0]);
                myGeocodeResults = results;

            } else {
                console.info('Geocoder failed');
                alert("Geocoder failed due to: " + status);
                myGeocodeResults = null;
            }
        });
    }

    function getIcon(feeling) {

        switch (feeling) {
        case "HAPPY":
            return "views/images/happy.png";
            break;

        case "SAD":
            return "views/images/sad.png";
            break;

        case "LOVE":
            return "views/images/love.png";
            break;
        }

    }


            }]);