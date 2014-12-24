'use strict';

var pg     = require('../postgres/manager');

function TreatmentPlan(obj){
  this.clientId = obj.clientId;
  this.therId   = obj.therId;
  this.discId   = obj.discId;
	this.evalDate = obj.evalDate;
	this.dayId    = obj.dayId;
	this.freqHigh = obj.freqHigh;
	this.freqLow  = obj.freqLow;
}

TreatmentPlan.findById = function(user, id, cb){
  pg.query('select * from treatment_plans where id = $1 and org_id = $2 limit 1',
      [id, user.org.id], function(err, results){
    cb(err, results && results.rows[0] ? results.rows[0] : null);
  });
};

TreatmentPlan.all = function(user, cb){
  pg.query('select * from treatment_plans where org_id = $1',
      [user.org.id], function(err, results){
    cb(err, results && results.rows ? results.rows : null);
  });
};

TreatmentPlan.add = function(user, obj, cb){
  var tp = new TreatmentPlan(obj);
  pg.query('select treatment_plan_add($1, $2, $3, $4, $5, $6, $7, $8)',
      [
        tp.clientId, tp.therId, user.org.id, tp.discId,
        tp.evalDate, tp.dayId, tp.freqHigh, tp.freqLow
      ],
      function(err, results){
    cb(err, results && results.rows[0] ? results.rows[0] : null);
  });
};

TreatmentPlan.update = function(user, obj, cb){
  pg.query('select treatment_plan_update($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)',
      [
        obj.id, user.org.id, obj.clientId, obj.therId, obj.discId, obj.evalDate,
        obj.dayId, obj.rcDate, obj.dcDate, obj.freqLow, obj.freqHigh
      ],
      function(err, results){
    cb(err, results && results.rows ? results.rows[0] : null);
  });
};

module.exports = TreatmentPlan;
