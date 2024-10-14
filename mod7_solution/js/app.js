(function () {
  'use strict';
  
  angular.module('ShoppingListCheckOff', [])
         .controller('ToBuyController', ToBuyController)
         .controller('AlreadyBoughtController', AlreadyBoughtController)
         .filter('customCurrency', CustomCurrencyFilterFactory)
         .service('ShoppingListCheckOffService', ShoppingListCheckOffService);
  
  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    var toBuy = this;
    toBuy.list = ShoppingListCheckOffService.getBuyList();
    toBuy.buy = function(index) {
      ShoppingListCheckOffService.buy(index);
    }
  }

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var bought = this;
    bought.list = ShoppingListCheckOffService.getBoughtList();
  }

  function ShoppingListCheckOffService() {
    var service = this;
    function strictNumber(n) {
      return isNaN(n) ? 0 : n;
    }
    function Item(name, quantity, price) {
      this.name = name || "";
      this.quantity = strictNumber(quantity || 0);
      this.pricePerItem = strictNumber(price || 0);
    }
    var buyList = [
      new Item("Bread", 1, 5),
      new Item("Milk", 2, 2),
      new Item("Eggs", 12, .5),
      new Item("Cereal", 3, 6),
      new Item("Black Truffles", 100, 300)
    ];
    var boughtList = [];
    service.getBuyList = function() {
      return buyList;
    }
    service.getBoughtList = function() {
      return boughtList;
    }
    service.buy = function(index) {
      var item = buyList[index];
      boughtList.push(item);
      buyList.splice(index, 1);
    }
  }

  function CustomCurrencyFilterFactory() {
    return function (input) {
      var formattedInput = new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2 }
      ).format(input,);
      return '$$$' + formattedInput;
    };
  }
})();