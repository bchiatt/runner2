(function(){
  'use strict';

  angular.module('runner2')
  .directive('bcSideMenu', [function(){
    var o = {};

    o.restrict    = 'A';
    o.templateUrl = '/components/directives/bc-sidemenu/bc-sidemenu.html';
    o.controller  = ['$rootScope', '$scope', '$state', function($rootScope, $scope, $state){
                    }];o.controller  = ['$rootScope', '$scope', '$state', 'User', function($rootScope, $scope, $state, User){
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
