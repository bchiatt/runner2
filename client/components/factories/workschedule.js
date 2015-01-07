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

    return {all:all, create:create, update:update};
  }]);
})();
