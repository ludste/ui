'use strict';

angular.module('uiApp')
  .factory('ApiConfig', [function () {
    var baseUrl = 'http://localhost:3000/';

    return {
      login_url: baseUrl + 'api/users/sign_in.json',
      logout_url: baseUrl + 'api/users/sign_out.json',
      current_user_url: baseUrl + 'api/me.json',
      ideas_url: baseUrl + 'api/ideas/:ideaId.json',
      private_ideas_url: baseUrl + 'api/ideas/mine.json',
      buy_request_ideas_url: baseUrl + 'api/ideas/:ideaId/buy.json',
      accept_buy_request_ideas_url: baseUrl + 'api/ideas/:ideaId/accept.json',
      reject_buy_request_ideas_url: baseUrl + 'api/ideas/:ideaId/reject.json',
      add_new_comment_url: baseUrl + 'api/ideas/:ideaId/comments.json',
      allIdeas: baseUrl + 'api/ideas.json'
    }
  }]);
