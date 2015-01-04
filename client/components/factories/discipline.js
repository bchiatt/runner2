(function(){
  'use strict';

  angular.module('runner2')
  .factory('Discipline', ['$http', function($http){

    function all(){
      return $http.get('/disciplines');
    }

    return {all:all};
  }]);
})();
