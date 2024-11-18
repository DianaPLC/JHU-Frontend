(function () {
  'use strict';
  angular.module('MenuApp')
         .config(RoutesConfig)

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function RoutesConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {  // display home template at root
        url: '/',
        templateUrl: 'src/menuapp/templates/home.template.html',
      })
      .state('categories', {  // display categories
        url: '/categories',
        templateUrl: 'src/menuapp/templates/categories_view.template.html',
        controller: 'CategoriesController as catCtrl',
        resolve: {            // retrieve categories data on transition
          categoryList: ['MenuDataService', function (MenuDataService) {
            return MenuDataService.getAllCategories();
          }]
        }
      })
      .state('items', {       // display items for category
        url: '/items/{categoryShortName}',
        templateUrl: 'src/menuapp/templates/items_view.template.html',
        controller: 'ItemsController as itemCtrl',
        resolve: {            // retrieve item data on transition
          itemList: ['$stateParams', 'MenuDataService', function ($stateParams, MenuDataService) {
            return MenuDataService.getItemsForCategory($stateParams.categoryShortName);
          }]
        }
      });
    // route errant requests to root
    $urlRouterProvider.otherwise('/');
  }
})();