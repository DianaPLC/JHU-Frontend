(function () {
  "use strict";
  
  angular.module('public')
         .service('UserService', UserService);
  
  /**
   * Data handler for the current or new user.
   */
  function UserService() {
    var service = this;
    var user = new User();

    /**
     * User object definition for ease of reference throughout app
     * @param {string} firstName user first name
     * @param {string} lastName user last name
     * @param {string} email user email address
     * @param {string} phone user phone number
     * @param {Object} favDish user favorite dish from menu items
     */
    function User(firstName, lastName, email, phone, favDish) {
      this.firstName = firstName || "";
      this.lastName = lastName || "";
      this.email = email || "";
      this.phone = phone || "";
      this.favDish = favDish || {short_name: ""};
      this.enrolled = false;
    }

    /**
     * Sets the user
     * @param {User} newUser with attributes to set
     */
    service.setUser = function(newUser) {
      user = new User(
        newUser.firstName,
        newUser.lastName,
        newUser.email,
        newUser.phone,
        newUser.favDish
      );
      user.enrolled = true;
    }

    /**
     * Retrieve the current User
     * @returns the current User
     */
    service.getUser = function() {
      return user;
    }

    /**
     * Retrieve the category short name for the user favDish
     * @returns the category short name
     */
    service.getFavDishCategory = function() {
      return user.favDish.short_name.replaceAll(/[0-9]/g, '')
    }
  }
})();