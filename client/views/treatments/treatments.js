(function(){
  'use strict';

  angular.module('runner2')
  .controller('TreatmentsCtrl', ['$scope', 'Treatment', 'Time', 'Therapist', 'Discipline', 'Client', 'Insurance', function($scope, Treatment, Time, Therapist, Discipline, Client, Insurance){
    var  clients, disciplines, insurances, therapists;
    $scope.modalShown = false;
    $scope.treatments = [];
    $scope.selected = {};

    getAll();

    function getAll(){
      Treatment.all().then(function(response){
        $scope.treatments = response.data.treatments || [];
      });
    }

    Client.all().then(function(response){
      clients = response.data.clients;
    });

    Therapist.all().then(function(response){
      therapists = response.data.therapists;
    });

    Discipline.all().then(function(response){
      disciplines = response.data.disciplines;
    });

    Insurance.all().then(function(response){
      insurances = response.data.insurances;
    });

    $scope.save = function(data){
      data = cleanData(data);
      $scope.selected = {};

      if(data.id){
        Treatment.update(data).then(function(response){
          getAll();
        });
      }else{
        Treatment.create(data).then(function(response){
          getAll();
        }, function(err){console.log('err', err);});
      }
    };

    $scope.nuke = function(id){
      Treatment.nuke(id).then(function(response){
        getAll();
      });
    };

    $scope.dateMoDaYr = function(iso8601){
      if(!iso8601){return;}
      return moment(Time.isoDate(iso8601)).format('MMM D, YYYY');
    };

    $scope.toggleModal = function(treatment){
      $scope.selected = treatment;
      $scope.selected.clients = clients;
      $scope.selected.therapists = therapists;
      $scope.selected.disciplines = disciplines;
      $scope.selected.insurances = insurances;

      $scope.modalShown = !$scope.modalShown;
    };

    function cleanData(data){
      var obj = {};
      if(data.id){obj.id = data.id;}
      obj.client_id = data.client_id;
      obj.therapist_id = data.therapist_id;
      obj.disc_id = data.disc_id;
      obj.ins_id = data.ins_id;
      obj.mins_expected = data.mins_expected;
      obj.mins_actual = data.mins_actual;
      if(data.tx_date){obj.tx_date = Time.postgresDate(data.tx_date);}
      obj.day_count = data.day_count;
      obj.is_note_done = data.is_note_done || false;
      obj.is_archived = data.is_archived || false;
      return obj;
    }
  }]);
})();
