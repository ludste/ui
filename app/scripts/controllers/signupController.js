/**
 * Created by ludste on 01/12/14.
 */

'use strict';

angular.module('uiApp')
  .controller('SignupController', ['$rootScope', '$scope', '$log', '$window', '$cookieStore', function ($rootScope, $scope, $log, $window, $cookieStore) {
    $scope.init = function () {
      // the model that we bind to the input boxes
      $scope.signupData = {
        name: '',
        lastname: '',
        email: '',
        password: '',
        passwordRepeat: '',
      };
      $scope.$passwordErro = false;

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
      var newUser = new Users.resource();
      newUser.name = $scope.signupData.name;
      newUser.lastname = $scope.signupData.lastname;
      newUser.email = $scope.signupData.email;
      newUser.password = $scope.signupData.password;


      newUser.$save().then(function (response) {
        var id = response.id;
        $rootScope.$broadcast('loggedIn', {userId: id});
        $cookieStore.put('loggedIn', true);
        $cookieStore.put('userId', id);
        $window.location.href = '/#/user/' + id + '/home';
      });
    };

    $scope.init();
  }]);
