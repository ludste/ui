'use strict';
/**
 * @ngdoc function
 * @name uiApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the uiApp
 */
angular.module('uiApp')
  .controller('IdeaDetailsController', ['$scope', '$log', 'Ideas', '$routeParams', 'Session', 'BuyIdea', '$window', function ($scope, $log, Ideas, $routeParams, Session, BuyIdea, $window) {
    $scope.init = function () {
      $log.debug('IdeaDetailsController - init');
      $scope.ideaId = $routeParams.ideaId;
      $scope.idea = Ideas.get({ideaId: $scope.ideaId}, function (response) {
        if ($scope.idea.comments == null) {
          $scope.idea.comments = [
            {
              owner: {
                first_name: "Ludvig",
                last_name: "Stenstrom",
                email: "ludvig@email.com"
              },
              id: 21,
              comment: "This idea sucks! better get a job!",
              created_at: "2014-04-23T18:25:43.511Z"
            },
            {
              owner: {
                first_name: "Ismael",
                last_name: "Mendonca",
                email: "ismael@email.com"
              },
              id: 22,
              comment: "Yeah, is a shitty idea!",
              created_at: "2012-04-23T19:25:43.511Z"
            }
          ];
        }
      });
      $scope.newComment = '';
      if(Session.isAuthenticated()){
        $scope.user = Session.fetchCurrentUser();
      }
      $scope.isModerator = Session.isModerator();
    };

    $scope.canBuyIdea = function (idea) {
      return BuyIdea.canBuyIdea(idea);
    };

    $scope.buyIdea = function (idea) {
      BuyIdea.buyIdea(idea);
    };

    $scope.$on('idea_bought_ok', function (idea) {
      $log.debug('Responded to idea_bought_ok event ');
      $scope.bought = true;
      $scope.message = "You've requested to by this idea: " + idea.name;
    });

    $scope.$on('idea_not_found', function () {
      $log.debug('Responded to idea_not_found event ');
      $('#ideaNotFound').modal('toggle');
    });

    $scope.$on('added_comment', function () {
      refreshIdea();
    });

    $scope.addComment = function () {
      $log.debug("Adding new comment to idea");
      if ($scope.newComment.length > 0) {
        /* $scope.idea.comments.push(
         {
         comment: $scope.newComment
         });*/
        Ideas.addNewComment({ideaId: $scope.ideaId}, {comment: $scope.newComment}, function (response) {
          $log.debug(response);
          $scope.$broadcast('added_comment');
        });
        $scope.newComment = '';
      }
    };


    $scope.respondToBuyRequest = function (idea, index, respose) {
      if (respose) {
        idea.accepted = true;
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
      $('#deleteConfirm').modal('toggle');
    };
    $scope.deleteIdea = function (idea, index) {
      $('#deleteConfirm').modal('toggle');
      Ideas.delete({ideaId: idea.id}, function (response) {
        $window.location.href = '/#/ideas';
      });
    };
    $scope.deleteComment = function (comment, index) {
      $('#deleteConfirm').modal('toggle');
      Ideas.delete({ideaId: comment.id}, function (response) {
        $scope.idea.comments.splice(index, 1);
      });
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

    var refreshIdea = function () {
      $scope.idea = Ideas.get({ideaId: $scope.ideaId});
    };

    $scope.updateIdea = function (idea) {
      Ideas.update({ideaId: idea.id}, idea, function () {
        $scope.message = "Your idea has been updated!";
      });
    };

    $scope.init();
  }]);
