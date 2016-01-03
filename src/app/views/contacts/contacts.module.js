(function() {
  'use strict';

  angular.module('move.contacts', [])
    .config(function($stateProvider) {
      $stateProvider
        .state('root.contacts', {
          url: '/contacts',
          templateUrl: 'app/views/contacts/partials/contacts/contacts.html',
          controller: 'ContactsController',
          controllerAs: 'contactsController',
          scope: {},
          resolve: {
            contacts: function(Contacts) {
              return Contacts.getAll();
            }
          }
        })
        .state('root.contactDetails', {
          url: '/contacts/:contactId',
          templateUrl: 'app/views/contacts/partials/contact-details/contact-details.html',
          controller: 'ContactDetailsController',
          controllerAs: 'contactDetailsController',
          scope: {},
          resolve: {
            contact: function($stateParams, Contacts) {
              if($stateParams.contactId) {
                return Contacts.getById($stateParams.contactId);
              } else {
                return {};
              }
            }
          }

        });
    });
})();
