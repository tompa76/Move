(function() {
  'use strict';

  angular
    .module('move', [
      //Third party modules
      'ngAnimate',
      'ngTouch',
      'ngMessages',
      'ngResource',
      'ui.router',
      'ui.bootstrap',
      'toastr',

      //Models
      'move.models',

      //Views
      'move.root',
      'move.home',
      'move.about',
      'move.contacts'
  ]);

})();
