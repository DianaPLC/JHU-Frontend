(function () {
"use strict";

angular.module('common')
.service('MenuService', MenuService);


MenuService.$inject = ['$http', '$q', 'ApiPath'];
function MenuService($http, $q, ApiPath) {
  var service = this;

  service.getCategories = function () {
    return $http.get(ApiPath + '/categories.json').then(function (response) {
      return response.data;
    });
  };


  service.getMenuItems = function (category) {
    return $http.get(ApiPath + '/menu_items/' + category + '.json').then(function (response) {
      return response.data;
    });
  };

  /**
   * Parse an item ID into category short_name and id number, and retrieve
   * from API if possible; reject if not.
   * @param {string} id the ID of the item
   * @returns a promise that returns the retrieved data if valid
   */
  service.getSingleItem = function (id) {
    // Check format
    var idFormat = /^[A-Z]+[0-9]+$/;
    // Don't attempt to retrieve if id format is invalid
    if (idFormat.test(id)) {
      // Extract category and number parts
      var category = id.replaceAll(/[0-9]/g, '');
      var itemNum = parseInt(id.replaceAll(/[A-Z]/g, '')) - 1;
      // Get data
      return $http.get(ApiPath + '/menu_items/' + category + '/menu_items/' + itemNum + '.json').then(function (response) {
        if (response.data) {
          return response.data;
        } else {
          // For consistency, reject instead of returning null
          return $q.reject();
        }
      });
    } else {
      // Automatically reject for invalid id format
      return $q.reject();
    }
  }
}



})();
