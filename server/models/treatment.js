'use strict';

var pg     = require('../postgres/manager');

function Treatment(obj){
	this.clientId = obj.clientId;
  this.therId   = obj.therId;
  this.discId   = obj.discId;
  this.insId    = obj.insId;
  this.planId   = obj.planId;
  this.expMins  = obj.expMins;
  this.txDate   = obj.txDate;
  this.dayCount = obj.dayCount;
}

Treatment.findById = function(user, id, cb){
  pg.query('select * from treatments where id = $1 and org_id = $2 limit 1',
      [id, user.org.id], function(err, results){
    cb(err, results && results.rows[0] ? results.rows[0] : null);
  });
};

Treatment.all = function(user, cb){
  pg.query('select * from treatments where org_id = $1',
      [user.org.id], function(err, results){
    cb(err, results && results.rows ? results.rows : null);
  });
};

Treatment.add = function(user, obj, cb){
  var t = new Treatment(obj);
  pg.query('select treatment_add($1, $2, $3, $4, $5, $6, $7, $8, $9)',
      [
        t.clientId, t.therId, user.org.id, t.discId, t.insId,
        t.planId, t.expMins, t.txDate, t.dayCount
      ],
      function(err, results){
		cb(err, results && results.rows[0] ? results.rows[0] : null);
  });
};

Treatment.update = function(user, obj, cb){
  pg.query('select treatment_update($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)',
      [
        obj.id, obj.clientId, obj.therId, user.org.id, obj.discId, obj.insId, obj.planId,
        obj.expMins, obj.actMins, obj.txDate, obj.dayCount, obj.isNote, obj.isArch
      ],
      function(err, results){
    cb(err, results && results.rows ? results.rows[0] : null);
  });
};

Treatment.nuke = function(user, txId, cb){
  pg.query('select treatment_nuke($1, $2)', [user.org.id, txId],
      function(err, results){
    cb(err, results && results.rows ? results.rows[0] : null);
  });
};

module.exports = Treatment;
