(function(){
  'use strict';

  angular.module('runner2')
  .controller('WorkSchedsCtrl', ['$scope', 'WorkSchedule', function($scope, WorkSchedule){
    WorkSchedule.all().then(function(response){
      console.log(response.data.workScheds);
    });
  }]);
})();
