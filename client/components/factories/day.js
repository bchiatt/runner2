(function(){
  'use strict';

  angular.module('runner2')
  .factory('Day', ['$http', function($http){

    function all(){
      return $http.get('/days');
    }

    function create(obj){
      return $http.post('/days', obj);
    }

    function update(obj){
      return $http.put('/days', obj);
    }

    return {all:all, create:create, update:update};
  }]);
})();
