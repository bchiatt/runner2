(function(){
  'use strict';

  angular.module('runner2')
  .controller('TherapistsCtrl', ['$scope', 'Therapist', function($scope, Therapist){
    Therapist.all().then(function(response){
      console.log(response.data.therapists);
    });
  }]);
})();
