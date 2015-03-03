'use strict';

angular.module('happy')
    .controller('EmotionController', ['$scope', '$modal', 'resolvedEmotion', 'EmotionService',
    function ($scope, $modal, resolvedEmotion, EmotionService) {
            console.log("dans le controller EmotionController");
            $scope.emotions = resolvedEmotion;

            $scope.create = function () {
                console.log("dans le controller create");
                $scope.clear();
                $scope.open();
            };

            $scope.update = function (id) {
                console.log("dans le controller update");
                $scope.emotion = Emotion.get({
                    id: id
                });
                $scope.open(id);
            };

            $scope.delete = function (id) {
                console.log("dans le controller delete");
                Emotion.delete({
                        id: id
                    },
                    function () {
                        $scope.emotions = Emotion.query();
                    });
            };

            $scope.save = function (id) {
                console.log("dans le controller save");
                if (id) {
                    Emotion.update({
                            id: id
                        }, $scope.emotion,
                        function () {
                            $scope.emotions = Emotion.query();
                            $scope.clear();
                        });
                } else {
                    Emotion.save($scope.emotion,
                        function () {
                            $scope.emotions = Emotion.query();
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

            $scope.open = function (id) {
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
                    $scope.save(id);
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