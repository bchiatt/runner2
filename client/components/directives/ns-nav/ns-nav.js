(function(){
  'use strict';

  angular.module('runner2')
  .directive('nsNav', [function(){
    var o = {};

    o.restrict    = 'A';
    o.templateUrl = '/components/directives/ns-nav/ns-nav.html';
    o.controller  = ['$rootScope', '$scope', '$state', 'User', function($rootScope, $scope, $state, User){
                      $scope.$on('auth', function(evt, data){
                        console.log('auth');
                        $state.reload();
                      });

                      $scope.logout = function(){
                        User.logout().then(function(){
                          $rootScope.rootuser = null;
                          toastr.success('User successfully logged out.');
                          $state.go('home');
                        });
                      };
                    }];
    return o;
  }]);
})();
