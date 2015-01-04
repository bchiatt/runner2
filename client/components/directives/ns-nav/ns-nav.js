(function(){
  'use strict';

  angular.module('runner2')
  .directive('nsNav', [function(){
    var o = {};

    o.restrict    = 'A';
    o.templateUrl = '/components/directives/ns-nav/ns-nav.html';
    o.controller  = ['$rootScope', '$scope', function($rootScope, $scope){
                    }];
    return o;
  }]);
})();
