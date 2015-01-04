(function(){
  'use strict';

  angular.module('runner2', ['ui.router', 'angularFileUpload'])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/');
    $stateProvider
    .state('home',        {url:'/',            templateUrl:'/views/home/home.html',        controller:'HomeCtrl'})
    .state('register',    {url:'/register',    templateUrl:'/views/users/register.html',   controller:'UsersCtrl'})
    .state('login',       {url:'/login',       templateUrl:'/views/users/login.html',      controller:'UsersCtrl'})
    .state('clients',     {url:'/clients',     templateUrl:'/views/clients/list.html',     controller:'ClientsCtrl'})
    .state('therapists',  {url:'/therapists',  templateUrl:'/views/therapists/list.html',  controller:'TherapistsCtrl'})
    .state('treatments',  {url:'/treatments',  templateUrl:'/views/treatments/list.html',  controller:'TreatmentsCtrl'})
    .state('insurances',  {url:'/insurances',  templateUrl:'/views/insurances/list.html',  controller:'InsurancesCtrl'})
    .state('precautions', {url:'/precautions', templateUrl:'/views/precautions/list.html', controller:'PrecautionsCtrl'})
    .state('disciplines', {url:'/disciplines', templateUrl:'/views/disciplines/list.html', controller:'DisciplinesCtrl'})
    .state('days',        {url:'/days',        templateUrl:'/views/days/list.html',        controller:'DaysCtrl'})
    .state('users',       {url:'/users',       templateUrl:'/views/users/list.html',       controller:'UsersCtrl'});
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
