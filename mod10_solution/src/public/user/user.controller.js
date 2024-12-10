(function () {
  "use strict";
  
  angular.module('public')
         .controller('UserController', UserController);
  
  /**
   * Simple controller for exposing the current user data from
   * the user service to the front end.
   * @param {*} UserService 
   */
  UserController.$inject = ['UserService'];
  function UserController(UserService) {
    var $ctrl = this;
    $ctrl.user = UserService.getUser();
    $ctrl.favDishCategory = UserService.getFavDishCategory();
  }
})();
  