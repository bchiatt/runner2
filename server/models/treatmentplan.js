'use strict';

var pg        = require('../postgres/manager'),
    multiline = require('multiline');

function TreatmentPlan(obj){
  this.clientId      = obj.client_id;
  this.therId        = obj.eval_therapist_id;
  this.discId        = obj.disc_id;
	this.evalDate      = obj.eval_date;
	this.recertDate    = obj.recert_date;
	this.dischargeDate = obj.discharge_date;
	this.dayId         = obj.weekly_day_id;
	this.freqHigh      = obj.frequency_high;
	this.freqLow       = obj.frequency_low;
}

TreatmentPlan.findById = function(user, id, cb){
  pg.query('select * from treatment_plans where id = $1 and org_id = $2 limit 1',
      [id, user.org.id], function(err, results){
    cb(err, results && results.rows[0] ? results.rows[0] : null);
  });
};

TreatmentPlan.all = function(user, clientId, cb){
  var sql = multiline.stripIndent(function(){/*
    select
      tp.id,
      tp.client_id,
      c.first as client_first,
      c.last as client_last,
      tp.eval_therapist_id,
      t.first as eval_therapist_first,
      t.last as eval_therapist_last,
      tp.disc_id,
      d.name as disc_name,
      d.abbr as disc_abbr,
      tp.weekly_day_id,
      dw.num as weekly_num,
      dw.full_name as weekly_full_name,
      dw.abbr as weekly_abbr,
      dw.letter as weekly_letter,
      tp.eval_date,
      tp.recert_date,
      tp.discharge_date,
      tp.frequency_low,
      tp.frequency_high
    from treatment_plans tp
    left outer join clients c on c.id = tp.client_id
    left outer join therapists t on t.id = tp.eval_therapist_id
    left outer join disciplines d on d.id = tp.disc_id
    left outer join days_in_week dw on dw.id = tp.weekly_day_id
    where tp.org_id = $1 and cast(tp.client_id as text) like $2
    order by c.last asc
    */});
  pg.query(sql, [user.org.id, clientId || '%'], function(err, results){
    cb(err, results && results.rows ? results.rows : null);
  });
};

TreatmentPlan.add = function(user, obj, cb){
  var tp = new TreatmentPlan(obj);
  pg.query('select treatment_plan_add($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)',
      [
        user.org.id, tp.clientId, tp.therId, tp.discId, tp.evalDate,
        tp.recertDate, tp.dischargeDate, tp.dayId, tp.freqHigh, tp.freqLow
      ],
      function(err, results){
    cb(err, results && results.rows[0] ? results.rows[0] : null);
  });
};

TreatmentPlan.update = function(user, obj, cb){
  pg.query('select treatment_plan_update($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)',
      [
        obj.id, user.org.id, obj.client_id, obj.eval_therapist_id, obj.disc_id,
        obj.eval_date, obj.weekly_day_id, obj.recert_date, obj.discharge_date,
        obj.frequency_low, obj.frequency_high
      ],
      function(err, results){
    cb(err, results && results.rows ? results.rows[0] : null);
  });
};

module.exports = TreatmentPlan;
