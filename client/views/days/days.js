(function(){
  'use strict';

  angular.module('runner2')
  .controller('DaysCtrl', ['$scope', 'Day', function($scope, Day){
    Day.all().then(function(response){
      console.log(response.data.days);
    });
  }]);
})();
