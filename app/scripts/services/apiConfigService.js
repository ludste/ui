'use strict';

angular.module('uiApp')
  .factory('ApiConfig', [function () {
    var baseUrl = 'http://localhost:3000/';

    return {
      login_url: baseUrl + 'api/users/sign_in.json',
      logout_url: baseUrl + 'api/users/sign_out.json',
      ideas_url: baseUrl + 'api/ideas/:ideaId.json',
      private_ideas_url: baseUrl + 'api/ideas/mine.json'
    }
  }]);
