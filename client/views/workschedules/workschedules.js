(function(){
  'use strict';

  angular.module('runner2')
  .controller('WorkSchedsCtrl', ['$scope', 'WorkSchedule', 'Day', 'Time', 'Therapist', function($scope, WorkSchedule, Day, Time, Therapist){
    $scope.modalShown = false;
    $scope.workSchedules= [];
    $scope.selected = {};

    getAll();

    Day.all().then(function(response){
      $scope.days = response.data.days;
    });

    Therapist.all().then(function(response){
      $scope.therapists = response.data.therapists;
    });

    function getAll(){
      WorkSchedule.all().then(function(response){
        $scope.workSchedules = response.data.workScheds|| [];
      });
    }

    $scope.save = function(obj){
      var data = {};
      $scope.selected = {};

      if(obj.id){data.id = obj.id;}
      data.day_id = obj.day_id;
      data.therapist_id = obj.therapist_id;
      data.start_time = obj.start_time.toString().match(/[0-9]{2}:[0-9]{2}:[0-9]{2}/)[0];
      data.end_time = obj.end_time.toString().match(/[0-9]{2}:[0-9]{2}:[0-9]{2}/)[0];
      data.is_late_eval = obj.is_late_eval || false;

      if(data.id){
        WorkSchedule.update(data).then(function(response){
          getAll();
        });
      }else{
        WorkSchedule.create(data).then(function(response){
          getAll();
        });
      }
    };

    $scope.timeDiff = function(start, end){
      return Time.timeDiff(start, end);
    };

    $scope.formatAmPm= function(time){
      return Time.formatAmPm(time);
    };

    $scope.toggleModal = function(ws){
      if(ws.id){
        $scope.selected = ws;

        var start = $scope.selected.start_time.split(':'),
            end   = $scope.selected.end_time.split(':');

        $scope.selected.start_time = new Date(1970, 0, 1, start[0], start[1], 0);
        $scope.selected.end_time = new Date(1970, 0, 1, end[0], end[1], 0);
      }

      $scope.selected.days = $scope.days;
      $scope.selected.therapists = $scope.therapists;
      $scope.modalShown = !$scope.modalShown;
    };
  }]);
})();
