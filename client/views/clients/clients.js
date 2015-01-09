(function(){
  'use strict';

  angular.module('runner2')
  .controller('ClientsCtrl', ['$scope', 'Client', 'Insurance', 'Time', function($scope, Client, Insurance, Time){
    $scope.modalShown = false;
    $scope.clients= [];
    $scope.selected = {};

    getAll();

    Insurance.all().then(function(response){
      $scope.insurances = response.data.insurances;
    });

    function getAll(){
      Client.all().then(function(response){
        $scope.clients = response.data.clients || [];
      });
    }

    $scope.save = function(data){
      data = cleanData(data);
      $scope.selected = {};

      if($scope.selected.id){
        Client.update(data).then(function(response){
          getAll();
        });
      }else{
        Client.create(data).then(function(response){
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

    $scope.toggleModal = function(c){
      $scope.selected = c;
      $scope.selected.insurances= $scope.insurances;
      $scope.modalShown = !$scope.modalShown;
    };

    function cleanData(data){
      delete data.insurances;
      delete data.ins_name;
      delete data.ins_is_rug;
      delete data.photo;
      if(data.admit_date){data.admit_date = Time.postgresDate(data.admit_date);}
      if(data.discharge_date){data.discharge_date = Time.postgresDate(data.discharge_date);}
      return data;
    }
  }]);
})();
