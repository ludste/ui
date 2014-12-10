/**
 * Created by ludste on 10/12/14.
 */
'use strict';

angular.module('uiApp')
  .service('BuyIdea', ['$rootScope', 'Session', 'Ideas', '$log', function ($rootScope, Session, Ideas, $log) {
    return {
      canBuyIdea: function (idea) {
        var canBuy = (Session.currentUser.email != idea.owner.email);
        $log.debug("BuyIdea - Evaluating if idea can be bought " + canBuy);
        return canBuy;
      },

      ideaBought: false,
      buyIdea: function (idea, index) {
        $log.debug("BuyIdea - Buying an idea");
        Ideas.buy({ideaId: idea.id}, idea,
          function (data, code) {
            $log.debug("BuyIdea - Idea bought");
            $rootScope.$broadcast('idea_bought_ok', {idea: idea, index: index});
          },
          function (data) {
            $log.debug("BuyIdea - Idea bought fail");
            if (data.status == 404) {
              $rootScope.$broadcast('idea_not_found');
            }
          });
      }
    };
  }]);
