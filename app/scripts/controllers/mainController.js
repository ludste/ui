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
    $scope.$on('ideas.update', function () {
      $scope.ideas = Ideas.query();
    });
    $scope.newIdeas = Ideas.query();

  }]);
