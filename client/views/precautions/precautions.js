(function(){
  'use strict';

  angular.module('runner2')
  .controller('PrecautionsCtrl', ['$scope', 'Precaution', function($scope, Precaution){
    $scope.precautions = [];
    
    Precaution.all().then(function(response){
      $scope.precautions = response.data.precautions || [];
    });
    
    $scope.edit = function(id){
      console.log('id: ', id);
    };
 
    $scope.update = function(){
     console.log('update!'); 
    };
  }]);
})();
