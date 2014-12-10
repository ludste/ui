'use strict';
/**
 * @ngdoc function
 * @name uiApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the uiApp
 */
angular.module('uiApp')
  .controller('PrivateIdeaController', ['$scope', '$log', 'Ideas', function ($scope, $log, Ideas) {
    $scope.init = function () {
      $scope.ideas = Ideas.getPrivateIdeas();
      $log.debug($scope.ideas);
    };
    $scope.respondToBuyRequest = function (idea, index, respose) {
      if (respose) {
        idea.accepted = true;
        $scope.ideas.splice(index, 1);
        Ideas.acceptBuyRequest({ideaId: idea.id}, idea);
      } else {
        idea.accepted = false;
        idea.buyer = null;
        Ideas.rejectBuyRequest({ideaId: idea.id}, idea);
      }
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

    $scope.publishIdea = function (idea, index, publish) {
      idea.published = publish;
      Ideas.update({ideaId: idea.id}, idea, function () {
        if (publish) {
          $scope.message = "Your idea has been published!";
        } else {
          $scope.message = "Your idea has been unpublished!";
        }
      });
    };
    $scope.init();
  }
  ])
;
