(function(){
  'use strict';

  angular.module('runner2')
  .controller('TxPlansCtrl', ['$scope', 'TreatmentPlan', function($scope, TreatmentPlan){
    TreatmentPlan.all().then(function(response){
      console.log(response.data.txplans);
    });
  }]);
})();
