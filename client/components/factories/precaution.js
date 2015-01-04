(function(){
  'use strict';

  angular.module('runner2')
  .factory('Precaution', ['$http', function($http){

    function all(){
      return $http.get('/precautions');
    }

    return {all:all};
  }]);
})();
