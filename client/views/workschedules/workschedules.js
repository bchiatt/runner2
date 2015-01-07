(function(){
  'use strict';

  angular.module('runner2')
  .controller('WorkSchedsCtrl', ['$scope', 'WorkSchedule', 'Day', function($scope, WorkSchedule, Day){
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
      data.start_time = data.start_time.toString().match(/[0-9]{2}:[0-9]{2}:[0-9]{2}/)[0];
      data.end_time = data.end_time.toString().match(/[0-9]{2}:[0-9]{2}:[0-9]{2}/)[0];
      delete data.days;

      console.log('data', data);

      if($scope.selected.id){
        WorkSchedule.update(data).then(function(response){
          getAll();
        });
      }else{
        WorkSchedule.create(data).then(function(response){
          getAll();
        });
      }
    };

    $scope.totalTime = function(start, end){
      var time1 = start.split(':'),
          time2 = end.split(':'),
          h1    = time1[0] * 1,
          m1    = time1[1] * 1,
          h2    = time2[0] * 1,
          m2    = time2[1] * 1;

      return moment().hours(h2).minutes(m2)
             .subtract(h1, 'hours')
             .subtract(m1, 'minutes')
             .format('h:mm');

    };

    $scope.clockTime = function(time){
      var t    = time.split(':'),
          suff = t[0] >= 12 ? 'PM' : 'AM';

      t[0] = t[0] < 10 ? t[0].substr(1,1) : t[0];
      t[0] = t[0] > 12 ? t[0] * 1 - 12 : t[0];

      return t[0] + ':' + t[1] + ' ' + suff;
    };

    $scope.toggleModal = function(ws){
      $scope.selected = ws;

      var start = $scope.selected.start_time.split(':'),
          end   = $scope.selected.end_time.split(':');

      $scope.selected.start_time = new Date(1970, 0, 1, start[0], start[1], 0);
      console.log($scope.selected.start_time);
      console.log(moment().hours(start[0]).minutes(start[1]));
      $scope.selected.end_time = new Date(1970, 0, 1, end[0], end[1], 0);

      $scope.selected.days= $scope.days;
      $scope.modalShown = !$scope.modalShown;
    };
  }]);
})();
