(function(){
  'use strict';

  angular.module('runner2')
  .controller('InsurancesCtrl', ['$scope', 'Insurance', function($scope, Insurance){
    $scope.modalShown = false;
    $scope.insurances = [];
    $scope.selected = {};

    getAll();

    function getAll(){
      Insurance.all().then(function(response){
        $scope.insurances = response.data.insurances || [];
      });
    }

    $scope.save = function(data){
      $scope.selected = {};

      if(data.id){
        Insurance.update(data).then(function(response){
          getAll();
        });
      }else{
        Insurance.create(data).then(function(response){
          getAll();
        }, function(response){
        });
      }
    };

    $scope.toggleModal = function(i){
      $scope.selected = i;
      $scope.modalShown = !$scope.modalShown;
    };
  }]);
})();
