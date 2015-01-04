(function(){
  'use strict';

  angular.module('runner2')
  .factory('TreatmentPlan', ['$http', function($http){

    function all(){
      return $http.get('/txplans');
    }

    return {all:all};
  }]);
})();
