(function(){
  'use strict';

  angular.module('runner2')
  .controller('DaysCtrl', ['$scope', 'Day', function($scope, Day){
    $scope.modalShown = false;
    $scope.selected = {};

    getAll();

    function getAll(){
      Day.all().then(function(response){
        $scope.days = response.data.days || [];
      });
    }

    $scope.save = function(data){
      $scope.selected = {};

      if(data.id){
        Day.update(data).then(function(response){
          getAll();
        });
      }else{
        Day.create(data).then(function(response){
          getAll();
        });
      }
    };

    $scope.toggleModal = function(d){
      $scope.selected = d;
      $scope.modalShown = !$scope.modalShown;
    };
  }]);
})();
