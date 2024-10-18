(function () {
  'use strict';
  
  // Declare app and bind controllers, filters, services
  angular.module('ShoppingListCheckOff', [])
         .controller('ToBuyController', ToBuyController)
         .controller('AlreadyBoughtController', AlreadyBoughtController)
         .filter('customCurrency', CustomCurrencyFilterFactory)
         .service('ShoppingListCheckOffService', ShoppingListCheckOffService);
  
  // Controller for "to buy" list
  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    var toBuy = this;
    toBuy.list = ShoppingListCheckOffService.getBuyList();
    toBuy.buy = function(index) {
      ShoppingListCheckOffService.buy(index);
    }
  }

  // Controller for "bought" list
  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var bought = this;
    bought.list = ShoppingListCheckOffService.getBoughtList();
  }

  // Service to manage business logic and data in lists
  function ShoppingListCheckOffService() {
    var service = this;

    /**
     * Transformas a provided value to be a number
     * @param {*} n the value to enforce as a strict number
     * @returns a number, which is 0 if n is not a number
     */
    function strictNumber(n) {
      return isNaN(n) ? 0 : n;
    }

    /**
     * Constructor for the Item object. Price and Quantity are enforced as
     * numbers via the strictNumber method.
     * @param {String} name of the item
     * @param {*} quantity quantity of the item
     * @param {*} price price per individual item
     */
    function Item(name, quantity, price) {
      this.name = name || "";
      this.quantity = strictNumber(quantity || 0);
      this.pricePerItem = strictNumber(price || 0);
    }

    // initial contents of the "to buy" list
    var buyList = [
      new Item("Bread", 1, 5),
      new Item("Milk", 2, 2),
      new Item("Eggs", 12, .5),
      new Item("Cereal", 3, 6),
      new Item("Black Truffles", 100, 300)
    ];
    // Initial contents of the "bought" list
    var boughtList = [];

    // Getter for the "to buy" list
    service.getBuyList = function() {
      return buyList;
    }
    // Getter for the "bought" list
    service.getBoughtList = function() {
      return boughtList;
    }

    /**
     * Exposed function to "buy" an item by moving it from the "to buy"
     * list to the "bought" list
     * @param {int} index the index of the item in the "to buy" list
     */
    service.buy = function(index) {
      var item = buyList[index];
      boughtList.push(item);
      buyList.splice(index, 1);
    }
  }

  // A factory to build the custom currency formatting filter
  function CustomCurrencyFilterFactory() {
    return function (input) {
      // Use US number formatting with exactly 2 decimal places
      var formattedInput = new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2 }
      ).format(input,);
      // Prepend the custom currency marker
      return '$$$' + formattedInput;
    };
  }
})();