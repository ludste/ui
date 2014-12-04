'use strict';

angular.module('uiApp')
  .controller('LoginController', ['$rootScope', '$scope', '$http', '$log', '$timeout', '$window', '$cookieStore', 'Session',
    function ($rootScope, $scope, $http, $log, $timeout, $window, $cookieStore, Session) {
      $scope.init = function () {
        // the model that we bind to the input box
        $scope.formData = {
          email: '',
          pass: ''
        };
        $scope.successMsgVisible = false;
        $scope.errorMsgVisible = false;
        $scope.emptyFields = false;

      };
      // the function to login
      $scope.login = function () {
        $log.debug($scope.formData);
        if ($scope.formData.email.length !== 0 || $scope.formData.pass.length !== 0) {
          Session.login($scope.formData.email, $scope.formData.pass);
        } else {
          $scope.emptyFields = true;
        }


        // the payload is simple the json object that we used for binding to the input
        /*        var payload = {
         email: email,
         password: pass
         };*/

        /*        $http.post('/api/login', payload)
         .success(function (data, status, header, config) {
         $log.debug('Success logging in the user');
         $scope.successMsgVisible = true;
         $timeout(function () {
         $cookieStore.put('loggedIn', true);
         $cookieStore.put('userId', data.id);
         $rootScope.$broadcast('loggedIn');
         $scope.successMsgVisible = false;
         $window.location.href = '/#/user/' + data.id + '/home';
         }, 500);
         })
         .error(function (data, status) {
         $log.info('Error while trying to login user.');
         // show a success message
         $scope.errorMsgVisible = true;
         //    let the message dissapear after 2 secs
         $timeout(function () {
         $scope.errorMsgVisible = false;
         }, 2000);

         });*/
      };
      $scope.init();

    }]);
