(function(){
  'use strict';

  angular.module('runner2')
  .controller('TherapistsCtrl', ['$scope', 'Therapist', 'Discipline', function($scope, Therapist, Discipline){
    $scope.modalShown = false;
    $scope.therapists = [];
    $scope.selected = {};

    getAll();

    Discipline.all().then(function(response){
      $scope.disciplines = response.data.disciplines;
    });

    function getAll(){
      Therapist.all().then(function(response){
        $scope.therapists = response.data.therapists || [];
      });
    }

    $scope.save = function(data){
      data = cleanData(data);
      $scope.selected = {};

      if(data.id){
        Therapist.update(data).then(function(response){
          getAll();
        });
      }else{
        Therapist.create(data).then(function(response){
          getAll();
        });
      }
    };

    function cleanData(data){
      delete data.disciplines;
      delete data.disc_abbr;
      delete data.disc_name;
      delete data.photo;

      return data;
    }

    $scope.toggleModal = function(t){
      $scope.selected = t;
      $scope.selected.disciplines = $scope.disciplines;
      $scope.modalShown = !$scope.modalShown;
    };
  }]);
})();
