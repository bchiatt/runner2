(function(){
  'use strict';

  angular.module('runner2')
  .factory('Therapist', ['$http', function($http){

    function all(){
      return $http.get('/therapists');
    }

    return {all:all};
  }]);
})();
