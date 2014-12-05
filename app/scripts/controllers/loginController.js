'use strict';

angular.module('uiApp')
  .controller('LoginController', ['$scope', '$log', 'Session',
    function ($scope, $log, Session) {
      $scope.user = {
        email: '',
        password: ''
      };

      $scope.login = function () {
        Session.login($scope.user.email, $scope.user.password);
      };
    }]);
