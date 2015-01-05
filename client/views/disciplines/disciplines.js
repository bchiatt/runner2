(function(){
  'use strict';

  angular.module('runner2')
  .controller('DisciplinesCtrl', ['$scope', 'Discipline', function($scope, Discipline){
    $scope.modalShown = false;
    $scope.disciplines = [];
    $scope.selected = {};

    getAll();

    function getAll(){
      Discipline.all().then(function(response){
        $scope.disciplines = response.data.disciplines || [];
      });
    }

    $scope.save = function(data){
      if($scope.selected.id){
        Discipline.update(data).then(function(response){
          getAll();
        });
      }else{
        Discipline.create(data).then(function(response){
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
