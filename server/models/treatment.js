'use strict';

var pg        = require('../postgres/manager'),
    multiline = require('multiline');

function Treatment(obj){
	this.clientId = obj.client_id;
  this.therId   = obj.therapist_id;
  this.discId   = obj.disc_id;
  this.insId    = obj.ins_id;
  this.planId   = obj.plan_id;
  this.expMins  = obj.mins_expected;
  this.actMins  = obj.mins_actual;
  this.txDate   = obj.tx_date;
  this.dayCount = obj.day_count;
  this.note     = obj.is_note_done;
  this.arch     = obj.is_archived;
}

Treatment.findById = function(user, id, cb){
  pg.query('select * from treatments where id = $1 and org_id = $2 limit 1',
      [id, user.org.id], function(err, results){
    cb(err, results && results.rows[0] ? results.rows[0] : null);
  });
};

Treatment.all = function(user, cb){
	var sql = multiline.stripIndent(function(){/*
		select
			tx.id,

			tx.client_id,
			c.first as client_first,
			c.last as client_last,

			tx.therapist_id,
			t.first as therapist_first,
			t.last as therapist_last,

			tx.disc_id,
			d.name as disc_name,
			d.abbr as disc_abbr,

      tx.ins_id,
			i.name as ins_name,

			tx.mins_expected,
			tx.mins_actual,
			tx.tx_date,
			tx.day_count,
			tx.is_note_done,
			tx.is_archived
		from treatments tx
		left outer join clients c on c.id = tx.client_id
		left outer join therapists t on t.id = tx.therapist_id
		left outer join disciplines d on d.id = tx.disc_id
		left outer join insurances i on i.id = tx.ins_id
		where tx.org_id = $1
		order by tx.tx_date asc
		*/});
  pg.query(sql, [user.org.id], function(err, results){
    cb(err, results && results.rows ? results.rows : null);
  });
};

Treatment.add = function(user, obj, cb){
  var t = new Treatment(obj);
  pg.query('select treatment_add($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)',
      [
        t.clientId, t.therId, user.org.id, t.discId, t.insId,
        t.planId, t.expMins, t.actMins, t.txDate, t.dayCount,
				t.note, t.arch
      ],
      function(err, results){
		cb(err, results && results.rows[0] ? results.rows[0] : null);
  });
};

Treatment.update = function(user, obj, cb){
  pg.query('select treatment_update($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)',
      [
        obj.id, obj.client_id, obj.therapist_id, user.org.id, obj.disc_id,
        obj.ins_id, obj.plan_id, obj.mins_expected, obj.mins_actual,
        obj.tx_date, obj.day_count, obj.is_note_done, obj.is_archived
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
