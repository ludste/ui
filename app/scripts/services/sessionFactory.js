/**
 * Created by ludste on 04/12/14.
 */
'use strict';
angular.module('sessionService', [])
  .factory('Session', ['$location', '$http', '$q', '$log', 'ApiConfig', function ($location, $http, $q, $log, ApiConfig) {
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
              $location.path('/ideas');
            }
          });
      },

      logout: function () {
        $http.delete(ApiConfig.logout_url).then(function () {
          service.currentUser = null;
          redirect("/");
        });
      },

      currentUser: null,

      isAuthenticated: function () {
        return !!service.currentUser;
      }
    };

    return service;
  }]);
