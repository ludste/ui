'use strict';

/**
 * @ngdoc function
 * @name uiApp.controller:PublicListCtrl
 * @description
 * # PublicListCtrl
 * Controller for the public list of ideas
 */
angular.module('uiApp')
  .controller('PublicListController', ['$scope', 'Session', '$log', 'Ideas', '$timeout', function ($scope, Session, $log, Ideas, $timeout) {
    $scope.$on('ideas.update', function () {
      $scope.ideas = Ideas.query();
    });
    $scope.ideas = Ideas.query();
    //mock
    /* $scope.ideas = [
     {id: 1, name: 'Idea 1', description: 'Whatever description 1'},
     {id: 2, name: 'Idea 2', description: 'Whatever description 2'},
     {id: 3, name: 'Idea 3', description: 'Whatever description 3'},
     {id: 4, name: 'Idea 4', description: 'Whatever description 4'},
     {id: 5, name: 'Idea 5', description: 'Whatever description 5'},
     {id: 6, name: 'Idea 6', description: 'Whatever description 6'},
     ];*/

    $scope.comment = '';


    $scope.isAutheticated = Session.isAuthenticated();

    $scope.canBuyIdea = function (idea) {
      $log.debug(idea.owner.email);
      return (Session.currentUser && Session.currentUser.email != idea.owner.email);
    };

    $scope.buyIdea = function (idea, index) {
      $log.debug(idea);
      Ideas.buy({ideaId: idea.id}, idea);

      var idea_name = idea.name;
      $scope.ideas.splice(index, 1);
      $scope.bought = true;
      $scope.message = "You've requested to by the idea: " + idea_name;
      $timeout(function () {
        $scope.bought = false;
      }, 3000);
    };


    //$scope.commentIdea= function(id){
    //  //var result = Ideas.updateOn(comment);
    //  console.log($scope.comment);
    //}

  }]);
