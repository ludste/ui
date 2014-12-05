/**
 * Created by ludste on 27/11/14.
 */
'use strict';

angular.module('uiApp')
  .service('Ideas', ['$rootScope', '$resource', 'ApiConfig', function ($rootScope, $resource, ApiConfig) {
    return $resource(ApiConfig.ideas_url, {}, {
      getPrivateIdeas: {method: 'GET', url: ApiConfig.private_ideas_url}
    });
  }]);
