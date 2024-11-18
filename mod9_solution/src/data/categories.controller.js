(function () {
  'use strict';
  
  angular.module('data')
         .controller('CategoriesController', CategoriesController);
  
  // expose the object holding the list of categories to the app
  CategoriesController.$inject = ['categoryList'];
  function CategoriesController(categoryList) {
    var catCtrl = this;
    catCtrl.categoryList = categoryList;
  }
})();