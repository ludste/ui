/**
 * Created by ludste on 04/12/14.
 */
'use strict';
angular.module('sessionService', [])
  .factory('Session', function ($location, $http, $q) {
    // Redirect to the given url (defaults to '/')
    function redirect(url) {
      url = url || '/';
      $location.path(url);
    }

    var users = {
      0: {
        name: 'Ludivg'
      },
      1: {}
    };
    var service = {
      login: function (email, password) {
        return $http.post('/api/sessions', {user: {email: email, password: password}})
          .then(function (response) {
            service.currentUser = response.data.user;
            if (service.isAuthenticated()) {
              //TODO: Send them back to where they came from
              //$location.path(response.data.redirect);
              $location.path('/ideas');
            }
          });
      },

      logout: function (redirectTo, userId) {
        $http.delete('/api/sessions/' + userId).then(function () {
          service.currentUser = null;
          redirect(redirectTo);
        });
      },

      register: function (newUser) {
        return $http.post('api/users.json', newUser)
          .then(function (response) {
            service.currentUser = response.data;
            if (service.isAuthenticated()) {
              $location.path('/ideas');
            }
          });
      },
      requestCurrentUser: function () {
        if (service.isAuthenticated()) {
          return $q.when(service.currentUser);
        } else {
          return $http.get('/current_user').then(function (response) {
            service.currentUser = response.data.user;
            return service.currentUser;
          });
        }
      },

      currentUser: null,

      isAuthenticated: function () {
        return !!service.currentUser;
      }
    };
    return service;
  });
