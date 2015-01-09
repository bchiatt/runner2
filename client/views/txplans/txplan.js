(function(){
  'use strict';

  angular.module('runner2')
  .controller('TxPlanCtrl', ['$scope', '$state', 'TreatmentPlan', 'Time',  'Day', 'Therapist', 'Discipline', function($scope, $state, TreatmentPlan, Time, Day, Therapist, Discipline){
    var  days, disciplines, therapists;
    $scope.modalShown = false;
    $scope.txPlans = [];
    $scope.selected = {};

    getAll();

    function getAll(){
      TreatmentPlan.findByClient($state.params.id).then(function(response){
        $scope.txPlans = response.data.txPlans || [];
        $scope.client = {
          client_id: $scope.txPlans[0].client_id,
          client_first: $scope.txPlans[0].client_first,
          client_last: $scope.txPlans[0].client_last
        };
      });
    }

    Day.all().then(function(response){
      days = response.data.days;
    });

    Therapist.all().then(function(response){
      therapists = response.data.therapists;
    });

    Discipline.all().then(function(response){
      disciplines = response.data.disciplines;
    });

    $scope.save = function(data){
      data = cleanData(data);
      $scope.selected = {};

      if(data.id){
        TreatmentPlan.update(data).then(function(response){
          getAll();
        });
      }else{
        TreatmentPlan.create(data).then(function(response){
          getAll();
        }, function(e){
          console.log(e);
        });
      }
    };

    $scope.dateMoDaYr = function(iso8601){
      if(!iso8601){return;}
      return moment(Time.isoDate(iso8601)).format('MMM D, YYYY');
    };

    $scope.toggleModal = function(txPlan){
      if(!txPlan.client_id){txPlan.client_id = $state.params.id;}
      $scope.selected = txPlan;
      $scope.selected.days = days;
      $scope.selected.therapists = therapists;
      $scope.selected.disciplines = disciplines;

      $scope.modalShown = !$scope.modalShown;
    };

    function cleanData(data){
      var obj = {};
      if(data.id){obj.id = data.id;}
      obj.client_id = data.client_id;
      obj.eval_therapist_id = data.eval_therapist_id;
      obj.disc_id = data.disc_id;
      obj.weekly_day_id = data.weekly_day_id;
      obj.frequency_high = data.frequency_high;
      obj.frequency_low = data.frequency_low;
      if(data.eval_date){obj.eval_date = Time.postgresDate(data.eval_date);}
      if(data.recert_date){obj.recert_date = Time.postgresDate(data.recert_date);}
      if(data.discharge_date){obj.discharge_date = Time.postgresDate(data.discharge_date);}

      return obj;
    }
  }]);
})();
