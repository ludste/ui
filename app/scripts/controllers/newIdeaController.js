/**
 * Created by ludste on 27/11/14.
 */
'use strict';
angular.module('uiApp')
  .controller('NewIdeaController', ['$scope', '$log', '$location', 'Ideas', function ($scope, $log, $location, Ideas) {
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
        },
        function () {
          $location.path('/myIdeas');
        }
      );
      $scope.$broadcast('ideas.update');
    };
  }
  ]);
