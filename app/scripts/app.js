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
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/newIdea', {
        templateUrl: 'views/newIdea.html',
        controller: 'IdeaController'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'SessionController'
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
        templateUrl: 'views/list_idea.html',
        controller: 'MainController'
      })
      .otherwise({
        redirectTo: '/ideas'
      });
  });
