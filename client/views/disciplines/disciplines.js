(function(){
  'use strict';

  angular.module('runner2')
  .controller('DisciplinesCtrl', ['$scope', 'Discipline', function($scope, Discipline){
    $scope.disciplines = [];
    
    Discipline.all().then(function(response){
     $scope.disciplines = response.data.disciplines || [];
    });
    
    $scope.edit = function(id){
      console.log('id: ', id);
    };
  }]);
})();
