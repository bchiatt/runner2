(function(){
  'use strict';

  angular.module('runner2')
  .factory('Discipline', ['$http', function($http){

    function all(){
      return $http.get('/disciplines');
    }

    function create(obj){
      return $http.post('/disciplines', obj);
    }

    function update(obj){
      return $http.put('/disciplines', obj);
    }

    return {all:all, create:create, update:update};
  }]);
})();
