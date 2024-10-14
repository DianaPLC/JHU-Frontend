(function () {
  'use strict';
  
  angular.module('ShoppingListCheckOff', [])
         .controller('ToBuyController', ToBuyController)
         .controller('AlreadyBoughtController', AlreadyBoughtController)
         .service('ShoppingListCheckOffService', ShoppingListCheckOffService);
  
  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    var toBuy = this;
  }

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var bought = this;
  }

  function ShoppingListCheckOffService() {
    var service = this;
  }
})();