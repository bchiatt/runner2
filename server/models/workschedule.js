'use strict';

var pg     = require('../postgres/manager');

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
  pg.query('select * from work_schedules where org_id = $1',
      [user.org.id], function(err, results){
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
