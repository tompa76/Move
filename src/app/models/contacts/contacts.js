(function() {
  "use strict";

  angular.module('move.models')
    .factory('Contacts', contactsFactory);

  function contactsFactory($resource, Base) {

    var ContactsResource = $resource('http://localhost:3002/app/contacts/:id');
    var Contact = new Base(ContactsResource);

    return Contact;
  }

})();
