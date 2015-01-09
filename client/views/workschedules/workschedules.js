(function(){
  'use strict';

  angular.module('runner2')
  .controller('WorkSchedsCtrl', ['$scope', 'WorkSchedule', 'Day', 'Time', function($scope, WorkSchedule, Day, Time){
    $scope.modalShown = false;
    $scope.workSchedules= [];
    $scope.selected = {};

    getAll();

    Day.all().then(function(response){
      $scope.days = response.data.days;
    });

    function getAll(){
      WorkSchedule.all().then(function(response){
        $scope.workSchedules = response.data.workScheds|| [];
      });
    }

    $scope.save = function(data){
      $scope.selected = {};
      data = cleanData(data);

      WorkSchedule.update(data).then(function(response){
        getAll();
      });
    };

    function cleanData(data){
      data.start_time = data.start_time.toString().match(/[0-9]{2}:[0-9]{2}:[0-9]{2}/)[0];
      data.end_time = data.end_time.toString().match(/[0-9]{2}:[0-9]{2}:[0-9]{2}/)[0];
      return data;
    }

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

      $scope.selected.days= $scope.days;
      $scope.modalShown = !$scope.modalShown;
    };
  }]);
})();
