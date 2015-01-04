(function(){
  'use strict';

  angular.module('runner2')
  .controller('InsurancesCtrl', ['$scope', 'Insurance', function($scope, Insurance){
    $scope.insurances = [];
    
    Insurance.all().then(function(response){
     $scope.insurances = response.data.insurances || [];
    });
    
    $scope.edit = function(id){
      console.log('id: ', id);
    };
  }]);
})();
