(function() {
  'use strict';

  angular
    .module('move')
    .config(config);

  /** @ngInject */
  function config($logProvider, $translateProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

    $translateProvider.useStaticFilesLoader({
      prefix: 'assets/localization/',
      suffix: '.json'
    });

    $translateProvider.useSanitizeValueStrategy('escaped');
    $translateProvider.preferredLanguage('sv_SE');
    $translateProvider.fallbackLanguage('sv_SE');
    $translateProvider.useLocalStorage();
  }

})();
