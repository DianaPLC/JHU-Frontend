// component definition for categories
(function () {
  'use strict';
  angular.module('MenuApp')
         .component('categories', {
            templateUrl: 'src/menuapp/templates/categories.template.html',
            bindings: {
              categoryList: '<'
            }
         });
})();