(function () {
  'use strict';
  
  angular.module('data')
         .controller('ItemsController', ItemsController);
  
  // Process price data for display and expose item data to app
  ItemsController.$inject = ['itemList', '$filter'];
  function ItemsController(itemList, $filter) {
    var itemCtrl = this;
    var rawItemList = itemList;
    // handle 1 and 2 prices
    for (var item of rawItemList.menu_items) {
      item.price = $filter('currency')(item.price_large)
      if (item.price_small) {
        item.price = $filter('currency')(item.price_small) + ' / ' + item.price
      }
    }
    itemCtrl.itemList = rawItemList;
  }
})();