(function(){
  'use strict';

  angular.module('runner2')
  .controller('UsersCtrl', ['$rootScope', '$scope', '$state', 'User', function($rootScope, $scope, $state, User){
    $scope.user = {};

    $scope.orgExists = function(){
      User.register($scope.user).then(function(response){
        console.log('success', response.data);
      }, function(response){
        console.log('error', response.data);
      });
    };

    $scope.register = function(){
        User.register($scope.user).then(function(response){
          toastr.success('User successfully registered.');
          $state.go('login');
        }, function(){
          toastr.error('Error during registration.');
          //$scope.user = {};
        });
    };

    $scope.login = function(){
      User.login($scope.user).then(function(response){
        $rootScope.rootuser = response.data;
        toastr.success('User successfully authenticated.');
        $rootScope.$broadcast('auth', response.data);
        $state.go('home');
      }, function(){
        toastr.error('Error during authentication.');
        $scope.user = {};
      });
    };
  }]);
})();
