/**
 * Created by ludste on 27/11/14.
 */
'use strict';

angular.module('uiApp')
  .service('Ideas', ['$rootScope', '$resource', 'ApiConfig', function ($rootScope, $resource, ApiConfig) {
    return $resource(ApiConfig.ideas_url, {}, {
      getPrivateIdeas: {method: 'GET', url: ApiConfig.private_ideas_url, isArray: true},
      update: {method: 'PUT'},
      buy: {method: 'POST', url: ApiConfig.buy_request_ideas_url},
      acceptBuyRequest: {method: 'POST', url: ApiConfig.accept_buy_request_ideas_url},
      rejectBuyRequest: {method: 'POST', url: ApiConfig.reject_buy_request_ideas_url},
      addNewComment: {method: 'POST', url: ApiConfig.add_new_comment_url}
    });
  }]);
