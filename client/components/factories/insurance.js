(function(){
  'use strict';

  angular.module('runner2')
  .factory('Insurance', ['$http', function($http){

    function all(){
      return $http.get('/insurances');
    }

    function create(obj){
      return $http.post('/insurances', obj);
    }

    function update(obj){
      return $http.put('/insurances', obj);
    }

    return {all:all, create:create, update:update};
  }]);
})();
