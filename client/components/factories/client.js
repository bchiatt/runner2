(function(){
  'use strict';

  angular.module('runner2')
  .factory('Client', ['$http', function($http){

    function all(){
      return $http.get('/clients');
    }

    return {all:all};
  }]);
})();
