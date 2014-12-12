'use strict';

angular.module('uiApp')
  .controller('LoginController', ['$scope', '$log', 'Session', '$timeout',
    function ($scope, $log, Session, $timeout) {
      $scope.user = {
        email: '',
        password: ''
      };

      $scope.login = function () {
        Session.login($scope.user.email, $scope.user.password);
        $timeout(function () {
          if (Session.loginError.length > 0) {
            $scope.errorMsgVisible = true;
          }
        }, 500);

      };
    }]);
