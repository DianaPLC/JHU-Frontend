(function () {
  'use strict';

  angular.module('data')
         .service('MenuDataService', MenuDataService)
         .constant('MenuBasePath', "https://coursera-jhu-default-rtdb.firebaseio.com/");

  // Service to retrieve menu data from server
  MenuDataService.$inject = ['$http', 'MenuBasePath'];
  function MenuDataService($http, MenuBasePath) {
    var service = this;

    // Get categories data
    service.getAllCategories = function () {
      return $http({
        url: MenuBasePath + 'categories.json'
      }).then(function (result) {
        return result.data;
      }).catch(function (error) {
        console.log(error);
        return [];
      });
    }

    // Get items for specified category
    service.getItemsForCategory = function (categoryShortName) {
      return $http({
        url: MenuBasePath + 'menu_items/' + categoryShortName + '.json'
      }).then(function (result) {
        return result.data;
      }).catch(function (error) {
        console.log(error);
        return [];
      });
    }
  }
})();