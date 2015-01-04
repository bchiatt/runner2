(function(){
  'use strict';

  angular.module('runner2')
  .controller('PrecautionsCtrl', ['$scope', 'Precaution', function($scope, Precaution){
    Precaution.all().then(function(response){
      console.log(response.data.precautions);
    });
  }]);
})();
