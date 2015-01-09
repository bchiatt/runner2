(function(){
  'use strict';

  angular.module('runner2')
  .factory('Client', ['$http', function($http){

    function all(){
      return $http.get('/clients');
    }

    function create(obj){
      return $http.post('/clients', obj);
    }

    function update(obj){
      return $http.put('/clients', obj);
    }

    return {all:all, create:create, update:update};
  }]);
})();
