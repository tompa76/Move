(function() {
  'use strict';

  angular.module('move.root', [])
    .config(function($stateProvider) {
      $stateProvider
        .state('root', {
          abstract: true,
          templateUrl: 'app/views/root/partials/root/root.html',
          controller: 'RootController',
          controllerAs: 'rootController',
          scope: {}
        })
    });
})();
