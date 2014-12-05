'use strict';

/**
 * @ngdoc overview
 * @name uiApp
 * @description
 * # uiApp
 *
 * Main module of the application.
 */
angular
  .module('uiApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'sessionService'
  ]).config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
    $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
    $httpProvider.interceptors.push(['$location', '$rootScope', '$q', function ($location, $rootScope, $q) {
      return {
        'responseError': function (rejection) {
          if (rejection.status === 401) {
            $rootScope.$broadcast('event:unauthorized');
            $location.path('/login');
            return rejection;
          }

          return $q.reject(rejection);
        }
      };
    }]);
  }])
/** Turn on/off the angular debugging; should be off when deployed */
  .config(['$logProvider', function ($logProvider) {
    $logProvider.debugEnabled(true);
  }])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/newIdea', {
        templateUrl: 'views/newIdea.html',
        controller: 'NewIdeaController'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginController'
      })
      .when('/logout', {
        templateUrl: 'views/login.html',
        controller: 'LogoutController'
      })
      .when('/signup', {
        templateUrl: 'views/login.html',
        controller: 'SignupController'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutController'
      })
      .when('/Contact', {
        templateUrl: 'views/contact.html',
        controller: 'ContactController'
      })
      .when('/ideas', {
        templateUrl: '../views/list_idea_public.html',
        controller: 'MainController'
      }).when('/myIdeas', {
        templateUrl: '../views/list_idea_private.html',
        controller: 'MainController'
      })
      .when('/signup', {
        templateUrl: 'views/signup.html',
        controller: 'SignupController'
      })
      .otherwise({
        redirectTo: '/login'
      });
  }]);
