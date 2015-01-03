'use strict';

angular.module('happy')
  .controller('EmotionController', ['$scope', '$modal', 'resolvedEmotion', 'Emotion',
    function ($scope, $modal, resolvedEmotion, Emotion) {

      $scope.emotions = resolvedEmotion;

      $scope.create = function () {
        $scope.clear();
        $scope.open();
      };

      $scope.update = function (id) {
        $scope.emotion = Emotion.get({id: id});
        $scope.open(id);
      };

      $scope.delete = function (id) {
        Emotion.delete({id :id},
          function () {
            $scope.emotions = Emotion.query();
          });
      }; 

      $scope.save = function (id) {
        if (id) {
          Emotion.update({id: id}, $scope.emotion,
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
        $scope.emotion = {
          
          "title": "",
            
          "location": {"latitude":"","longitude":""},
            
          "feeling":{"type":""}
          
          };
      };

      $scope.open = function (id) {
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
          $scope.emotion = entity;
          $scope.save(id);
        });
      };
    }])
  .controller('EmotionSaveController', ['$scope', '$modalInstance', 'emotion',
    function ($scope, $modalInstance, emotion) {
      $scope.emotion = emotion;

      

      $scope.ok = function () {
        $modalInstance.close($scope.emotion);
      };

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
    }]);
