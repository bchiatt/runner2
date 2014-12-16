(function(){
  'use strict';

  angular.module('runner2', ['ui.router', 'angularFileUpload'])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('home',     {url:'/',         templateUrl:'/views/home/home.html'})
    .state('register', {url:'/register', templateUrl:'/views/users/register.html', controller:'UsersCtrl'})
    .state('login',    {url:'/login',    templateUrl:'/views/users/login.html',    controller:'UsersCtrl'})
    .state('logout',   {url:'/logout',   template:'',                              controller:'UsersCtrl'});
  }])
  .run(['$rootScope', '$http', function($rootScope, $http){
    $http.get('/status').then(function(response){
      $rootScope.rootuser = response.data;
      $rootScope.$broadcast('auth', response.data);
    }, function(){
      $rootScope.rootuser = null;
    });
  }]);
})();
