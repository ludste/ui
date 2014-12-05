'use strict';

/**
 * @ngdoc function
 * @name uiApp.controller:AboutController
 * @description
 * # AboutController
 * Controller of the uiApp
 */
angular.module('uiApp')
  .controller('HeaderController', ['$scope', 'Session', function ($scope, Session) {
    /*
     $scope.isAuthenticated = Session.isAuthenticated();
     */
    $scope.isAuthenticated = true;
  }]);
