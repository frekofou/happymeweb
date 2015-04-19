'use strict';

angular.module('happy')
    .controller('EmotionController', ['$scope', '$modal', 'emotionsFromDB', 'EmotionService',
    function ($scope, $modal, emotionsFromDB, EmotionService) {
            console.log("dans le controller EmotionController");
            $scope.emotions = emotionsFromDB;
            //console.log(emotionsFromDB);

            $scope.create = function () {
                console.log("dans le controller create");
                $scope.clear();
                $scope.open();
            };
        
           $scope.get = function () {
               
                console.log("dans le get");
                
            };

            $scope.update = function (_id) {
                console.log("dans le controller update");
                $scope.emotion = EmotionService.query({
                    _id: _id
                });
                $scope.open(_id);
            };

            $scope.delete = function (_id) {
                console.log("dans le controller delete");
                EmotionService.delete({
                        _id: _id
                    },
                    function () {
                        $scope.emotions = EmotionService.query();
                    });
            };
        
            $scope.save = function (_id) {
                console.log("dans le controller save");
                if (_id) {
                    console.log("dans le if (_id) " + _id);
                    EmotionService.update({
                            _id: _id
                        }, $scope.emotion,
                        function () {
                            $scope.emotions = EmotionService.query();
                            $scope.clear();
                        });
                } else {
                    console.log("dans le else) ");
                    EmotionService.save($scope.emotion,
                        function () {
                            $scope.emotions = EmotionService.query();
                            $scope.clear();
                        });
                }
            };

            $scope.clear = function () {
                console.log("dans le controller clear");
                $scope.emotion = {

                    title: "",


                    coords: "",

                    feeling: {
                        type: ""
                    }
                };
            };

            $scope.open = function (_id) {
                console.log("dans le controller open");
                var emotionSave = $modal.open({
                    templateUrl: 'emotion-save.html',
                    controller: 'EmotionSaveController',
                    resolve: {
                        emotion: function () {
                            return $scope.emotion;
                        }
                    }
                }); 
                
                

                emotionSave.result.then(function (entity) {
                    console.log("dans le controller emotionSave");
                    $scope.emotion = entity;
                    $scope.save(_id);
                });
            };
        
        

        
    }])
    .controller('EmotionSaveController', ['$scope', '$modalInstance', 'emotion',
    function ($scope, $modalInstance, emotion) {
            $scope.emotion = emotion;



            $scope.ok = function () {
                console.log("dans le controller OK");
                $modalInstance.close($scope.emotion);
            };

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
    }]);