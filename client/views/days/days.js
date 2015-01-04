(function(){
  'use strict';

  angular.module('runner2')
  .controller('DaysCtrl', ['$scope', 'Day', function($scope, Day){
    $scope.days = [];
    
    Day.all().then(function(response){
      $scope.days = response.data.days;
    });
    
    $scope.edit = function(id){
      console.log('id: ', id);
    };
  }]);
})();
