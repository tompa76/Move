(function() {
  'use strict';

  angular
    .module('move')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {


    $urlRouterProvider.otherwise('/home');
  }

})();
