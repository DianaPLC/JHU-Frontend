(function () {
  'use strict';
  angular.module('MenuApp')
         .run(LogError);
         
  // catch and log errors in routing
  LogError.$inject = ['$rootScope'];
  function LogError($rootScope) {
    $rootScope.$on('$stateChangeError',
      function(event, toState, toParams, fromState, fromParams, error){
        console.log(error);
      }
    );
  }
})();