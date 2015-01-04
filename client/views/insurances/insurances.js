(function(){
  'use strict';

  angular.module('runner2')
  .controller('InsurancesCtrl', ['$scope', 'Insurance', function($scope, Insurance){
    Insurance.all().then(function(response){
      console.log(response.data.insurances);
    });
  }]);
})();
