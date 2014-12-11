'use strict';
/**
 * @ngdoc function
 * @name uiApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the uiApp
 */
angular.module('uiApp')
  .controller('IdeaModeratorController', ['$scope', '$log', 'Ideas', function ($scope, $log, Ideas) {
    $scope.init = function () {
      $scope.ideas = Ideas.query();
      $log.debug($scope.ideas);
    };

    $scope.showDeleteDialog = function (idea, index) {
      $scope.ideaToDelete = idea;
      $scope.ideaIndex = index;
      $('#deleteIdea').modal('toggle');
    };
    $scope.deleteIdea = function (idea, index) {
      $('#deleteIdea').modal('toggle');
      Ideas.delete({ideaId: idea.id}, function (response) {
        $log.debug(response);
        $scope.message = "Your idea have been deleted!";
      });
      $scope.ideas.splice(index, 1);
    };
    $scope.init();
  }
  ])
;
