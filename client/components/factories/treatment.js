(function(){
  'use strict';

  angular.module('runner2')
  .factory('Treatment', ['$http', function($http){

    function all(){
      return $http.get('/treatments');
    }

    function create(tx){
      return $http.post('/treatments', tx);
    }

    function update(tx){
      return $http.put('/treatments', tx);
    }

    function nuke(id){
      return $http.delete('/treatments/' + id);
    }

    return {all:all, create:create, update:update, nuke:nuke};
  }]);
})();
