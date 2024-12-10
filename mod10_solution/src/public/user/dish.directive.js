(function () {
  "use strict";
  
  angular.module('public')
         .directive('dish', Dish);

  /**
   * Define an object to use as a validation attribute. Elements with this
   * attribute must contain a value that is a valid menu item ID.
   * Based on the examples given at: https://docs.angularjs.org/guide/forms
   * @param {function} MenuService the service used for API calls to the menu backend
   * @returns a promise that will only resolve if the menu item ID is valid
   */
  Dish.$inject = ['MenuService'];
  function Dish(MenuService) {
    var ddo = {
      require: 'ngModel',
      restrict: "A",
      link: function(scope, elm, attrs, ctrl) {
        ctrl.$asyncValidators.dish = function(modelValue, viewValue) {
          return MenuService.getSingleItem(modelValue);
        }
      }
    };
    return ddo;
  }
})();