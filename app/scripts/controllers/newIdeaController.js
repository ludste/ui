/**
 * Created by ludste on 27/11/14.
 */
'use strict';
angular.module('uiApp')
  .controller('NewIdeaController', ['$scope', '$log', 'Ideas', function ($scope, $log, Ideas) {
    $scope.newIdea = {
      name: '',
      description: '',
      email: '',
      owner: '',
      keywords: ''
    };

    $scope.addNewIdea = function (name, description, email, owner, keywords) {
      Ideas.save(
        {
          name: name,
          description: description,
          email: email,
          owner: owner,
          keywords: keywords
        }
      );
      $scope.$broadcast('ideas.update');
    };
  }
  ]);
