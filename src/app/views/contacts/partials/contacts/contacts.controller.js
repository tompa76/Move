(function() {
  'use strict';

  angular.module('move.contacts')
    .controller('ContactsController', contactsController);

  function contactsController(contacts) {
    var vm = this;
    vm.contacts = contacts;


  }
})();
