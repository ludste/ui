/**
 * Created by ludste on 27/11/14.
 */
'use strict';

angular.module('uiApp')
  .service('Ideas', ['$rootScope', function ($rootScope) {
    var service = {
      ideas: [
        {
          name: 'Selling hugs',
          description: 'A new company that sells hugs to lonely people. I think this will make a lot of money',
          email: 'hugger@myMail.com',
          owner: 'Mr. Hugsalot',
          keyWords: 'Hug, Selling, Joy, Friends'
        },
        {
          name: 'Make bike tires',
          description: 'Today bike tires are so ugly. I want to make new tires in happy colors and with fancy designs',
          email: 'cycles@spinning.com',
          owner: 'Jenna Rolling.',
          keyWords: 'Bike, tire, Color, Design'
        }
      ],


      addIdea: function (idea) {
        service.ideas.push(idea);
        $rootScope.$broadcast('idea.update');
      }
    };

    return service;

    /*    return $resource(
     'api/idea/:ideaId', //URL
     {ideaId: '@id'}	//Default paramaters
     );*/
  }]);
