(function(){
  'use strict';

  angular.module('runner2')
  .directive('bcModal', [function(){
    var o = {};

    o.restrict    = 'A';
    o.scope       = {show: '=', obj: '@', save: '&'};
    o.link        = function(scope, element, attrs){
                      scope.hideModal = function(){
                        scope.show = false;
                      };
      
                      scope.execute = function(){
                        scope.save({data: scope.obj}); 
                        scope.hideModal();
                      };
 
                      scope.$watch('obj', function(){
                        scope.obj = angular.fromJson(scope.obj);
                      });
                    };
    o.templateUrl = function(element, attr){
                      return 'views/' + attr.folder + '/' + attr.file + '.html';
                    };
    
    return o;
  }]);
})();
