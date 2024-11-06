(function () {
  'use strict';
  
  // Declare app and bind controllers, services, directives
  angular.module('NarrowItDownApp', [])
         .controller('NarrowItDownController', NarrowItDownController)
         .service('MenuSearchService', MenuSearchService)
         .directive('foundItems', FoundItems)
         .constant('MenuPath', "https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json");
  
  // Main controller, handles updates to found list and search term
  NarrowItDownController.$inject = ['$filter', 'MenuSearchService'];
  function NarrowItDownController($filter, MenuSearchService) {
    var narrowDown = this;

    // Set values on scope
    narrowDown.found = [];
    narrowDown.searchTerm = "";
    narrowDown.empty = false;

    // Get items via MenuSearchService
    narrowDown.getItems = function () {
      // Don't call out to service if no search term supplied
      if (narrowDown.searchTerm.length === 0) {
        narrowDown.empty = true;
        return;
      }
      var promise = MenuSearchService.getMatchedMenuItems(
        $filter('lowercase')(narrowDown.searchTerm)
      );
      promise.then(function (response) {
        narrowDown.found = response;
        if (narrowDown.found.length === 0) {
          narrowDown.empty = true;
        } else {
          narrowDown.empty = false;
        }
      })
    }
    // Remove an item from found at specified index
    narrowDown.removeItem = function (index) {
      narrowDown.found.splice(index, 1);
    };
  }

  MenuSearchService.$inject = ['$http', 'MenuPath'];
  function MenuSearchService($http, MenuPath) {
    var service = this;

    // Fetch full menu and return items with description containing searchTerm
    service.getMatchedMenuItems = function (searchTerm) {
      return $http({
        url: MenuPath
      }).then(function (result) {
        var fullMenu = result.data;
        var foundItems = [];
        for (var category in fullMenu) {
          var catItems = fullMenu[category].menu_items;
          for (var item in catItems) {
            if (catItems[item].description.indexOf(searchTerm) > -1) {
              foundItems.push(catItems[item]);
            }
          }
        }
        return foundItems;
      }).catch(function (error) {
        console.log(error);
        return [];
      });
    }
  }

  function FoundItems() {
    var ddo = {
      templateUrl: "foundItems.html",
      restrict: 'E',
      scope: {
        found: '<',
        onRemove: '&',
        empty: '<'
      },
      controller: "NarrowItDownController as narrowDown",
      bindToController: true,
    };
    return ddo;
  }
})();