/**
 * Created by ludste on 28/11/14.
 */
'use strict';

angular.module('uiApp')
  .controller('SessionController', ['$scope', '$http', '$log', '$timeout', '$window',
    function ($scope, $http, $log, $timeout, $window) {
      // the model that we bind to the input box
      $scope.formData = {
        email: '',
        pass: ''
      };
      $scope.response = {
        status: '',
        reason: '',
        session_id: ''
      };

      $scope.successMsgVisible = false;
      $scope.errorMsgVisible = false;

      // the function to login
      $scope.login = function (email, pass) {

        // the payload is simple the json object that we used for binding to the input
        //$log.info(email)
        //$log.info(pass)
        var payload = {
          email: email,
          password: pass
        };

        $log.info(payload);
        $http.post('/api/login', payload)
          .success(function (data, status, header, config) {
            $log.info(data);
            $log.info(status);

            $log.info('Success logging in the user');
            // When we get a response object back it will be set here
            //	if (angualar.equals(data.status, 'ok') {
            //		$scope.session_id = data.sessionID
            //	}
            //   show a success message
            $scope.successMsgVisible = true;
            //    let the message dissapear after 2 secs
            $timeout(function () {
              $scope.successMsgVisible = false;
              // Insert the userID insted of 5 later
              $window.location.href = '/#/user/5/home';
            }, 2000);
          })
          .error(function (data, status) {
            $log.info('Error while trying to login user.');

            // show a success message
            $scope.errorMsgVisible = true;
            //    let the message dissapear after 2 secs
            $timeout(function () {
              $scope.errorMsgVisible = false;
            }, 2000);

          });
      };


      // the function to logout
      $scope.logout = function () {

        $http.get('/api/logout')
          .success(function (data, status, header, config) {

            $log.debug('Success logging out the user');

            // show a success message
            $scope.successMsgVisible = true;
            // let the message dissapear after 2 secs
            $timeout(function () {
              $scope.successMsgVisible = false;
            }, 2000);
          })
          .error(function (data, status) {
            $log.debug('Error while logging out the user.');
          });
      }
    }
  ]);
