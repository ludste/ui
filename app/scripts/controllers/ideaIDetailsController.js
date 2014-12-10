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
              comment: "This idea sucks! better get a job!",
              created_at: "2014-04-23T18:25:43.511Z"
            },
            {
              owner: {
                first_name: "Ismael",
                last_name: "Mendonca",
                email: "ismael@email.com"
              },
              comment: "Yeah, is a shitty idea!",
              created_at: "2012-04-23T19:25:43.511Z"
            }
          ];
        }
      });
      $scope.newComment = '';
      $scope.isAutheticated = Session.isAuthenticated();
      $log.debug("Is authenticated : " + $scope.isAuthenticated);
      $log.debug("Current user : " + Session.currentUser);

      //Register event for when idea not found modal is closed.
      $('#ideaNotFound').on('hidden.bs.modal', function () {
        $window.location.href = '/#/ideas';
      });
    };

    $scope.canBuyIdea = function (idea) {
      return BuyIdea.canBuyIdea(idea);
    };

    $scope.buyIdea = function (idea, index) {
      BuyIdea.buyIdea(idea, index);
    };

    $scope.$on('idea_bought_ok', function (idea, index) {
      $log.debug('Responded to idea_bought_ok event ');
      $scope.bought = true;
      $scope.message = "You've requested to by this idea: " + idea.name;
    });

    $scope.$on('idea_not_found', function (idea, index) {
      $log.debug('Responded to idea_not_found event ');
      $('#ideaNotFound').modal('toggle');
    });

    $scope.$on('added_comment', function () {
      refreshIdea();
    });

    $scope.addComment = function () {
      $log.debug("Adding new comment to idea");
      if ($scope.newComment.length > 0) {
        $scope.idea.comments.push(
          {
            comment: $scope.newComment
          });
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
      $('#deleteIdea').modal('toggle');
    };
    $scope.deleteIdea = function (idea, index) {
      $('#deleteIdea').modal('toggle');
      Ideas.delete({ideaId: idea.id}, function (response) {
        $window.location.href = '/#/ideas';
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

    $scope.init();
  }]);
