(function(){
  'use strict';

  angular.module('runner2')
  .factory('WorkSchedule', ['$http', function($http){

    function all(){
      return $http.get('/workscheds');
    }

    return {all:all};
  }]);
})();
