(function(){
  'use strict';

  angular.module('runner2')
  .controller('ClientsCtrl', ['$scope', 'Client', function($scope, Client){
    console.log('clients');
  }]);
})();
