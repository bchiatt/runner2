(function(){
  'use strict';

  angular.module('runner2')
  .controller('TreatmentsCtrl', ['$scope', 'Treatment', function($scope, Treatment){
    Treatment.all().then(function(response){
      console.log(response.data.treatments);
    });
  }]);
})();
