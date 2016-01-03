(function() {
  'use strict';

  angular.module('move.root')
    .controller('RootController', rootController);

  function rootController($state) {
    var vm = this;
    vm.state = $state;


  }
})();
