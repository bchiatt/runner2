(function(){
  'use strict';

  angular.module('runner2')
  .controller('WorkSchedCtrl', ['$scope', '$state', 'WorkSchedule', 'Day', 'Time', 'Therapist', function($scope, $state, WorkSchedule, Day, Time, Therapist){
    $scope.modalShown = false;
    $scope.workSchedules = [];
    $scope.selected = {};

    getAll();

    Day.all().then(function(response){
      $scope.days = response.data.days;
    });

    Therapist.findById($state.params.id).then(function(response){
      $scope.therapist = {
        therapist_id: response.data.therapist.id,
        therapist_first: response.data.therapist.first,
        therapist_last: response.data.therapist.last
      };
    });

    function getAll(){
      WorkSchedule.findByTherapist($state.params.id).then(function(response){
        $scope.workSchedules = response.data.workScheds|| [];
      });
    }

    $scope.save = function(obj){
      var data = {};
      $scope.selected = {};

      if(obj.id){data.id = obj.id;}
      data.day_id = obj.day_id;
      data.therapist_id = $state.params.id;
      data.start_time = obj.start_time.toString().match(/[0-9]{2}:[0-9]{2}:[0-9]{2}/)[0];
      data.end_time = obj.end_time.toString().match(/[0-9]{2}:[0-9]{2}:[0-9]{2}/)[0];
      data.is_late_eval = obj.is_late_eval;

      if(data.id){
        WorkSchedule.update(data).then(function(response){
          getAll();
        });
      }else{
        WorkSchedule.create(data).then(function(response){
          getAll();
        }, function(r){
          console.log(r);
        });
      }
    };

    $scope.nuke = function(id){
      WorkSchedule.nuke(id).then(function(){
         getAll();
      });
    };

    $scope.timeDiff = function(start, end){
      return Time.timeDiff(start, end);
    };

    $scope.formatAmPm= function(time){
      return Time.formatAmPm(time);
    };

    $scope.toggleModal = function(ws){
      $scope.selected = ws;

      if(ws.id){

        var start = $scope.selected.start_time.split(':'),
            end   = $scope.selected.end_time.split(':');

        $scope.selected.start_time = new Date(1970, 0, 1, start[0], start[1], 0);
        $scope.selected.end_time = new Date(1970, 0, 1, end[0], end[1], 0);
      }

      $scope.selected.days= $scope.days;
      $scope.modalShown = !$scope.modalShown;
    };
  }]);
})();
