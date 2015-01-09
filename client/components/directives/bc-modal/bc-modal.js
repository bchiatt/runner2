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
                        scope.hideModal();
                        scope.save({data: scope.obj});
                        scope.obj = {};
                      };

                      scope.$watch('obj', function(){
                        scope.obj = angular.fromJson(scope.obj);
                        if(scope.obj.start_time){
                          scope.obj.start_time= new Date(scope.obj.start_time);
                        }
                        if(scope.obj.end_time){
                          scope.obj.end_time= new Date(scope.obj.end_time);
                        }
                        if(scope.obj.admit_date){
                          scope.obj.admit_date = new Date(scope.obj.admit_date);
                        }
                        if(scope.obj.discharge_date){
                          scope.obj.discharge_date= new Date(scope.obj.discharge_date);
                        }
                      });
                    };
    o.templateUrl = function(element, attr){
                      return 'views/' + attr.folder + '/' + attr.file + '.html';
                    };

    return o;
  }]);
})();
