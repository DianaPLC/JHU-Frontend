(function () {
  "use strict";
  
  angular.module('public')
         .controller('NewUserController', NewUserController);
  
  /**
   * Controller for new users. Provides utilities for setting user
   * data to be handled by the user service.
   * @param {function} UserService the user data service
   * @param {function} MenuService the service for retrieving menu data
   */
  NewUserController.$inject = ['UserService', 'MenuService'];
  function NewUserController(UserService, MenuService) {
    var $ctrl = this;

    $ctrl.success = false;
    $ctrl.user = UserService.getUser();

    $ctrl.signUp = function(form) {
      if (form.$valid) {
        $ctrl.success = true;
        // Set menu item as user favorite dish to avoid
        //   unneccessary future API calls
        MenuService.getSingleItem($ctrl.user.favDish.short_name)
                   .then(function(result) {
                     $ctrl.user.favDish = result;
                     UserService.setUser($ctrl.user);
                   });
      } else {
        $ctrl.success = false;
      }
    }
  }
})();
  