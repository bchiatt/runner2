(function(){
  'use strict';

  angular.module('runner2')
  .factory('Treatment', ['$http', function($http){

    function all(){
      return $http.get('/treatments');
    }

    return {all:all};
  }]);
})();
