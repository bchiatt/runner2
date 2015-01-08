(function(){
  'use strict';

  angular.module('runner2')
  .factory('WorkSchedule', ['$http', function($http){

    function all(){
      return $http.get('/workscheds');
    }

    function create(obj){
      return $http.post('/workscheds', obj);
    }

    function update(obj){
      return $http.put('/workscheds', obj);
    }

    function findByTherapist(therapistId){
      return $http.get('/workscheds?therapistId=' + therapistId);
    }

    function nuke(id){
      return $http.delete('/workscheds/' + id);
    }

    return {all:all, create:create, update:update, findByTherapist:findByTherapist, nuke:nuke};
  }]);
})();
