(function(){
  'use strict';

  angular.module('runner2')
  .controller('TxPlansCtrl', ['$scope', 'TreatmentPlan', 'Time',  function($scope, TreatmentPlan, Time){
    $scope.modalShown = false;
    $scope.txPlans = [];
    $scope.selected = {};

    getAll();

    function getAll(){
      TreatmentPlan.all().then(function(response){
        $scope.txPlans= response.data.txPlans || [];
      });
    }

    $scope.save = function(obj){
      var data = {};

      TreatmentPlan.update(data).then(function(response){
        getAll();
      });
    };

    $scope.dateMoDaYr = function(iso8601){
      if(!iso8601){return;}
      return moment(Time.isoDate(iso8601)).format('MMM D, YYYY');
    };

    $scope.toggleModal = function(txPlan){
      $scope.selected = txPlan;

      $scope.modalShown = !$scope.modalShown;
    };
  }]);
})();
