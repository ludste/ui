/**
 * Created by ludste on 27/11/14.
 */
'use strict';
angular.module('uiApp')
  .controller('IdeaController', ['$scope', '$log', 'Ideas', function ($scope, $log, Ideas) {
    $scope.newIdea = {
      name: '',
      description: '',
      email: '',
      owner: '',
      keyWords: ''
    };
    /*

     $scope.$on('ideas.update', function () {
     $scope.ideas = Ideas.ideas;
     });
     $scope.ideas = Ideas.ideas;
     */

    $scope.addNewIdea = function (name, description, email, owner, keywords) {
      Ideas.addIdea(
        {
          name: name,
          description: description,
          email: email,
          owner: owner,
          keyWords: keywords
        }
      );
    };
  }
  ]);
