(function() {
  'use strict';

  angular.module('move.contacts')
    .controller('ContactDetailsController', contactDetailsController);

  function contactDetailsController($state, contact) {
    var vm = this;
    vm.save = save;
    vm.cancel = cancel;
    vm.hasErrors = hasErrors;
    vm.contact = contact;

    function save() {
    }

    function cancel() {
      $state.go('root.contacts');
    }

    function hasErrors(error) {
      return !_.isEmpty(error);
    }
  }
})();
