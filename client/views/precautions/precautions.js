(function(){
  'use strict';

  angular.module('runner2')
  .controller('PrecautionsCtrl', ['$scope', 'Precaution', function($scope, Precaution){
    $scope.modalShown = false;
    $scope.precautions = [];
    $scope.selected = {};

    getAll();

    function getAll(){
      Precaution.all().then(function(response){
        $scope.precautions = response.data.precautions || [];
      });
    }

    $scope.save = function(data){
      $scope.selected = {};
      
      if(data.id){
        Precaution.update(data).then(function(response){
          getAll();
        });
      }else{
        Precaution.create(data).then(function(response){
          getAll();
        });
      }
    };

    $scope.toggleModal = function(p){
      $scope.selected = p;
      $scope.modalShown = !$scope.modalShown;
    };
  }]);
})();
