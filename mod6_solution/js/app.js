(function () {
  'use strict';
  
  angular.module('LunchCheck', [])
         .controller('LunchCheckController', LunchCheckController);
  
  LunchCheckController.$inject = ['$scope'];
  function LunchCheckController($scope) {
    // User-entered list
    $scope.list = "";
    // Message to user
    $scope.message = "";
    // Feedback color
    $scope.feedback = "";

    /**
     * Handle user button press based on value of list
     */
    $scope.checkList = function () {
      switch(getListLength($scope.list)) {
        case 0:
          setMessage("Please enter data first", "red");
          break;
        case 1:
        case 2:
        case 3:
          setMessage("Enjoy!");
          break;
        default:
          setMessage("Too much!");
      }
    };

    /**
     * Sets the message and feedback values, with "green" as the
     * default feedback value if none is provided.
     * @param {String} message the value for the message to user
     * @param {String} color the feedback color string
     */
    function setMessage(message, color) {
      $scope.message = message;
      $scope.feedback = color || "green";
    }

    /**
     * Parses list as a comma-separated list, removes blank or
     * whitespace entries, and returns the length of the resulting list.
     * @param {String} list the current value of user input list
     * @returns the length of the cleaned list
     */
    function getListLength(list) {
      var splitList = list.split(',');
      var trimmedList = splitList.map((val) => val.trim());
      return trimmedList.filter((val) => val.length > 0).length;
    }
  }
})();