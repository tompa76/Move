(function() {
  'use strict';

  angular
    .module('move.root')
    .directive('troTopMenu', troTopMenu);

  /** @ngInject */
  function troTopMenu() {
    return {
      restrict: 'E',
      templateUrl: 'app/views/root/directives/top-menu/top-menu.directive.html',
      scope: {
      },
      controller: TopMenuController,
      controllerAs: 'topMenuController',
      bindToController: true
    };

    /** @ngInject */
    function TopMenuController($state) {
      var vm = this;
      vm.state = $state;
      vm.navCollapsed = true;
    }
  }

})();
