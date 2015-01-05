(function(){
  'use strict';

  angular.module('runner2')
  .controller('PrecautionsCtrl', ['$scope', 'Precaution', function($scope, Precaution){
    $scope.modalShown = false;
    $scope.precautions = [];
    $scope.selected = {};
    
    Precaution.all().then(function(response){
      $scope.precautions = response.data.precautions || [];
    });
   
    $scope.update = function(data){
      console.log('data:', data);
    };
    
    $scope.toggleModal = function(p){
      $scope.selected = p;
      $scope.modalShown = !$scope.modalShown; 
    };
  }]);
})();
