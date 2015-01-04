(function(){
  'use strict';

  angular.module('runner2')
  .controller('DisciplinesCtrl', ['$scope', 'Discipline', function($scope, Discipline){
    Discipline.all().then(function(response){
      console.log(response.data.disciplines);
    });
  }]);
})();
