(function(){
  'use strict';

  angular.module('runner2')
  .factory('Insurance', ['$http', function($http){

    function all(){
      return $http.get('/insurances');
    }

    return {all:all};
  }]);
})();
