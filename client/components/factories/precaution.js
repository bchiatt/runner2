(function(){
  'use strict';

  angular.module('runner2')
  .factory('Precaution', ['$http', function($http){

    function all(){
      return $http.get('/precautions');
    }
    
    function create(obj){
      return $http.post('/precautions', obj);
    }
    
    function update(obj){
      return $http.put('/precautions', obj);
    }

    return {all:all, create:create, update:update};
  }]);
})();
