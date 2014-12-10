/**
 * Created by ludste on 01/12/14.
 */

'use strict';

angular.module('uiApp')
  .controller('SignupController', ['$rootScope', '$scope', '$log', '$window', '$cookieStore', 'Session', function ($rootScope, $scope, $log, $window, $cookieStore, Session) {
    $scope.init = function () {
      // the model that we bind to the input boxes
      $scope.signupData = {
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        password: '',
        passwordRepeat: ''
      };
      $scope.$passwordError = false;
    };
    $scope.signup = function () {
      $log.debug('Password length = ' + $scope.signupData.password.length);
      if (!angular.equals($scope.signupData.password, $scope.signupData.passwordRepeat) ||
        $scope.signupData.password.length < 2 ||
        $scope.signupData.password.length > 20
      ) {
        $scope.$passwordError = true;
        return;
      }
      var newUser = {};
      newUser.first_name = $scope.signupData.first_name;
      newUser.last_name = $scope.signupData.last_name;
      newUser.email = $scope.signupData.email;
      newUser.phone = $scope.signupData.phone;
      newUser.password = $scope.signupData.password;

      Session.register(newUser);
    };

    $scope.init();
  }]);
