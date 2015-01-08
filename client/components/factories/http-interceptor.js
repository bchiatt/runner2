
(function(){
  'use strict';

  angular.module('runner2')
  .factory('HttpInterceptor', ['$location', '$q', '$injector', function($rootScope, $q, $injector){

    function request(req){
      return req;
    }

    function response(res){
      return res;
    }

    function requestError(req){
      return $q.reject(req);
    }

    function responseError(res){
      if(res.status === 401){
        $injector.get('$state').transitionTo('login');
      }

      return $q.reject(res);
    }

    return {request:request, response:response, requestError:requestError, responseError:responseError};
  }]);
})();
