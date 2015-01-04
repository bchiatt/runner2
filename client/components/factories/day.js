(function(){
  'use strict';

  angular.module('runner2')
  .factory('Day', ['$http', function($http){

    function all(){
      return $http.get('/days');
    }

    return {all:all};
  }]);
})();
