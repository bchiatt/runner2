'use strict';

var pg        = require('../postgres/manager'),
    multiline = require('multiline');

function WorkSchedule(obj){
  this.therapistId = obj.therapistId;
  this.dayId       = obj.dayId;
  this.isLateEval  = obj.isLateEval;
  this.startTime   = obj.startTime;
  this.endTime     = obj.endTime;
}

WorkSchedule.findById = function(user, id, cb){
  pg.query('select * from work_schedules where id = $1 and org_id = $2 limit 1',
      [id, user.org.id], function(err, results){
    cb(err, results && results.rows[0] ? results.rows[0] : null);
  });
};

WorkSchedule.all = function(user, cb){
  var sql = multiline.stripIndent(function(){/*
    select
      ws.id,
      ws.is_late_eval,
      ws.start_time,
      ws.end_time,
      ws.day_id,
      dw.num as day_num,
      dw.full_name as day_name,
      dw.abbr as day_abbr,
      dw.letter as day_letter,
      ws.therapist_id,
      t.first as therapist_first,
      t.last as therapist_last
    from work_schedules ws
    inner join days_in_week dw on dw.id = ws.day_id
    inner join therapists t on t.id = ws.therapist_id
    where ws.org_id = $1
    */});
  pg.query(sql, [user.org.id], function(err, results){
    cb(err, results && results.rows ? results.rows : null);
  });
};

WorkSchedule.add = function(user, obj, cb){
  var wSched = new WorkSchedule(obj);
  pg.query('select work_schedule_add($1, $2, $3, $4, $5, $6)',
      [
        user.org.id, wSched.therapistId, wSched.dayId,
        wSched.isLateEval, wSched.startTime, wSched.endTime
      ],
      function(err, results){
    cb(err, results && results.rows[0] ? results.rows[0] : null);
  });
};

WorkSchedule.update = function(user, obj, cb){
  pg.query('select work_schedule_update($1, $2, $3, $4, $5, $6, $7)',
      [
        obj.id, user.org.id, obj.therapistId, obj.dayId,
        obj.isLateEval, obj.startTime, obj.endTime
      ],
      function(err, results){
    cb(err, results && results.rows ? results.rows[0] : null);
  });
};

WorkSchedule.nuke = function(user, schedId, cb){
  pg.query('select work_schedule_nuke($1, $2)', [user.org.id, schedId],
      function(err, results){
    cb(err, results && results.rows ? results.rows[0] : null);
  });
};

module.exports = WorkSchedule;
