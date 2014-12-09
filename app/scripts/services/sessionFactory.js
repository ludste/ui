/**
 * Created by ludste on 04/12/14.
 */
'use strict';
angular.module('sessionService', [])
  .factory('Session', ['$rootScope', '$location', '$http', '$q', '$log', 'ApiConfig', function ($rootScope, $location, $http, $q, $log, ApiConfig) {
    // Redirect to the given url (defaults to '/')
    function redirect(url) {
      url = url || '/';
      $location.path(url);
    }

    var service = {
      login: function (email, password) {
        return $http.post(ApiConfig.login_url, {user: {email: email, password: password}})
          .then(function (response) {
            service.currentUser = response.data;

            if (service.isAuthenticated()) {
              $rootScope.$broadcast('logged_in');
              $location.path('/ideas');
            }
          });
      },

      logout: function () {
        $http.delete(ApiConfig.logout_url).then(function () {
          service.currentUser = null;
          $rootScope.$broadcast('logged_out');
          redirect("/");
        });
      },

      currentUser: null,

      isAuthenticated: function () {
        $log.debug("Current user:");
        $log.debug(!!service.currentUser);
        return !!service.currentUser;
      },

      fetchCurrentUser: function () {
        $http.get(ApiConfig.current_user_url)
          .then(function (response) {
            service.currentUser = response.data;

            if (service.isAuthenticated()) {
              $rootScope.$broadcast('logged_in');
              $location.path('/ideas');
            }
          });
      },
      register: function (newUser) {
        return null;
      }
    };

    service.fetchCurrentUser();

    return service;
  }])
;
