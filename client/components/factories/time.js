(function(){
  'use strict';

  angular.module('runner2')
  .factory('Time', [function(){

    function timeDiff(start, end){
      var time1 = start.split(':'),
      time2 = end.split(':'),
      h1    = time1[0] * 1,
      m1    = time1[1] * 1,
      h2    = time2[0] * 1,
      m2    = time2[1] * 1;

      return moment().hour(h2).minute(m2)
      .subtract(h1, 'hours')
      .subtract(m1, 'minutes')
      .format('H:mm');
    }

    function formatAmPm(time){
      var t    = time.split(':'),
      suff = t[0] >= 12 ? 'PM' : 'AM';

      t[0] = t[0] < 10 ? t[0].substr(1,1) : t[0];
      t[0] = t[0] > 12 ? t[0] * 1 - 12 : t[0];

      return t[0] + ':' + t[1] + ' ' + suff;
    }

    function isoDate(pgDate){
       return pgDate.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/)[0];
    }

    function postgresDate(isoDate){
      return isoDate.toString().match(/[a-zA-Z]{3} [a-zA-Z]{3} [0-9]{2} [0-9]{4}/)[0];
    }

    return {timeDiff:timeDiff, formatAmPm:formatAmPm, isoDate:isoDate, postgresDate:postgresDate};
  }]);
})();
