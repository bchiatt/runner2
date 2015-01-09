(function(){
  'use strict';

  angular.module('runner2')
  .factory('TreatmentPlan', ['$http', function($http){

    function all(){
      return $http.get('/txplans');
    }

    function create(obj){
      return $http.post('/txplans', obj);
    }

    function update(obj){
      return $http.put('/txplans', obj);
    }

    function findByClient(clientId){
      return $http.get('/txplans?clientId=' + clientId);
    }

    return {all:all, create:create, update:update, findByClient:findByClient};
  }]);
})();
