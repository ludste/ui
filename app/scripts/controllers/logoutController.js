'use strict';

angular.module('uiApp')
  .controller('LogoutCtrl', ['$rootScope', '$scope', '$http', '$log', '$timeout', '$window', 'Users', '$cookieStore',
    function ($rootScope, $scope, $http, $log, $timeout, $window, Users, $cookieStore) {
      $scope.init = function () {
        $scope.successMsgVisible = false;
        $scope.errorMsgVisible = false;
      };
      // the function to logout
      $scope.logout = function () {
        $http.get('/api/logout')
          .success(function (data, status, header, config) {
            $log.debug('Success logging out the user');
            Users.restUser();
            $cookieStore.put('loggedIn', false);
            $cookieStore.put('userId', -1);
            $scope.successMsgVisible = true;
            $rootScope.$broadcast('loggedOut');
            // let the message dissapear after 2 secs
            $timeout(function () {
              $scope.successMsgVisible = false;
              $window.location.href = '/#/login';
            }, 500);
          })
          .error(function (data, status) {
            $log.debug('Error while logging out the user.');
          });
      };

      $scope.init();

    }]);
