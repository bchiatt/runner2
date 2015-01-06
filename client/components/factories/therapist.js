(function(){
  'use strict';

  angular.module('runner2')
  .factory('Therapist', ['$http', function($http){

    function all(){
      return $http.get('/therapists');
    }

    function create(obj){
      return $http.post('/therapists', obj);
    }

    function update(obj){
      return $http.put('/therapists', obj);
    }

    return {all:all, create:create, update:update};
  }]);
})();
