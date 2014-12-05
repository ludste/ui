'use strict';
/**
 * @ngdoc function
 * @name uiApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the uiApp
 */
angular.module('uiApp')
  .controller('MainController', ['$scope', '$log', 'Ideas', function ($scope, $log, Ideas) {
    $scope.init = function () {
      $scope.ideas = Ideas.getPrivateIdeas();
      /*    $scope.ideas = [{
       id: 32,
       name: 'Idea that someone want to buy',
       description: 'This is a cool idea that I want to buy. The Idea is about a team that is really good at coding and want to sell themselves for very little money.',
       buyer: null,
       published: false

       }, {
       id: 1,
       name: 'Idea that someone want to buy',
       description: 'This is a cool idea that I want to buy. The Idea is about a team that is really good at coding and want to sell themselves for very little money.',
       buyer: null,
       published: true

       },
       {
       id: 54,
       name: 'Idea that someone want to buy',
       description: 'This is a cool idea that I want to buy. ' +
       'asdas ' +
       ' das' +
       'das dasdas asd das das ds n fbsda, badsl gkdThe Idea is about a team that is really good at coding and want to sell themselves for very little money.',
       buyer: {
       first_name: 'Kalle',
       last_name: 'Svensson',
       email: 'mymail@mail.com',
       phone: '070666-666'
       },
       published: false
       }
       ];*/
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
      ;
    };
    $scope.deleteIdea = function (idea, index) {
      Ideas.delete({ideaId: idea.id}, function (response) {
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
  }])
;
