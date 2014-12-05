'use strict';

angular.module('uiApp')
  .controller('LogoutCtrl', ['$rootScope', '$scope', '$http', '$log', '$timeout', '$window', 'Users', '$cookieStore',
    function ($rootScope, $scope, $http, $log, $timeout, $window, Users, $cookieStore) {
      $scope.init = function () {
        $scope.successMsgVisible = false;
        $scope.errorMsgVisible = false;
      };
      // the function to logout


      $scope.init();

    }]);
