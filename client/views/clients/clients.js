(function(){
  'use strict';

  angular.module('runner2')
  .controller('ClientsCtrl', ['$scope', 'Client', function($scope, Client){
    Client.all().then(function(response){
      console.log(response.data.clients);
    });
  }]);
})();
