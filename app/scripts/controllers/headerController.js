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
    var refreshUserInfo = function () {
      $scope.isAuthenticated = Session.isAuthenticated();
      if (Session.currentUser) {
        $scope.email = Session.currentUser.email;
      }
    };

    $scope.$on('logged_in', function () {
      refreshUserInfo();
    });

    $scope.$on('logged_out', function () {
      refreshUserInfo();
    });

    $scope.logOut = function () {
      Session.logout();
    };

    refreshUserInfo();
  }]);
