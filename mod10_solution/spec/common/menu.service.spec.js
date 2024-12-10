describe('menuService', function () {
  'use strict';

  // Set up share variables for mock services and functions
  var $httpBackend;
  var menuService;
  var ApiPath;
  var $rootScope;
  var reject;
  var resolve;

  beforeEach(function () {
    // Mock module
    module('common');

    // Inject dependencies
    inject(function ($injector, _$rootScope_) {
      $rootScope = _$rootScope_
      menuService = $injector.get('MenuService');
      $httpBackend = $injector.get('$httpBackend');
      reject = jasmine.createSpy('reject');
      resolve = jasmine.createSpy('resolve');
      ApiPath = $injector.get('ApiPath');
    });
  });

  // Only testing new method for assignment --
  //   others would be in their own describe blocks
  describe('singleitem', function () {
    it('should return menu item if ID is valid', function() {
      // Mock request returning valid data
      $httpBackend.whenGET(ApiPath + '/menu_items/L/menu_items/0.json').respond({data: "a valid result"});
      // Valid data should be returned from function
      menuService.getSingleItem('L1').then(function(response) {
        expect(response.data).toEqual("a valid result");
      });
      $httpBackend.flush();
    });

    /**
     * The structure for the following two tests are inspired by the solution described at
     * https://medium.com/@HTMikeLee/unit-testing-code-that-returns-a-promise-29acc150d36b
     */

    it('should reject query if ID is invalid format', function() {
      // Request with invalid ID
      menuService.getSingleItem('1').then(resolve, reject);
      // Force evaluation
      $rootScope.$digest();
      // Only rejection handler should be triggered
      expect(reject).toHaveBeenCalled();
      expect(resolve).not.toHaveBeenCalled();
    });

    it('should reject query if ID has no matching item', function() {
      // Mock request that doesn't return data
      $httpBackend.whenGET(ApiPath + '/menu_items/L/menu_items/0.json').respond(null);
      menuService.getSingleItem('L1').then().then(resolve, reject);
      // Force return and evaluation
      $httpBackend.flush();
      $rootScope.$digest();
      // Only rejection handler should be triggered
      expect(reject).toHaveBeenCalled();
      expect(resolve).not.toHaveBeenCalled();
    });
  })
});