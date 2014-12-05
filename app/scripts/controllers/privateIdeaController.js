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
      /*
       $scope.ideas = Ideas.getPrivateIdeas();
       */
      $scope.ideas = [{
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
      ];
    };
    $scope.respondToBuyRequest = function (id, index, respose) {
      var idea = Ideas.get({ideaId: id}, function () {
        if (respose) {
          idea.accepted = true;
          $scope.ideas.splice(index, 1);
        } else {
          idea.accepted = false;
          idea.buyer = null;
        }
        idea.$save();
      });
    };
    $scope.deleteIdea = function (id, index) {
      Ideas.delete({ideaId: id}, function (response) {
      });
      $scope.ideas.splice(index, 1);
    };

    $scope.publishIdea = function (id, index, publish) {
      $scope.ideas[index].published = publish;
      var idea = Ideas.get({ideaId: id}, function () {
        idea.published = publish;
        idea.$save();
      });
    };
    $scope.init();
  }]);
