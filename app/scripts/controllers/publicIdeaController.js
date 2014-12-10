'use strict';

/**
 * @ngdoc function
 * @name uiApp.controller:PublicListCtrl
 * @description
 * # PublicListCtrl
 * Controller for the public list of ideas
 */
angular.module('uiApp')
  .controller('PublicIdeaController',
  ['$scope', 'Session', '$log', 'Ideas', '$timeout', 'BuyIdea',
    function ($scope, Session, $log, Ideas, $timeout, BuyIdea) {
      $scope.init = function () {
        refreshIdeasList();
        $scope.comment = '';
        $scope.isAutheticated = Session.isAuthenticated();
      };

      $scope.$on('ideas.update', function () {
        $scope.ideas = Ideas.query();
      });

      $scope.canBuyIdea = function (idea) {
        return BuyIdea.canBuyIdea(idea);
      };

      $scope.buyIdea = function (idea, index) {
        BuyIdea.buyIdea(idea, index);
      };

      $scope.$on('idea_bought_ok', function (idea, index) {
        $log.debug('Responded to idea_bought_ok event ')
        $scope.ideas.splice(index, 1);
        $scope.bought = true;
        $scope.message = "You've requested to by the idea: " + idea.name;
        $timeout(function () {
          $scope.bought = false;
        }, 3000);
      });
      $scope.$on('idea_not_found', function (idea, index) {
        $log.debug('Responded to idea_not_found event ');
        $('#ideaNotFound').modal('toggle');
        refreshIdeasList();
      });


      var refreshIdeasList = function () {
        $scope.ideas = Ideas.query();

      };
      $scope.init();
    }]);
